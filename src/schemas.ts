import { z } from "zod";

export function FlatErrorObjectSchema<TCode extends string>(code: TCode) {
  return z.object({
    name: z.string().min(1),
    message: z.string().min(1),
    code: z.literal(code),
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
    })
    .catchall(z.json());
}
export type NestedErrorObject<TCode extends string> = z.infer<
  ReturnType<typeof NestedErrorObjectSchema<TCode>>
>;
