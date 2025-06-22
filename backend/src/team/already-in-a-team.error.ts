import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface AlreadyInATeamError extends UserFacingError {
    name: "AlreadyInATeamError";
}

export function AlreadyInATeamError(message?: string): AlreadyInATeamError {
    const error = new UserFacingError() as AlreadyInATeamError;
    error.name = "AlreadyInATeamError";
    error.message = message ?? "You are already in a team.";
    return error;
}

export function isAlreadyInATeamError(error: unknown): error is AlreadyInATeamError {
    return error instanceof Error && error.name === "AlreadyInATeamError";
}
