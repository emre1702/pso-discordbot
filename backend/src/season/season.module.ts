import { DatabaseModule } from "@backend/database/database.module";
import { Module } from "@nestjs/common";
import { SeasonService } from "./season.service";

@Module({
    providers: [SeasonService],
    exports: [SeasonService],
    imports: [DatabaseModule],
})
export class SeasonModule {}
