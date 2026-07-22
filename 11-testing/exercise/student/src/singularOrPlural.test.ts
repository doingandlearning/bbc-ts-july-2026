import getSingularOrPlural from "./singularOrPlural.js";
import { describe, test, expect } from "vitest";

describe("getSingularOrPlural function", () => {
  describe("Will return singular for value of 1", () => {
    test("should return singular when the count is 1", () => {});
  });

  describe("Will return plural for value of 0", () => {
    test("should return plural when the count is 0", () => {});
  });

  describe("Will throw for a negative", () => {
    test("should throw an error for negative numbers", () => {});
  });

  describe("Will throw for a non-numeric value", () => {
    test("should throw an error for non-numeric values", () => {});
  });
});
