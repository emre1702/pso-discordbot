import { DatabaseService } from "@backend/database/database.service";
import { container } from "@sapphire/framework";
import { fetchT, i18next, TFunction } from "@sapphire/plugin-i18next";
import { ChatInputCommandInteraction, Guild } from "discord.js";

function getTFunction(guild: Guild): Promise<TFunction<"translation", undefined>>;
function getTFunction(argument: { guildId: string }): Promise<TFunction<"translation", undefined>>;
function getTFunction(argument: { userId: string }): Promise<TFunction<"translation", undefined>>;
function getTFunction(interaction: ChatInputCommandInteraction): Promise<TFunction<"translation", undefined>>;
function getTFunction(
    argument: { guildId: string } | { userId: string } | Guild | ChatInputCommandInteraction
): Promise<TFunction<"translation", undefined>> {
    if (argument instanceof Guild) {
        return getTFunctionByGuild(argument);
    }
    if (argument instanceof ChatInputCommandInteraction) {
        return fetchT(argument);
    }
    if (typeof argument === "object" && "guildId" in argument) {
        return getTFunctionByGuildId(argument.guildId);
    }
    if (typeof argument === "object" && "userId" in argument) {
        return getTFunctionByUserId(argument.userId);
    }
    return Promise.resolve(i18next.getFixedT("en"));
}

function getTFunctionByGuild(guild: Guild): Promise<TFunction<"translation", undefined>> {
    return fetchT(guild);
}

function getTFunctionByGuildId(guildId: string): Promise<TFunction<"translation", undefined>> {
    const guild = container.client.guilds.resolve(guildId);
    if (!guild) {
        return Promise.resolve(i18next.getFixedT("en"));
    }
    return fetchT(guild);
}

async function getTFunctionByUserId(userId: string): Promise<TFunction<"translation", undefined>> {
    const databaseService = container.moduleRef.get(DatabaseService, { strict: false });
    const userLanguage = await databaseService.discord_users
        .findUnique({
            where: { id: userId },
            select: { language: true },
        })
        .then((user) => user?.language);
    return i18next.getFixedT(userLanguage ?? "en");
}

export default getTFunction;
