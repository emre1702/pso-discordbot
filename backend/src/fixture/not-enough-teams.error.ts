import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface NotEnoughTeamsError extends UserFacingError {
    name: "NotEnoughTeamsError";
}

export function NotEnoughTeamsError(message?: string): NotEnoughTeamsError {
    const error = new UserFacingError() as NotEnoughTeamsError;
    error.name = "NotEnoughTeamsError";
    error.message = message ?? "Not enough teams to create a fixture. At least 2 teams are required.";
    return error;
}

export function isNotEnoughTeamsError(error: unknown): error is NotEnoughTeamsError {
    return error instanceof Error && error.name === "NotEnoughTeamsError";
}
