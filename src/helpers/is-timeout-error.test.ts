// oxlint-disable vitest/no-conditional-expect

import { readFile } from "node:fs/promises";
import { assert, describe, expect, test } from "vitest";

import { isTimeoutError } from "@/helpers/is-timeout-error";

// Success cases
describe("isTimeoutError function should succeed when", async () => {
  test("passed the cause of the error thrown by read file's timeout signal", async () => {
    try {
      const text = await readFile("package.json", {
        encoding: "utf-8",
        signal: AbortSignal.timeout(1),
      });
      console.log(text);
      expect.fail("Expected readFile to throw");
    } catch (error) {
      assert(error instanceof Error);
      const originalError = error.cause;
      assert(isTimeoutError(originalError));
      expect(originalError.cause).toBeUndefined();
    }
  });

  test("passed the thrown exception of a timed out fetch call", async () => {
    try {
      const response = await fetch("https://example.com", {
        signal: AbortSignal.timeout(1),
      });
      const text = await response.text();
      console.log(text);
      expect.fail("Expected fetch to throw");
    } catch (error) {
      assert(isTimeoutError(error));
      expect(error.cause).toBeUndefined();
    }
  });
});

// Failure cases
describe("isTimeoutError function should fail when", async () => {
  test("passed the thrown exception of a timed out read file", async () => {
    try {
      const text = await readFile("package.json", {
        encoding: "utf-8",
        signal: AbortSignal.timeout(1),
      });
      console.log(text);
      expect.fail("Expected readFile to throw");
    } catch (error) {
      expect(isTimeoutError(error)).toBe(false);
    }
  });
});
