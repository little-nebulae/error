import { isError } from "@/helpers/is-error";

export const INTERNAL_ERROR_NAME = "InternalError";
export type InternalErrorName = typeof INTERNAL_ERROR_NAME;

export interface InternalError extends Error {
  name: InternalErrorName;
}

export function isInternalError(value: unknown): value is InternalError {
  return isError(value) && value.name === INTERNAL_ERROR_NAME;
}
