import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GuildService {
    constructor(private readonly database: DatabaseService) {}

    upsertGuildInDb(guildId: string): ReturnType<DatabaseService["guilds"]["upsert"]> {
        return this.database.guilds.upsert({
            where: { id: guildId },
            create: { id: guildId },
            update: { last_joined_at: new Date() },
        });
    }
}
