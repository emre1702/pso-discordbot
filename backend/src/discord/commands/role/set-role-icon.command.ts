import { Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { resolveKey } from "@sapphire/plugin-i18next";
import { Awaitable, PermissionFlagsBits } from "discord.js";

export class SetRoleIconCommand extends Command {
    constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "set-role-icon",
            description: "Set the icon for a role",
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
        });
    }

    override registerApplicationCommands(registry: Command.Registry): Awaitable<void> {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addRoleOption((option) =>
                    option //
                        .setName("role")
                        .setDescription("The role to set the icon for")
                        .setRequired(true)
                )
                .addAttachmentOption((option) =>
                    option //
                        .setName("icon")
                        .setDescription("The icon to set for the role")
                        .setRequired(true)
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        );
    }

    async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        const role = interaction.options.getRole("role", true);
        const icon = interaction.options.getAttachment("icon", true);

        interaction.guild?.roles.edit(role.id, {
            icon: icon.url,
        });
        await interaction.reply(await resolveKey(interaction, "role:set-icon:success", { roleName: role.name }));
    }
}
