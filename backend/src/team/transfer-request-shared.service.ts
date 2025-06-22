import { DatabaseService } from "@backend/database/database.service";
import { Injectable } from "@nestjs/common";
import { transfer_request_status } from "@prisma/client";

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
}
