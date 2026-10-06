export function isUriError(error: Error): error is URIError {
  return error.name === URIError.name;
}
