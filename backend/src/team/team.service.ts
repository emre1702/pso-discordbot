import { DatabaseService } from "@backend/database/database.service";
import { UserService } from "@backend/user/user.service";
import { Injectable } from "@nestjs/common";
import { Prisma, team_role, teams } from "@prisma/client";

@Injectable()
export class TeamService {
    constructor(
        private readonly database: DatabaseService,
        private readonly userService: UserService
    ) {}

    async addTeam(
        guildId: string,
        name: string,
        shortName: string,
        ownerId: string,
        creatorId: string
    ): Promise<ReturnType<DatabaseService["teams"]["create"]>> {
        await this.userService.ensureDiscordUserExists(ownerId);
        await this.userService.ensureDiscordUserExists(creatorId);

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

    getTeamNameById(teamId: string): Promise<string | null> {
        return this.database.teams
            .findUnique({
                where: {
                    id: teamId,
                },
                select: {
                    name: true,
                },
            })
            .then((team) => team?.name ?? null);
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

    getTeamCaptainIds(teamId: string): Promise<string[]> {
        return this.database.team_roles
            .findMany({
                where: {
                    team_id: teamId,
                    OR: [{ role: team_role.Captain }, { role: team_role.Co_Captain }],
                },
                select: {
                    user_id: true,
                },
            })
            .then((roles) => roles.map((role) => role.user_id));
    }
}
