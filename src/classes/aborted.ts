import type { BaseErrorMeta } from "@/types";

import { BaseError } from "@/classes/base";

export const ABORTED_ERROR_CODE = "ABORTED_ERROR";
export type AbortedErrorCode = typeof ABORTED_ERROR_CODE;

export class AbortedError<TMeta extends BaseErrorMeta = null> extends BaseError<
  AbortedErrorCode,
  Error,
  TMeta
> {
  readonly name = "AbortedError";
  readonly code = ABORTED_ERROR_CODE;
}
