import { describe, test, expect, expectTypeOf } from "vitest";
import { area, fetchArea, type Shape } from "./type-testing.js";

describe("area calculates correctly for each shape", () => {
  test("should calculate the area of a circle", () => {});

  test("should calculate the area of a square", () => {});
});

describe("fetchArea resolves to a number, not just a value that looks like one", () => {
  // Given as an example - this is new syntax. expectTypeOf checks the *type*
  // TypeScript infers, not the runtime value. It would fail even if
  // fetchArea returned the right number but with a widened type like
  // Promise<any>.
  test("should resolve to a number at the type level", () => {
    expectTypeOf(fetchArea({ kind: "square", side: 3 })).resolves.toEqualTypeOf<
      number
    >();
  });
});

describe("Shape's kind union matches what area()'s switch actually handles", () => {
  test("should equal the exact union of shape kinds", () => {});
});
