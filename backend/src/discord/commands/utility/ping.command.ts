import { Command } from "@sapphire/framework";
import { resolveKey } from "@sapphire/plugin-i18next";
import { InteractionResponse, PermissionFlagsBits } from "discord.js";

export class Ping extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, { ...options });
    }

    public override registerApplicationCommands(registry: Command.Registry): void {
        registry.registerChatInputCommand((builder) =>
            builder.setName("ping").setDescription("Responds with Pong from ping").setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
        );
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction): Promise<InteractionResponse<boolean>> {
        return interaction.reply(await resolveKey(interaction, "ping:reply"));
    }
}
