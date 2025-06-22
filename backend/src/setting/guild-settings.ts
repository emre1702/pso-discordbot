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
    },
    [guild_setting.fixture_channel]: {
        setting: guild_setting.fixture_channel,
        name: guild_setting.fixture_channel,
        description: "The channel where the fixture is posted",
        type: "channel",
    },
    [guild_setting.transfer_channel]: {
        setting: guild_setting.transfer_channel,
        name: guild_setting.transfer_channel,
        description: "The channel where transfers are posted",
        type: "channel",
    },
    [guild_setting.delete_transfer_requests_after_days]: {
        setting: guild_setting.delete_transfer_requests_after_days,
        name: "delete_transfer_req_after_days",
        description: "Days (after response) transfer requests are deleted (so a new transfer request can be sent)",
        type: "number",
    },
    [guild_setting.max_players_per_team]: {
        setting: guild_setting.max_players_per_team,
        name: guild_setting.max_players_per_team,
        description: "The maximum number of players allowed in a team",
        type: "number",
    },
};

export default guildSettingsRecord;
