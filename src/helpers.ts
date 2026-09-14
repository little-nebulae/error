import { serializeError } from "serialize-error";

import type { NestedErrorObject } from "@/schemas";
import type {
  BaseErrorType,
  DeepSerializeErrorOptions,
  PlainErrorObject,
} from "@/types";

export function deepSerializeAnyError(
  error: unknown,
  options: DeepSerializeErrorOptions = {},
): PlainErrorObject {
  const { maxDepth = 50, useToJSON } = options;
  return serializeError(error, { maxDepth, useToJSON });
}

export function deepSerializeBaseError<TError extends BaseErrorType<string>>(
  error: TError,
  options: DeepSerializeErrorOptions = {},
): NestedErrorObject<TError["code"]> {
  const { maxDepth = 50, useToJSON } = options;
  return serializeError(error, { maxDepth, useToJSON }) as NestedErrorObject<
    TError["code"]
  >;
}
