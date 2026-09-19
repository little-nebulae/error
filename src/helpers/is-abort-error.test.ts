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
    const readPromise = readFile("package.json", {
      encoding: "utf-8",
      signal,
    });
    controller.abort();

    try {
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
    expect(reason.cause).toBeUndefined();
  });

  test("the request is aborted with no reason provided after the fetch() call has been fulfilled but before the response body has been read", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch("https://example.com", { signal });
    controller.abort();

    try {
      const text = await response.text();
      console.log(text);
      expect.fail("Expected await response.text() to throw");
    } catch (error) {
      assert(isError(error) === true);
      expect(isAbortError(error)).toBe(true);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(isError(reason) === true);
    expect(isAbortError(reason)).toBe(true);
    expect(reason.cause).toBeUndefined();
  });
});
