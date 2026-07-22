import getSingularOrPlural from "./singularOrPlural.js";
import { describe, test, expect } from "vitest";

describe("getSingularOrPlural function", () => {
  describe("Will return singular for value of 1", () => {
    test("should return singular when the count is 1", () => {
      expect(getSingularOrPlural(1, "woman", "women")).toEqual("woman");
    });
  });

  describe("Will return plural for value of 0", () => {
    test("should return plural when the count is 0", () => {
      expect(getSingularOrPlural(0, "person", "people")).toEqual("people");
    });
  });

  describe("Will throw for a negative", () => {
    test("should throw an error for negative numbers", () => {
      expect(() => getSingularOrPlural(-1, "child", "children")).toThrow(
        "The first parameter needs to be a number 0 or higher"
      );
    });
  });

  describe("Will throw for a non-numeric value", () => {
    test("should throw an error for non-numeric values", () => {
      expect(() =>
        getSingularOrPlural("five" as any, "goose", "geese")
      ).toThrow("The first parameter needs to be a number 0 or higher");
    });
  });
});
