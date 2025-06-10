import { DatabaseModule } from "@backend/database/database.module";
import { MatchModule } from "@backend/match/match.module";
import { SeasonModule } from "@backend/season/season.module";
import { GuildSettingModule } from "@backend/setting/guild-setting.module";
import { Module } from "@nestjs/common";
import { ScoreboardService } from "./scoreboard.service";

@Module({
    providers: [ScoreboardService],
    exports: [ScoreboardService],
    imports: [GuildSettingModule, DatabaseModule, SeasonModule, MatchModule],
})
export class ScoreboardModule {}
