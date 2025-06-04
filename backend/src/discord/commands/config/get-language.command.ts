import { LanguageService } from "@backend/language/language.service";
import { Awaitable, Command, CommandOptionsRunTypeEnum } from "@sapphire/framework";
import { resolveKey } from "@sapphire/plugin-i18next";
import { PermissionFlagsBits } from "discord.js";

export class SetLanguageCommand extends Command {
    constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            description: "Get your language preference (DM) or server language (server)",
            name: "get-language",
            runIn: [CommandOptionsRunTypeEnum.Dm, CommandOptionsRunTypeEnum.GuildAny],
        });
    }

    override registerApplicationCommands(registry: Command.Registry): Awaitable<void> {
        registry.registerChatInputCommand((builder) =>
            builder //
                .setName(this.name)
                .setDescription(this.description)
                .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        );
    }

    async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<void> {
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
