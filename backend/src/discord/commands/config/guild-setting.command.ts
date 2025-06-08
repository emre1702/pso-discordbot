import { GuildSettingService } from "@backend/setting/guild-setting.service";
import guildSettingsRecord from "@backend/setting/guild-settings";
import { guild_setting } from "@prisma/client";
import { CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { Subcommand, SubcommandMappingGroup } from "@sapphire/plugin-subcommands";
import { APIApplicationCommandOptionChoice, MessageFlags, PermissionFlagsBits } from "discord.js";

export class ServerSettingCommand extends Subcommand {
    private readonly guildSettingService: GuildSettingService;

    constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "server-setting",
            description: "Server settings management",
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
            subcommands: [
                {
                    name: "list",
                    chatInputRun: "chatInputListRun",
                },
                {
                    name: "get",
                    chatInputRun: "chatInputGetRun",
                },
                {
                    name: "set",
                    type: "group",
                    entries: [],
                },
                {
                    name: "reset",
                    chatInputRun: "chatInputResetRun",
                    requiredUserPermissions: [PermissionFlagsBits.ManageGuild],
                },
            ],
        });
        this.guildSettingService = this.container.moduleRef.get(GuildSettingService, { strict: false });

        (this.parsedSubcommandMappings.find((mapping) => mapping.name === "set") as SubcommandMappingGroup).entries = Object.values(
            this.guildSettingService.getAllConfigs()
        ).map((setting) => ({
            name: setting.name,
            chatInputRun: "chatInputSetRun",
            requiredUserPermissions: [PermissionFlagsBits.ManageGuild],
        }));
    }

    override registerApplicationCommands(registry: Subcommand.Registry): void {
        const guildSettings = this.guildSettingService.getAllConfigs();
        const choices: APIApplicationCommandOptionChoice<string>[] = Object.entries(guildSettings).map(([key, setting]) => ({
            name: setting.name,
            value: key,
        }));

        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("list")
                        .setDescription("List all server settings")
                        .addShowToPublicOption()
                )
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("get")
                        .setDescription("Get a specific server setting")
                        .addStringOption((option) =>
                            option //
                                .setName("key")
                                .setDescription("The key of the setting to get")
                                .setRequired(true)
                                .addChoices(choices)
                        )
                )
                .addSubcommandGroup((group) =>
                    group
                        .setName("set")
                        .setDescription("Set a specific server setting")
                        .addSetGuildSettingsSubcommands(this.guildSettingService)
                )

                /* .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("set")
                        .setDescription("Set a specific guild setting")
                        .grou
                        .addStringOption((option) =>
                            option //
                                .setName("key")
                                .setDescription("The key of the setting to set")
                                .setRequired(true)
                                .addChoices(choices)
                        )
                        .addStringOption((option) =>
                            option //
                                .setName("value")
                                .setDescription("The value to set for the setting")
                                .setRequired(true)
                        )
                )*/
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("reset")
                        .setDescription("Reset a specific server setting to default")
                        .addStringOption((option) =>
                            option //
                                .setName("key")
                                .setDescription("The key of the setting to reset")
                                .setRequired(true)
                        )
                )
        );
    }

    async chatInputListRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

        const guildSettings = await this.guildSettingService.getAll(interaction.guildId!);
        const tFunction = await fetchT(interaction);

        const settingsList = Object.entries(guildSettings)
            .map(([name, setting]) => `${name}: ${setting ?? tFunction("config:guild-setting:not-set")}`)
            .join("\n");

        await interaction.editReply(tFunction("config:guild-setting:list") + `\n${settingsList}`);
    }

    async chatInputGetRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

        const tFunction = await fetchT(interaction);

        const key = interaction.options.getString("key", true);
        const setting = this.guildSettingService.getAllConfigs()[key] as (typeof guildSettingsRecord)[guild_setting] | undefined;
        if (!setting) {
            await interaction.editReply(tFunction("config:guild-setting:not-found", { key }));
            return;
        }

        const value = await this.guildSettingService.get(interaction.guildId!, setting.setting);
        await interaction.editReply(
            tFunction("config:guild-setting:get", { key: setting.name, value: value ?? tFunction("config:guild-setting:not-set") })
        );
    }

    async chatInputSetRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

        const tFunction = await fetchT(interaction);

        const key = interaction.options.getSubcommand(true);
        const setting = this.guildSettingService.getAllConfigs()[key];
        if (!setting) {
            await interaction.editReply(tFunction("config:guild-setting:not-found", { key }));
            return;
        }

        const value = interaction.options.getString("value", true);
        await this.guildSettingService.set(interaction.guildId!, setting.setting, value);

        const displayedValue = setting.choices?.find((choice) => choice.value === value)?.name ?? value;
        await interaction.editReply(tFunction("config:guild-setting:set", { key: setting.name, value: displayedValue }));
    }
}
