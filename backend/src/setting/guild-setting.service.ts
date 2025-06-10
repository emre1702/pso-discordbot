import { DatabaseService } from "@backend/database/database.service";
import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { guild_setting } from "@prisma/client";
import { Subject } from "rxjs";
import guildSettingsRecord from "./guild-settings";

@Injectable()
export class GuildSettingService implements OnModuleInit, OnModuleDestroy {
    private readonly guildSettingChangedSubject = new Subject<{
        guildId: string;
        setting: guild_setting;
        value: string | null;
    }>();
    public readonly guildSettingChanged$ = this.guildSettingChangedSubject.asObservable();

    private readonly destroySubject = new Subject<void>();

    constructor(private readonly database: DatabaseService) {}

    async onModuleInit(): Promise<void> {
        await this.initDefaultSettings();
    }

    onModuleDestroy(): void {
        this.destroySubject.next();
        this.destroySubject.complete();
    }

    getAllConfigs(): Readonly<typeof guildSettingsRecord> {
        return guildSettingsRecord;
    }

    getAll(guildId: string): Promise<Record<guild_setting, string | undefined | null>> {
        return this.database.guild_settings
            .findMany({
                where: {
                    guild_id: guildId,
                },
                select: {
                    setting: true,
                    value: true,
                },
            })
            .then((settings) =>
                Object.values(this.getAllConfigs()).reduce(
                    (acc, setting) => {
                        acc[setting.name] = settings.find((s) => s.setting === setting.setting)?.value ?? setting.defaultValue;
                        return acc;
                    },
                    {} as Record<guild_setting, string | undefined | null>
                )
            );
    }

    get(guildId: string, setting: guild_setting): Promise<string | undefined | null> {
        return this.database.guild_settings
            .findUnique({
                where: {
                    guild_id_setting: {
                        guild_id: guildId,
                        setting: setting,
                    },
                },
                select: {
                    value: true,
                },
            })
            .then((result) => result?.value ?? guildSettingsRecord[setting].defaultValue);
    }

    async set(
        guildId: string,
        setting: guild_setting,
        value: string | null
    ): Promise<Awaited<ReturnType<DatabaseService["guild_settings"]["upsert"]>>> {
        const result = await this.database.guild_settings.upsert({
            where: {
                guild_id_setting: {
                    guild_id: guildId,
                    setting: setting,
                },
            },
            create: {
                guild_id: guildId,
                setting: setting,
                value: value,
            },
            update: {
                value: value,
            },
        });

        this.guildSettingChangedSubject.next({ guildId, setting, value });

        return result;
    }

    private async initDefaultSettings(): Promise<void> {
        const defaultSettings = await this.getDefaults();
        for (const guildSetting of Object.values(guildSettingsRecord)) {
            if (defaultSettings[guildSetting.setting]) {
                guildSetting.defaultValue = defaultSettings[guildSetting.setting];
            }
        }
    }

    private getDefaults(): Promise<Record<guild_setting, string | null>> {
        return this.database.guild_settings
            .findMany({
                where: {
                    guild_id: "default",
                },
                select: {
                    setting: true,
                    value: true,
                },
            })
            .then((settings) =>
                settings.reduce(
                    (acc, setting) => {
                        acc[setting.setting] = setting.value;
                        return acc;
                    },
                    {} as Record<guild_setting, string | null>
                )
            );
    }
}
