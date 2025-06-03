import { UserModule } from "@backend/user/user.module";
import { Global, Module } from "@nestjs/common";
import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Global()
@Module({
    imports: [UserModule],
    providers: [TrpcService, TrpcRouter],
    exports: [TrpcService],
})
export class TrpcModule {}
