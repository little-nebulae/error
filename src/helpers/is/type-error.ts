export function isTypeError(error: Error): error is TypeError {
  return error.name === TypeError.name;
}
