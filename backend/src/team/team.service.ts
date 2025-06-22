import { DatabaseService } from "@backend/database/database.service";
import { UserService } from "@backend/user/user.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { Injectable } from "@nestjs/common";
import { team_role, teams } from "@prisma/client";
import { container } from "@sapphire/framework";
import { TFunction } from "@sapphire/plugin-i18next";

@Injectable()
export class TeamService {
    constructor(
        private readonly database: DatabaseService,
        private readonly userService: UserService
    ) {}

    async addTeam(
        roleId: string,
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

    getTeamCaptainIds(teamId: string, includeCoCaptains = true): Promise<string[]> {
        return this.database.team_roles
            .findMany({
                where: {
                    team_id: teamId,
                    role: {
                        in: includeCoCaptains ? [team_role.Captain, team_role.Co_Captain] : [team_role.Captain],
                    },
                },
                select: {
                    user_id: true,
                },
            })
            .then((roles) => roles.map((role) => role.user_id));
    }

    getTeamExists(teamId: string): Promise<boolean> {
        return this.database.teams
            .findUnique({
                where: {
                    id: teamId,
                },
            })
            .then((team) => team !== null);
    }

    async sendMessageToTeamCaptains(
        teamId: string,
        guildId: string,
        messageKey: string,
        messageArgs?: { [key: string]: (func: TFunction<"translation", unknown>) => string },
        includeCoCaptains = true
    ): Promise<void> {
        const getTeamCaptainIds = await this.getTeamCaptainIds(teamId, includeCoCaptains);
        if (!getTeamCaptainIds.length) {
            return;
        }

        for (const captainId of getTeamCaptainIds) {
            const tFunction = await getTFunction({ userId: captainId, guildId });

            const message = tFunction(
                messageKey,
                messageArgs
                    ? Object.entries(messageArgs).reduce(
                          (acc, [key, value]) => {
                              acc[key] = value(tFunction);
                              return acc;
                          },
                          {} as { [key: string]: string }
                      )
                    : {}
            );

            // Send the notification to the captain
            const captainUser = await container.client.users.fetch(captainId);
            await captainUser.send(message).catch(() => {});
        }
    }

    //TODO: Add command to list all players in a team
    //TODO: Add command to list all teams in a guild
}
