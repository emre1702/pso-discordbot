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
                .addRoleOption((option) =>
                    option //
                        .setName("team-role")
                        .setDescription("The role of the team to delete")
                        .setRequired(true)
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        );
    }

    async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        const teamRole = interaction.options.getRole("team-role", true);
        const teamService = this.container.moduleRef.get(TeamService, { strict: false });

        try {
            const result = await teamService.deleteTeam(teamRole.id);

            if (!result) {
                await interaction.reply(await resolveKey(interaction, "team:delete:not-found", { teamName: teamRole.name }));
                return;
            }
            await interaction.reply(await resolveKey(interaction, "team:delete:success", { teamName: result.name }));
        } catch (error) {
            this.container.nestLogger.error(`Failed to delete team: ${error}`);
            await interaction.reply(
                await resolveKey(interaction, "team:delete:error", { error: error instanceof Error ? error.message : error })
            );
        }

        await interaction.guild!.roles.delete(teamRole.id, "Team deleted by command");
    }
}
