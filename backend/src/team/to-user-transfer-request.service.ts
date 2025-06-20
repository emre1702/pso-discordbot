import { DatabaseService } from "@backend/database/database.service";
import { UserService } from "@backend/user/user.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { Injectable } from "@nestjs/common";
import { team_role } from "@prisma/client";
import { container } from "@sapphire/framework";
import { InsufficientPermissionError } from "./insufficent-team-permission.error";
import { TargetUserHasTeamError } from "./target-user-has-team.error";
import { TeamNotFoundError } from "./team-not-found.error";
import { TeamRoleService } from "./team-role.service";

@Injectable()
export class ToUserTransferRequestService {
    constructor(
        private readonly databaseService: DatabaseService,
        private readonly userService: UserService,
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

        // Notify the target user about the incoming transfer request
        // This could be a message, an email, or any other form of notification
        // Implementation depends on your notification system
    }
}
