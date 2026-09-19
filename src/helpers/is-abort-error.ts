import type { Branded } from "@little-nebulae/type-utils";

import { isError } from "@/helpers/is-error";

export const ABORT_ERROR_NAME = "AbortError";
export type AbortErrorName = typeof ABORT_ERROR_NAME;

export const ABORT_ERROR_CODE = "ABORT_ERR";
export type AbortErrorCode = typeof ABORT_ERROR_CODE;

export type AbortError = Branded<Error, AbortErrorName>;

export function isAbortError(value: unknown): value is AbortError {
  if (isError(value)) {
    if (value.name === ABORT_ERROR_NAME) {
      return true;
    }
    if (
      Object.hasOwn(value, "code") &&
      (value as Error & { code: string }).code === ABORT_ERROR_CODE
    ) {
      return true;
    }
  }
  return false;
}
