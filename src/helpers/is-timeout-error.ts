import type { Tagged } from "type-fest";

export const TIMEOUT_ERROR_NAME = "TimeoutError";
export type TimeoutErrorName = typeof TIMEOUT_ERROR_NAME;

export type TimeoutError = Tagged<DOMException, TimeoutErrorName>;

export function isTimeoutError(value: unknown): value is TimeoutError {
  if (value instanceof DOMException && value.name === TIMEOUT_ERROR_NAME) {
    return true;
  }
  return false;
}
