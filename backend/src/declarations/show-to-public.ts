import { CommandInteractionOptionResolver, SlashCommandSubcommandBuilder } from "discord.js";

SlashCommandSubcommandBuilder.prototype.addShowToPublicOption = function (): ReturnType<SlashCommandSubcommandBuilder["addBooleanOption"]> {
    return this.addBooleanOption((option) =>
        option //
            .setName("show_to_public")
            .setDescription("Whether to show detailed information about each setting")
            .setRequired(false)
    );
};

CommandInteractionOptionResolver.prototype.getShowToPublic = function (): boolean {
    return this.getBoolean("show_to_public") ?? false;
};

export {};
