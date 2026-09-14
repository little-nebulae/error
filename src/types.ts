export interface BaseErrorType<
  TCode extends string,
  TCause = unknown,
> extends Error {
  cause: TCause;
  stack: string;
  code: TCode;
}
