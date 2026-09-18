// oxlint-disable vitest/no-conditional-expect

import { readFile } from "node:fs/promises";
import { describe, expect, test } from "vitest";

import { isAbortError } from "@/helpers/is-abort-error";
import { isError } from "@/helpers/is-error";

// Success cases
describe("isAbortError function should succeed when", async () => {
  test("operation was aborted with no reason provided", async () => {
    expect.hasAssertions();
    try {
      const controller = new AbortController();
      const signal = controller.signal;
      const readPromise = readFile("package.json", {
        encoding: "utf-8",
        signal,
      });
      controller.abort();
      await readPromise;
    } catch (error) {
      expect.assert(isError(error) === true);
      expect(isAbortError(error)).toBe(true);
    }
  });
});
