import { GuildService } from "@backend/discord/guild/guild.service";
import { LanguageService } from "@backend/language/language.service";
import { Injectable, Logger } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ApplicationCommandRegistries, container, RegisterBehavior, SapphireClient } from "@sapphire/framework";
import { InternationalizationContext } from "@sapphire/plugin-i18next";
import "@sapphire/plugin-i18next/register";
import { ActivityType, Events } from "discord.js";
import { join } from "node:path";

@Injectable()
export class BotService {
    client: SapphireClient;

    constructor(
        private readonly logger: Logger,
        private readonly guildService: GuildService,
        private readonly languageService: LanguageService,
        moduleRef: ModuleRef
    ) {
        ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite);
        container.moduleRef = moduleRef;

        this.client = this.initClient();
    }

    private initClient(): SapphireClient {
        const client = new SapphireClient({
            intents: ["Guilds", "GuildMessages", "MessageContent"],
            loadMessageCommandListeners: true,
            baseUserDirectory: __dirname,
            i18n: {
                defaultName: "en",
                defaultLanguageDirectory: join(__dirname, "../language"),
                hmr: {
                    enabled: process.env.ENVIRONMENT === "development",
                },
                fetchLanguage: async (context: InternationalizationContext): Promise<string | null> => {
                    if (context.guild) {
                        const guildLanguage = await this.languageService.getGuildLanguage(context.guild.id);
                        return guildLanguage ?? context.interactionGuildLocale?.split("-")[0] ?? null;
                    }
                    if (context.user) {
                        const userLanguage = await this.languageService.getUserLanguage(context.user.id);
                        return userLanguage ?? context.interactionLocale?.split("-")[0] ?? null;
                    }
                    return null;
                },
            },
        });

        this.addEventListeners(client);

        client.login(process.env.DISCORD_TOKEN).catch((error) => {
            this.logger.error("Failed to login: " + error);
        });

        return client;
    }

    private addEventListeners(client: SapphireClient): void {
        client.on(Events.GuildAvailable, async (guild) => {
            await this.guildService.upsertGuildInDb(guild.id);
        });

        client.once(Events.ClientReady, () => {
            this.logger.debug(`Logged in as ${client.user?.tag}`);
            client.user?.setActivity({ name: "PSO", type: ActivityType.Playing });
            client.user?.setStatus("online");
        });

        client.on(Events.Error, (error) => {
            this.logger.error("Discord client error: " + error);
        });
    }
}
