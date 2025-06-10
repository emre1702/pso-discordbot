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
        addValueOptionByType(
            type: SettingValueType,
            choices?: APIApplicationCommandOptionChoice<string>[]
        ): ReturnType<this["addStringOption"] | this["addIntegerOption"] | this["addChannelOption"]>;
    }
    export interface CommandInteractionOptionResolver {
        getShowToPublic(): boolean;
        getRequiredValueByType(type: SettingValueType): unknown;
        getRequiredValueByType(type: "string"): string;
        getRequiredValueByType(type: "number"): number;
        getRequiredValueByType(type: "boolean"): boolean;
        getRequiredValueByType(type: "channel"): string; // Channel ID
        getRequiredValueByType(type: "role"): string; // Role ID
        getRequiredValueByType(type: "user"): string; // User ID
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
