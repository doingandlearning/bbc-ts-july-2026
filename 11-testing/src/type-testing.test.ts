import { test, expect, expectTypeOf } from "vitest";
import { area, fetchArea, type Shape } from "./type-testing.js";

test("calculates area correctly", () => {
  expect(area({ kind: "circle", radius: 2 })).toBeCloseTo(12.566, 3);
  expect(area({ kind: "square", side: 3 })).toBe(9);
});

test("fetchArea resolves to a number (type-level)", () => {
  expectTypeOf(
    fetchArea({ kind: "square", side: 3 }),
  ).resolves.toEqualTypeOf<number>();
});

test("Shape's kind union is exactly what area() expects to handle", () => {
  expectTypeOf<Shape["kind"]>().toEqualTypeOf<"circle" | "square">();
});
