export interface BaseErrorType<
  TCode extends string,
  TCause = unknown,
  TMeta extends Record<string, unknown> | null = null,
> extends Error {
  cause: TCause;
  code: TCode;
  meta: TMeta;
}
