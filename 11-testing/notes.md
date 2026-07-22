# Section 11 — A Brief Introduction to Testing

Testing in TypeScript is about **confidence and feedback**. The language already catches many mistakes at compile time; tests focus on **behaviour**, **edge cases**, and **integration with the outside world**.

This section keeps things deliberately small and practical.

---

## 1. Testing pure functions (the easy win)

Pure functions are the best place to start:

* no side effects
* no setup
* fast feedback

From `add.ts`:

```ts
export function add(a: number, b: number) {
  return a + b;
}
```

The test (`add.test.ts`) is correspondingly simple:

```ts
import { add } from "./add";

test("adds two numbers", () => {
  expect(add(2, 3)).toBe(5);
});
```

Key points:

* TypeScript enforces correct inputs at compile time
* tests confirm runtime behaviour
* failures are easy to interpret

If a function is hard to test, that’s often a design signal.

---

## 2. What TypeScript gives you in tests

TypeScript helps even before tests run:

```ts
add("2", 3); // ❌ compile-time error
```

This means:

* fewer meaningless tests
* less defensive code
* tests focus on logic, not types

You should still test:

* boundary conditions
* assumptions
* behaviour, not types

---

## 3. Testing async code

Async tests look synchronous with `async/await`.

From `req.ts`:

```ts
export async function fetchUser(id: number) {
  const res = await fetch(`/users/${id}`);
  return res.json();
}
```

And the test (`req.test.ts`):

```ts
test("fetches a user", async () => {
  const user = await fetchUser(1);
  expect(user.id).toBe(1);
});
```

Rules to remember:

* mark the test `async`
* `await` the function under test
* assertions run after the promise resolves

Errors thrown in async code automatically fail the test.

---

## 4. Mocking and isolation (light touch)

For this course, the goal isn’t deep mocking — it’s awareness.

Typical reasons to mock:

* network calls
* timers
* randomness
* expensive dependencies

The principle:

> Test **your logic**, not someone else’s API.

TypeScript helps by:

* typing mock return values
* ensuring mocks match real interfaces

---

## 5. What not to over-test

Avoid tests that:

* duplicate TypeScript’s job
* assert implementation details
* break on refactors without behaviour change

Example smell:

```ts
expect(typeof result).toBe("number");
```

If TypeScript already guarantees it, the test adds little value.

---

## 6. Type-level testing with `expectTypeOf`

Everything above tests values. Vitest also ships `expectTypeOf`, which tests the *type* TypeScript infers — it fails at typecheck time even if the runtime value looks fine.

From `type-testing.ts`:

```ts
export async function fetchArea(shape: Shape) {
  return area(shape);
}
```

```ts
test("fetchArea resolves to a number (type-level)", () => {
  expectTypeOf(fetchArea(shape)).resolves.toEqualTypeOf<number>();
});
```

This would fail if `fetchArea`'s return type ever widened to `Promise<any>`, even though the runtime value would still be a correct number.

The same idea covers exhaustiveness. `area()`'s `switch` ends with `const exhaustive: never = shape;` — add a new member to the `Shape` union and forget a case, and the *build* fails, not a test. `expectTypeOf<Shape["kind"]>().toEqualTypeOf<...>()` lets you assert the union's shape directly, so a forgotten case shows up as a failing assertion instead of only a stray compiler error.

Key points:

* `expectTypeOf` checks types, `expect` checks values — you often want both
* a passing runtime test can still hide a widened/incorrect type
* pairs naturally with discriminated unions and exhaustiveness checking from Section 5

---

## Common pitfalls & quick fixes

* **Testing types instead of behaviour**
  → Let the compiler do its job.

* **Forgetting to `await` async functions**
  → The test may pass incorrectly.

* **Over-mocking early**
  → Start with real implementations.

* **Tests that are hard to read**
  → Use clear inputs and expectations.

---

## What to remember

* TypeScript reduces the *need* for certain tests
* Tests confirm behaviour, not types
* Pure functions are the easiest to test
* `async/await` keeps tests readable
* Design and testability are closely linked

---

### Final checklist

* [ ] Am I testing behaviour, not types?
* [ ] Are pure functions tested first?
* [ ] Do async tests `await` correctly?
* [ ] Is mocking justified here?
* [ ] Would a refactor break this test unnecessarily?

