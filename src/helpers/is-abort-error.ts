import type { Branded } from "@little-nebulae/type-utils";

import { isError } from "@/helpers/is-error";

export type AbortError = Branded<Error, "AbortError">;

export function isAbortError(value: unknown): value is AbortError {
  if (isError(value)) {
    if (value.name === "AbortError") {
      return true;
    }
    if (
      Object.hasOwn(value, "code") &&
      (value as Error & { code: string }).code === "ABORT_ERR"
    ) {
      return true;
    }
  }
  return false;
}
