import { DatabaseModule } from "@backend/database/database.module";
import { Module } from "@nestjs/common";
import { TeamRoleService } from "./team-role.service";
import { TeamService } from "./team.service";

@Module({
    providers: [TeamService, TeamRoleService],
    exports: [TeamService, TeamRoleService],
    imports: [DatabaseModule],
})
export class TeamModule {}
