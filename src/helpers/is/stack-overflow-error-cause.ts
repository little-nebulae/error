import type { StackOverflowErrorCause } from "@/classes/stack-overflow";

import { isInternalError } from "@/helpers/is/internal-error";
import { isRangeError } from "@/helpers/is/range-error";

export function isStackOverflowError(
  value: unknown,
): value is StackOverflowErrorCause {
  if (
    isRangeError(value) &&
    value.message.includes("call stack size exceeded")
  ) {
    return true;
  }
  if (isInternalError(value) && value.message.includes("too much recursion")) {
    return true;
  }
  return false;
}
