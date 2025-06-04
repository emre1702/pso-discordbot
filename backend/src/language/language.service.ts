import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { language as Language } from "@prisma/client";

@Injectable()
export class LanguageService {
    readonly languageNameMapping: Record<Language, string> = {
        en_US: "English",
        tr: "Türkçe",
    };

    constructor(private readonly database: DatabaseService) {}

    setGuildLanguage(id: string, selectedLanguage: Language): ReturnType<DatabaseService["guilds"]["update"]> {
        return this.database.guilds.update({
            data: { language: selectedLanguage },
            where: { id },
        });
    }

    setUserLanguage(id: string, selectedLanguage: Language): ReturnType<DatabaseService["discord_users"]["update"]> {
        return this.database.discord_users.update({
            data: { language: selectedLanguage },
            where: { id },
        });
    }

    getGuildLanguage(id: string): Promise<string | null | undefined> {
        return this.database.guilds
            .findUnique({
                where: { id },
                select: { language: true },
            })
            .then((guild) => guild?.language);
    }

    getUserLanguage(id: string): Promise<string | null | undefined> {
        return this.database.discord_users
            .findUnique({
                where: { id },
                select: { language: true },
            })
            .then((user) => user?.language);
    }
}
