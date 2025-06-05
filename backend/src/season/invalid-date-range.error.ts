export interface InvalidDateRangeError extends Error {
    name: "InvalidDateRangeError";
}

export function InvalidDateRangeError(message?: string): InvalidDateRangeError {
    const error = new Error() as InvalidDateRangeError;
    error.name = "InvalidDateRangeError";
    error.message = message ?? "The provided date range is invalid. The end date cannot be before the start date.";
    return error;
}

export function isInvalidDateRangeError(error: unknown): error is InvalidDateRangeError {
    return error instanceof Error && error.name === "InvalidDateRangeError";
}
