import { DatabaseModule } from "@backend/database/database.module";
import { FixtureModule } from "@backend/fixture/fixture.module";
import { SeasonModule } from "@backend/season/season.module";
import { Module } from "@nestjs/common";
import { MatchService } from "./match.service";

@Module({
    providers: [MatchService],
    exports: [MatchService],
    imports: [DatabaseModule, SeasonModule, FixtureModule],
})
export class MatchModule {}
