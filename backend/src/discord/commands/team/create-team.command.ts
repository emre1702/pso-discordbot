import { RoleService } from "@backend/discord/role/role.service";
import { TeamService } from "@backend/team/team.service";
import { Logger } from "@nestjs/common";
import { Awaitable, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { resolveKey } from "@sapphire/plugin-i18next";
import { ColorResolvable, GuildPremiumTier, PermissionFlagsBits } from "discord.js";

export class CreateTeamCommand extends Command {
    constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "create-team",
            description: "Create a new team",
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
            requiredClientPermissions: [PermissionFlagsBits.ManageRoles],
            requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
        });
    }

    override registerApplicationCommands(registry: Command.Registry): Awaitable<void> {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((option) =>
                    option //
                        .setName("name")
                        .setDescription("The team name (has to be unique)")
                        .setRequired(true)
                        .setMaxLength(50)
                        .setMinLength(3)
                )
                .addStringOption((option) =>
                    option //
                        .setName("short-name")
                        .setDescription("The team short name (has to be unique)")
                        .setRequired(true)
                        .setMaxLength(5)
                        .setMinLength(2)
                )
                .addUserOption((option) =>
                    option //
                        .setName("owner")
                        .setDescription("The team owner")
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option //
                        .setName("color")
                        .setDescription("The team color (in hex format, e.g. #FF5733)")
                        .setRequired(false)
                        .setMinLength(4)
                        .setMaxLength(7)
                )

                .addAttachmentOption((option) =>
                    option //
                        .setName("icon")
                        .setDescription("The team icon (optional - only with boost level 2 or highter)")
                        .setRequired(false)
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        );
    }

    async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply();

        const teamName = interaction.options.getString("name", true);
        const shortName = interaction.options.getString("short-name", true);
        const owner = interaction.options.getUser("owner", true);
        const color = interaction.options.getString("color") as ColorResolvable | null;
        let icon = interaction.options.getAttachment("icon");

        const teamService = this.container.moduleRef.get(TeamService, { strict: false });
        const roleService = this.container.moduleRef.get(RoleService, { strict: false });
        const logger = this.container.moduleRef.get(Logger, { strict: false });

        const alreadyCreatedTeam = await teamService.getTeamByNameOrShortName(interaction.guildId!, teamName, shortName);
        if (alreadyCreatedTeam) {
            await interaction.followUp(await resolveKey(interaction, "team:create:exists", { teamName: alreadyCreatedTeam.name }));
            return;
        }

        let team: Awaited<ReturnType<TeamService["addTeam"]>>;
        try {
            team = await teamService.addTeam(interaction.guildId!, teamName, shortName, owner.id, interaction.user.id);
            await interaction.followUp(await resolveKey(interaction, "team:create:success", { teamName: team.name }));
        } catch (error) {
            logger.error(`Failed to create team: ${error}`);
            await interaction.followUp(await resolveKey(interaction, "team:create:error", { error: error instanceof Error ? error.message : "Unknown error" }));
            return;
        }

        const alreadyCreatedRole = (await interaction.guild!.roles.fetch()).find((role) => role.name.toLowerCase() === team.name.toLowerCase());
        if (alreadyCreatedRole) {
            await interaction.followUp(await resolveKey(interaction, "role:create:exists", { roleName: alreadyCreatedRole.name }));
            return;
        }

        if (icon && interaction.guild!.premiumTier < GuildPremiumTier.Tier2) {
            await interaction.followUp(await resolveKey(interaction, "role:create:icon-requirement"));
            icon = null; // Reset icon if the guild does not meet the requirements
        }

        try {
            const role = await roleService.createTeamRole(interaction.guild!.roles, team.name, color, icon);
            await interaction.followUp(await resolveKey(interaction, "role:create:success", { roleName: role.name }));

            // Assign the role to the team owner
            await interaction.guild!.members.fetch(owner.id).then((member) => member.roles.add(role, "Owner of the team " + team.name));
        } catch (error) {
            logger.error(`Failed to create role for team: ${error}`);
            await interaction.followUp(await resolveKey(interaction, "role:create:error", { error: error instanceof Error ? error.message : "Unknown error" }));
            return;
        }
    }
}
