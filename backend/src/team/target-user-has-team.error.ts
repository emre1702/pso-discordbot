import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface TargetUserHasTeamError extends UserFacingError {
    name: "TargetUserHasTeamError";
}

export function TargetUserHasTeamError(message?: string): TargetUserHasTeamError {
    const error = new UserFacingError() as TargetUserHasTeamError;
    error.name = "TargetUserHasTeamError";
    error.message = message ?? "The target user is already in a team.";
    return error;
}

export function isTargetUserHasTeamError(error: unknown): error is TargetUserHasTeamError {
    return error instanceof Error && error.name === "TargetUserHasTeamError";
}
