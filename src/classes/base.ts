import type { BaseErrorType } from "@/types";

export abstract class BaseError<
  TCode extends string,
  TCause = unknown,
  TMeta extends Record<string, unknown> | null = null,
>
  extends Error
  implements BaseErrorType<TCode, TCause, TMeta>
{
  // oxlint-disable-next-line unicorn/custom-error-definition
  abstract override readonly name: string;
  declare cause: TCause;
  abstract readonly code: TCode;
  readonly meta: TMeta;

  constructor({
    message,
    cause,
    meta,
  }: {
    message: string;
    cause: TCause;
    meta: TMeta;
  }) {
    super(message, { cause });
    this.meta = meta;
  }
}
