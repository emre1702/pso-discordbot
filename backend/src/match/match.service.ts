import { DatabaseService } from "@backend/database/database.service";
import { SeasonService } from "@backend/season/season.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ReplaySubject } from "rxjs";
import { NoActiveSeasonError } from "./no-active-season.error";

@Injectable()
export class MatchService {
    private readonly matchAddedSubject = new ReplaySubject<{ guildId: string }>();
    public readonly matchAdded$ = this.matchAddedSubject.asObservable();

    constructor(
        private readonly database: DatabaseService,
        private readonly seasonService: SeasonService
    ) {}

    /**
     * @throws {@link NoActiveSeasonError}
     * If no active season is found, it will throw an error.
     */
    async addMatch(
        homeTeamId: string,
        awayTeamId: string,
        homeScore: number,
        awayScore: number,
        guildId: string,
        season?: number
    ): Promise<void> {
        const seasonId = season
            ? await this.seasonService.getSeasonId(season, guildId)
            : await this.seasonService.getCurrentSeason(guildId).then((s) => s?.id);

        if (!seasonId) {
            throw NoActiveSeasonError();
        }

        await this.database.matches.create({
            data: {
                guild_id: guildId,
                home_team_id: homeTeamId,
                away_team_id: awayTeamId,
                home_score: homeScore,
                away_score: awayScore,
                season_id: seasonId,
            },
        });

        this.matchAddedSubject.next({ guildId });
    }

    getMatchesForList(
        teamId: string,
        season?: number | null,
        order?: "desc" | "asc" | null,
        amount?: number | null
    ): Prisma.PrismaPromise<
        {
            seasons: { season: number } | null;
            home_score: number | null;
            away_score: number | null;
            teams_matches_home_team_idToteams: { name: string } | null;
            teams_matches_away_team_idToteams: { name: string } | null;
        }[]
    > {
        const where: Prisma.matchesWhereInput = {
            //
            OR: [
                //
                { home_team_id: teamId },
                { away_team_id: teamId },
            ],
        };
        if (season) {
            where!.seasons = { season };
        }

        return this.database.matches.findMany({
            //
            where,
            orderBy: [
                {
                    seasons: { season: order ?? "desc" },
                },
                { created_at: order ?? "desc" },
            ],
            take: amount ?? 3,
            select: {
                seasons: { select: { season: true } },
                home_score: true,
                away_score: true,
                teams_matches_home_team_idToteams: {
                    select: { name: true },
                },
                teams_matches_away_team_idToteams: {
                    select: { name: true },
                },
            },
        });
    }

    async deleteMatches(
        guildId: string,
        homeTeamId: string | undefined,
        awayTeamId: string | undefined,
        season: number | null | undefined
    ): Promise<Prisma.BatchPayload> {
        if (!season) {
            season = await this.seasonService.getCurrentSeason(guildId).then((s) => s?.season);
        }
        if (!season) {
            throw NoActiveSeasonError();
        }

        return this.database.matches.deleteMany({
            where: {
                guild_id: guildId,
                home_team_id: homeTeamId,
                away_team_id: awayTeamId,
                seasons: { season },
            },
        });
    }
}
