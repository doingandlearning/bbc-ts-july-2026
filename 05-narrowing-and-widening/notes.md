# Section 5 — Narrowing and Widening

TypeScript constantly adjusts how *specific* (narrow) or *general* (wide) a type is. Understanding when and why this happens helps you write safer code with fewer assertions.

---

## Widening: when types get looser

When you declare variables with `let`, TypeScript often **widens** their types so they can change later.

```ts
let vec = { x: 10, y: 20, z: 30 };
```

Here, `vec` is inferred as:

```ts
{ x: number; y: number; z: number }
```

not `{ x: 10; y: 20; z: 30 }`. This is intentional: `let` means “this might change”.

Similarly:

```ts
let axis: Axis = "x";
const axis2 = "x";
```

* `axis` is widened to `"x" | "y" | "z"`
* `axis2` stays narrow as `"x"`

That difference matters when passing values around.

```ts
getComponent(vec, axis);
getComponent(vec, axis2);
```

Both work — but only because `axis2` stayed narrow.

---

## Narrowing: when types get more specific

TypeScript narrows types when you prove something at runtime.

### Truthy checks

```ts
const elem = document.getElementById("headline");

if (elem) {
  elem.onabort;
}
```

Inside the `if`, `elem` is narrowed from `HTMLElement | null` to `HTMLElement`.

Optional chaining does *not* narrow:

```ts
elem?.onclick;
```

That’s safe, but it doesn’t change the type of `elem` afterwards.

---

### `typeof` and `instanceof`

Classic narrowing tools:

```ts
function contains(text: string, search: string | RegExp) {
  if (typeof search === "string") {
    return text.includes(search);
  }
  return Boolean(search.exec(text));
}
```

Or using `instanceof`:

```ts
function contains2(text: string, search: string | RegExp) {
  if (search instanceof RegExp) {
    return Boolean(search.exec(text));
  }
  return text.includes(search);
}
```

Each branch has a more specific type.

---

### Property checks (`in`)

Checking for a property narrows unions of object types:

```ts
function pickFruit(fruit: Apple | Orange) {
  if ("isGoodForBaking" in fruit) {
    return fruit; // Apple
  } else {
    return fruit; // Orange
  }
}
```

This works well when properties are unique.

---

## Discriminated unions (the gold standard)

A **discriminant** is a shared literal property (often `status` or `type`).

```ts
type States<DataType> =
  | { status: "loading"; progress?: number }
  | { status: "success"; data: DataType; timestamp: Date }
  | { status: "error"; error: string; retryable: boolean };
```

Narrowing becomes automatic:

```ts
function evaluateState<T>(state: States<T>) {
  switch (state.status) {
    case "loading":
      state.progress;
      break;
    case "success":
      state.data;
      break;
    case "error":
      state.retryable;
      break;
  }
}
```

This is the most robust and readable narrowing pattern.

---

## User-defined type guards

You can teach TypeScript how to narrow.

```ts
function isAdmin(user: User): user is Admin {
  return user.role === "admin";
}

function processUser(user: User) {
  if (isAdmin(user)) {
    user.permissions;
  }
}
```

The return type `user is Admin` is the key.

---

## Avoiding over-widening with `satisfies`

`satisfies` checks a shape **without changing** the inferred type.

```ts
const theme = {
  primary: "#3b82f6",
  secondary: "#64748b",
  success: "#10b981",
} as const satisfies Theme;
```

* You get literal types (`"#3b82f6"`)
* You still get structural validation against `Theme`

This is safer than a plain type annotation.

---

## Common pitfalls & quick fixes

* **Using `as` too early**
  → Try narrowing first; assertions hide bugs.

* **Optional chaining expecting narrowing**
  → It doesn’t. Use an `if` check.

* **Enums for simple keys**
  → String unions are usually clearer and narrower.

* **Forgetting discriminants**
  → Add a `status` or `type` field.

---

## What to remember

* `let` widens, `const` narrows
* Runtime checks drive compile-time narrowing
* Discriminated unions scale best
* User-defined guards make intent explicit
* Prefer `satisfies` over broad annotations

---

### Final checklist

* [ ] Can I explain why this value is widened or narrow?
* [ ] Am I narrowing with checks instead of assertions?
* [ ] Would a discriminated union simplify this?
* [ ] Do I really need `as`, or is there a safer way?
