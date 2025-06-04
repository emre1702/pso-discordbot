import { LanguageService } from "@backend/language/language.service";
import { language as Language } from "@prisma/client";
import { Awaitable, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { PermissionFlagsBits } from "discord.js";

export class SetLanguageCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            description: "Change your language preference (DM) or server language (server)",
            name: "set-language",
            runIn: [CommandOptionsRunTypeEnum.Dm, CommandOptionsRunTypeEnum.GuildAny],
        });
    }

    public override registerApplicationCommands(registry: Command.Registry): Awaitable<void> {
        const languageService = this.container.moduleRef.get(LanguageService, { strict: false });

        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .addStringOption((option) =>
                    option //
                        .setName("language")
                        .setDescription("The language to set.")
                        .setRequired(true)
                        .addChoices(Object.keys(languageService.languageNameMapping).map((lang) => ({ value: lang, name: languageService.languageNameMapping[lang] })))
                )
                .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
        );
    }

    public async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        const languageService = this.container.moduleRef.get(LanguageService, { strict: false });
        const selectedLanguage = interaction.options.getString("language", true) as Language;

        if (interaction.inGuild() && interaction.guildId) {
            await languageService.setGuildLanguage(interaction.guildId, selectedLanguage);
            await interaction.reply(`Server language set to ${languageService.languageNameMapping[selectedLanguage]}.`);
        } else {
            await languageService.setUserLanguage(interaction.user.id, selectedLanguage);
            await interaction.reply(`Your language preference set to ${languageService.languageNameMapping[selectedLanguage]}.`);
        }
    }
}
