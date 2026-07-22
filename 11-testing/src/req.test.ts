import { test, expect, vi, beforeEach, afterEach } from "vitest";
import { fakeFetch, fetchData } from "./req.js";

beforeEach(() => {
  vi.useFakeTimers();
  vi.unstubAllGlobals();
});
afterEach(() => {
  vi.useRealTimers();
});

test("responds with data with correct url", async () => {
  const responsePromise = fakeFetch("https://bbc.co.uk");
  vi.runAllTimers();
  const response = await responsePromise;
  expect(Buffer.isBuffer(response)).toBe(true);
  expect(response.toString()).toMatchInlineSnapshot(`"some other data!!!"`);
});

test("throws error with error url", async () => {
  const fakePromise = fakeFetch("http://error.com");
  vi.runAllTimers();
  await expect(() => fakePromise).rejects.toThrow();

  const fakePromise2 = fakeFetch("http://error.com");
  vi.runAllTimers();
  await expect(() => fakePromise2).rejects.toThrowErrorMatchingInlineSnapshot(
    `[Error: network error]`,
  );
});

test("returns parsed data when the response is ok", async () => {
  // Arrange
  const mockData = { id: 1, name: "Kevin" };
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData,
    } as any),
  );

  const result = await fetchData<{ id: number; name: string }>(
    "http://example.com/user",
  );

  expect(result).toEqual(mockData);
  expect(fetch).toHaveBeenCalledWith("http://example.com/user");
});
