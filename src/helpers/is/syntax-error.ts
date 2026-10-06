export function isSyntaxError(error: Error): error is SyntaxError {
  return error.name === SyntaxError.name;
}
