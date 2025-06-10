import { guild_setting, language } from "@prisma/client";
import { APIApplicationCommandOptionChoice } from "discord.js";
import { SettingValueType } from "./setting-value.type";

interface SettingConfig<T = SettingValueType> {
    setting: guild_setting;
    name: guild_setting | string;
    description: string;
    type: T;
    defaultValue?: string | null;
    choices?: APIApplicationCommandOptionChoice<string>[];
}

const guildSettingsRecord: Record<guild_setting, SettingConfig> = {
    [guild_setting.language]: {
        setting: guild_setting.language,
        name: guild_setting.language,
        description: "The language used for the bot in this guild",
        type: "string",
        choices: [
            { name: "English", value: language.en },
            { name: "Turkish", value: language.tr },
        ],
    },
    [guild_setting.scoreboard_channel]: {
        setting: guild_setting.scoreboard_channel,
        name: guild_setting.scoreboard_channel,
        description: "The channel where the scoreboard is posted",
        type: "channel",
        defaultValue: null,
    },
};

export default guildSettingsRecord;
