import { INestApplication, Injectable } from "@nestjs/common";
import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { createContext, TrpcService } from "./trpc.service";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

@Injectable()
export class TrpcRouter {
    appRouter: Parameters<typeof trpcExpress.createExpressMiddleware>[0]["router"];

    constructor(private readonly trpcService: TrpcService) {
        this.appRouter = this.trpcService.trpc.router({
            //TODO: Add the routers here
        });
    }

    async applyMiddleware(app: INestApplication): Promise<void> {
        app.use(
            `/trpc`,
            trpcExpress.createExpressMiddleware({
                router: this.appRouter,
                createContext,
            })
        );
    }
}

export type AppRouter = TrpcRouter["appRouter"];
