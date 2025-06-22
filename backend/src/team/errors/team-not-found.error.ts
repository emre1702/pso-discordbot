import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface TeamNotFoundError extends UserFacingError {
    name: "TeamNotFoundError";
}

export function TeamNotFoundError(message?: string): TeamNotFoundError {
    const error = new UserFacingError() as TeamNotFoundError;
    error.name = "TeamNotFoundError";
    error.message = message ?? "The given team was not found.";
    return error;
}

export function isTeamNotFoundError(error: unknown): error is TeamNotFoundError {
    return error instanceof Error && error.name === "TeamNotFoundError";
}
