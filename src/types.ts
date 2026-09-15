export type BaseErrorMeta = Record<string, unknown> | null;

export interface BaseErrorType<
  TCode extends string,
  TCause = unknown,
  TMeta extends BaseErrorMeta = null,
> extends Error {
  cause: TCause;
  code: TCode;
  meta: TMeta;
}
