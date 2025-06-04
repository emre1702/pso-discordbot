import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DiscordModule } from "./discord/discord.module";
import { LanguageModule } from "./language/language.module";

@Module({
    imports: [DiscordModule, LanguageModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
