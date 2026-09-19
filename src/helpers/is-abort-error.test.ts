// oxlint-disable vitest/no-conditional-expect

import { readFile } from "node:fs/promises";
import { assert, describe, expect, test } from "vitest";

import { isAbortError } from "@/helpers/is-abort-error";

// Success cases
describe("isAbortError function should succeed when", async () => {
  test("the read file promise is aborted with no reason provided", async () => {
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
      assert(isAbortError(error));

      const originalError = error.cause;
      assert(isAbortError(originalError));
      expect(originalError.cause).toBeUndefined();
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(isAbortError(reason));
    expect(reason.cause).toBeUndefined();
  });

  test("the fetch promise is aborted with no reason provided", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchPromise = fetch("https://example.com", { signal });
    controller.abort();

    try {
      await fetchPromise;
      expect.fail("Expected fetchPromise to throw");
    } catch (error) {
      assert(isAbortError(error));
      expect(error.cause).toBeUndefined();
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(isAbortError(reason));
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
      assert(isAbortError(error));
      expect(error.cause).toBeUndefined();
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(isAbortError(reason));
    expect(reason.cause).toBeUndefined();
  });
});

// Failure cases
describe("isAbortError function should fail when", async () => {
  test("the fetch promise is aborted with a non-AbortError reason provided", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchPromise = fetch("https://example.com", { signal });
    const abortReason = "Something went wrong";
    controller.abort(abortReason);

    try {
      await fetchPromise;
      expect.fail("Expected fetchPromise to throw");
    } catch (error) {
      expect(isAbortError(error)).toBe(false);
      expect(error).toBe(abortReason);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    expect(isAbortError(reason)).toBe(false);
    expect(reason).toBe(abortReason);
  });

  test("the request is aborted with a non-AbortError reason provided after the fetch() call has been fulfilled but before the response body has been read", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const response = await fetch("https://example.com", { signal });
    const abortReason = "Something went wrong";
    controller.abort(abortReason);

    try {
      const text = await response.text();
      console.log(text);
      expect.fail("Expected await response.text() to throw");
    } catch (error) {
      expect(isAbortError(error)).toBe(false);
      expect(error).toBe(abortReason);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    expect(isAbortError(reason)).toBe(false);
    expect(reason).toBe(abortReason);
  });
});

// Other cases
test("isAbortError function should succeed when passed the error thrown by an aborted read file promise but should fail when passed the abort reason because the abort reason is a non-AbortError value", async () => {
  const controller = new AbortController();
  const signal = controller.signal;
  const readPromise = readFile("package.json", {
    encoding: "utf-8",
    signal,
  });
  const abortReason = "Something went wrong";
  controller.abort(abortReason);

  try {
    await readPromise;
    expect.fail("Expected readPromise to throw");
  } catch (error) {
    assert(isAbortError(error));
    expect(error.cause).toBe(abortReason);
  }

  const { aborted, reason } = signal;
  expect(aborted).toBe(true);
  expect(isAbortError(reason)).toBe(false);
  expect(reason).toBe(abortReason);
});
