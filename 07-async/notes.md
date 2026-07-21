# Section 7 — The Evolution of Async in TypeScript

Modern TypeScript didn’t invent async — it **made existing async patterns safer and clearer**. This section walks through the evolution you’ll see in real codebases: callbacks → promises → `async/await` → cancellation.

---

## 1. Callbacks: where it started

Early async code relies on callbacks: functions passed into functions.

```ts
loadUser((err, user) => {
  if (err) {
    console.error(err);
    return;
  }

  loadNews(user.region, (err, news) => {
    if (err) {
      console.error(err);
      return;
    }

    console.log(news);
  });
});
```

Problems:

* deeply nested (“callback hell”)
* error handling duplicated everywhere
* types are hard to follow across boundaries

TypeScript can type callbacks, but the *structure* is still difficult to reason about.

---

## 2. Promises: flattening control flow

Promises improve structure by representing *a value that will exist later*.

```ts
loadUser()
  .then(user => loadNews(user.region))
  .then(news => {
    console.log(news);
  })
  .catch(err => {
    console.error(err);
  });
```

Improvements:

* linear flow
* single error path
* return types are explicit: `Promise<User>`, `Promise<News[]>`

Still awkward:

* chaining can get noisy
* branching logic is harder to read
* intermediate values are easy to lose track of

---

## 3. `async` / `await`: async that reads like sync

`async/await` is syntax on top of promises — not a different model.

```ts
async function showNewsForUser() {
  const user = await loadUser();
  const news = await loadNews(user.region);
  console.log(news);
}
```

Key TypeScript rules:

* `async` functions **always return a `Promise<T>`**
* `await` unwraps `Promise<T>` → `T`
* errors become normal `throw`s

```ts
async function getUserName(): Promise<string> {
  const user = await loadUser();
  return user.name;
}
```

This is the default choice for new code.

---

## 4. Typing async data correctly

Async doesn’t change typing rules — but it *reveals bad ones*.

```ts
async function loadUser(): Promise<User> { ... }
async function loadNews(region: Region): Promise<NewsItem[]> { ... }
```

Benefits:

* callers know exactly what they’ll get
* TypeScript enforces correct sequencing
* impossible states (e.g. `undefined`) surface early

If you see `Promise<any>`, treat it as a migration smell.

---

## 5. Parallel async with `Promise.all`

Async doesn’t mean sequential.

```ts
const [user, regions] = await Promise.all([
  loadUser(),
  loadRegions()
]);
```

TypeScript infers tuple types here — order matters.

```ts
// user: User
// regions: Region[]
```

This is safer than awaiting independently and forgetting dependencies.

---

## 6. Cancellation with `AbortController`

Promises don’t cancel by default. `AbortController` adds control.

```ts
const controller = new AbortController();

fetch(url, { signal: controller.signal });

// later
controller.abort();
```

In `async` functions:

```ts
try {
  const res = await fetch(url, { signal });
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Request cancelled");
  }
}
```

TypeScript helps by:

* typing the `signal`
* forcing you to handle cancellation explicitly

This matters for:

* user navigation
* timeouts
* retries
* background tasks

---

## Common pitfalls & quick fixes

* **Forgetting `await`**
  → You now have a `Promise<T>`, not `T`.

* **Mixing callbacks and promises**
  → Wrap callbacks once, then stay promise-based.

* **Sequential awaits by accident**
  → Use `Promise.all` where independence is clear.

* **Ignoring cancellation**
  → Add `AbortController` early for long-lived tasks.

---

## What to remember

* `async/await` is just promises with better syntax
* Return types always become `Promise<T>`
* Errors behave like normal exceptions
* Parallelism is explicit
* Cancellation is a design decision, not an afterthought

---

### Final checklist

* [ ] Do I know what type this `await` resolves to?
* [ ] Should these async operations run in parallel?
* [ ] Am I returning `Promise<T>` explicitly?
* [ ] Do I need cancellation or timeouts here?
* [ ] Is the async flow readable without comments?

