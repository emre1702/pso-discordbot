import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DiscordModule } from "./discord/discord.module";
import { RoleModule } from "./discord/role/role.module";
import { LanguageModule } from "./language/language.module";
import { MatchModule } from "./match/match.module";
import { SeasonModule } from "./season/season.module";
import { TeamModule } from "./team/team.module";

@Module({
    imports: [DiscordModule, LanguageModule, TeamModule, RoleModule, SeasonModule, MatchModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
