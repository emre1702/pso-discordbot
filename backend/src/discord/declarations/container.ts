import { ModuleRef } from "@nestjs/core";

declare module "@sapphire/pieces" {
    interface Container {
        // Use NestJS ModuleRef to access NestJS services
        moduleRef: ModuleRef;
    }
}
