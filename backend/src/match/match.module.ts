import { DatabaseModule } from "@backend/database/database.module";
import { SeasonModule } from "@backend/season/season.module";
import { Module } from "@nestjs/common";
import { MatchService } from "./match.service";

@Module({
    providers: [MatchService],
    exports: [MatchService],
    imports: [DatabaseModule, SeasonModule],
})
export class MatchModule {}
