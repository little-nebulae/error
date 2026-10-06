export function isAggregateError(error: Error): error is AggregateError {
  return error.name === AggregateError.name;
}
