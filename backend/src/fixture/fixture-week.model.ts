export interface FixtureWeekModel {
    week: number;
    matches: { dateUtc: Date; homeTeamIndex: number; awayTeamIndex: number }[];
}
