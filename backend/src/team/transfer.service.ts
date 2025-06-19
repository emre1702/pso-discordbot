import { DatabaseService } from "@backend/database/database.service";
import { UserService } from "@backend/user/user.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { Injectable } from "@nestjs/common";
import { team_role, transfer_request_status } from "@prisma/client";
import { container } from "@sapphire/framework";
import { NotACaptainOrCoCaptainError } from "./not-a-captain-or-co-captain.error";
import { TeamNotFoundError } from "./team-not-found.error";
import { TeamRoleService } from "./team-role.service";
import { TeamService } from "./team.service";
import { TransferRequestNotFoundError } from "./transfer-request-not-found.error";

@Injectable()
export class TransferService {
    constructor(
        private readonly teamService: TeamService,
        private readonly teamRoleService: TeamRoleService,
        private readonly databaseService: DatabaseService,
        private readonly userService: UserService
    ) {}

    async createTransferRequestToTeam(
        userId: string,
        guildId: string,
        teamId: string,
        args: { playtime: number | null; positions: string | null; comment: string | null }
    ): Promise<void> {
        //TODO: Add check if user is already in a team
        //TODO: Check if request for the same team already exists

        const tFunction = await getTFunction({ guildId });
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
        const messageArgs: Parameters<TeamService["sendMessageToTeamCaptains"]>[2] = {
            team: teamName ? (): string => teamName : (tFunc): string => tFunc("transfer:send-to-team:unknown-team"),
            guild: guild ? (): string => guild.name : (tFunc): string => tFunc("transfer:send-to-team:unknown-guild"),
            user: (): string => user.username,
            playtime: playtime ? (): string => playtime.toString() : (tFunc): string => tFunc("transfer:send-to-team:no-playtime"),
            positions: positions ? (): string => positions : (tFunc): string => tFunc("transfer:send-to-team:no-positions"),
            comment: comment ? (): string => comment : (tFunc): string => tFunc("transfer:send-to-team:no-comment"),
        };
        await this.teamService.sendMessageToTeamCaptains(teamId, messageKey, messageArgs);
    }

    async respondToTeamTransferRequest(
        responderId: string,
        guildId: string,
        requesterId: string,
        response: Extract<transfer_request_status, "accepted" | "rejected">
    ): Promise<void> {
        const tFunction = await getTFunction({ userId: responderId });
        const teamIdAndRole = await this.teamRoleService.getTeamIdAndRole(responderId, guildId);
        if (!teamIdAndRole) {
            throw TeamNotFoundError(tFunction("transfer:respond-to-team-request:not-in-a-team"));
        }

        if (teamIdAndRole.role !== team_role.Captain && teamIdAndRole.role !== team_role.Co_Captain) {
            throw NotACaptainOrCoCaptainError(tFunction("transfer:respond-to-team-request:not-a-captain-or-co-captain"));
        }

        await this.userService.ensureDiscordUserExists(requesterId);

        const result = await this.databaseService.team_transfer_requests.updateMany({
            where: {
                user_id: requesterId,
                team_id: teamIdAndRole.team_id,
            },
            data: {
                status: response,
                changed_by: responderId,
                changed_at: new Date(),
            },
        });

        if (result.count === 0) {
            throw TransferRequestNotFoundError(tFunction("transfer:respond-to-team-request:request-not-found"));
        }

        //TODO: In command send responder message "transfer:respond-to-team-request:you-have-accepted"

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

        const tFunction = await getTFunction({ userId: requesterId });
        const messageKey =
            response === transfer_request_status.accepted
                ? "transfer:respond-to-team-request:accepted"
                : "transfer:respond-to-team-request:rejected";
        requester.send(
            tFunction(messageKey, {
                teamName: teamName ?? "?",
                guildName: guild.name,
                responderName,
            })
        );
    }
}
