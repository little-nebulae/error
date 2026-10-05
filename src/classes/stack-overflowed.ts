import type { StackOverflowError } from "@/helpers/is/stack-overflow-error";
import type { BaseErrorMeta } from "@/types";

import { BaseError } from "@/classes/base";

export const STACK_OVERFLOWED_ERROR_CODE = "STACK_OVERFLOWED_ERROR";
export type StackOverflowedErrorCode = typeof STACK_OVERFLOWED_ERROR_CODE;

export class StackOverflowedError<
  TMeta extends BaseErrorMeta = null,
> extends BaseError<StackOverflowedErrorCode, StackOverflowError, TMeta> {
  readonly name = "StackOverflowedError";
  readonly code = STACK_OVERFLOWED_ERROR_CODE;
}
