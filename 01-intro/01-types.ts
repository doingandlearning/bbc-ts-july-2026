// Microsoft 2012 ...
// Jscript.Net
// 1. JavaScript (run-time) is TypeScript
// 2. Structural typing (duck typing)
// 3. Gradual adoption
// 4. Type safety without getting in the way
// 5. Tooling

// 7 Primitives in JS
// Boolean, String, Number, null, undefined, BigInt, Symbol

// Object -> Function, Array, Date

// 9,007,199,254,740,991

// Type-level -> abundance of types
// Value-level -> 8

{
  // any, unknown, void, never
  let name = "Kevin";
  let world: any = "Earth";
  world = 10;
  world = true;

  function add(a: number, b: number) {
    return a + b;
  }

  function adding(a: unknown, b: unknown) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
    return 0;
  }

  function printSomething(x: string) {
    console.log(x);
  }

  function example(x: string | number) {
    if (typeof x === "string") {
      return "Hello";
    } else if (typeof x === "number") {
      return x;
    }
    if (x) {
      throw new Error("x should be string or number");
    }
  }
}

{
  enum STATUS_CODE {
    "NOT_FOUND" = 404,
    "OK" = 200,
    "UNAUTHORIZED" = 403,
  }
  console.log(STATUS_CODE.UNAUTHORIZED);
}
