import type { Tagged } from "type-fest";

import type { InternalError } from "@/helpers/is/internal-error";

import { isInternalError } from "@/helpers/is/internal-error";
import { isRangeError } from "@/helpers/is/range-error";

export type StackOverflowErrorTag = "StackOverflowError";
export type StackOverflowError = Tagged<
  RangeError | InternalError,
  StackOverflowErrorTag
>;

export function isStackOverflowError(
  value: unknown,
): value is StackOverflowError {
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
