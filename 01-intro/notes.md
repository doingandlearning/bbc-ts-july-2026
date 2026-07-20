# Section 1: Intro to TS

## 1) Primitives vs non‑primitives (JS)

- Primitives: boolean, number, string, null, undefined, symbol, bigint.
  - Immutable single values. Example: let s: string = "hello".
- Non‑primitives: objects (including arrays and functions).
  - Collections or structures with multiple values/properties. Example: let o: {a: number} = { a: 1 }.

What to remember:

- Primitive types are simple values. Objects are collections and are compared by reference, not value.

## 2) TypeScript special types

- any
  - Disables type checking for a value. You can assign anything and call anything on it.
  - Use sparingly — it defeats the purpose of TS.
  - Example: let x: any = "hi"; x = 10; x.foo(); // no error
- unknown
  - A safe alternative to any. You can assign any value to unknown, but you must narrow its type before using it.
  - Use when you want to accept any value but force runtime checks before operations.
  - Example:
    let u: unknown = getFromNetwork();
    if (typeof u === "string") { console.log(u.toUpperCase()); } // OK
- void
  - Use as the return type for functions that do not return a meaningful value.
  - Example: function log(msg: string): void { console.log(msg); }
- never
  - Indicates code paths that never return (always throw or infinite loop) or impossible values (exhaustiveness checks).
  - Example: function fail(msg: string): never { throw new Error(msg); }
  - Useful in exhaustive switch statements to catch missing cases.

What to remember:

- any = unsafe, unknown = safe opt-out that forces narrowing, void for "no return", never for impossible/unreachable.

## 3) noImplicitAny and parameter typing

- If parameters have no type annotation, they implicitly get the any type unless the compiler option noImplicitAny is enabled.
- Enable noImplicitAny in tsconfig to force you to declare parameter types and prevent accidental any usage.
- Example:
  function add(a: number, b: number): number { return a + b; } // preferred

## 4) Type aliases and interfaces

- type alias (type)
  - Can name any type expression: primitives, unions, intersections, object shapes, mapped types.
  - Example: type ID = string | number;
- interface
  - Describes object shapes. Can be extended and supports declaration merging (multiple declarations with same name are combined).
  - Example: interface Person { name: string; age: number; }
- Differences / guidelines:
  - Use interface for object shapes and when you want to allow extension or declaration merging.
  - Use type for unions, tuples, mapped types, or any advanced compositions.
  - In many cases they are interchangeable for simple object shapes.

## 5) Unions (|) and Intersections (&)

- Union (|)
  - A value that may be one of several types.
  - Example: type ApiValue = number | string | boolean;
- Intersection (&)
  - Combines types; a value must satisfy all parts.
  - Example: type Owl = Bird & { nocturnal: true }; // has Bird properties and nocturnal: true

## 6) Literal types

- You can give properties or variables literal types so they must hold that exact value.
  - Example: type Bird = { wings: 2 }; // wings must equal 2
  - String literal union: type Name = "Cunningham" | "Das";
    let n: Name = "Das"; // OK

Why use literal types:

- To model constants, discriminated unions, and constrained values.

## 7) Arrays — two syntaxes

- T[] and Array<T> are equivalent.
  - Example: let arr1: number[] = [1,2]; let arr2: Array<number> = [1,2];

## 8) Structural typing (duck typing)

- TypeScript is structural: a value matches a type if it has the required shape (properties and types), not because it was declared with that name.
  - Example:
    type A = { x: number };
    interface B { x: number }
    const b: B = { x: 1 };
    const a: A = b; // OK — same shape
- Consequence: interfaces and type aliases with the same shape are interchangeable.

## 9) Interface extension and declaration merging

- Extending:
  - interface Chicken extends Bird { laysEggs: true; }
- Declaration merging:
  - If you declare the same interface name twice, TypeScript merges the members.
  - Example:
    interface Chicken { colourful: boolean; }
    interface Chicken { laysEggs: boolean; }
    // Now Chicken has both properties
- Use carefully — merging can be useful for augmenting library types, but it can also be surprising.

## 10) Example corrections (practical)

- Bad practice: let string = {}; // shadows primitive type name — avoid naming variables with type keywords.
- Typed add:
  function add(a: number, b: number): number { return a + b; }
- Unknown usage:
  function safeProcess(x: unknown) {
  if (typeof x === "string") console.log(x.toUpperCase());
  else if (typeof x === "number") console.log(x + 1);
  }
- never for exhaustive checks:
  type Shape = { kind: "circle"; r: number } | { kind: "square"; s: number };
  function area(s: Shape) {
  switch (s.kind) {
  case "circle": return Math.PI _ s.r _ s.r;
  case "square": return s.s \* s.s;
  default: return assertNever(s);
  }
  }
  function assertNever(x: never): never { throw new Error("Unexpected " + x); }

- Building a valid Chicken object:
  interface Bird { wings: 2 }
  interface Chicken extends Bird { colourful: false; flies: false; laysEggs: true }
  const pluckster: Chicken = { wings: 2, colourful: false, flies: false, laysEggs: true };

## 11) Common pitfalls and tips

- Avoid using any unless there is a compelling, temporary reason.
- Prefer unknown over any if you must accept arbitrary input.
- Enable strict TypeScript compiler options:
  - strict, noImplicitAny, strictNullChecks, etc.
- Don't shadow type keywords or built-in names (string, number, Array).
- Watch property name typos (noctural vs nocturnal) — TS will catch mismatches when types are declared correctly.
- Use literal types and discriminated unions to make runtime type narrowing easier and safer.

## Quick reference (one-line reminders)

- any = unsafe, unknown = safe opt-out
- void = no return, never = unreachable/throws
- type = flexible alias (use for unions/complex types), interface = object shape (extendable)
- | = union, & = intersection
