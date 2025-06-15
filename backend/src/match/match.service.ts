import { DatabaseService } from "@backend/database/database.service";
import { FixtureChannelService } from "@backend/fixture/fixture-channel.service";
import { FixtureService } from "@backend/fixture/fixture.service";
import { SeasonService } from "@backend/season/season.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ReplaySubject } from "rxjs";
import { NoActiveSeasonError } from "./no-active-season.error";
import { NoFixtureFoundError } from "./no-fixture-found.error";

@Injectable()
export class MatchService {
    private readonly matchAddedSubject = new ReplaySubject<{ guildId: string }>();
    public readonly matchAdded$ = this.matchAddedSubject.asObservable();

    constructor(
        private readonly database: DatabaseService,
        private readonly seasonService: SeasonService,
        private readonly fixtureService: FixtureService,
        private readonly fixtureChannelService: FixtureChannelService
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
        season?: number,
        creatorId?: string
    ): Promise<void> {
        season ??= await this.seasonService.getCurrentSeason(guildId).then((s) => s?.season);

        if (!season) {
            throw NoActiveSeasonError();
        }

        const fixtureId = await this.fixtureService.getFixtureId(guildId, season, homeTeamId, awayTeamId);
        if (!fixtureId) {
            throw NoFixtureFoundError();
        }

        await this.database.matches.create({
            data: {
                fixture_id: fixtureId,
                home_score: homeScore,
                away_score: awayScore,
                creator_id: creatorId,
            },
        });

        this.matchAddedSubject.next({ guildId });

        await this.fixtureChannelService.writeFixtureInChannel(guildId, season);
    }

    getMatchesForList(
        teamId: string,
        season?: number | null,
        order?: "desc" | "asc" | null,
        amount?: number | null
    ): Prisma.PrismaPromise<
        {
            fixtures: {
                season: number;
                teams_fixtures_home_team_idToteams: { name: string } | null;
                teams_fixtures_away_team_idToteams: { name: string } | null;
            };
            home_score: number | null;
            away_score: number | null;
        }[]
    > {
        const where: Prisma.matchesWhereInput = {
            //
            OR: [
                //
                { fixtures: { home_team_id: teamId } },
                { fixtures: { away_team_id: teamId } },
            ],
        };
        if (season) {
            where!.fixtures = { season };
        }

        return this.database.matches.findMany({
            //
            where,
            orderBy: [
                {
                    fixtures: {
                        season: order ?? "desc",
                    },
                },
                { created_at: order ?? "desc" },
            ],
            take: amount ?? 3,
            select: {
                fixtures: {
                    select: {
                        season: true,
                        teams_fixtures_home_team_idToteams: { select: { name: true } },
                        teams_fixtures_away_team_idToteams: { select: { name: true } },
                    },
                },
                home_score: true,
                away_score: true,
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

        const fixtureIds = await this.fixtureService.getFixtureIds(guildId, season, homeTeamId, awayTeamId);
        if (!fixtureIds?.length) {
            throw NoFixtureFoundError();
        }

        return this.database.matches.deleteMany({
            where: {
                fixture_id: {
                    in: fixtureIds,
                },
            },
        });
    }
}
