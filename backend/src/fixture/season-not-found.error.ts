export interface SeasonNotFoundError extends Error {
    name: "SeasonNotFoundError";
}

export function SeasonNotFoundError(message?: string): SeasonNotFoundError {
    const error = new Error() as SeasonNotFoundError;
    error.name = "SeasonNotFoundError";
    error.message = message ?? "The specified season was not found.";
    return error;
}

export function isSeasonNotFoundError(error: unknown): error is SeasonNotFoundError {
    return error instanceof Error && error.name === "SeasonNotFoundError";
}
