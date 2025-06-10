import { GuildSettingService } from "@backend/setting/guild-setting.service";
import { SettingValueType } from "@backend/setting/setting-value.type";
import {
    APIApplicationCommandOptionChoice,
    CommandInteractionOptionResolver,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
} from "discord.js";

SlashCommandSubcommandGroupBuilder.prototype.addSetGuildSettingsSubcommands = function (
    guildSettingsService: GuildSettingService
): ReturnType<SlashCommandSubcommandGroupBuilder["addSubcommand"]> {
    const guildSettings = guildSettingsService.getAllConfigs();

    return Object.values(guildSettings).reduce(
        (builder, setting) =>
            (builder as SlashCommandSubcommandGroupBuilder).addSubcommand((subcommand) =>
                subcommand
                    .setName(setting.name)
                    .setDescription(setting.description)
                    .addValueOptionByType(setting.type, setting.choices)
                    .addShowToPublicOption()
            ),
        this as SlashCommandSubcommandGroupBuilder
    );
};

SlashCommandSubcommandBuilder.prototype.addValueOptionByType = function (
    type: SettingValueType,
    choices?: APIApplicationCommandOptionChoice<string>[]
): ReturnType<
    | SlashCommandSubcommandBuilder["addStringOption"]
    | SlashCommandSubcommandBuilder["addIntegerOption"]
    | SlashCommandSubcommandBuilder["addBooleanOption"]
    | SlashCommandSubcommandBuilder["addChannelOption"]
    | SlashCommandSubcommandBuilder["addRoleOption"]
    | SlashCommandSubcommandBuilder["addUserOption"]
> {
    switch (type) {
        case "string":
            return this.addStringOption((option) => {
                const optionBuilder = option.setName("value").setDescription("The value to set").setRequired(true);
                if (choices) {
                    return optionBuilder.addChoices(...choices);
                }
                return optionBuilder;
            });
        case "number":
            return this.addIntegerOption((option) => option.setName("value").setDescription("The value to set").setRequired(true));
        case "boolean":
            return this.addBooleanOption((option) => option.setName("value").setDescription("The boolean value to set").setRequired(true));
        case "channel":
            return this.addChannelOption((option) => option.setName("value").setDescription("The channel to set").setRequired(true));
        case "role":
            return this.addRoleOption((option) => option.setName("value").setDescription("The role to set").setRequired(true));
        case "user":
            return this.addUserOption((option) => option.setName("value").setDescription("The user to set").setRequired(true));
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
};

function getRequiredValueByType(this: CommandInteractionOptionResolver, type: "string"): string;
function getRequiredValueByType(this: CommandInteractionOptionResolver, type: "number"): number;
function getRequiredValueByType(this: CommandInteractionOptionResolver, type: "boolean"): boolean;
function getRequiredValueByType(this: CommandInteractionOptionResolver, type: "channel"): string; // Channel ID
function getRequiredValueByType(this: CommandInteractionOptionResolver, type: "role"): string; // Role ID
function getRequiredValueByType(this: CommandInteractionOptionResolver, type: "user"): string; // User ID
function getRequiredValueByType(this: CommandInteractionOptionResolver, type: SettingValueType): unknown {
    switch (type) {
        case "string":
            return this.getString("value", true);
        case "number":
            return this.getInteger("value", true);
        case "boolean":
            return this.getBoolean("value", true);
        case "channel":
            return this.getChannel("value", true).id;
        case "role":
            return this.getRole("value", true).id;
        case "user":
            return this.getUser("value", true).id;
        default:
            throw new Error(`Unsupported type: ${type}`);
    }
}

CommandInteractionOptionResolver.prototype.getRequiredValueByType = getRequiredValueByType;

export {};
