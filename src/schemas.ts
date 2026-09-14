import { z } from "zod";

export const ErrorMetaSchema = z.union([
  z.record(z.string(), z.json()),
  z.null(),
]);

export function FlatErrorObjectSchema<TCode extends string>(code: TCode) {
  return z.object({
    name: z.string(),
    message: z.string(),
    code: z.literal(code),
    meta: ErrorMetaSchema,
  });
}
export type FlatErrorObject<TCode extends string> = z.infer<
  ReturnType<typeof FlatErrorObjectSchema<TCode>>
>;

export function NestedErrorObjectSchema<TCode extends string>(code: TCode) {
  return z
    .object({
      name: z.string(),
      message: z.string(),
      cause: z.json(),
      stack: z.string(),
      code: z.literal(code),
      meta: ErrorMetaSchema,
    })
    .catchall(z.json());
}
export type NestedErrorObject<TCode extends string> = z.infer<
  ReturnType<typeof NestedErrorObjectSchema<TCode>>
>;
