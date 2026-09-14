import type { ErrorObject, Options } from "serialize-error";

export interface BaseErrorType<
  TCode extends string,
  TCause = unknown,
  TMeta extends Record<string, unknown> | null = null,
> extends Error {
  cause: TCause;
  stack: string;
  code: TCode;
  meta: TMeta;
}

export type DeepSerializeErrorOptions = Options;
export type PlainErrorObject = ErrorObject;
