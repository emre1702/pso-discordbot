import { MatchService } from "@backend/match/match.service";
import { isNoActiveSeasonError } from "@backend/match/no-active-season.error";
import { TeamService } from "@backend/team/team.service";
import { CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { fetchT, resolveKey } from "@sapphire/plugin-i18next";
import { Subcommand } from "@sapphire/plugin-subcommands";
import { MessageFlags, MessagePayload, PermissionFlagsBits } from "discord.js";

export class MatchCommand extends Subcommand {
    matchService: MatchService;

    constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
        super(context, {
            ...options,
            name: "match",
            description: "Matches in PSO",
            subcommands: [
                {
                    name: "create",
                    chatInputRun: "chatInputCreateRun",
                    requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
                },
                {
                    name: "list",
                    chatInputRun: "chatInputListRun",
                },
                {
                    name: "delete",
                    chatInputRun: "chatInputDeleteRun",
                    requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
                },
                {
                    name: "edit",
                    chatInputRun: "chatInputEditRun",
                    requiredUserPermissions: [PermissionFlagsBits.ManageRoles],
                },
            ],
            runIn: [CommandOptionsRunTypeEnum.GuildAny],
        });

        this.matchService = this.container.moduleRef.get(MatchService, { strict: false });
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
                        .setDescription("Create a new match")
                        .addRoleOption((option) =>
                            option //
                                .setName("home")
                                .setDescription("The home team.")
                                .setRequired(true)
                        )
                        .addRoleOption((option) =>
                            option //
                                .setName("away")
                                .setDescription("The away team.")
                                .setRequired(true)
                        )
                        .addIntegerOption((option) =>
                            option //
                                .setName("home_score")
                                .setDescription("The home team score.")
                                .setRequired(true)
                                .setMinValue(0)
                                .setMaxValue(100)
                        )
                        .addIntegerOption((option) =>
                            option //
                                .setName("away_score")
                                .setDescription("The away team score.")
                                .setRequired(true)
                                .setMinValue(0)
                                .setMaxValue(100)
                        )
                        .addIntegerOption((option) =>
                            option //
                                .setName("season")
                                .setDescription("The season (optional, defaults to current season)")
                                .setRequired(false)
                                .setMinValue(1)
                                .setMaxValue(120)
                        )
                        .addShowToPublicOption()
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        //
                        .setName("list")
                        .setDescription("List all matches")
                        .addRoleOption((option) =>
                            option //
                                .setName("team")
                                .setDescription("Matches of a specific team (optional)")
                                .setRequired(false)
                        )
                        .addIntegerOption((option) =>
                            option //
                                .setName("season")
                                .setDescription("Season of the matches (optional, defaults to current season)")
                                .setMinValue(1)
                                .setMaxValue(120)
                                .setRequired(false)
                        )
                        .addStringOption((option) =>
                            option //
                                .setName("order")
                                .setDescription("Order of the matches (optional, default: descending / last matches first)")
                                .addChoices([
                                    { name: "descending / start from last matches", value: "desc" },
                                    { name: "ascending / start from first matches", value: "asc" },
                                ])
                                .setRequired(false)
                        )
                        .addIntegerOption((option) =>
                            option //
                                .setName("amount")
                                .setDescription("Amount matches to show (optional, default: 3")
                                .setRequired(false)
                                .setMinValue(1)
                                .setMaxValue(30)
                        )
                        .addShowToPublicOption()
                )
                .addSubcommand((subcommand) =>
                    subcommand
                        //
                        .setName("delete")
                        .setDescription("Delete one or many matches")
                        .addRoleOption((option) =>
                            option //
                                .setName("home_team")
                                .setDescription("The home-team of the match(es) to delete (optional)")
                                .setRequired(false)
                        )
                        .addRoleOption((option) =>
                            option //
                                .setName("away_team")
                                .setDescription("The away-team of the match(es) to delete (optional)")
                                .setRequired(false)
                        )
                        .addIntegerOption((option) =>
                            option //
                                .setName("season")
                                .setDescription("The season of the match(es) to delete (optional, defaults to current season)")
                                .setMinValue(1)
                                .setMaxValue(120)
                                .setRequired(false)
                        )
                        .addShowToPublicOption()
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        );
    }

    async chatInputCreateRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        try {
            const showToPublic = interaction.options.getShowToPublic();
            await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

            const homeRole = interaction.options.getRole("home", true);
            const awayRole = interaction.options.getRole("away", true);
            if (homeRole.id === awayRole.id) {
                await interaction.editReply(await resolveKey(interaction, "match:create:same-teams"));
                return;
            }

            const teamService = this.container.moduleRef.get(TeamService, { strict: false });
            const homeTeamId = await teamService.getTeamIdByName(interaction.guildId!, homeRole.name);
            if (!homeTeamId) {
                await interaction.editReply(await resolveKey(interaction, "match:create:team-not-found", { teamName: homeRole.name }));
                return;
            }
            const awayTeamId = await teamService.getTeamIdByName(interaction.guildId!, awayRole.name);
            if (!awayTeamId) {
                await interaction.editReply(await resolveKey(interaction, "match:create:team-not-found", { teamName: awayRole.name }));
                return;
            }

            const homeScore = interaction.options.getInteger("home_score", true);
            const awayScore = interaction.options.getInteger("away_score", true);
            const season = interaction.options.getInteger("season");
            await this.matchService.addMatch(homeTeamId, awayTeamId, homeScore, awayScore, interaction.guildId!, season ?? undefined);
            await interaction.editReply(
                await resolveKey(interaction, "match:create:success", { homeTeam: homeRole.name, awayTeam: awayRole.name })
            );
        } catch (error) {
            if (!isNoActiveSeasonError(error)) {
                this.container.nestLogger.error(`Failed to create match: ${error}`);
            }
            await interaction.editReply(
                await resolveKey(interaction, "match:create:error", { error: error instanceof Error ? error.message : error })
            );
            return;
        }
    }

    async chatInputListRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        try {
            const showToPublic = interaction.options.getShowToPublic();
            await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });

            const teamRole = interaction.options.getRole("team", true);
            const teamService = this.container.moduleRef.get(TeamService, { strict: false });
            const teamId = await teamService.getTeamIdByName(interaction.guildId!, teamRole.name);
            if (!teamId) {
                await interaction.editReply(await resolveKey(interaction, "match:list:team-not-found", { teamName: teamRole.name }));
                return;
            }

            const season = interaction.options.getInteger("season");
            const order = interaction.options.getString("order") as "asc" | "desc" | null;
            const amount = interaction.options.getInteger("amount");
            const matches = await this.matchService.getMatchesForList(teamId, season, order, amount);

            const content = matches.reduce(
                (currContent, match) =>
                    (currContent += `\nSeason ${match.seasons?.season ?? "?"} - ${match.teams_matches_home_team_idToteams?.name ?? "?"} ${match.home_score} - ${match.away_score} ${match.teams_matches_away_team_idToteams?.name ?? "?"}`),
                await resolveKey(interaction, "match:list:title")
            );
            const message = new MessagePayload(interaction.channel!, { content });
            await interaction.editReply(message);
        } catch (error) {
            this.container.nestLogger.error(`Failed to list matches: ${error}`);
            await interaction.editReply(
                await resolveKey(interaction, "match:list:error", { error: error instanceof Error ? error.message : error })
            );
            return;
        }
    }

    async chatInputDeleteRun(interaction: Subcommand.ChatInputCommandInteraction): Promise<void> {
        const showToPublic = interaction.options.getShowToPublic();
        await interaction.deferReply({ flags: showToPublic ? undefined : MessageFlags.Ephemeral });
        const tFunction = await fetchT(interaction);

        const homeTeamRole = interaction.options.getRole("home_team");
        const awayTeamRole = interaction.options.getRole("away_team");
        const teamService = this.container.moduleRef.get(TeamService, { strict: false });

        const homeTeamId = homeTeamRole ? await teamService.getTeamIdByName(interaction.guildId!, homeTeamRole.name) : undefined;
        if (homeTeamRole && !homeTeamId) {
            await interaction.editReply(tFunction("match:delete:team-not-found", { teamName: homeTeamRole.name }));
            return;
        }

        const awayTeamId = awayTeamRole ? await teamService.getTeamIdByName(interaction.guildId!, awayTeamRole.name) : undefined;
        if (awayTeamRole && !awayTeamId) {
            await interaction.editReply(tFunction("match:delete:team-not-found", { teamName: awayTeamRole.name }));
            return;
        }

        if (homeTeamId && awayTeamId && homeTeamId === awayTeamId) {
            await interaction.editReply(tFunction("match:delete:same-teams"));
            return;
        }

        const season = interaction.options.getInteger("season");
        const result = await this.matchService.deleteMatches(interaction.guildId!, homeTeamId, awayTeamId, season);

        if (result.count === 0) {
            await interaction.editReply(tFunction("match:delete:no-matches-found"));
            return;
        }
        await interaction.editReply(
            tFunction("match:delete:success", {
                count: result.count,
                homeTeam: homeTeamRole?.name ?? "any",
                awayTeam: awayTeamRole?.name ?? "any",
                season,
            })
        );
    }
}
