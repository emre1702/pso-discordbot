import { GuildSettingService } from "@backend/setting/guild-setting.service";
import getTFunction from "@backend/utils/get-t-function.util";
import { Injectable } from "@nestjs/common";
import { container } from "@sapphire/framework";
import { roleMention, userMention } from "discord.js";

@Injectable()
export class TransferChannelService {
    constructor(private readonly guildSettingsService: GuildSettingService) {}

    async sendTransferMessage(
        userId: string,
        newTeamId: string | undefined | null,
        previousTeamId: string | undefined | null,
        guildId: string
    ): Promise<void> {
        const transferChannelId = await this.guildSettingsService.get(guildId, "transfer_channel");
        if (!transferChannelId) {
            return;
        }

        const guild = await container.client.guilds.fetch(guildId);
        if (!guild) {
            return;
        }

        const transferChannel = await guild.channels.fetch(transferChannelId);
        if (!transferChannel || !transferChannel.isTextBased()) {
            return;
        }

        const tFunction = await getTFunction({ guildId });
        let messageContent: string;
        if (newTeamId) {
            messageContent = tFunction("transfer:channel:message-transfer", {
                user: userMention(userId),
                newTeam: roleMention(newTeamId),
                oldTeam: previousTeamId ? roleMention(previousTeamId) : tFunction("transfer:channel:free-agent"),
            });
        } else {
            messageContent = tFunction("transfer:channel:message-free-agent", {
                user: userMention(userId),
                oldTeam: previousTeamId ? roleMention(previousTeamId) : tFunction("transfer:channel:free-agent"),
            });
        }

        await transferChannel.send({ content: messageContent });
    }
}
