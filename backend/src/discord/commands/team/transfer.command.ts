import { TransferService } from "@backend/team/transfer.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { MessageFlags, PermissionFlagsBits } from "discord.js";

export class TransferRequestCommand extends Subcommand {
    private readonly transferService: TransferService;

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
                    requiredClientPermissions: [PermissionFlagsBits.ManageRoles],
                },
            ],
        });
        this.transferService = this.container.moduleRef.get(TransferService, { strict: false });
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
            await this.transferService.createTransferRequestToTeam(interaction.user.id, interaction.guildId!, teamRole.name, {
                playtime,
                positions,
                comment,
            });
            await interaction.editReply({
                content: tFunction("transfer:send-to-team:success", { team: teamRole.name }),
            });
        } catch (error) {
            this.container.nestLogger.error(error);
            await interaction.editReply({
                content: tFunction("transfer:send-to-team:error", { error: error instanceof Error ? error.message : error }),
            });
        }
    }
}
