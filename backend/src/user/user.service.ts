import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    verifyAccessToken(_token: string): { user: any } {
        //TODO: Implement access token verification logic
        return { user: undefined }; // Placeholder for actual verification logic
    }
}
