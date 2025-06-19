import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { teams } from "@prisma/client";

@Injectable()
export class TeamService {
    constructor(private readonly database: DatabaseService) {}

    async addTeam(
        roleId: string,
        guildId: string,
        name: string,
        shortName: string,
        ownerId: string,
        creatorId: string
    ): Promise<ReturnType<DatabaseService["teams"]["create"]>> {
        await this.database.discord_users.upsert({
            where: { id: ownerId },
            create: { id: ownerId },
            update: {},
        });

        await this.database.discord_users.upsert({
            where: { id: creatorId },
            create: { id: creatorId },
            update: {},
        });

        return this.database.teams.create({
            data: {
                id: roleId,
                guild_id: guildId,
                name,
                short_name: shortName,
                owner: ownerId,
                created_by: creatorId,
                team_roles: {
                    create: {
                        user_id: creatorId,
                        role: "Captain",
                    },
                },
            },
        });
    }

    getTeamByNameOrShortName(guildId: string, name: string, shortName: string): Promise<teams | null> {
        return this.database.teams.findFirst({
            where: {
                guild_id: guildId,
                OR: [
                    //
                    { name: { equals: name, mode: "insensitive" } },
                    { short_name: { equals: shortName, mode: "insensitive" } },
                ],
            },
        });
    }

    deleteTeam(teamId: string): Promise<{ name: string } | null> {
        return this.database.teams.delete({
            where: {
                id: teamId,
            },
            select: {
                name: true,
            },
        });
    }
}
