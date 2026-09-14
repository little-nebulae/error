import type { ErrorObject, Options } from "serialize-error";

export interface BaseErrorType<
  TCode extends string,
  TCause = unknown,
> extends Error {
  cause: TCause;
  stack: string;
  code: TCode;
}

export type DeepSerializeErrorOptions = Options;
export type PlainErrorObject = ErrorObject;
