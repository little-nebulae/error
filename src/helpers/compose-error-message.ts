export const DEFAULT_FAILURE_REASON = "some unexpected error";

export function composeErrorMessage({
  operation,
  reason = DEFAULT_FAILURE_REASON,
}: {
  operation: string;
  reason?: string;
}) {
  return `Failed to ${operation} due to ${reason}.`;
}
