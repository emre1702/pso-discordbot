import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { FixtureChannelService } from "./fixture-channel.service";
import { FixtureWeekModel } from "./fixture-week.model";
import { NoRunningOrFinishedSeasonError } from "./no-running-or-finished-season.error";
import { NotEnoughSeasonTimeError } from "./not-enough-season-time.error";
import { NotEnoughTeamsError } from "./not-enough-teams.error";
import { SeasonNotFoundError } from "./season-not-found.error";

@Injectable()
export class FixtureService {
    constructor(
        private readonly database: DatabaseService,
        private readonly fixtureChannelService: FixtureChannelService
    ) {}

    async createFixture(
        guildId: string,
        creatorId: string,
        options: {
            season: number;
            homeAndAway: boolean;
            earliestTime: string | null;
            daysBetweenWeeks: number | null;
            minutesBetweenMatches: number | null;
        }
    ): Promise<void> {
        options.earliestTime ??= "18:00";
        options.daysBetweenWeeks ??= 3;
        options.minutesBetweenMatches = options.minutesBetweenMatches !== null ? options.minutesBetweenMatches : 30;

        const teamIds = await this.getTeamIds(guildId);
        if (teamIds.length < 2) {
            throw NotEnoughTeamsError();
        }

        const season = await this.database.seasons.findFirst({
            where: {
                guild_id: guildId,
                season: options.season,
            },
            select: {
                from_date: true,
                to_date: true,
            },
        });
        if (!season) {
            throw SeasonNotFoundError();
        }
        if (season.from_date < new Date() || season.to_date < new Date()) {
            throw NoRunningOrFinishedSeasonError();
        }

        await this.database.fixtures.deleteMany({
            where: {
                guild_id: guildId,
                season: options.season,
            },
        });

        const optimalFixture = this.getOptimalFixture(teamIds.length, season.from_date, season.to_date, {
            homeAndAway: options.homeAndAway,
            earliestTime: options.earliestTime,
            daysBetweenWeeks: options.daysBetweenWeeks,
            minutesBetweenMatches: options.minutesBetweenMatches,
        });

        await this.database.fixtures.createMany({
            data: optimalFixture.flatMap((week) =>
                week.matches.map((match) => ({
                    guild_id: guildId,
                    season: options.season,
                    week: week.week,
                    home_team_id: teamIds[match.homeTeamIndex],
                    away_team_id: teamIds[match.awayTeamIndex],
                    creator_id: creatorId,
                    match_time: match.dateUtc,
                }))
            ),
        });

        await this.fixtureChannelService.writeFixtureInChannel(guildId, options.season);
    }

    private getTeamIds(guildId: string): Promise<string[]> {
        return this.database.teams
            .findMany({
                where: {
                    guild_id: guildId,
                },
                select: {
                    id: true,
                },
            })
            .then((teams) => teams.map((team) => team.id));
    }

    private getOptimalFixture(
        amountTeams: number,
        startDate: Date,
        endDate: Date,
        options: {
            homeAndAway: boolean;
            earliestTime: string;
            daysBetweenWeeks: number;
            minutesBetweenMatches: number;
        }
    ): FixtureWeekModel[] {
        const amountWeeks = (Math.ceil(amountTeams / 2) * 2 - 1) * (options.homeAndAway ? 2 : 1);
        const amountGamesToPlayPerWeek = Math.ceil(amountTeams / 2);
        const daysBetweenStartAndEndIncl = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const amountDaysAvailableToPlay = daysBetweenStartAndEndIncl - (amountWeeks - 1) * options.daysBetweenWeeks;
        if (amountDaysAvailableToPlay < amountWeeks) {
            throw NotEnoughSeasonTimeError();
        }
        const amountDaysAvailableToPlayPerWeek = Math.floor(amountDaysAvailableToPlay / amountWeeks);
        const amountWeeksWithExtraGameDay = amountDaysAvailableToPlay % (amountDaysAvailableToPlayPerWeek * amountWeeks);

        const fixture: FixtureWeekModel[] = [];
        let amountWeeksWithExtraGameDayLeft = amountWeeksWithExtraGameDay;
        const [startHour, startMinute] = options.earliestTime.split(":").map(Number);
        const currentDate = new Date(
            Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(), startHour, startMinute, 0, 0)
        );

        const gameMatchups = this.getGameMatchups(amountTeams);
        for (const weekMatchups of gameMatchups) {
            let amountGameDaysThisWeek = amountDaysAvailableToPlayPerWeek;
            if (amountWeeksWithExtraGameDayLeft > 0) {
                amountGameDaysThisWeek++;
                amountWeeksWithExtraGameDayLeft--;
            }
            const amountMatchesPerGameDay = Math.ceil(amountGamesToPlayPerWeek / amountGameDaysThisWeek);
            const weekMatches: FixtureWeekModel["matches"] = [];
            for (let gameDay = 0; gameDay < amountGameDaysThisWeek; gameDay++) {
                const matchDate = new Date(currentDate.getTime());
                matchDate.setUTCHours(Number(options.earliestTime.split(":")[0]), Number(options.earliestTime.split(":")[1]), 0, 0);
                for (let match = 0; match < amountMatchesPerGameDay; match++) {
                    const matchup = weekMatchups.matches.pop();
                    if (!matchup) break;

                    weekMatches.push({
                        dateUtc: new Date(matchDate.getTime()),
                        homeTeamIndex: matchup.homeTeamIndex,
                        awayTeamIndex: matchup.awayTeamIndex,
                    });

                    matchDate.setUTCMinutes(matchDate.getUTCMinutes() + options.minutesBetweenMatches);
                }
                currentDate.setUTCDate(currentDate.getUTCDate() + 1);
            }

            currentDate.setUTCDate(currentDate.getUTCDate() + options.daysBetweenWeeks);
            fixture.push({
                week: weekMatchups.week,
                matches: weekMatches,
            });
        }

        if (options.homeAndAway) {
            this.addAwayFixture(fixture, startDate, currentDate);
        }

        return fixture;
    }

    private getGameMatchups(amountTeams: number): { week: number; matches: { homeTeamIndex: number; awayTeamIndex: number }[] }[] {
        if (amountTeams < 2) return [];

        const isOdd = amountTeams % 2 !== 0;
        const totalTeams = isOdd ? amountTeams + 1 : amountTeams;
        const totalRounds = totalTeams - 1;
        const rounds: { week: number; matches: { homeTeamIndex: number; awayTeamIndex: number }[] }[] = [];

        const teams = Array.from({ length: totalTeams }, (_, i) => i);

        for (let round = 0; round < totalRounds; round++) {
            const matches: { homeTeamIndex: number; awayTeamIndex: number }[] = [];

            for (let i = 0; i < totalTeams / 2; i++) {
                const teamA = teams[i];
                const teamB = teams[totalTeams - 1 - i];

                // Ignoriere Matches mit dem Dummy-Team (bei ungerader Teamanzahl)
                if (teamA !== amountTeams && teamB !== amountTeams) {
                    matches.push({ homeTeamIndex: teamA, awayTeamIndex: teamB });
                }
            }

            rounds.push({ week: round + 1, matches });

            // Rotiere Teams (außer das erste)
            const fixed = teams[0];
            const rotated = [fixed, ...teams.slice(-1), ...teams.slice(1, -1)];
            for (let i = 0; i < teams.length; i++) {
                teams[i] = rotated[i];
            }
        }

        return rounds;
    }

    private addAwayFixture(fixture: FixtureWeekModel[], startDate: Date, awayStartDate: Date): void {
        // Create reverse matches for home and away teams
        let currentWeek = fixture.length + 1;
        for (const week of [...fixture]) {
            const weekMatches: FixtureWeekModel["matches"] = [];
            for (const match of week.matches) {
                const daysAfterStart = Math.floor(
                    (match.dateUtc.getTime() - startDate.getTime() + 1000 * 60 * 60 * 23.99) / (1000 * 60 * 60 * 24)
                );

                const reverseMatchDate = new Date(
                    Date.UTC(
                        awayStartDate.getUTCFullYear(),
                        awayStartDate.getUTCMonth(),
                        awayStartDate.getUTCDate(),
                        match.dateUtc.getUTCHours(),
                        match.dateUtc.getUTCMinutes(),
                        0,
                        0
                    )
                );
                reverseMatchDate.setUTCDate(reverseMatchDate.getUTCDate() + daysAfterStart);
                weekMatches.push({
                    dateUtc: reverseMatchDate,
                    homeTeamIndex: match.awayTeamIndex,
                    awayTeamIndex: match.homeTeamIndex,
                });
            }

            fixture.push({
                week: currentWeek,
                matches: weekMatches,
            });

            currentWeek++;
        }
    }

    getFixtureId(guildId: string, season: number, homeTeamId: string, awayTeamId: string): Promise<string | undefined> {
        return this.database.fixtures
            .findFirst({
                where: {
                    guild_id: guildId,
                    season,
                    home_team_id: homeTeamId,
                    away_team_id: awayTeamId,
                },
                select: {
                    id: true,
                },
            })
            .then((fixture) => fixture?.id);
    }

    getFixtureIds(guildId: string, season: number, homeTeamId: string | undefined, awayTeamId: string | undefined): Promise<string[]> {
        return this.database.fixtures
            .findMany({
                where: {
                    guild_id: guildId,
                    season,
                    home_team_id: homeTeamId,
                    away_team_id: awayTeamId,
                },
                select: {
                    id: true,
                },
            })
            .then((fixtures) => fixtures.map((fixture) => fixture.id));
    }
}
