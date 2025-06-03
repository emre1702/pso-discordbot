import { Logger, Module } from "@nestjs/common";
import { BotService } from "./bot.service";

@Module({
    providers: [BotService, Logger],
    exports: [BotService],
})
export class DiscordModule {}
