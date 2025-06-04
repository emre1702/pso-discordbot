import { GuildModule } from "@backend/guild/guild.module";
import { LanguageModule } from "@backend/language/language.module";
import { Logger, Module } from "@nestjs/common";
import { BotService } from "./bot.service";

@Module({
    imports: [LanguageModule, GuildModule],
    providers: [BotService, Logger],
    exports: [BotService],
})
export class DiscordModule {}
