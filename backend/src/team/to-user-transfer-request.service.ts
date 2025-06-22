import { DatabaseService } from "@backend/database/database.service";
import { UserService } from "@backend/user/user.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { Injectable } from "@nestjs/common";
import { team_role, transfer_request_status } from "@prisma/client";
import { container } from "@sapphire/framework";
import { AlreadyInATeamError } from "./already-in-a-team.error";
import { InsufficientPermissionError } from "./insufficent-team-permission.error";
import { TargetUserHasTeamError } from "./target-user-has-team.error";
import { TeamNotFoundError } from "./team-not-found.error";
import { TeamRoleService } from "./team-role.service";
import { TeamService } from "./team.service";
import { TransferRequestNotFoundError } from "./transfer-request-not-found.error";

@Injectable()
export class ToUserTransferRequestService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly userService: UserService,
        private readonly teamService: TeamService,
        private readonly teamRoleService: TeamRoleService
    ) {}

    async createTransferRequestToUser(requestingUserId: string, targetUserId: string, guildId: string): Promise<void> {
        //TODO: Check if transfer request from this team to this user already exists

        const tFunction = await getTFunction({ userId: requestingUserId, guildId: guildId });
        const teamIdAndRole = await this.teamRoleService.getTeamIdAndRole(requestingUserId, guildId);
        if (!teamIdAndRole) {
            throw TeamNotFoundError(tFunction("transfer:send-to-user:team-not-found"));
        }
        if (teamIdAndRole.role !== team_role.Captain && teamIdAndRole.role !== team_role.Co_Captain) {
            throw InsufficientPermissionError(tFunction("transfer:send-to-user:you-are-not-allowed"));
        }

        const targetUserTeamIdAndRole = await this.teamRoleService.getTeamIdAndRole(targetUserId, guildId);
        if (targetUserTeamIdAndRole) {
            throw TargetUserHasTeamError(tFunction("transfer:send-to-user:target-user-already-in-team"));
        }

        await this.userService.ensureDiscordUserExists(targetUserId);

        await this.databaseService.user_transfer_requests.create({
            data: {
                requester_id: requestingUserId,
                team_id: teamIdAndRole.team_id,
                user_id: targetUserId,
            },
        });

        await this.notifyTargetUserAboutIncomingTransferRequest(requestingUserId, targetUserId, teamIdAndRole.team_id, guildId);
    }

    private async notifyTargetUserAboutIncomingTransferRequest(
        requestingUserId: string,
        targetUserId: string,
        teamId: string,
        guildId: string
    ): Promise<void> {
        const user = await container.client.users.fetch(targetUserId);
        if (!user) {
            return;
        }

        const tFunction = await getTFunction({ userId: targetUserId, guildId: guildId });
        const teamName = await this.databaseService.teams
            .findUnique({
                where: { id: teamId },
                select: { name: true },
            })
            .then((team) => team!.name);
        const requesterName = (await container.client.users.fetch(requestingUserId))?.username || "Unknown User";
        const guildName = (await container.client.guilds.fetch(guildId))?.name || "Unknown Guild";

        //TODO: Modify message so it says what to do next, e.g., accept or decline the transfer request with command xyz
        const message = tFunction("transfer:send-to-user:notification", { guildName, teamName, requesterName });
        await user.send(message);
    }

    async respondToUserTransferRequest(
        userId: string,
        guildId: string,
        teamId: string,
        response: Extract<transfer_request_status, "accepted" | "rejected">
    ): Promise<void> {
        const tFunction = await getTFunction({ userId, guildId });
        const teamIdAndRole = await this.teamRoleService.getTeamIdAndRole(userId, guildId);
        if (teamIdAndRole) {
            throw AlreadyInATeamError(tFunction("transfer:respond-to-user-request:already-in-a-team"));
        }

        const result = await this.databaseService.user_transfer_requests.update({
            where: {
                team_id_user_id: {
                    team_id: teamId,
                    user_id: userId,
                },
                status: transfer_request_status.open,
            },
            data: {
                status: response,
                status_changed_at: new Date(),
            },
            select: {
                status: true,
            },
        });
        if (result?.status !== response) {
            throw TransferRequestNotFoundError(tFunction("transfer:respond-to-user-request:request-not-found"));
        }

        if (response === transfer_request_status.accepted) {
            await this.teamRoleService.setTeamRole(teamId, userId, team_role.Player);
            //TODO: send a message to the transfer channel
        }

        await this.notifyTeamAboutResponse(userId, teamId, guildId, response);
    }

    async notifyTeamAboutResponse(userId: string, teamId: string, guildId, response: transfer_request_status): Promise<void> {
        const userName = (await container.client.users.fetch(userId))?.username || "Unknown User";
        const teamName = (await this.teamService.getTeamNameById(teamId)) || "Unknown Team";
        const guildName = (await container.client.guilds.fetch(guildId))?.name || "Unknown Guild";

        const messageKey =
            response === transfer_request_status.accepted
                ? "transfer:respond-to-user-request:accepted"
                : "transfer:respond-to-user-request:rejected";
        const messageArgs = {
            userName: (): string => userName,
            teamName: (): string => teamName,
            guildName: (): string => guildName,
        };
        await this.teamService.sendMessageToTeamCaptains(teamId, guildId, messageKey, messageArgs);
    }
}
