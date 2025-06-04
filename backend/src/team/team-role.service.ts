import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { team_role } from "@prisma/client";

@Injectable()
export class TeamRoleService {
    constructor(private readonly database: DatabaseService) {}

    setTeamRole(teamId: string, userId: string, role: team_role): ReturnType<DatabaseService["team_roles"]["upsert"]> {
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
