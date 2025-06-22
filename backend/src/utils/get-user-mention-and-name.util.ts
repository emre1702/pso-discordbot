import { User, userMention } from "discord.js";

export function getUserMentionAndName(user: User): string {
    return `${userMention(user.id)} (${user.displayName} / ${user.username})`;
}
