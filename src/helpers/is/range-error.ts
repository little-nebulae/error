import { isError } from "@/helpers/is/error";

export function isRangeError(value: unknown): value is RangeError {
  if (isError(value) && value.name === RangeError.name) {
    return true;
  }
  if (value instanceof RangeError) {
    return true;
  }
  return false;
}
