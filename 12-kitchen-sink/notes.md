# Section 12 — Kitchen Sink: Advanced TypeScript Concepts

Four tools that don't fit neatly into earlier sections but come up often enough in real code to be worth knowing: overloading, tuples, `Record`, branded types, and `const` type parameters.

---

## 1. Function overloading

Multiple signatures for the same function name, so callers see precise types for each combination of arguments — the implementation signature (last) must be compatible with all of them.

```ts
function getValue(value: string): string;
function getValue(value: number): number;
function getValue(value: string | number): string | number {
  return value;
}
```

TypeScript checks calls against the overload signatures, not the implementation signature, and picks the first one that matches — so put more specific overloads first. Common uses: single-vs-array inputs, optional-parameter variants, and string-literal-discriminated APIs (`fetch("users")` vs `fetch("posts")` returning different types).

---

## 2. Tuples

Fixed-length arrays with a specific type at each position — unlike `T[]`, where every element is the same type and the length is open-ended.

```ts
type Point = [number, number];
type UserInfo = [name: string, age: number, email: string]; // named tuple, TS 4.0+
type ReadonlyPoint = readonly [number, number];
type StringNumberBooleans = [string, number, ...boolean[]]; // rest element
```

Reach for a tuple when position carries meaning — coordinates, a `useState`-style `[value, setValue]` pair, or a fixed-shape return like `[data, status, headers]`.

---

## 3. Records

`Record<K, T>` builds an object type with keys of type `K` and values of type `T` — equivalent to an index signature, but more concise and self-documenting when `K` is a known union.

```ts
type Status = "pending" | "approved" | "rejected";
type StatusConfig = Record<Status, { color: string }>;
```

Use `Record` with a union of known keys (config objects, dictionaries keyed by a fixed set of names); use an interface instead when each key needs a genuinely different value type.

---

## 4. Branded types (nominal typing)

TypeScript is structural by default — two `string` types are interchangeable no matter what you name them. Branded types force nominal behaviour by attaching a fake property that only exists at the type level.

```ts
type Brand<T, B> = T & { __brand: B };
type UserId = Brand<string, "UserId">;
type ProductId = Brand<string, "ProductId">;

function createUserId(id: string): UserId {
  return id as UserId;
}
```

Now a `UserId` and a `ProductId` can't be passed to each other's functions even though both are just strings underneath — useful for IDs, units, and currencies where mixing them up is a real bug class. The `__brand` property is erased at runtime; it exists purely to make the type checker treat otherwise-identical primitives as distinct.

---

## 5. `const` type parameters (TypeScript 5.0+)

Normally, a generic widens literal arguments unless the caller adds `as const` themselves:

```ts
function identity<T>(value: T): T {
  return value;
}
const result = identity("hello"); // type: string
```

Marking the type parameter `const` preserves the literal without needing `as const` at the call site:

```ts
function identityConst<const T>(value: T): T {
  return value;
}
const result2 = identityConst("hello"); // type: "hello"
const arr = identityConst(["red", "green"]); // type: readonly ["red", "green"]
```

This shifts the responsibility for preserving literal types from the caller (remembering `as const` every time) to the function author (declaring `<const T>` once).

---

## Common pitfalls & quick fixes

- **Overload implementation doesn't match its own signatures**
  → The implementation signature must be compatible with every overload — TypeScript checks this, but the error can be confusing if the union of parameter types drifts from what the overloads promise.

- **Overloads in the wrong order**
  → TypeScript picks the first matching overload, so put more specific ones before more general ones.

- **Reaching for `Record` when keys aren't uniform**
  → If different keys need different value shapes, that's an interface, not a `Record`.

- **Expecting branded types to do something at runtime**
  → They don't — the brand is compile-time only. You still need a real validation function if you want to guarantee a string is actually a valid `UserId` before casting it.

---

## What to remember

- Overloading gives precise types per input shape, without a union return type at every call site
- Tuples encode position-specific meaning; arrays encode "more of the same"
- `Record<K, T>` is the concise form of an index signature when `K` is a known union
- Branded types add nominal typing on top of TypeScript's structural default
- `const` type parameters move literal-preservation from the call site to the function definition

---

### Final checklist

- [ ] Would an overload give callers a more precise type than a union parameter/return would?
- [ ] Is this actually fixed-length-with-meaning (tuple), or just "an array" (`T[]`)?
- [ ] Are these keys a known, closed set (`Record`) or genuinely varied (interface)?
- [ ] Would branding prevent a real class of mix-up here, or is it ceremony?
- [ ] Do I need `<const T>`, or is `as const` at the call site good enough?
