import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { team_role } from "@prisma/client";

@Injectable()
export class TeamRoleService {
    constructor(private readonly database: DatabaseService) {}

    async setTeamRole(
        teamId: string,
        userId: string,
        role: team_role
    ): Promise<Awaited<ReturnType<DatabaseService["team_roles"]["upsert"]>>> {
        await this.database.team_roles.deleteMany({
            where: {
                user_id: userId,
            },
        });

        return this.database.team_roles.upsert({
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
        });
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
}
