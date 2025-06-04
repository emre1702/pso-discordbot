// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace NodeJS {
    interface ProcessEnv {
        DISCORD_TOKEN: string;
        ENVIRONMENT: "development" | "production";
        PORT: string;
        DATABASE_URL: string;
    }
}
