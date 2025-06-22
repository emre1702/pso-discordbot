import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface TransferRequestNotFoundError extends UserFacingError {
    name: "TransferRequestNotFoundError";
}

export function TransferRequestNotFoundError(message?: string): TransferRequestNotFoundError {
    const error = new UserFacingError() as TransferRequestNotFoundError;
    error.name = "TransferRequestNotFoundError";
    error.message = message ?? "The transfer request was not found.";
    return error;
}

export function isTransferRequestNotFoundError(error: unknown): error is TransferRequestNotFoundError {
    return error instanceof Error && error.name === "TransferRequestNotFoundError";
}
