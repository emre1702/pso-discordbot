import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface NoRunningOrFinishedSeasonError extends UserFacingError {
    name: "NoRunningOrFinishedSeasonError";
}

export function NoRunningOrFinishedSeasonError(message?: string): NoRunningOrFinishedSeasonError {
    const error = new UserFacingError() as NoRunningOrFinishedSeasonError;
    error.name = "NoRunningOrFinishedSeasonError";
    error.message = message ?? "The season can't be a running or finished season. Please specify a future season.";
    return error;
}

export function isNoRunningOrFinishedSeasonError(error: unknown): error is NoRunningOrFinishedSeasonError {
    return error instanceof Error && error.name === "NoRunningOrFinishedSeasonError";
}
