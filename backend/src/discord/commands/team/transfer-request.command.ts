import { ToTeamTransferRequestService } from "@backend/team/to-team-transfer-request.service";
import { ToUserTransferRequestService } from "@backend/team/to-user-transfer-request.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { isUserFacingError } from "@backend/utils/models/user-facing.error";
import { CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { MessageFlags, PermissionFlagsBits, roleMention, userMention } from "discord.js";

export class TransferRequestCommand extends Subcommand {
    private readonly toTeamTransferService: ToTeamTransferRequestService;
    private readonly toUserTransferService: ToUserTransferRequestService;

    constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "transfer-request",
            description: "Manage team transfer requests",
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
            subcommands: [
                {
                    name: "send-to-team",
                    chatInputRun: "chatInputSendToTeamRun",
                    requiredClientPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageRoles],
                },
                {
                    name: "send-to-user",
                    chatInputRun: "chatInputSendToUserRun",
                    requiredClientPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageRoles],
                },
                {
                    name: "respond-user",
                    chatInputRun: "chatInputRespondUserRun",
                    requiredClientPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageRoles],
                },
                {
                    name: "respond-team",
                    chatInputRun: "chatInputRespondTeamRun",
                    requiredClientPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageRoles],
                },
                {
                    name: "delete-to-team",
                    chatInputRun: "chatInputDeleteToTeamRun",
                    requiredClientPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageRoles],
                },
                {
                    name: "delete-to-user",
                    chatInputRun: "chatInputDeleteToUserRun",
                    requiredClientPermissions: [PermissionFlagsBits.SendMessages, PermissionFlagsBits.ManageRoles],
                },
            ],
        });
        this.toTeamTransferService = this.container.moduleRef.get(ToTeamTransferRequestService, { strict: false });
        this.toUserTransferService = this.container.moduleRef.get(ToUserTransferRequestService, { strict: false });
    }

    override registerApplicationCommands(registry: Subcommand.Registry): void {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("send-to-team")
                        .setDescription("Send a transfer request to a team")
                        .addRoleOption((option) =>
                            option //
                                .setName("team")
                                .setDescription("The team to send the transfer request to")
                                .setRequired(true)
                        )
                        .addNumberOption((option) =>
                            option //
                                .setName("playtime")
                                .setDescription("Your playtime in PSO")
                                .setRequired(false)
                                .setMinValue(0)
                                .setMaxValue(99999)
                        )
                        .addStringOption((option) =>
                            option //
                                .setName("positions")
                                .setDescription("Your preferred positions in the team")
                                .setRequired(false)
                                .setMaxLength(50)
                        )
                        .addStringOption((option) =>
                            option //
                                .setName("comment")
                                .setDescription("Additional comment for the team")
                                .setRequired(false)
                                .setMaxLength(500)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("send-to-user")
                        .setDescription("Send a transfer request to a user")
                        .addUserOption((option) =>
                            option //
                                .setName("user")
                                .setDescription("The user to send the transfer request to")
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("respond-user")
                        .setDescription("Respond to a transfer request from a user")
                        .addUserOption((option) =>
                            option //
                                .setName("user")
                                .setDescription("The user who sent the transfer request")
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option //
                                .setName("response")
                                .setDescription("Your response to the transfer request")
                                .setRequired(true)
                                .addChoices({ name: "Accept", value: "accepted" }, { name: "Reject", value: "rejected" })
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("respond-team")
                        .setDescription("Respond to a transfer request from a team")
                        .addRoleOption((option) =>
                            option //
                                .setName("team")
                                .setDescription("The team that sent the transfer request")
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option //
                                .setName("response")
                                .setDescription("Your response to the transfer request")
                                .setRequired(true)
                                .addChoices({ name: "Accept", value: "accepted" }, { name: "Reject", value: "rejected" })
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("delete-to-team")
                        .setDescription("Delete your transfer request to a team")
                        .addRoleOption((option) =>
                            option //
                                .setName("team")
                                .setDescription("The team to delete the transfer request for")
                                .setRequired(true)
                        )
                )
                .addSubcommand((subcommand) =>
                    subcommand //
                        .setName("delete-to-user")
                        .setDescription("Delete your teams transfer request to a user")
                        .addUserOption((option) =>
                            option //
                                .setName("user")
                                .setDescription("The user to delete the transfer request for")
                                .setRequired(true)
                        )
                )
        );
    }

    async chatInputSendToTeamRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await getTFunction(interaction);
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        try {
            const teamRole = interaction.options.getRole("team", true);
            const playtime = interaction.options.getNumber("playtime");
            const positions = interaction.options.getString("positions");
            const comment = interaction.options.getString("comment");
            await this.toTeamTransferService.createTransferRequestToTeam(interaction.user.id, interaction.guildId!, teamRole.id, {
                playtime,
                positions,
                comment,
            });
            await interaction.editReply({
                content: tFunction("transfer:send-to-team:success", { team: roleMention(teamRole.id) }),
            });
        } catch (error) {
            if (!isUserFacingError(error)) {
                this.container.nestLogger.error(error);
            }
            await interaction.editReply({
                content: tFunction("transfer:send-to-team:error", { error: error instanceof Error ? error.message : error }),
            });
        }
    }

    async chatInputSendToUserRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await getTFunction(interaction);
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        try {
            const targetUser = interaction.options.getUser("user", true);
            await this.toUserTransferService.createTransferRequestToUser(interaction.user.id, targetUser.id, interaction.guildId!);
            await interaction.editReply({
                content: tFunction("transfer:send-to-user:success", { user: userMention(targetUser.id) }),
            });
        } catch (error) {
            if (!isUserFacingError(error)) {
                this.container.nestLogger.error(error);
            }
            await interaction.editReply({
                content: tFunction("transfer:send-to-user:error", { error: error instanceof Error ? error.message : error }),
            });
        }
    }

    async chatInputRespondUserRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await getTFunction(interaction);
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        try {
            const user = interaction.options.getUser("user", true);
            const response = interaction.options.getString("response", true) as "accepted" | "rejected";
            await this.toTeamTransferService.respondToTeamTransferRequest(interaction.user.id, interaction.guildId!, user.id, response);
            await interaction.editReply({
                content: tFunction("transfer:respond-to-team-request:success", { user: userMention(user.id), response }),
            });
        } catch (error) {
            if (!isUserFacingError(error)) {
                this.container.nestLogger.error(error);
            }
            await interaction.editReply({
                content: tFunction("transfer:respond-to-team-request:error", { error: error instanceof Error ? error.message : error }),
            });
        }
    }

    async chatInputRespondTeamRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await getTFunction(interaction);
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        try {
            const teamRole = interaction.options.getRole("team", true);
            const response = interaction.options.getString("response", true) as "accepted" | "rejected";
            await this.toUserTransferService.respondToUserTransferRequest(interaction.user.id, interaction.guildId!, teamRole.id, response);
            await interaction.editReply({
                content: tFunction("transfer:respond-to-user-request:success", { team: roleMention(teamRole.id) }),
            });
        } catch (error) {
            if (!isUserFacingError(error)) {
                this.container.nestLogger.error(error);
            }
            await interaction.editReply({
                content: tFunction("transfer:respond-to-user-request:error", { error: error instanceof Error ? error.message : error }),
            });
        }
    }

    async chatInputDeleteToTeamRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await getTFunction(interaction);
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        try {
            const teamRole = interaction.options.getRole("team", true);
            await this.toTeamTransferService.delete(interaction.user.id, interaction.guildId!, teamRole.id);
            await interaction.editReply({
                content: tFunction("transfer:delete-to-team:success", { team: roleMention(teamRole.id) }),
            });
        } catch (error) {
            if (!isUserFacingError(error)) {
                this.container.nestLogger.error(error);
            }
            await interaction.editReply({
                content: tFunction("transfer:delete-to-team:error", { error: error instanceof Error ? error.message : error }),
            });
        }
    }

    async chatInputDeleteToUserRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await getTFunction(interaction);
        await interaction.deferReply({ flags: MessageFlags.Ephemeral });
        try {
            const user = interaction.options.getUser("user", true);
            await this.toUserTransferService.delete(interaction.user.id, interaction.guildId!, user.id);
            await interaction.editReply({
                content: tFunction("transfer:delete-to-user:success", { user: userMention(user.id) }),
            });
        } catch (error) {
            if (!isUserFacingError(error)) {
                this.container.nestLogger.error(error);
            }
            await interaction.editReply({
                content: tFunction("transfer:delete-to-user:error", { error: error instanceof Error ? error.message : error }),
            });
        }
    }
}
