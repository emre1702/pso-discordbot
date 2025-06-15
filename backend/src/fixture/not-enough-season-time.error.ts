export interface NotEnoughSeasonTimeError extends Error {
    name: "NotEnoughSeasonTimeError";
}

export function NotEnoughSeasonTimeError(message?: string): NotEnoughSeasonTimeError {
    const error = new Error() as NotEnoughSeasonTimeError;
    error.name = "NotEnoughSeasonTimeError";
    error.message = message ?? "Not enough time in the season to create the fixture within the given dates.";
    return error;
}

export function isNotEnoughSeasonTimeError(error: unknown): error is NotEnoughSeasonTimeError {
    return error instanceof Error && error.name === "NotEnoughSeasonTimeError";
}
