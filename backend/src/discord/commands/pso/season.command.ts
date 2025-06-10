import { isInvalidDateRangeError } from "@backend/season/invalid-date-range.error";
import { SeasonService } from "@backend/season/season.service";
import { CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { fetchT, resolveKey } from "@sapphire/plugin-i18next";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { MessageFlags, PermissionFlagsBits } from "discord.js";

export class SeasonCommand extends Subcommand {
    seasonService: SeasonService;

    constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "season",
            description: "Manage PSO seasons.",
            subcommands: [
                {
                    name: "create",
                    chatInputRun: "chatInputCreate",
                    requiredUserPermissions: [PermissionFlagsBits.Administrator],
                },
                {
                    name: "delete",
                    chatInputRun: "chatInputDelete",
                    requiredUserPermissions: [PermissionFlagsBits.Administrator],
                },
                {
                    name: "list",
                    chatInputRun: "chatInputList",
                },
                {
                    name: "edit",
                    chatInputRun: "chatInputEdit",
                    requiredUserPermissions: [PermissionFlagsBits.Administrator],
                },
            ],
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
        });

        this.seasonService = this.container.moduleRef.get(SeasonService, { strict: false });
    }

    registerApplicationCommands(registry: Subcommand.Registry): void {
        registry.registerChatInputCommand((builder) =>
            builder
                .setName(this.name)
                .setDescription(this.description)
                .addSubcommand((subcommand) =>
                    subcommand
                        .setName("create")
                        .setDescription("Create a new season")
                        .addStringOption((option) =>
                            option.setName("start_date").setDescription("The start date of the season (DD.MM.YYYY)").setRequired(true)
                        )
                        .addStringOption((option) =>
                            option.setName("end_date").setDescription("The end date of the season (DD.MM.YYYY)").setRequired(false)
                        )
                        .addShowToPublicOption()
                )
                .addSubcommand((subcommand) => subcommand.setName("list").setDescription("List all seasons").addShowToPublicOption())
                .addSubcommand((subcommand) => subcommand.setName("edit").setDescription("Edit an existing season"))
        );
    }

    async chatInputCreate(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

        let startDate: Date;
        try {
            const fromDateString = interaction.options.getString("start_date", true);
            const [fromDateDay, fromDateMonth, fromDateYear] = fromDateString.split(".").map(Number);
            startDate = new Date(fromDateYear, fromDateMonth - 1, fromDateDay);
        } catch {
            await interaction.editReply({
                content: await resolveKey(interaction, "pso:season:create:invalid-start-date-format"),
            });
            return;
        }

        let endDate: Date | null = null;
        try {
            const toDateString = interaction.options.getString("end_date");
            if (toDateString) {
                const [toDateDay, toDateMonth, toDateYear] = toDateString.split(".").map(Number);
                endDate = new Date(toDateYear, toDateMonth - 1, toDateDay);
                if (endDate < startDate) {
                    await interaction.editReply({
                        content: "The end date cannot be before the start date.",
                    });
                    return;
                }
            }
        } catch {
            await interaction.editReply({
                content: await resolveKey(interaction, "pso:season:create:invalid-end-date-format"),
            });
            return;
        }

        try {
            const season = await this.seasonService.createSeason(interaction.guildId!, startDate, endDate);
            await interaction.editReply({
                content: await resolveKey(interaction, "pso:season:create:success", {
                    season,
                    startDate: startDate.toLocaleDateString(),
                    endDate: endDate ? endDate.toLocaleDateString() : "No end date",
                }),
            });
        } catch (error) {
            if (!isInvalidDateRangeError(error)) {
                this.container.nestLogger.error("Error creating season", error);
            }
            await interaction.editReply({
                content: await resolveKey(interaction, "pso:season:create:error", {
                    error: error instanceof Error ? error.message : "Unknown error",
                }),
            });
        }
    }

    async chatInputList(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const tFunction = await fetchT(interaction);
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

        try {
            const seasons = await this.seasonService.getAllSeasons(interaction.guildId!);
            if (seasons.length === 0) {
                await interaction.editReply({
                    content: tFunction("pso:season:list:no-seasons"),
                });
                return;
            }

            const seasonList = seasons
                .map(
                    (season) =>
                        `${tFunction("pso:season:list:season")} ${season.season}: ${season.from_date?.toLocaleDateString() ?? tFunction("pso:season:list:no-start-date")} - ${
                            season.to_date?.toLocaleDateString() ?? tFunction("pso:season:list:no-end-date")
                        } - ${season.champion_team_name ? tFunction("pso:season:list:champion", { team: season.champion_team_name }) : tFunction("pso:season:list:no-champion")}`
                )
                .join("\n");

            await interaction.editReply({
                content: tFunction("pso:season:list:success", { seasons: seasonList }),
            });
        } catch (error) {
            this.container.nestLogger.error("Error listing seasons. " + error);
            await interaction.editReply({
                content: tFunction("pso:season:list:error", {
                    error: error instanceof Error ? error.message : "Unknown error",
                }),
            });
        }
    }

    async chatInputEdit(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        await interaction.deferReply({ ephemeral: true });
    }
}
