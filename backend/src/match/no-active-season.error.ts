export interface NoActiveSeasonError extends Error {
    name: "NoActiveSeasonError";
}

export function NoActiveSeasonError(message?: string): NoActiveSeasonError {
    const error = new Error() as NoActiveSeasonError;
    error.name = "NoActiveSeasonError";
    error.message = message ?? "Season not found. Please provide a valid season or none if there is an active one.";
    return error;
}

export function isNoActiveSeasonError(error: unknown): error is NoActiveSeasonError {
    return error instanceof Error && error.name === "NoActiveSeasonError";
}
