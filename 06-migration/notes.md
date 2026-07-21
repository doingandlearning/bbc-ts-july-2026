# Section 6 — Migrating Legacy JS to TypeScript

Migrating a real codebase is never a rewrite — it's a series of small, safe steps that each leave the code working. This section walks through that path using the shape-area calculator as a running example.

---

## 1. `@ts-check`: type-checking with no conversion at all

Add a single comment to the top of a `.js` file and TypeScript starts checking it, with `allowJs` on in `tsconfig.json`.

```js
// @ts-check
function getCircleArea(radius) {
  return radius * radius * Math.PI;
}
```

With no annotations at all, `radius` is implicitly `any` — TypeScript will flag it under `noImplicitAny`. This is the cheapest possible first step: no renamed files, no rewritten code, no build changes.

---

## 2. JSDoc: typing without converting the file

A `.js` file can carry real types via JSDoc comments — TypeScript reads these the same way it reads inline annotations.

```js
/**
 * @param { number } radius
 */
function getCircleArea(radius) {
  return radius * radius * Math.PI;
}
```

This is often as far as a simple file ever needs to go. Converting to `.ts` is a choice, not an obligation.

---

## 3. Extracting shape types

Once a file has more than one or two related shapes, pull the structure out into its own type-only file rather than annotating inline.

```ts
export interface Circle {
  type: "circle";
  radius: number;
  area?: number;
}

export type ValidShape = Circle | Rectangle | Square | RightTriangle;
```

This is the point where "what shape is this" (types) separates cleanly from "what do I do with a shape" (logic) — the thinking about structure happens once, up front.

---

## 4. Converting the file, and getting narrowing for free

Rename to `.ts`, apply the extracted types to function signatures, and a `switch` on a shared literal property (`shape.type`) becomes a discriminated union automatically — this is the same narrowing from Section 5, not a separate concept.

```ts
function getArea(shape: ValidShape) {
  switch (shape.type) {
    case "circle":
      shape.area = getCircleArea(shape.radius); // shape is Circle here
      break;
    case "rectangle":
      shape.area = getRectangleArea(shape.length, shape.width);
      break;
  }
}
```

---

## 5. `satisfies` where it earns its keep

Not every migrated value needs it — reach for it specifically when you want to validate a shape while keeping its literal types.

```ts
const square = { type: "square", width: 5 } satisfies Square;
```

Compare this to `const square: Square = { ... }`, which would still validate the shape but widen the literal values.

---

## 6. Untyped external libraries

Not every dependency ships types. A minimal `declare module` unblocks you without waiting on upstream.

```ts
declare module "untyped-library" {
  export function someFunction(param: string): number;
}
```

---

## Common pitfalls & quick fixes

* **Turning on full `strict` mode on day one**
  → Enable the strict family incrementally (`noImplicitAny` first, then `strictNullChecks`, etc.) on a large legacy file — flipping `strict: true` all at once can surface hundreds of errors and stall the migration.

* **Reaching for `as` instead of a type guard**
  → An assertion tells the compiler to trust you; a type guard (Section 5) makes the check real and reusable.

* **Leaving a stale `@ts-expect-error` in place**
  → Once the underlying issue is fixed, remove the comment — otherwise TypeScript will flag the comment itself as unnecessary, and it hides regressions.

* **Migrating everything at once**
  → One file, one function at a time. The goal is to never have a period where the code doesn't run.

---

## What to remember

* `@ts-check` + JSDoc gets you type-checking with zero conversion
* Extract types before converting logic — it's less to hold in your head at once
* A `switch` on a literal `type` property is a discriminated union, whether or not you call it one
* `satisfies` is a refinement you choose, not a required step
* Strictness is a dial, not a switch — turn it up incrementally on legacy code

---

### Final checklist

* [ ] Does this file still run correctly after each individual step?
* [ ] Have I typed the shape before touching the logic?
* [ ] Are there discriminated unions hiding in existing `switch`/`if` chains?
* [ ] Did I remove `@ts-expect-error`/`@ts-ignore` comments once the issue was actually fixed?
* [ ] Am I increasing strictness gradually, rather than all at once?
