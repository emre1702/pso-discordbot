import { RoleService } from "@backend/discord/role/role.service";
import { TeamService } from "@backend/team/team.service";
import { Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { resolveKey } from "@sapphire/plugin-i18next";
import { PermissionFlagsBits } from "discord.js";

export class DeleteTeamCommand extends Command {
    constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "delete-team",
            description: "Delete a team",
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
            requiredClientPermissions: [PermissionFlagsBits.ManageRoles],
            requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
        });
    }

    override registerApplicationCommands(registry: Command.Registry): void {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((option) =>
                    option //
                        .setName("team-name")
                        .setDescription("The name of the team to delete")
                        .setRequired(true)
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        );
    }

    async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        const teamName = interaction.options.getString("team-name", true);
        const teamService = this.container.moduleRef.get(TeamService, { strict: false });

        try {
            const result = await teamService.deleteTeamByName(interaction.guildId!, teamName);

            if (result.count === 0) {
                await interaction.reply(await resolveKey(interaction, "team:delete:not-found", { teamName }));
                return;
            }
            await interaction.reply(await resolveKey(interaction, "team:delete:success", { teamName }));
        } catch (error) {
            this.container.nestLogger.error(`Failed to delete team: ${error}`);
            await interaction.reply(await resolveKey(interaction, "team:delete:error", { error: error instanceof Error ? error.message : error }));
        }

        const roleService = this.container.moduleRef.get(RoleService, { strict: false });
        await roleService.deleteRoleByName(interaction.guild!.roles, teamName);
    }
}
