import { Injectable } from "@nestjs/common";
import { language as Language, PrismaClient } from "@prisma/client";

@Injectable()
export class LanguageService {
    readonly languageNameMapping: Record<Language, string> = {
        en_US: "English",
        tr: "Türkçe",
    };

    constructor(private readonly prisma: PrismaClient) {}

    setGuildLanguage(id: string, selectedLanguage: Language): ReturnType<PrismaClient["guilds"]["update"]> {
        return this.prisma.guilds.update({
            data: { language: selectedLanguage },
            where: { id },
        });
    }

    setUserLanguage(id: string, selectedLanguage: Language): ReturnType<PrismaClient["discord_users"]["update"]> {
        return this.prisma.discord_users.update({
            data: { language: selectedLanguage },
            where: { id },
        });
    }

    getGuildLanguage(id: string): Promise<string | null | undefined> {
        return this.prisma.guilds
            .findUnique({
                where: { id },
                select: { language: true },
            })
            .then((guild) => guild?.language);
    }

    getUserLanguage(id: string): Promise<string | null | undefined> {
        return this.prisma.discord_users
            .findUnique({
                where: { id },
                select: { language: true },
            })
            .then((user) => user?.language);
    }
}
