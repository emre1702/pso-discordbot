import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { team_role } from "@prisma/client";
import { container } from "@sapphire/framework";

@Injectable()
export class TeamRoleService {
    constructor(private readonly database: DatabaseService) {}

    async setTeamRole(teamId: string, userId: string, role: team_role): Promise<void> {
        await this.database.team_roles.deleteMany({
            where: {
                user_id: userId,
            },
        });

        const result = this.database.team_roles.upsert({
            where: {
                team_id_user_id: {
                    team_id: teamId,
                    user_id: userId,
                },
            },
            create: {
                team_id: teamId,
                user_id: userId,
                role,
            },
            update: {
                role,
            },
            select: {
                teams: {
                    select: {
                        guild_id: true,
                    },
                },
            },
        });

        const guild = await container.client.guilds.fetch(result.teams[0].guild_id);
        if (!guild) {
            return;
        }

        const user = await guild.members.fetch(userId);
        if (!user) {
            return;
        }

        if (user.roles.cache.has(role)) {
            return;
        }

        await user.roles.add(role);
    }

    getTeamRole(teamId: string, userId: string): Promise<team_role | null> {
        return this.database.team_roles
            .findUnique({
                where: {
                    team_id_user_id: {
                        team_id: teamId,
                        user_id: userId,
                    },
                },
                select: {
                    role: true,
                },
            })
            .then((role) => role?.role || null);
    }

    getTeamIdAndRole(userId: string, guildId: string): Promise<{ team_id: string; role: team_role | null } | null> {
        return this.database.team_roles.findFirst({
            where: {
                user_id: userId,
                teams: {
                    guild_id: guildId,
                },
            },
            select: {
                team_id: true,
                role: true,
            },
        });
    }
}
