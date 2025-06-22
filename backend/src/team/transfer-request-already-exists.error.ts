import { UserFacingError } from "@backend/utils/models/user-facing.error";

export interface TransferRequestAlreadyExistsError extends UserFacingError {
    name: "TransferRequestAlreadyExistsError";
}

export function TransferRequestAlreadyExistsError(message?: string): TransferRequestAlreadyExistsError {
    const error = new UserFacingError() as TransferRequestAlreadyExistsError;
    error.name = "TransferRequestAlreadyExistsError";
    error.message = message ?? "A transfer request does already exist.";
    return error;
}

export function isTransferRequestAlreadyExistsError(error: unknown): error is TransferRequestAlreadyExistsError {
    return error instanceof Error && error.name === "TransferRequestAlreadyExistsError";
}
