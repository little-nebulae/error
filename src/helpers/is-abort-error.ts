import { isError } from "@/helpers/is-error";

export function isAbortError(value: unknown): value is Error {
  if (
    isError(value) &&
    (value.name === "AbortError" ||
      (Object.hasOwn(value, "code") &&
        (value as Error & { code: string }).code === "ABORT_ERR"))
  ) {
    return true;
  }
  return false;
}
