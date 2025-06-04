import { LanguageService } from "@backend/language/language.service";
import { language as Language } from "@prisma/client";
import { Awaitable, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { resolveKey } from "@sapphire/plugin-i18next";
import { PermissionFlagsBits } from "discord.js";

export class SetLanguageCommand extends Command {
    constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            description: "Change your language preference (DM) or server language (server)",
            name: "set-language",
            runIn: [CommandOptionsRunTypeEnum.Dm, CommandOptionsRunTypeEnum.GuildAny],
            requiredClientPermissions: [PermissionFlagsBits.ManageGuild],
        });
    }

    override registerApplicationCommands(registry: Command.Registry): Awaitable<void> {
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

    async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
        const languageService = this.container.moduleRef.get(LanguageService, { strict: false });
        const selectedLanguage = interaction.options.getString("language", true) as Language;

        if (interaction.inGuild() && interaction.guildId) {
            await languageService.setGuildLanguage(interaction.guildId, selectedLanguage);
            await interaction.reply(await resolveKey(interaction, "language:set:guild-reply", { language: languageService.languageNameMapping[selectedLanguage] }));
        } else {
            await languageService.setUserLanguage(interaction.user.id, selectedLanguage);
            await interaction.reply(await resolveKey(interaction, "language:set:user-reply", { language: languageService.languageNameMapping[selectedLanguage] }));
        }
    }
}
