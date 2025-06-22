import { FixtureService } from "@backend/fixture/fixture.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { isUserFacingError } from "@backend/utils/models/user-facing.error";
import { CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { InteractionContextType, MessageFlags, PermissionFlagsBits } from "discord.js";

export class FixtureCommand extends Subcommand {
    fixtureService: FixtureService;

    constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "fixture",
            aliases: ["fikstür"],
            requiredClientPermissions: [PermissionFlagsBits.ManageRoles],
            requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
            description: "Fixture for a season",
            subcommands: [
                {
                    name: "create",
                    chatInputRun: "chatInputCreateRun",
                    requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
                },
            ],
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
        });

        this.fixtureService = this.container.moduleRef.get(FixtureService, { strict: false });
    }

    registerApplicationCommands(registry: Subcommand.Registry): void {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addSubcommand((subcommand) =>
                    subcommand
                        //
                        .setName("create")
                        .setDescription("Create a random fixture for a whole season")
                        .addIntegerOption((option) =>
                            option //
                                .setName("season")
                                .setDescription("An upcoming season (not a running or finished season")
                                .setRequired(true)
                                .setMinValue(1)
                                .setMaxValue(120)
                        )
                        .addBooleanOption((option) =>
                            option //
                                .setName("home_and_away")
                                .setDescription(
                                    "Whether to create home and away matches. Set to false to create only one match per team combination"
                                )
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option //
                                .setName("earliest_time")
                                .setDescription("Earliest time of the matches in UTC (optional, defaults to 18:00 UTC, HH:mm format)")
                                .setRequired(false)
                                .setMaxLength(5)
                                .setMinLength(5)
                        )
                        .addNumberOption((option) =>
                            option //
                                .setName("days_between_weeks")
                                .setDescription("Number of days between match-weeks (optional, defaults to 3)")
                                .setRequired(false)
                                .setMinValue(1)
                                .setMaxValue(7)
                        )
                        .addNumberOption((option) =>
                            option //
                                .setName("minutes_between_matches")
                                .setDescription("Number of minutes between matches (optional, defaults to 30 minutes)")
                                .setRequired(false)
                                .setMinValue(0)
                                .setMaxValue(240)
                        )
                        .addShowToPublicOption()
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
                .setContexts(InteractionContextType.Guild)
        );
    }

    async chatInputCreateRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await getTFunction(interaction);
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

        try {
            const season = interaction.options.getInteger("season", true);
            const homeAndAway = interaction.options.getBoolean("home_and_away", true);
            const earliestTime = interaction.options.getString("earliest_time");
            const daysBetweenWeeks = interaction.options.getInteger("days_between_weeks");
            const minutesBetweenMatches = interaction.options.getInteger("minutes_between_matches");
            await this.fixtureService.createFixture(interaction.guildId!, interaction.user.id, {
                season,
                homeAndAway,
                earliestTime,
                daysBetweenWeeks,
                minutesBetweenMatches,
            });

            await interaction.editReply({ content: tFunction("fixture:create:success", { season }) });
        } catch (error) {
            if (!isUserFacingError(error)) {
                this.container.nestLogger.error(`Failed to create fixture: ${error}`);
            }
            await interaction.editReply({
                content: tFunction("fixture:create:error", {
                    error: error instanceof Error ? error.message : String(error),
                }),
            });
            return;
        }
    }
}
