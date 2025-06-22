import { DatabaseService } from "@backend/database/database.service";
import { UserService } from "@backend/user/user.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { Injectable } from "@nestjs/common";
import { team_role, transfer_request_status } from "@prisma/client";
import { container } from "@sapphire/framework";
import { roleMention, userMention } from "discord.js";
import { AlreadyInATeamError } from "./errors/already-in-a-team.error";
import { InsufficientPermissionError } from "./errors/insufficent-team-permission.error";
import { TeamNotFoundError } from "./errors/team-not-found.error";
import { TransferRequestAlreadyExistsError } from "./errors/transfer-request-already-exists.error";
import { TransferRequestNotFoundError } from "./errors/transfer-request-not-found.error";
import { TeamRoleService } from "./team-role.service";
import { TeamService } from "./team.service";
import { TransferChannelService } from "./transfer-channel.service";
import { TransferRequestSharedService } from "./transfer-request-shared.service";

@Injectable()
export class ToTeamTransferRequestService {
    constructor(
        private readonly teamService: TeamService,
        private readonly teamRoleService: TeamRoleService,
        private readonly databaseService: DatabaseService,
        private readonly userService: UserService,
        private readonly transferChannelService: TransferChannelService,
        private readonly transferRequestSharedService: TransferRequestSharedService
    ) {}

    async createTransferRequestToTeam(
        userId: string,
        guildId: string,
        teamId: string,
        args: { playtime: number | null; positions: string | null; comment: string | null }
    ): Promise<void> {
        const tFunction = await getTFunction({ guildId });
        const teamIdAndRole = await this.teamRoleService.getTeamIdAndRole(userId, guildId);
        if (teamIdAndRole) {
            throw AlreadyInATeamError(tFunction("transfer:send-to-team:already-in-a-team"));
        }

        const previousTransferRequest = await this.databaseService.team_transfer_requests.findUnique({
            where: {
                user_id_team_id: {
                    user_id: userId,
                    team_id: teamId,
                },
            },
        });
        if (previousTransferRequest) {
            throw TransferRequestAlreadyExistsError(tFunction("transfer:send-to-team:request-already-exists"));
        }

        const teamExists = await this.teamService.getTeamExists(teamId);
        if (!teamExists) {
            throw TeamNotFoundError(tFunction("transfer:send-to-team:team-not-found"));
        }

        await this.userService.ensureDiscordUserExists(userId);

        await this.databaseService.team_transfer_requests.create({
            data: {
                user_id: userId,
                guild_id: guildId,
                team_id: teamId,
                playtime: args.playtime,
                positions: args.positions,
                comment: args.comment,
            },
        });

        await this.notifyTeamCaptainsAboutIncomingTransferRequest(teamId, guildId, userId, args.playtime, args.positions, args.comment);
    }

    private async notifyTeamCaptainsAboutIncomingTransferRequest(
        teamId: string,
        guildId: string,
        userId: string,
        playtime: number | null,
        positions: string | null,
        comment: string | null
    ): Promise<void> {
        const user = await container.client.users.fetch(userId);
        if (!user) {
            return;
        }
        const guild = container.client.guilds.cache.get(guildId);
        const teamName = await this.teamService.getTeamNameById(teamId);
        const messageKey = "transfer:send-to-team:notification";
        const messageArgs: Parameters<TeamService["sendMessageToTeamCaptains"]>[3] = {
            team: teamName
                ? (): string => `${roleMention(teamId)} (${teamName})`
                : (tFunc): string => tFunc("transfer:send-to-team:unknown-team"),
            guild: guild ? (): string => guild.name : (tFunc): string => tFunc("transfer:send-to-team:unknown-guild"),
            user: (): string => `${userMention(user.id)} (${user.username})`,
            playtime: playtime ? (): string => playtime.toString() : (tFunc): string => tFunc("transfer:send-to-team:no-playtime"),
            positions: positions ? (): string => positions : (tFunc): string => tFunc("transfer:send-to-team:no-positions"),
            comment: comment ? (): string => comment : (tFunc): string => tFunc("transfer:send-to-team:no-comment"),
        };
        await this.teamService.sendMessageToTeamCaptains(teamId, guildId, messageKey, messageArgs);
    }

    async respondToTeamTransferRequest(
        responderId: string,
        guildId: string,
        requesterId: string,
        response: Extract<transfer_request_status, "accepted" | "rejected">
    ): Promise<void> {
        const tFunction = await getTFunction({ userId: responderId, guildId });
        const teamIdAndRole = await this.teamRoleService.getTeamIdAndRole(responderId, guildId);
        if (!teamIdAndRole) {
            throw TeamNotFoundError(tFunction("transfer:respond-to-team-request:not-in-a-team"));
        }

        if (teamIdAndRole.role !== team_role.Captain && teamIdAndRole.role !== team_role.Co_Captain) {
            throw InsufficientPermissionError(tFunction("transfer:respond-to-team-request:not-a-captain-or-co-captain"));
        }

        await this.userService.ensureDiscordUserExists(requesterId);

        //TODO: Delete transfer requests after X days, check "changed_at" field for that
        //TODO: Add command to delete transfer requests so the teams can send new ones
        const result = await this.databaseService.team_transfer_requests.update({
            where: {
                user_id_team_id: {
                    user_id: requesterId,
                    team_id: teamIdAndRole.team_id,
                },
                status: transfer_request_status.open,
            },
            data: {
                status: response,
                status_changed_by: responderId,
                status_changed_at: new Date(),
            },
            select: {
                status: true,
            },
        });

        if (result?.status !== response) {
            throw TransferRequestNotFoundError(tFunction("transfer:respond-to-team-request:request-not-found"));
        }

        if (response === transfer_request_status.accepted) {
            await this.teamRoleService.setTeamRole(teamIdAndRole.team_id, responderId, team_role.Player);
            await this.transferChannelService.sendTransferMessage(responderId, teamIdAndRole.team_id, guildId);
            await this.transferRequestSharedService.rejectAllOtherTransferRequests(responderId, teamIdAndRole.team_id);
        }

        await this.notifyRequesterAboutResponse(requesterId, response, teamIdAndRole.team_id, guildId, responderId);
    }

    private async notifyRequesterAboutResponse(
        requesterId: string,
        response: Extract<transfer_request_status, "accepted" | "rejected">,
        teamId: string,
        guildId: string,
        responderId: string
    ): Promise<void> {
        const requester = await container.client.users.fetch(requesterId);
        if (!requester) {
            return;
        }
        const guild = container.client.guilds.cache.get(guildId);
        if (!guild) {
            return;
        }
        const teamName = await this.teamService.getTeamNameById(teamId);
        const responder = await container.client.users.fetch(responderId);
        const responderName = responder ? responder.username : "Unknown User";

        const tFunction = await getTFunction({ userId: requesterId, guildId });
        const messageKey =
            response === transfer_request_status.accepted
                ? "transfer:respond-to-team-request:accepted"
                : "transfer:respond-to-team-request:rejected";
        requester.send(
            tFunction(messageKey, {
                teamName: `${roleMention(teamId)} (${teamName ?? "?"})`,
                guildName: guild.name,
                responderName: `${userMention(responderId)} (${responderName})`,
            })
        );
    }
}
