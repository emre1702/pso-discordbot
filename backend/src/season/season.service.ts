import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SeasonService {
    constructor(private readonly database: DatabaseService) {}

    getCurrentSeason(): Promise<number | undefined> {
        return this.database.seasons
            .findFirst({
                where: {
                    from_date: { lte: new Date() },
                    to_date: { gte: new Date() },
                },
                select: { season: true },
            })
            .then((season) => season?.season);
    }
}
