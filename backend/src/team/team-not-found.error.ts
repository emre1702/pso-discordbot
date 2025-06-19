export interface TeamNotFoundError extends Error {
    name: "TeamNotFoundError";
}

export function TeamNotFoundError(message?: string): TeamNotFoundError {
    const error = new Error() as TeamNotFoundError;
    error.name = "TeamNotFoundError";
    error.message = message ?? "The given team was not found.";
    return error;
}

export function isTeamNotFoundError(error: unknown): error is TeamNotFoundError {
    return error instanceof Error && error.name === "TeamNotFoundError";
}
