import { LanguageService } from "@backend/language/language.service";
import { Awaitable, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { resolveKey } from "@sapphire/plugin-i18next";

export class SetLanguageCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            description: "Get your language preference (DM) or server language (server)",
            name: "get-language",
            runIn: [CommandOptionsRunTypeEnum.Dm, CommandOptionsRunTypeEnum.GuildAny],
        });
    }

    public override registerApplicationCommands(registry: Command.Registry): Awaitable<void> {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        const languageService = this.container.moduleRef.get(LanguageService, { strict: false });

        if (interaction.inGuild() && interaction.guildId) {
            const guildLanguage = await languageService.getGuildLanguage(interaction.guildId);
            await interaction.reply(
                await resolveKey(interaction, "language:get:guild-reply", { language: guildLanguage ? languageService.languageNameMapping[guildLanguage] : "-" })
            );
        } else {
            const userLanguage = await languageService.getUserLanguage(interaction.user.id);
            await interaction.reply(await resolveKey(interaction, "language:get:user-reply", { language: userLanguage ? languageService.languageNameMapping[userLanguage] : "-" }));
        }
    }
}
