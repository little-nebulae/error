import { BaseError } from "@/classes/base";

export const UNEXPECTED_ERROR_CODE = "UNEXPECTED_ERROR";
export type UnexpectedErrorCode = typeof UNEXPECTED_ERROR_CODE;

export class UnexpectedError<
  TCause = unknown,
  TMeta extends Record<string, unknown> | null = null,
> extends BaseError<UnexpectedErrorCode, TCause, TMeta> {
  readonly name = "UnexpectedError";
  readonly code = UNEXPECTED_ERROR_CODE;
}
