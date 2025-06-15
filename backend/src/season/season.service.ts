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
    async createSeason(guildId: string, fromDate: Date, toDate: Date): Promise<number> {
        if (toDate < fromDate) {
            throw InvalidDateRangeError();
        }

        const lastSeason = (await this.getLastSeason(guildId))?.season ?? 0;

        return this.database.seasons
            .create({
                data: {
                    guild_id: guildId,
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

    getCurrentSeason(guildId: string): Promise<{ season: number } | null> {
        return this.database.seasons.findFirst({
            where: {
                guild_id: guildId,
                from_date: { lte: new Date() },
                to_date: { gte: new Date() },
            },
            select: { season: true },
        });
    }

    getLastSeason(guildId: string): Promise<{ season: number } | null> {
        return this.database.seasons.findFirst({
            orderBy: { season: "desc" },
            select: { season: true },
            where: { guild_id: guildId },
        });
    }

    getAllSeasons(
        guildId: string
    ): Promise<{ season: number; from_date: Date | null; to_date: Date | null; champion_team_name: string | null }[]> {
        return this.database.seasons.findMany({
            orderBy: { season: "asc" },
            select: {
                season: true,
                from_date: true,
                to_date: true,
                champion_team_name: true,
            },
            where: { guild_id: guildId },
        });
    }

    editSeason(guildId: string, season: number, fromDate: Date, toDate: Date): ReturnType<DatabaseService["seasons"]["update"]> {
        if (toDate < fromDate) {
            throw InvalidDateRangeError();
        }

        return this.database.seasons.update({
            where: { season_guild_id: { season, guild_id: guildId } },
            data: { from_date: fromDate, to_date: toDate },
        });
    }

    getSeasonExists(guildId: string, season: number): Promise<boolean> {
        return this.database.seasons
            .findFirst({
                where: { guild_id: guildId, season },
                select: { season: true },
            })
            .then((season) => !!season);
    }

    getCurrentOrNextSeason(guildId: string): Promise<number | undefined> {
        return this.database.seasons
            .findFirst({
                where: {
                    guild_id: guildId,
                    from_date: { gte: new Date() },
                },
                orderBy: { from_date: "asc" },
                select: { season: true },
            })
            .then((result) => result?.season);
    }
}
