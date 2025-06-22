import { Injectable } from "@nestjs/common";

@Injectable()
export class TransferChannelService {
    sendTransferMessage(userId: string, newTeamId: string, previousTeamId: string | undefined | null, guildId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
