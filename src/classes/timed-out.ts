import type { TimeoutError } from "@/helpers/is-timeout-error";
import type { BaseErrorMeta } from "@/types";

import { BaseError } from "@/classes/base";

export const TIMED_OUT_ERROR_CODE = "TIMED_OUT_ERROR";
export type TimedOutErrorCode = typeof TIMED_OUT_ERROR_CODE;

export class TimedOutError<
  TMeta extends BaseErrorMeta = null,
> extends BaseError<TimedOutErrorCode, TimeoutError, TMeta> {
  readonly name = "TimedOutError";
  readonly code = TIMED_OUT_ERROR_CODE;
}
