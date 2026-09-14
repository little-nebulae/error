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
