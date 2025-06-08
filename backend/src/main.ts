import { NestFactory } from "@nestjs/core";
import { config } from "dotenv";
import { AppModule } from "./app.module";
import "./declarations/guild-settings-subcommands";
import "./declarations/show-to-public";

async function bootstrap(): Promise<void> {
    config();

    const app = await NestFactory.create(AppModule);
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
