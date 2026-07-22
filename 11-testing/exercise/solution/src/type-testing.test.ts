import { describe, test, expect, expectTypeOf } from "vitest";
import { area, fetchArea, type Shape } from "./type-testing.js";

describe("area calculates correctly for each shape", () => {
  test("should calculate the area of a circle", () => {
    expect(area({ kind: "circle", radius: 2 })).toBeCloseTo(12.566, 3);
  });

  test("should calculate the area of a square", () => {
    expect(area({ kind: "square", side: 3 })).toBe(9);
  });
});

describe("fetchArea resolves to a number, not just a value that looks like one", () => {
  // expectTypeOf checks the *type* TypeScript infers, not the runtime value.
  // It would fail even if fetchArea returned the right number but with a
  // widened type like Promise<any>.
  test("should resolve to a number at the type level", () => {
    expectTypeOf(fetchArea({ kind: "square", side: 3 })).resolves.toEqualTypeOf<
      number
    >();
  });
});

describe("Shape's kind union matches what area()'s switch actually handles", () => {
  test("should equal the exact union of shape kinds", () => {
    expectTypeOf<Shape["kind"]>().toEqualTypeOf<"circle" | "square">();
  });
});
