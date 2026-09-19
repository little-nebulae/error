// oxlint-disable vitest/no-conditional-expect

import { readFile } from "node:fs/promises";
import { assert, describe, expect, test } from "vitest";

import { isAbortError } from "@/helpers/is-abort-error";
import { isError } from "@/helpers/is-error";

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
      assert(isError(error) === true);
      expect(isAbortError(error)).toBe(true);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(isError(reason) === true);
    expect(isAbortError(reason)).toBe(true);
    expect(reason.cause).toBeUndefined();
  });

  test("the read file promise is aborted with a non-Error reason provided", async () => {
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
      assert(isError(error) === true);
      expect(isAbortError(error)).toBe(true);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    expect(reason).not.toBeInstanceOf(Error);
    expect(reason).toBe(abortReason);
  });

  test("the read file promise is aborted with an Error reason provided", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const readPromise = readFile("package.json", {
      encoding: "utf-8",
      signal,
    });
    const abortReason = new Error("Something went wrong");
    controller.abort(abortReason);

    try {
      await readPromise;
      expect.fail("Expected readPromise to throw");
    } catch (error) {
      assert(isError(error) === true);
      expect(isAbortError(error)).toBe(true);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(isError(reason));
    expect(isAbortError(reason)).toBe(false);
    expect(reason).toMatchObject(abortReason);
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

// Failure cases
describe("isAbortError function should fail when", async () => {
  test("the fetch promise is aborted with an Error reason provided", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const fetchPromise = fetch("https://example.com", { signal });
    const abortReason = new Error("Something went wrong");
    controller.abort(abortReason);

    try {
      await fetchPromise;
      expect.fail("Expected fetchPromise to throw");
    } catch (error) {
      assert(error instanceof Error);
      expect(isAbortError(error)).toBe(false);
    }

    const { aborted, reason } = signal;
    expect(aborted).toBe(true);
    assert(reason instanceof Error);
    expect(isAbortError(reason)).toBe(false);
    expect(reason).toMatchObject(abortReason);
  });
});
