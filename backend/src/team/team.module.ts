import { DatabaseModule } from "@backend/database/database.module";
import { UserModule } from "@backend/user/user.module";
import { Module } from "@nestjs/common";
import { TeamRoleService } from "./team-role.service";
import { TeamService } from "./team.service";
import { ToTeamTransferRequestService } from "./to-team-transfer-request.service";

@Module({
    providers: [TeamService, TeamRoleService, ToTeamTransferRequestService],
    exports: [TeamService, TeamRoleService, ToTeamTransferRequestService],
    imports: [DatabaseModule, UserModule],
})
export class TeamModule {}
