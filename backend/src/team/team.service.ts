import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TeamService {
    constructor(private readonly database: DatabaseService) {}

    addTeam(name: string, shortName: string, ownerId: string, creatorId: string): ReturnType<DatabaseService["teams"]["create"]> {
        return this.database.teams.create({
            data: {
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

    getTeamByNameOrShortName(name: string, shortName: string): ReturnType<DatabaseService["teams"]["findFirst"]> {
        return this.database.teams.findFirst({
            where: {
                OR: [{ name }, { short_name: shortName }],
            },
        });
    }
}
