import { DatabaseModule } from "@backend/database/database.module";
import { Module } from "@nestjs/common";
import { GuildSettingService } from "./guild-setting.service";

@Module({
    providers: [GuildSettingService],
    exports: [GuildSettingService],
    imports: [DatabaseModule],
})
export class GuildSettingModule {}
