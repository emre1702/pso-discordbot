import { DatabaseService } from "@backend/database/database.service";
import { SeasonService } from "@backend/season/season.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MatchService {
    constructor(
        private readonly database: DatabaseService,
        private readonly seasonService: SeasonService
    ) {}

    async addMatch(homeTeamId: string, awayTeamId: string, homeScore: number, awayScore: number, season?: number): Promise<void> {
        if (!season) {
            season = await this.seasonService.getCurrentSeason();
        }

        if (!season) {
            throw new Error("No season is currently active. Please provide a season.");
        }

        await this.database.matches.create({
            data: {
                home_team_id: homeTeamId,
                away_team_id: awayTeamId,
                home_score: homeScore,
                away_score: awayScore,
                season: season,
            },
        });
    }
}
