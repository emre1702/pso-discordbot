import { User } from "discord.js";
import getTFunction from "./get-t-function.util";

export async function sendMessage(user: User, message: string, source?: User): Promise<void> {
    await user.send(message).catch(async (error) => {
        const tFunction = await getTFunction({ userId: user.id });
        await source?.send(
            tFunction("utility:message:send-failed", {
                username: user.username,
                userId: user.id,
                error: error.message,
            })
        );
    });
}
