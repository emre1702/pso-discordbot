export interface NoFixtureFoundError extends Error {
    name: "NoFixtureFoundError";
}

export function NoFixtureFoundError(message?: string): NoFixtureFoundError {
    const error = new Error() as NoFixtureFoundError;
    error.name = "NoFixtureFoundError";
    error.message = message ?? "No fixture found for the given teams and season.";
    return error;
}

export function isNoFixtureFoundError(error: unknown): error is NoFixtureFoundError {
    return error instanceof Error && error.name === "NoFixtureFoundError";
}
