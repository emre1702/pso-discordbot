import { Injectable } from "@nestjs/common";

@Injectable()
export class TransferChannelService {
    sendTransferMessage(responderId: string, team_id: string, guildId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
