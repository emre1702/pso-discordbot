import { DatabaseModule } from "@backend/database/database.module";
import { SeasonModule } from "@backend/season/season.module";
import { GuildSettingModule } from "@backend/setting/guild-setting.module";
import { UserModule } from "@backend/user/user.module";
import { Module } from "@nestjs/common";
import { FixtureChannelService } from "./fixture-channel.service";
import { FixtureService } from "./fixture.service";

@Module({
    providers: [FixtureService, FixtureChannelService],
    exports: [FixtureService, FixtureChannelService],
    imports: [DatabaseModule, GuildSettingModule, SeasonModule, UserModule],
})
export class FixtureModule {}
