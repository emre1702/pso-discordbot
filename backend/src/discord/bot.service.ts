import { Logger } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { ApplicationCommandRegistries, container, RegisterBehavior, SapphireClient } from "@sapphire/framework";
import "@sapphire/plugin-i18next/register";
import { ActivityType } from "discord.js";

export class BotService {
    client: SapphireClient;

    constructor(
        private readonly logger: Logger,
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
                defaultName: "en-US",
                hmr: {
                    enabled: true,
                },
            },
        });

        client.once("ready", () => {
            this.logger.debug(`Logged in as ${client.user?.tag}`);
            client.user?.setActivity({ name: "PSO", type: ActivityType.Playing });
            client.user?.setStatus("online");
        });

        client.on("error", (error) => {
            this.logger.error("Discord client error: " + error);
        });

        client.login(process.env["DISCORD_TOKEN"]).catch((error) => {
            this.logger.error("Failed to login: " + error);
        });

        return client;
    }
}
