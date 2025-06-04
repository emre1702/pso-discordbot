import { DatabaseModule } from "@backend/database/database.module";
import { Module } from "@nestjs/common";
import { GuildService } from "./guild.service";

@Module({
    providers: [GuildService],
    exports: [GuildService],
    imports: [DatabaseModule],
})
export class GuildModule {}
