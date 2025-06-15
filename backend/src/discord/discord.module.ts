import { GuildModule } from "@backend/discord/guild/guild.module";
import { FixtureModule } from "@backend/fixture/fixture.module";
import { MatchModule } from "@backend/match/match.module";
import { ScoreboardModule } from "@backend/scoreboard/scoreboard.module";
import { GuildSettingModule } from "@backend/setting/guild-setting.module";
import { TeamModule } from "@backend/team/team.module";
import { Logger, Module } from "@nestjs/common";
import { BotService } from "./bot.service";
import { RoleModule } from "./role/role.module";

@Module({
    imports: [GuildModule, MatchModule, TeamModule, GuildSettingModule, ScoreboardModule, FixtureModule, RoleModule],
    providers: [BotService, Logger],
    exports: [BotService],
})
export class DiscordModule {}
