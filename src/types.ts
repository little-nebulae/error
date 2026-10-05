import type { UnknownRecord } from "type-fest";

export type BaseErrorMeta = UnknownRecord | null;

export interface BaseErrorType<
  TCode extends string,
  TCause = unknown,
  TMeta extends BaseErrorMeta = null,
> extends Error {
  cause: TCause;
  code: TCode;
  meta: TMeta;
}
