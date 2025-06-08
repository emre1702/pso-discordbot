import { GuildSettingService } from "@backend/setting/guild-setting.service";
import { SlashCommandSubcommandGroupBuilder } from "discord.js";

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
                    .addStringOption((option) => {
                        let optionBuilder = option.setName("value").setDescription(`Set the value for ${setting.name}`).setRequired(true);
                        if (setting.choices) {
                            optionBuilder = optionBuilder.addChoices(...setting.choices);
                        }
                        return optionBuilder;
                    })
                    .addShowToPublicOption()
            ),
        this as SlashCommandSubcommandGroupBuilder
    );
};

export {};
