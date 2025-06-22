export class UserFacingError extends Error {}

export function isUserFacingError(error: unknown): error is UserFacingError {
    return error instanceof UserFacingError;
}
