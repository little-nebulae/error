import type { Tagged } from "type-fest";

import type { InternalError } from "@/helpers/is/internal-error";
import type { BaseErrorMeta } from "@/types";

import { BaseError } from "@/classes/base";

export const STACK_OVERFLOW_ERROR_CODE = "STACK_OVERFLOW_ERROR";
export type StackOverflowErrorCode = typeof STACK_OVERFLOW_ERROR_CODE;

export type StackOverflowErrorCauseTag = "StackOverflowErrorCause";
export type StackOverflowErrorCause = Tagged<
  RangeError | InternalError,
  StackOverflowErrorCauseTag
>;

export class StackOverflowError<
  TMeta extends BaseErrorMeta = null,
> extends BaseError<StackOverflowErrorCode, StackOverflowErrorCause, TMeta> {
  readonly name = "StackOverflowError";
  readonly code = STACK_OVERFLOW_ERROR_CODE;
}
