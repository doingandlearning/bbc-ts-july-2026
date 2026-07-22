import uppercase from "./uppercase.js";
import { describe, test, expect } from "vitest";

describe("uppercase function", () => {
  describe("Correctly uppercases strings", () => {
    test("should return an uppercase string when given a lowercase string", () => {
      const result = uppercase("hello");
      expect(result).toEqual("HELLO");
    });

    test("should return an uppercase string when given a mixed case string", () => {
      const result = uppercase("Hello World");
      expect(result).toEqual("HELLO WORLD");
    });

    test("should return an unchanged string when given an uppercase string", () => {
      const result = uppercase("HELLO");
      expect(result).toEqual("HELLO");
    });
  });

  describe("Input validation", () => {
    test("should throw an error when the input is not a string", () => {
      const invalidInput = 123;
      expect(() => uppercase(invalidInput as any)).toThrow(
        "input must be a string"
      );
    });
  });
});
