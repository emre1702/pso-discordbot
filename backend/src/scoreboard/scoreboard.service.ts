import { DatabaseService } from "@backend/database/database.service";
import { MatchService } from "@backend/match/match.service";
import { SeasonService } from "@backend/season/season.service";
import { GuildSettingService } from "@backend/setting/guild-setting.service";
import { TableBuilder } from "@backend/utils/table-builder.util";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { guild_setting } from "@prisma/client";
import { container } from "@sapphire/framework";
import { fetchT } from "@sapphire/plugin-i18next";
import { Guild, GuildBasedChannel, Message, MessageFlags, TextBasedChannel } from "discord.js";
import { filter, merge, Subject, takeUntil } from "rxjs";
import { ScoreboardRowModel } from "./scoreboard-row.model";

@Injectable()
export class ScoreboardService implements OnModuleInit, OnModuleDestroy {
    private readonly destroySubject = new Subject<void>();

    constructor(
        private readonly guildSettingService: GuildSettingService,
        private readonly databaseService: DatabaseService,
        private readonly seasonService: SeasonService,
        private readonly matchService: MatchService
    ) {}

    onModuleInit(): void {
        merge(
            this.matchService.matchAdded$,
            this.guildSettingService.guildSettingChanged$.pipe(
                filter(({ setting }) => setting === guild_setting.scoreboard_channel || setting === guild_setting.language)
            )
        )
            .pipe(takeUntil(this.destroySubject))
            .subscribe(({ guildId }) => this.updateOrCreateScoreboard(guildId));
    }

    onModuleDestroy(): void {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

    async updateOrCreateScoreboard(guildId: string): Promise<void> {
        const scoreboardChannel = await this.getScoreboardChannel(guildId);
        if (!scoreboardChannel) {
            return;
        }

        if (!scoreboardChannel.isTextBased()) {
            return;
        }

        const scoreboardMessageContent = await this.createScoreboardMessageContent(guildId);
        if (!scoreboardMessageContent) {
            return;
        }

        const scoreboardMessage = await this.getScoreboardMessage(scoreboardChannel);
        if (!scoreboardMessage) {
            // Create a new scoreboard message if it doesn't exist
            await scoreboardChannel.send({
                content: scoreboardMessageContent,
                flags: MessageFlags.SuppressEmbeds,
            });
        } else {
            // Update the existing scoreboard message
            await scoreboardMessage.edit({
                content: scoreboardMessageContent,
                flags: MessageFlags.SuppressEmbeds,
            });
        }
    }

    private async getScoreboardChannel(guildId: string): Promise<GuildBasedChannel | null> {
        const scoreboardChannelId = await this.guildSettingService.get(guildId, "scoreboard_channel");
        if (!scoreboardChannelId) {
            return null;
        }

        const guild = await container.client.guilds.fetch(guildId);
        if (!guild) {
            throw new Error(`Guild with ID ${guildId} not found`);
        }

        const scoreboardChannel = await guild.channels.fetch(scoreboardChannelId);
        if (!scoreboardChannel) {
            return null;
        }

        return scoreboardChannel;
    }

    private async getScoreboardMessage(scoreboardChannel: TextBasedChannel, beforeId?: string): Promise<Message | null> {
        const lastMessage = await scoreboardChannel.messages.fetch({ limit: 1, before: beforeId }).then((messages) => messages.first());
        if (!lastMessage) {
            return null;
        }
        if (lastMessage.author.id === container.client.user?.id) {
            return lastMessage;
        }
        return this.getScoreboardMessage(scoreboardChannel, lastMessage.id);
    }

    private async createScoreboardMessageContent(guildId: string, season?: number): Promise<string | null> {
        const interaction = container.client.guilds.resolve(guildId);
        const tFunction = await fetchT(interaction as Guild);

        let seasonId: string | undefined;
        if (season) {
            seasonId = await this.seasonService.getSeasonId(season, guildId);
        } else {
            const lastSeason = await this.seasonService.getLastSeason(guildId);
            season = lastSeason?.season;
            seasonId = lastSeason?.id;
        }
        if (!seasonId) {
            return null;
        }

        const matches = await this.getMatches(guildId, seasonId);

        if (matches.length === 0) {
            return "";
        }

        const scoreboardRows = this.mapToScoreboardRowModels(matches);

        const tableBuilder = new TableBuilder<ScoreboardRowModel>(
            [
                { index: 1, field: "teamName", label: tFunction("scoreboard:team"), width: 25 },
                { index: 2, field: "games", label: tFunction("scoreboard:played"), width: 10 },
                { index: 3, field: "wins", label: tFunction("scoreboard:won"), width: 10 },
                { index: 4, field: "draws", label: tFunction("scoreboard:drawn"), width: 10 },
                { index: 5, field: "losses", label: tFunction("scoreboard:lost"), width: 10 },
                { index: 6, field: "goals", label: tFunction("scoreboard:goalsFor"), width: 10 },
                { index: 7, field: "conceded", label: tFunction("scoreboard:goalsAgainst"), width: 10 },
                {
                    index: 8,
                    field: "goalDifference",
                    label: tFunction("scoreboard:goalDifference"),
                    width: 15,
                    format: (value): string => (value >= 0 ? `+${value}` : String(value)),
                },
                { index: 9, field: "points", label: tFunction("scoreboard:points"), width: 10 },
            ],
            {
                sortBy: ["points", "goalDifference", "goals", "conceded", "teamName"],
                sortDirection: ["desc", "desc", "desc", "asc", "asc"],
            }
        );
        tableBuilder.addRows(...scoreboardRows);
        const scoreboardContent = tableBuilder.build();
        return `${tFunction("scoreboard:title", { season })}\n\n${scoreboardContent}`;
    }

    private async getMatches(
        guildId: string,
        seasonId: string
    ): Promise<
        {
            home_score: number;
            away_score: number;
            home_team: string;
            away_team: string;
        }[]
    > {
        return this.databaseService.matches
            .findMany({
                where: {
                    guild_id: guildId,
                    season_id: seasonId,
                },
                select: {
                    home_score: true,
                    away_score: true,
                    teams_matches_home_team_idToteams: {
                        select: { name: true },
                    },
                    teams_matches_away_team_idToteams: {
                        select: { name: true },
                    },
                },
            })
            .then((matches) =>
                matches.map((match) => ({
                    home_score: match.home_score ?? 0,
                    away_score: match.away_score ?? 0,
                    home_team: match.teams_matches_home_team_idToteams?.name || "Unknown",
                    away_team: match.teams_matches_away_team_idToteams?.name || "Unknown",
                }))
            );
    }

    private mapToScoreboardRowModels(matches: Awaited<ReturnType<ScoreboardService["getMatches"]>>): ScoreboardRowModel[] {
        const statsByTeam: Record<string, ScoreboardRowModel> = {};
        for (const match of matches) {
            const homeTeam = match.home_team;
            const awayTeam = match.away_team;

            if (!statsByTeam[homeTeam]) {
                statsByTeam[homeTeam] = {
                    teamName: homeTeam,
                    games: 0,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    goals: 0,
                    conceded: 0,
                    goalDifference: 0,
                    points: 0,
                };
            }
            if (!statsByTeam[awayTeam]) {
                statsByTeam[awayTeam] = {
                    teamName: awayTeam,
                    games: 0,
                    wins: 0,
                    draws: 0,
                    losses: 0,
                    goals: 0,
                    conceded: 0,
                    goalDifference: 0,
                    points: 0,
                };
            }

            statsByTeam[homeTeam].games++;
            statsByTeam[awayTeam].games++;
            statsByTeam[homeTeam].goals += match.home_score;
            statsByTeam[awayTeam].goals += match.away_score;
            statsByTeam[homeTeam].conceded += match.away_score;
            statsByTeam[awayTeam].conceded += match.home_score;

            if (match.home_score > match.away_score) {
                statsByTeam[homeTeam].wins++;
                statsByTeam[awayTeam].losses++;
            } else if (match.home_score < match.away_score) {
                statsByTeam[awayTeam].wins++;
                statsByTeam[homeTeam].losses++;
            } else {
                statsByTeam[homeTeam].draws++;
                statsByTeam[awayTeam].draws++;
            }
        }

        return Object.values(statsByTeam).map((teamStats) => {
            teamStats.goalDifference = teamStats.goals - teamStats.conceded;
            teamStats.points = teamStats.wins * 3 + teamStats.draws;
            return teamStats;
        });
    }
}
