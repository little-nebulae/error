import { describe, expect, test } from "vitest";

import { isTypeError } from "@/helpers/is/type-error";

// Success case
test("isTypeError should return true for a TypeError instance", () => {
  const error = new TypeError();
  expect(isTypeError(error)).toBe(true);
});

// Failure cases
describe("isTypeError should fail", () => {
  test("when input is an Error instance", () => {
    const error = new Error();
    expect(isTypeError(error)).toBe(false);
  });

  test("when input is a SyntaxError instance", () => {
    const error = new SyntaxError();
    expect(isTypeError(error)).toBe(false);
  });
});
