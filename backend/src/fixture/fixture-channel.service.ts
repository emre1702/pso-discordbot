import { DatabaseService } from "@backend/database/database.service";
import { SeasonService } from "@backend/season/season.service";
import { GuildSettingService } from "@backend/setting/guild-setting.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { splitMessageByLength } from "@backend/utils/split-message-by-length.util";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { guild_setting } from "@prisma/client";
import { container } from "@sapphire/pieces";
import { bold, GuildBasedChannel, GuildChannel, Role, roleMention, TextBasedChannel, time, TimestampStyles } from "discord.js";
import { filter, Subject, takeUntil } from "rxjs";

@Injectable()
export class FixtureChannelService implements OnModuleInit, OnModuleDestroy {
    private readonly destroySubject = new Subject<void>();

    constructor(
        private readonly guildSettingService: GuildSettingService,
        private readonly seasonService: SeasonService,
        private readonly databaseService: DatabaseService
    ) {}

    async onModuleInit(): Promise<void> {
        this.guildSettingService.guildSettingChanged$
            .pipe(
                takeUntil(this.destroySubject),
                filter(({ setting }) => setting === guild_setting.fixture_channel || setting === guild_setting.language)
            )
            .subscribe((result) => this.writeFixtureInChannel(result.guildId));
    }

    onModuleDestroy(): void {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

    async writeFixtureInChannel(guildId: string, onlyIfCurrentOrNextSeasonIs?: number): Promise<void> {
        try {
            const fixtureChannelId = await this.guildSettingService.get(guildId, guild_setting.fixture_channel);
            if (!fixtureChannelId) {
                return;
            }

            const season = await this.seasonService.getCurrentOrNextSeason(guildId);
            if (!season) {
                return;
            }
            if (onlyIfCurrentOrNextSeasonIs && season !== onlyIfCurrentOrNextSeasonIs) {
                return;
            }

            const fixtureChannel = await container.client.channels.fetch(fixtureChannelId);
            if (!fixtureChannel || !fixtureChannel.isTextBased()) {
                return;
            }

            const fixtures = await this.databaseService.fixtures.findMany({
                where: {
                    guild_id: guildId,
                    season: season,
                },
                orderBy: {
                    match_time: "asc",
                },
                select: {
                    match_time: true,
                    week: true,
                    teams_fixtures_home_team_idToteams: {
                        select: {
                            name: true,
                        },
                    },
                    teams_fixtures_away_team_idToteams: {
                        select: {
                            name: true,
                        },
                    },
                    matches: {
                        select: {
                            home_score: true,
                            away_score: true,
                        },
                    },
                },
            });

            const guild = await container.client.guilds.fetch(guildId);
            if (!guild) {
                container.nestLogger.error(`Guild with ID ${guildId} not found.`);
                return;
            }

            const rolesByName = (await guild.roles.fetch()).reduce(
                (acc, role) => {
                    acc[role.name.toLowerCase()] = role;
                    return acc;
                },
                {} as Record<string, Role>
            );
            const guildLanguage = (await this.guildSettingService.get(guildId, guild_setting.language)) || "en";
            let currentDay = 0;
            let messageContent = "";
            const tFunction = await getTFunction(guild);
            for (const fixture of fixtures) {
                const day = fixture.match_time.getUTCDate();
                let homeTeam = fixture.teams_fixtures_home_team_idToteams?.name;
                if (homeTeam && rolesByName[homeTeam.toLowerCase()]) {
                    homeTeam = roleMention(rolesByName[homeTeam.toLowerCase()].id);
                }
                let awayTeam = fixture.teams_fixtures_away_team_idToteams?.name;
                if (awayTeam && rolesByName[awayTeam.toLowerCase()]) {
                    awayTeam = roleMention(rolesByName[awayTeam.toLowerCase()].id);
                }
                if (currentDay !== day) {
                    if (currentDay !== 0) {
                        messageContent += "\n"; // Add a newline before the next day's fixtures
                    }
                    messageContent += bold(
                        `${fixture.match_time.toLocaleDateString(guildLanguage)} - ${fixture.match_time.toLocaleDateString(guildLanguage, { weekday: "long" })} - ${tFunction("fixture:output:week", { week: fixture.week })}:\n`
                    );
                }

                if (fixture.matches) {
                    // eslint-disable-next-line @stylistic/max-len
                    messageContent += `${time(fixture.match_time, TimestampStyles.ShortTime)}: ${homeTeam} ${fixture.matches.home_score} - ${fixture.matches.away_score} ${awayTeam}\n`;
                } else {
                    messageContent += `${time(fixture.match_time, TimestampStyles.ShortTime)}: ${homeTeam} - ${awayTeam}\n`;
                }

                currentDay = day;
            }
            const messageContents = splitMessageByLength(messageContent);
            await (fixtureChannel as TextBasedChannel & GuildChannel).bulkDelete(100);

            for (const content of messageContents) {
                await (fixtureChannel as GuildBasedChannel & TextBasedChannel).send({
                    content,
                });
            }
        } catch (error) {
            container.nestLogger.error(
                `Error writing fixture in channel for guild ${guildId}: ${error instanceof Error ? error.message : String(error)}`
            );
            return;
        }
    }
}
