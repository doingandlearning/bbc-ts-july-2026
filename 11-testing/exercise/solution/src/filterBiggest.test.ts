import filterBiggestNumbers from "./filterBiggest.js";
import { describe, test, expect } from "vitest";

describe("Will throw if the first parameter is not an array", () => {
  test("should throw an error if the first parameter is not an array", () => {
    expect(() => filterBiggestNumbers("not an array" as any, 5)).toThrow(
      "The first argument must be an array"
    );
  });
});

describe("Will return correct output for reasonable input", () => {
  test("should filter out numbers that are not greater than the threshold", () => {
    const result = filterBiggestNumbers([1, -3, 8, 7], 0);
    expect(result).toEqual([1, 8, 7]);
  });
});

describe("Will throw if the second argument is not a number", () => {
  test("should throw an error if the second argument is not a number", () => {
    expect(() => filterBiggestNumbers([1, 2, 3], "5" as any)).toThrow(
      "The second argument must be a number"
    );
  });
});

describe("Will work if the second number not an integer", () => {
  test("should work correctly even if the threshold is a floating point number", () => {
    const result = filterBiggestNumbers([1, 2.5, 3.5, 4], 2.5);
    expect(result).toEqual([3.5, 4]);
  });
});

describe("Will work if the min is a negative number", () => {
  test("should work correctly even if the threshold is a negative number", () => {
    const result = filterBiggestNumbers([-5, -3, 0, 3, 5], -4);
    expect(result).toEqual([-3, 0, 3, 5]);
  });
});
