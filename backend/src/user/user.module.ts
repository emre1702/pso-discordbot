import { DatabaseModule } from "@backend/database/database.module";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";

@Module({
    providers: [UserService],
    exports: [UserService],
    imports: [DatabaseModule],
})
export class UserModule {}
