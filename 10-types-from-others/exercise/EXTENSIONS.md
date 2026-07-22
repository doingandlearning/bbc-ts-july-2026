# Extensions: Advanced Type Composition (Optional)

These build directly on the core Blog API exercise in `README.md` — complete that first, since every task below assumes you already have `Post` and `Comment` interfaces extending `ApiEntity`. Solutions are in `completed/src/extensions.ts`.

---

## Extension 1: Utility Types

**Objective:** Use TypeScript's built-in utility types to derive new shapes from `Post` instead of writing them by hand.

**Tasks:**

1. Create `type PostPreview = Pick<Post, "title" | "body">`. Assign a value to it and confirm `title`/`body` work but `id` doesn't exist on it.
2. Create `type UpdatePost = Partial<Post>`, then a function `updatePost(id: number, updates: UpdatePost): void`. Call it with just `{ title: "New Title" }`, and again with `{}` — both should be valid.
3. Create `type PublicPost = Omit<Post, "userId">` and a function `getPublicPost(post: Post): PublicPost` that strips `userId` before returning. Confirm accessing `.userId` on the result is a type error.
4. Combine two utility types in one line: `type PostSummary = Readonly<Pick<Post, "id" | "title" | "body">>`. Try reassigning a property on a `PostSummary` value and see what TypeScript says.

**Key Learning:** `Pick`, `Omit`, `Partial`, and `Readonly` are just mapped types the TypeScript team already wrote for you — reaching for them instead of redefining a shape by hand keeps your types in sync with `Post` automatically if it ever changes.

---

## Extension 2: Conditional Types

**Objective:** Write a type whose shape depends on what it's given.

**Tasks:**

1. Define `type ApiResponse<T> = T extends any[] ? { data: T; count: number } : { data: T }`.
2. Create a value typed `ApiResponse<Post>` — confirm it only has `data`, no `count`.
3. Create a value typed `ApiResponse<Comment[]>` — confirm `count` is now available and required.
4. Look at `src/05-conditional.ts` for another conditional type example (`ApiResult<T>`), then write your own: `type PartialWithRequired<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>`. Use it to build `UpdatePostTitleRequired`, where `title` must be present but everything else is optional. Confirm an object missing `title` is rejected.

**Key Learning:** `T extends X ? A : B` lets a type "branch" based on what it's given — this is how a lot of built-in utility types (`Awaited`, for one — see `src/04-utility.ts`) are implemented under the hood.

---

## Extension 3: Mapped Types and `keyof`

**Objective:** See what `Partial`/`Readonly` actually expand to, by writing the equivalent yourself.

**Tasks:**

1. Create `type PostKeys = keyof Post` and hover to confirm it's `"id" | "title" | "body" | "userId"`.
2. Write `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`, then call it with a real key and with a made-up one — confirm only the made-up one errors.
3. Write your own `OptionalPost` using `{ [K in keyof Post]?: Post[K] }` and compare it to `Partial<Post>` — are they the same type? Do the same for a hand-written `ReadonlyPost` versus `Readonly<Post>`.
4. Write `type PostFlags = { [K in keyof Post]: boolean }` — a mapped type that keeps the same keys but changes every value's type. What might this shape be useful for (feature flags, dirty-field tracking)?
5. Look at `src/06-mapping.ts` for a mapped type that also uses `keyof`, then write `type PostWithStringIds = { [K in keyof Post]: K extends "id" | "userId" ? string : Post[K] }` — combining a mapped type with a conditional inside it.

**Key Learning:** `[K in keyof T]` is the mechanism every mapped utility type is built from — once you've written one by hand, `Partial<T>`/`Readonly<T>`/`Record<K, T>` stop being magic and start being "the same trick, already written for you."

---

## Integration Challenge (stretch)

If you've got time left: combine the generic `makeApiRequest` from the core exercise with `PostPreview`, `UpdatePost`, `PublicPost`, and a conditional `ApiResponse<T>` into a small set of functions — one to fetch a preview, one to apply a partial update, one to fetch a list with a count. This is exactly what `completed/src/extensions.ts` does at the bottom, if you want to compare afterwards.
