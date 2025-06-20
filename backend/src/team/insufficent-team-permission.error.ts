export interface InsufficientPermissionError extends Error {
    name: "InsufficientPermissionError";
}

export function InsufficientPermissionError(message?: string): InsufficientPermissionError {
    const error = new Error() as InsufficientPermissionError;
    error.name = "InsufficientPermissionError";
    error.message = message ?? "You are not allowed to perform this action.";
    return error;
}

export function isInsufficientPermissionError(error: unknown): error is InsufficientPermissionError {
    return error instanceof Error && error.name === "InsufficientPermissionError";
}
