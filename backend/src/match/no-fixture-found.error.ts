import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface NoFixtureFoundError extends UserFacingError {
    name: "NoFixtureFoundError";
}

export function NoFixtureFoundError(message?: string): NoFixtureFoundError {
    const error = new UserFacingError() as NoFixtureFoundError;
    error.name = "NoFixtureFoundError";
    error.message = message ?? "No fixture found for the given teams and season.";
    return error;
}

export function isNoFixtureFoundError(error: unknown): error is NoFixtureFoundError {
    return error instanceof Error && error.name === "NoFixtureFoundError";
}
