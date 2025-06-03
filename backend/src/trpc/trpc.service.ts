import { UserService } from "@backend/user/user.service";
import { Injectable } from "@nestjs/common";
import { initTRPC, TRPCError } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { SuperJSON } from "superjson";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface TrpcContext extends CreateExpressContextOptions {}

export const createContext = async (opts: trpcExpress.CreateExpressContextOptions): Promise<unknown> => {
    return {
        req: opts.req,
        res: opts.res,
    };
};

@Injectable()
export class TrpcService {
    trpc = initTRPC.context<TrpcContext>().create({
        transformer: SuperJSON,
    });

    constructor(private readonly userService: UserService) {}

    publicProcedure(): typeof this.trpc.procedure {
        return this.trpc.procedure;
    }

    // these routes requires authentication:
    // if allowedRoles is empty, it requires an authenticated user (access token in the header)
    // if allowedRoles is not empty, it requires an authenticated user with one of the allowed roles
    protectedProcedure(allowedRoles?: string[]): typeof this.trpc.procedure {
        const procedure = this.trpc.procedure.use(async (opts) => {
            // get bearer from headers
            const userJwt = await this.getJwtUserFromHeader(opts.ctx);
            // throw error if user is unauthorized
            if (!userJwt || (allowedRoles?.length && !userJwt.user.roles?.some((role) => allowedRoles.includes(role.name)))) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            // user is authorized
            return opts.next({
                ctx: {
                    ...opts.ctx,
                    user: userJwt.user,
                },
            });
        });
        return procedure;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async getJwtUserFromHeader(ctx: TrpcContext): Promise<{ user: any }> {
        // get bearer from headers
        const accessToken = ctx.req.headers.authorization?.replace("Bearer ", "") || "";
        if (!accessToken) {
            throw new TRPCError({ code: "UNAUTHORIZED" });
        }

        // check if user has role privilege
        return this.userService.verifyAccessToken(accessToken);
    }
}
