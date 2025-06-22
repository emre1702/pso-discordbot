export interface AlreadyInATeamError extends Error {
    name: "AlreadyInATeamError";
}

export function AlreadyInATeamError(message?: string): AlreadyInATeamError {
    const error = new Error() as AlreadyInATeamError;
    error.name = "AlreadyInATeamError";
    error.message = message ?? "You are already in a team.";
    return error;
}

export function isAlreadyInATeamError(error: unknown): error is AlreadyInATeamError {
    return error instanceof Error && error.name === "AlreadyInATeamError";
}
