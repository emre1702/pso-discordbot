import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { InvalidDateRangeError } from "./invalid-date-range.error";

@Injectable()
export class SeasonService {
    constructor(private readonly database: DatabaseService) {}

    /**
     * @throws {@link InvalidDateRangeError}
     * If the end date is before the start date.
     */
    async createSeason(fromDate: Date, toDate?: Date | null): Promise<number> {
        if (toDate && toDate < fromDate) {
            throw InvalidDateRangeError();
        }

        const lastSeason = (await this.getLastSeason()) ?? 0;

        return this.database.seasons
            .create({
                data: {
                    season: lastSeason + 1,
                    from_date: fromDate,
                    to_date: toDate,
                },
                select: {
                    season: true,
                },
            })
            .then((season) => season?.season);
    }

    getCurrentSeason(): Promise<{ id: string; season: number } | null> {
        return this.database.seasons.findFirst({
            where: {
                from_date: { lte: new Date() },
                to_date: { gte: new Date() },
            },
            select: { id: true, season: true },
        });
    }

    getLastSeason(): Promise<number | undefined> {
        return this.database.seasons
            .findFirst({
                orderBy: { season: "desc" },
                select: { season: true },
            })
            .then((season) => season?.season);
    }

    getSeasonId(season: number): Promise<string | undefined> {
        return this.database.seasons
            .findUnique({
                where: { season },
                select: { id: true },
            })
            .then((season) => season?.id);
    }

    getAllSeasons(): Promise<{ season: number; from_date: Date | null; to_date: Date | null; champion_team_name: string | null }[]> {
        return this.database.seasons.findMany({
            orderBy: { season: "asc" },
            select: {
                season: true,
                from_date: true,
                to_date: true,
                champion_team_name: true,
            },
        });
    }
}
