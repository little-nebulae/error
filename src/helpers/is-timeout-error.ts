import type { Branded } from "@little-nebulae/type-utils";

export const TIMEOUT_ERROR_NAME = "TimeoutError";
export type TimeoutErrorName = typeof TIMEOUT_ERROR_NAME;

export type TimeoutError = Branded<DOMException, TimeoutErrorName>;

export function isTimeoutError(value: unknown): value is TimeoutError {
  if (value instanceof DOMException && value.name === TIMEOUT_ERROR_NAME) {
    return true;
  }
  return false;
}
