import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { Prisma, teams } from "@prisma/client";

@Injectable()
export class TeamService {
    constructor(private readonly database: DatabaseService) {}

    async addTeam(
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

    getTeamIdByName(guildId: string, name: string): Promise<string | undefined> {
        return this.database.teams
            .findFirst({
                where: {
                    guild_id: guildId,
                    name: { equals: name, mode: "insensitive" },
                },
                select: {
                    id: true,
                },
            })
            .then((team) => team?.id);
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

    deleteTeamByName(guildId: string, name: string): Prisma.PrismaPromise<Prisma.BatchPayload> {
        return this.database.teams.deleteMany({
            where: {
                name: { equals: name, mode: "insensitive" },
                guild_id: { equals: guildId, mode: "insensitive" },
            },
        });
    }
}
