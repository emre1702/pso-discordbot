import { DatabaseModule } from "@backend/database/database.module";
import { UserModule } from "@backend/user/user.module";
import { Module } from "@nestjs/common";
import { TeamRoleService } from "./team-role.service";
import { TeamService } from "./team.service";
import { ToTeamTransferRequestService } from "./to-team-transfer-request.service";
import { ToUserTransferRequestService } from "./to-user-transfer-request.service";
import { TransferChannelService } from "./transfer-channel.service";
import { TransferRequestSharedService } from "./transfer-request-shared.service";

@Module({
    providers: [
        TeamService,
        TeamRoleService,
        ToTeamTransferRequestService,
        ToUserTransferRequestService,
        TransferChannelService,
        TransferRequestSharedService,
    ],
    exports: [
        TeamService,
        TeamRoleService,
        ToTeamTransferRequestService,
        ToUserTransferRequestService,
        TransferChannelService,
        TransferRequestSharedService,
    ],
    imports: [DatabaseModule, UserModule],
})
export class TeamModule {}
