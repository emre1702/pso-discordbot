import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface SeasonNotFoundError extends UserFacingError {
    name: "SeasonNotFoundError";
}

export function SeasonNotFoundError(message?: string): SeasonNotFoundError {
    const error = new UserFacingError() as SeasonNotFoundError;
    error.name = "SeasonNotFoundError";
    error.message = message ?? "The specified season was not found.";
    return error;
}

export function isSeasonNotFoundError(error: unknown): error is SeasonNotFoundError {
    return error instanceof Error && error.name === "SeasonNotFoundError";
}
