export function isError(value: unknown): value is Error {
  if (Object.hasOwn(Error, "isError") && Error.isError(value)) {
    return true;
  }
  if (value instanceof Error) {
    return true;
  }
  return false;
}
