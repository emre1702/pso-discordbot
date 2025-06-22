import { DatabaseService } from "@backend/database/database.service";
import { CrontabUtils } from "@backend/utils/crontab.utils";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { guild_setting, transfer_request_status } from "@prisma/client";

@Injectable()
export class TransferRequestSharedService {
    constructor(private readonly databaseService: DatabaseService) {}

    async rejectAllOtherTransferRequests(userId: string, teamId: string): Promise<void> {
        await this.databaseService.user_transfer_requests.updateMany({
            where: {
                user_id: userId,
                team_id: { not: teamId },
                status: transfer_request_status.open,
            },
            data: {
                status: transfer_request_status.rejected,
                status_changed_at: new Date(),
            },
        });
        await this.databaseService.team_transfer_requests.updateMany({
            where: {
                user_id: userId,
                team_id: { not: teamId },
                status: transfer_request_status.open,
            },
            data: {
                status: transfer_request_status.rejected,
                status_changed_by: userId,
                status_changed_at: new Date(),
            },
        });
    }

    @Cron(CrontabUtils.getNextHourlyCrontab())
    async deleteOldTransferRequests(): Promise<void> {
        const deleteTransferRequestsAfterDaysSettings = await this.databaseService.guild_settings.findMany({
            where: {
                setting: guild_setting.delete_transfer_requests_after_days,
                value: { not: null },
            },
            select: {
                guild_id: true,
                value: true,
            },
        });
        const defaultDeleteTransferRequestsAfterDays = deleteTransferRequestsAfterDaysSettings.find(
            (setting) => setting.guild_id === "default"
        )!.value!;

        const uniqueGuildIdsInTeamTransferRequests = await this.databaseService.team_transfer_requests
            .findMany({
                where: {
                    status: { not: transfer_request_status.open },
                },
                select: {
                    guild_id: true,
                },
                distinct: "guild_id",
            })
            .then((requests) => requests.map((request) => request.guild_id));

        for (const guildId of uniqueGuildIdsInTeamTransferRequests) {
            const deleteTransferRequestsAfterDays = Number(
                deleteTransferRequestsAfterDaysSettings.find((setting) => setting.guild_id === guildId)?.value ??
                    defaultDeleteTransferRequestsAfterDays
            );

            const deleteBeforeDate = new Date();
            deleteBeforeDate.setDate(deleteBeforeDate.getDate() - deleteTransferRequestsAfterDays);

            await this.databaseService.team_transfer_requests.deleteMany({
                where: {
                    guild_id: guildId,
                    status_changed_at: { lt: deleteBeforeDate },
                },
            });
        }

        const uniqueGuildIdsInUserTransferRequests = await this.databaseService.user_transfer_requests
            .findMany({
                where: {
                    status: { not: transfer_request_status.open },
                },
                select: {
                    guild_id: true,
                },
                distinct: "guild_id",
            })
            .then((requests) => requests.map((request) => request.guild_id));

        for (const guildId of uniqueGuildIdsInUserTransferRequests) {
            const deleteTransferRequestsAfterDays = Number(
                deleteTransferRequestsAfterDaysSettings.find((setting) => setting.guild_id === guildId)?.value ??
                    defaultDeleteTransferRequestsAfterDays
            );

            const deleteBeforeDate = new Date();
            deleteBeforeDate.setDate(deleteBeforeDate.getDate() - deleteTransferRequestsAfterDays);

            await this.databaseService.user_transfer_requests.deleteMany({
                where: {
                    guild_id: guildId,
                    status_changed_at: { lt: deleteBeforeDate },
                },
            });
        }
    }
}
