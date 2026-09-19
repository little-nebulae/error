// oxlint-disable vitest/no-conditional-expect

import { readFile } from "node:fs/promises";
import { assert, describe, expect, test } from "vitest";

import { isAbortError } from "@/helpers/is-abort-error";
import { isError } from "@/helpers/is-error";

// Success cases
describe("isAbortError function should succeed when", async () => {
  test("operation was aborted with no reason provided", async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const readPromise = readFile("package.json", {
        encoding: "utf-8",
        signal,
      });
      controller.abort();
      await readPromise;
      expect.fail("Expected readPromise to throw");
    } catch (error) {
      assert(isError(error) === true);
      expect(isAbortError(error)).toBe(true);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(isError(reason) === true);
    expect(isAbortError(reason)).toBe(true);
  });
});
