import type { AbortError } from "@/helpers/is-abort-error";
import type { BaseErrorMeta } from "@/types";

import { BaseError } from "@/classes/base";

export const ABORTED_ERROR_CODE = "ABORTED_ERROR";
export type AbortedErrorCode = typeof ABORTED_ERROR_CODE;

export type AbortedErrorCause = AbortError | { reason: AbortSignal["reason"] };

export class AbortedError<
  TCause extends AbortedErrorCause,
  TMeta extends BaseErrorMeta = null,
> extends BaseError<AbortedErrorCode, TCause, TMeta> {
  readonly name = "AbortedError";
  readonly code = ABORTED_ERROR_CODE;
}
