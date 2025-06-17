import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    verifyAccessToken(_token: string): { user: any } {
        //TODO: Implement access token verification logic
        return { user: undefined }; // Placeholder for actual verification logic
    }

    async ensureDiscordUserExists(userId: string): Promise<void> {
        await this.databaseService.discord_users.upsert({
            where: { id: userId },
            create: { id: userId },
            update: {},
        });
    }
}
