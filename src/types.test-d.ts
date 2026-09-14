import { describe, expectTypeOf, test } from "vitest";

import type { BaseErrorType } from "@/types";

test("BaseErrorType should extend the built-in Error type", () => {
  expectTypeOf<BaseErrorType<string>>().toExtend<Error>();
});

describe("BaseErrorType should have property", () => {
  test("name", () => {
    expectTypeOf<BaseErrorType<string>>().toHaveProperty("name").toBeString();
  });
  test("message", () => {
    expectTypeOf<BaseErrorType<string>>()
      .toHaveProperty("message")
      .toBeString();
  });
  test("cause", () => {
    expectTypeOf<BaseErrorType<string>>().toHaveProperty("cause").toBeUnknown();
    expectTypeOf<BaseErrorType<string, null>>()
      .toHaveProperty("cause")
      .toBeNull();
  });
  test("stack", () => {
    expectTypeOf<BaseErrorType<string>>().toHaveProperty("stack").toBeString();
  });
  test("code", () => {
    expectTypeOf<BaseErrorType<string>>().toHaveProperty("code").toBeString();

    type ErrorCode = "ERROR";
    expectTypeOf<BaseErrorType<ErrorCode>>()
      .toHaveProperty("code")
      .toEqualTypeOf<ErrorCode>();
  });
});
