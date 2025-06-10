import { RoleService } from "@backend/discord/role/role.service";
import { TeamService } from "@backend/team/team.service";
import { CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { fetchT, resolveKey } from "@sapphire/plugin-i18next";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { ColorResolvable, GuildPremiumTier, InteractionContextType, MessageFlags, PermissionFlagsBits } from "discord.js";

export class ManageTeamCommand extends Subcommand {
    constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "team",
            description: "Manage the teams",
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
            requiredClientPermissions: [PermissionFlagsBits.ManageRoles],
            requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
            subcommands: [
                {
                    name: "create",
                    chatInputRun: "chatInputCreateRun",
                    requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
                    requiredClientPermissions: [PermissionFlagsBits.ManageRoles],
                },
            ],
        });
    }

    override registerApplicationCommands(registry: Subcommand.Registry): void {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("create")
                        .setDescription("Create a new team")
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
                        .addShowToPublicOption()
                )
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("delete")
                        .setDescription("Delete a team")
                        .addRoleOption((option) =>
                            option //
                                .setName("team")
                                .setDescription("The team to delete")
                                .setRequired(true)
                        )
                        .addShowToPublicOption()
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
                .setContexts(InteractionContextType.Guild)
        );
    }

    async chatInputCreateRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

        const teamName = interaction.options.getString("name", true);
        const shortName = interaction.options.getString("short-name", true);
        const owner = interaction.options.getUser("owner", true);
        const color = interaction.options.getString("color") as ColorResolvable | null;
        let icon = interaction.options.getAttachment("icon");

        const teamService = this.container.moduleRef.get(TeamService, { strict: false });
        const roleService = this.container.moduleRef.get(RoleService, { strict: false });

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
            this.container.nestLogger.error(`Failed to create team: ${error}`);
            await interaction.followUp(
                await resolveKey(interaction, "team:create:error", { error: error instanceof Error ? error.message : "Unknown error" })
            );
            return;
        }

        const alreadyCreatedRole = (await interaction.guild!.roles.fetch()).find(
            (role) => role.name.toLowerCase() === team.name.toLowerCase()
        );
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
            this.container.nestLogger.error(`Failed to create role for team: ${error}`);
            await interaction.followUp(
                await resolveKey(interaction, "role:create:error", { error: error instanceof Error ? error.message : "Unknown error" })
            );
            return;
        }
    }

    async chatInputDeleteRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });
        const tFunction = await fetchT(interaction);

        const teamRole = interaction.options.getRole("team", true);
        const teamService = this.container.moduleRef.get(TeamService, { strict: false });

        try {
            const result = await teamService.deleteTeamByName(interaction.guildId!, teamRole.name);

            if (result.count === 0) {
                await interaction.editReply(tFunction("team:delete:not-found", { teamName: teamRole.name }));
                return;
            }
            await interaction.editReply(tFunction("team:delete:success", { teamName: teamRole.name }));
        } catch (error) {
            this.container.nestLogger.error(`Failed to delete team: ${error}`);
            await interaction.editReply(tFunction("team:delete:error", { error: error instanceof Error ? error.message : error }));
        }

        const roleService = this.container.moduleRef.get(RoleService, { strict: false });
        await roleService.deleteRoleByName(interaction.guild!.roles, teamRole.name);
    }
}
