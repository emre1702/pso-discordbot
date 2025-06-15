export function splitMessageByLength(message: string, splitOnChars = "\n\n", maxLength = 2000): string[] {
    if (message.length <= maxLength) {
        return [message];
    }

    const messages: string[] = [];
    const parts = message.split(splitOnChars);
    let currentMessage = "";
    for (const part of parts) {
        if (currentMessage.length + part.length + splitOnChars.length > maxLength) {
            if (currentMessage) {
                messages.push(currentMessage);
            }
            currentMessage = part;
        } else {
            if (currentMessage) {
                currentMessage += splitOnChars;
            }
            currentMessage += part;
        }
    }
    if (currentMessage) {
        messages.push(currentMessage);
    }
    return messages;
}
