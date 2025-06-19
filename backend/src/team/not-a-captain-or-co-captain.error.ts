export interface NotACaptainOrCoCaptainError extends Error {
    name: "NotACaptainOrCoCaptainError";
}

export function NotACaptainOrCoCaptainError(message?: string): NotACaptainOrCoCaptainError {
    const error = new Error() as NotACaptainOrCoCaptainError;
    error.name = "NotACaptainOrCoCaptainError";
    error.message = message ?? "You are not a captain or co-captain of this team.";
    return error;
}

export function isNotACaptainOrCoCaptainError(error: unknown): error is NotACaptainOrCoCaptainError {
    return error instanceof Error && error.name === "NotACaptainOrCoCaptainError";
}
