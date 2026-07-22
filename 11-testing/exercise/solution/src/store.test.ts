import store from "./store.js";
import { describe, test, expect } from "vitest";

describe("store function", () => {
  describe("Successful storage", () => {
    test("should return an object with an id when given a Buffer", (done) => {
      const buffer = Buffer.from("Test data");
      store(buffer, (error, data) => {
        expect(error).toBeNull();
        expect(data).toHaveProperty("id");
        expect(typeof data?.id).toBe("string");
        expect(data?.id).toHaveLength(4);
        done();
      });
    });
  });

  describe("Input validation", () => {
    test("should call the callback with an error when the input is not a Buffer", (done) => {
      const input = "Not a buffer";
      store(input as any, (error, data) => {
        expect(error).toBeInstanceOf(Error);
        expect(error?.message).toBe("input must be a buffer");
        expect(data).toBeUndefined();
        done();
      });
    });
  });

  describe("Asynchronous operation", () => {
    test("should take at least 300 ms to return a result", (done) => {
      const buffer = Buffer.from("Test data");
      const startTime = Date.now();
      store(buffer, (error, data) => {
        const endTime = Date.now();
        expect(endTime - startTime).toBeGreaterThanOrEqual(300);
        done();
      });
    });
  });
});
