import { DatabaseModule } from "@backend/database/database.module";
import { Module } from "@nestjs/common";
import { LanguageService } from "./language.service";

@Module({
    imports: [DatabaseModule],
    providers: [LanguageService],
    exports: [LanguageService],
})
export class LanguageModule {}
