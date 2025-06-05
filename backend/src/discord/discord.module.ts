import { GuildModule } from "@backend/discord/guild/guild.module";
import { LanguageModule } from "@backend/language/language.module";
import { MatchModule } from "@backend/match/match.module";
import { TeamModule } from "@backend/team/team.module";
import { Logger, Module } from "@nestjs/common";
import { BotService } from "./bot.service";

@Module({
    imports: [LanguageModule, GuildModule, MatchModule, TeamModule],
    providers: [BotService, Logger],
    exports: [BotService],
})
export class DiscordModule {}
