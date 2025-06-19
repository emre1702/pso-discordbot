import { DatabaseService } from "@backend/database/database.service";
import { UserService } from "@backend/user/user.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { Injectable } from "@nestjs/common";
import { container } from "@sapphire/framework";
import { TeamNotFoundError } from "./team-not-found.error";
import { TeamService } from "./team.service";

@Injectable()
export class TransferService {
    constructor(
        private readonly teamService: TeamService,
        private readonly databaseService: DatabaseService,
        private readonly userService: UserService
    ) {}

    async createTransferRequestToTeam(
        userId: string,
        guildId: string,
        teamName: string,
        args: { playtime: number | null; positions: string | null; comment: string | null }
    ): Promise<void> {
        const tFunction = await getTFunction({ guildId });
        const teamId = await this.teamService.getTeamIdByName(guildId, teamName);
        if (!teamId) {
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
    }

    private async notifyTeamCaptains(
        teamId: string,
        guildId: string,
        userId: string,
        playtime: number | null,
        positions: string | null,
        comment: string | null
    ): Promise<void> {
        const getTeamCaptainIds = await this.teamService.getTeamCaptainIds(teamId);
        if (!getTeamCaptainIds.length) {
            return;
        }

        const user = await container.client.users.fetch(userId);
        if (!user) {
            return;
        }
        const guild = container.client.guilds.cache.get(guildId);
        const teamName = await this.teamService.getTeamNameById(teamId);
        for (const captainId of getTeamCaptainIds) {
            const tFunction = await getTFunction({ userId: captainId });

            const message = tFunction("transfer:send-to-team:notification", {
                team: teamName ?? tFunction("transfer:send-to-team:unknown-team"),
                guild: guild?.name ?? tFunction("transfer:send-to-team:unknown-guild"),
                user: user.username,
                playtime: playtime ?? tFunction("transfer:send-to-team:no-playtime"),
                positions: positions ?? tFunction("transfer:send-to-team:no-positions"),
                comment: comment ?? tFunction("transfer:send-to-team:no-comment"),
            });

            // Send the notification to the captain
            const captainUser = await container.client.users.fetch(captainId);
            await captainUser.send(message);
        }
    }
}
