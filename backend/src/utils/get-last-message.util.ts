import { container } from "@sapphire/framework";
import { Message, TextBasedChannel } from "discord.js";

export async function getLastMessage(channel: TextBasedChannel, beforeId?: string): Promise<Message | null> {
    const lastMessage = await channel.messages.fetch({ limit: 1, before: beforeId }).then((messages) => messages.first());
    if (!lastMessage) {
        return null;
    }
    if (lastMessage.author.id === container.client.user?.id) {
        return lastMessage;
    }
    return getLastMessage(channel, lastMessage.id);
}
