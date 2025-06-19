import { DatabaseModule } from "@backend/database/database.module";
import { UserModule } from "@backend/user/user.module";
import { Module } from "@nestjs/common";
import { TeamRoleService } from "./team-role.service";
import { TeamService } from "./team.service";
import { TransferService } from "./transfer.service";

@Module({
    providers: [TeamService, TeamRoleService, TransferService],
    exports: [TeamService, TeamRoleService, TransferService],
    imports: [DatabaseModule, UserModule],
})
export class TeamModule {}
