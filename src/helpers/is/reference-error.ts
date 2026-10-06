export function isReferenceError(error: Error): error is ReferenceError {
  return error.name === ReferenceError.name;
}
