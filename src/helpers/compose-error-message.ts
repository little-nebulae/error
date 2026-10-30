export const DEFAULT_FAILURE_REASON = "some unknown exception";

export function composeErrorMessage({
  operation,
  reason = DEFAULT_FAILURE_REASON,
}: {
  operation: string;
  reason?: string;
}) {
  return `Failed to ${operation} due to ${reason}.`;
}
