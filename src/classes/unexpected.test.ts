import { describe, expect, test } from "vitest";

import { BaseError } from "@/classes/base";
import { UnexpectedError } from "@/classes/unexpected";

describe("An UnexpectedError instance should", () => {
  const unexpectedError = new UnexpectedError({
    message: "Something went wrong.",
    cause: new TypeError(),
    meta: { format: "json" },
  });

  test("also be an instance of the built-in Error class", () => {
    expect(unexpectedError).toBeInstanceOf(Error);
  });

  test("also be an instance of the BaseError class", () => {
    expect(unexpectedError).toBeInstanceOf(BaseError);
  });

  test("have the code of UNEXPECTED_ERROR", () => {
    expect(unexpectedError).toHaveProperty("code", "UNEXPECTED_ERROR");
  });
});
