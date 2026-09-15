export function composeErrorMessage<
  TOperation extends string,
  TReason extends string,
>({
  operation,
  reason,
}: {
  operation: TOperation;
  reason: TReason;
}): `Failed to ${TOperation} due to ${TReason}.` {
  return `Failed to ${operation} due to ${reason}.`;
}
