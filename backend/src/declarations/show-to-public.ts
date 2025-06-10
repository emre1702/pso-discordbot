import {
    CommandInteractionOptionResolver,
    SharedSlashCommandOptions,
    SlashCommandOptionsOnlyBuilder,
    SlashCommandSubcommandBuilder,
} from "discord.js";

SlashCommandSubcommandBuilder.prototype.addShowToPublicOption = function (): ReturnType<SlashCommandSubcommandBuilder["addBooleanOption"]> {
    return this.addBooleanOption((option) =>
        option //
            .setName("show_to_public")
            .setDescription("Whether to output for everyone to see")
            .setRequired(false)
    );
};

CommandInteractionOptionResolver.prototype.getShowToPublic = function (): boolean {
    return this.getBoolean("show_to_public") ?? false;
};

SharedSlashCommandOptions.prototype.addShowToPublicOption = function (): ReturnType<
    SharedSlashCommandOptions<SlashCommandOptionsOnlyBuilder>["addBooleanOption"]
> {
    return this.addBooleanOption((option) =>
        option //
            .setName("show_to_public")
            .setDescription("Whether to output for everyone to see")
            .setRequired(false)
    );
};

export {};
