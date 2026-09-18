import type { Branded } from "@little-nebulae/type-utils";

export type AbortError = Branded<Error, "AbortError">;

export function isAbortError(error: Error): error is AbortError {
  if (error.name === "AbortError") {
    return true;
  }
  if (
    Object.hasOwn(error, "code") &&
    (error as Error & { code: string }).code === "ABORT_ERR"
  ) {
    return true;
  }
  return false;
}
