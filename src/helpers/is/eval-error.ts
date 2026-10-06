export function isEvalError(error: Error): error is EvalError {
  return error.name === EvalError.name;
}
