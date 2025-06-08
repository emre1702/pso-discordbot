import { Logger } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

declare module "@sapphire/pieces" {
    interface Container {
        // Use NestJS ModuleRef to access NestJS services
        moduleRef: ModuleRef;
        nestLogger: Logger;
    }
}

declare module "discord.js" {
    export interface SlashCommandSubcommandGroupBuilder {
        addSetGuildSettingsSubcommands(guildSettingsService: GuildSettingService): ReturnType<this["addSubcommand"]>;
    }
    export interface SlashCommandSubcommandBuilder {
        addShowToPublicOption(): ReturnType<this["addBooleanOption"]>;
    }
    export interface CommandInteractionOptionResolver {
        getShowToPublic(): boolean;
    }
}

declare module "@sapphire/plugin-subcommands" {}

declare namespace NodeJS {
    interface ProcessEnv {
        DISCORD_TOKEN: string;
        ENVIRONMENT: "development" | "production";
        PORT: string;
        DATABASE_URL: string;
    }
}
