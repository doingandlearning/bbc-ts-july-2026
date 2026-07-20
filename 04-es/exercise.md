# Practice Lab - Modern JavaScript with BBC Content

In this module, we're building a small content-management system for BBC articles, using it as an excuse to work through default parameters, destructuring, spread, array iteration methods, and optional chaining / nullish coalescing.

## Getting Started

Starter code is in `student/content-management.ts` (TODOs to fill in, functions grouped by exercise below). A complete reference is in `solution/content-management.ts` — don't look until you've had a go. The exercises build on each other and share the same `Article` and `Author` interfaces and sample data, so work through them in order.

---

## Exercise 1: Default Parameters and Object Shorthand

**Objective:** Use default parameters so callers don't have to specify every value, and object shorthand so you're not repeating yourself.

**Context:** Not every article is created with a category or publish state up front — most start as an uncategorised draft.

**Tasks:**

1. Implement `createArticle(title, author, content, category = "general", isPublished = false): Article`, returning an `Article` with an `id`, `createdAt`, and a computed `wordCount`.
2. Call it with just `title`, `author`, and `content` — confirm `category` and `isPublished` fall back to their defaults.
3. Call it again overriding `category` but not `isPublished`. Confirm only the value you passed changes.
4. Inside the function, build the returned object using shorthand (`{ title, author, content }`) rather than `{ title: title, author: author, content: content }`. What's the actual difference at runtime — is this just cosmetic, or does it change behaviour?

**Key Learning:** Default parameters only kick in for `undefined` arguments (not for `null` or falsy values you pass explicitly) — worth checking what happens if you pass `false` for `isPublished` versus omitting it entirely.

---

## Exercise 2: Destructuring and Spread for Immutable Updates

**Objective:** Update objects and arrays without mutating the originals.

**Context:** `authors` is a shared array. If `addAuthor` and `updateAuthor` mutate it directly, anything else holding a reference to the old array won't see the change (or worse, will see a half-updated one).

**Tasks:**

1. Implement `addAuthor(name, email, department): Author`, building the new author with a fresh `id`, then adding it to `authors` using spread (`authors = [...authors, newAuthor]`) rather than `.push()`.
2. Implement `updateAuthor(authorId, updates: Partial<Author>): Author | null` — find the author by id, merge `updates` over the existing record with spread (`{ ...existing, ...updates }`), and return the merged result (or `null` if not found).
3. Destructure `id` and `department` straight out of the parameter list of a helper function of your choosing, instead of writing `author.id` / `author.department` inside the body.
4. Call `updateAuthor` with only one field changed (e.g. `{ department: "Sport" }`). Confirm the other fields survive untouched.

**Key Learning:** Spread on an object does a shallow merge — later spreads win on conflicting keys, left to right. This is why `{ ...existing, ...updates }` (not the other order) is what makes "partial update" semantics work.

---

## Exercise 3: Array Method Pipelines

**Objective:** Chain `filter`, `map`, and `sort` instead of writing manual loops.

**Tasks:**

1. Implement `getPublishedArticles(articles): Article[]` using `.filter()`.
2. Implement `sortArticlesByDate(articles): Article[]` using `.sort()` on a *copy* of the array (`[...articles].sort(...)`). Try sorting `articles` directly instead (no copy) and check with `console.log` whether the original array order changed — is that what you want?
3. Implement `calculateReadingTime(wordCount): number` (assume 200 words/minute), then `transformArticlesForDisplay(articles)` that `.map()`s each article to a small display object including the computed reading time.
4. Chain two of the above together in one expression, e.g. `transformArticlesForDisplay(getPublishedArticles(articles))`, and confirm it reads left-to-right as "get published, then format for display."

**Key Learning:** `.sort()` mutates the array it's called on. `.filter()` and `.map()` don't — they return new arrays. Knowing which category a method falls into is what tells you whether you need to copy first.

---

## Exercise 4: Reduce for Aggregation

**Objective:** Use `.reduce()` to turn a list into a summary — counts, groupings, "the biggest one."

**Tasks:**

1. Implement `findArticlesByCategory(articles, category): Article[]` (this one's just `.filter()` — a warm-up).
2. Implement `getTrendingTopics(articles)`: split titles into words, count occurrences with `.reduce()` into a `Record<string, number>`, then convert to an array of `{ word, count }` and take the top 5 by count.
3. Implement `calculateAuthorProductivity(authors, articles)`, returning `{ author, articleCount }` for each author.
4. Implement `generateContentReport(articles)`, combining several of the above into one summary object (total articles, published vs. draft counts, category breakdown, top author, average word count).

**Key Learning:** `.reduce()` is the one array method that can produce *any* shape of output — an object, a single number, another array — which is exactly why it's harder to read than `.filter()`/`.map()`. If you find yourself fighting the accumulator, it's worth asking whether a `.filter()` + `.length` or a `.map()` would say the same thing more plainly.

---

## Exercise 5: Optional Chaining and Nullish Coalescing

**Objective:** Handle articles that might be missing fields, without a wall of `if` checks.

**Context:** Not all article data is guaranteed clean — some of it, in `handleEdgeCases`, arrives as `null`, `undefined`, or missing a title.

**Tasks:**

1. Implement `searchArticles(articles, searchTerm)`: match against title, content, or author, using `?.` before calling `.toLowerCase()` in case a field is missing.
2. Implement `handleEdgeCases(data: any[])`: filter out anything without a usable `title`/`author`, then build a clean `Article[]` using `??` to supply sensible defaults (`item.title?.trim() ?? "Untitled"`).
3. Feed `handleEdgeCases` an array containing a valid article, one missing a title, one missing an author, and a bare `null` entry. Confirm nothing throws and the invalid entries are excluded or defaulted sensibly.
4. In one of your defaults, deliberately use `||` instead of `??` (e.g. for a numeric `viewCount` that could legitimately be `0`). What goes wrong, and why does `??` exist as a separate operator from `||`?

**Key Learning:** `??` only falls back on `null`/`undefined`; `||` falls back on *any* falsy value (`0`, `""`, `false` included). Reach for `??` when zero, empty string, or false are valid real values you don't want overwritten.

---

## Exercise 6: Preferences and Merging

**Objective:** Combine destructuring, spread, and optional chaining to apply a user's preferences to a content list.

**Tasks:**

1. Implement `applyUserPreferences(articles, preferences)`: filter by `preferences.categories` and `preferences.authors` if present (using `?.length` to check safely), filter drafts based on `preferences.showDrafts`, then sort based on `preferences.sortBy`.
2. Implement `updateUserPreferences(current, updates: Partial<UserPreferences>)` using the same merge pattern as `updateAuthor` in Exercise 2.
3. Call `applyUserPreferences` with an empty preferences object (`{}`). Confirm it doesn't throw and returns something sensible rather than an empty list.

**Key Learning:** This exercise doesn't introduce new syntax — it's here to show that "modern JS features" aren't a checklist, they compose. Real filtering logic is usually several of these techniques stacked together.

---

## Exercise 7: Integration — The Full Workflow

**Objective:** Wire everything above into one entry point.

**Tasks:**

1. Implement `processContentWorkflow(rawArticles, userPreferences): WorkflowResult`: map each article to include a computed reading time and formatted date, filter by publish state, apply user preferences, then attach trending topics and a summary (unique categories and authors via `[...new Set(...)]`, average reading time).
2. Run it against the sample `articles` array with a couple of different `userPreferences` objects and compare the output.
3. Trace through which exercise each piece of `processContentWorkflow` came from — you should be able to point to Exercise 3, 4, and 6 inside this one function.

**Key Learning:** `[...new Set(array)]` is a quick way to de-duplicate — worth knowing alongside the array methods above, even though `Set` itself isn't an array method.

---

## Summary

By the end of this lab you should be able to:

- Use default parameters and know exactly when they do (and don't) apply
- Update objects and arrays immutably with spread, and explain why order matters when merging
- Choose the right array method for filtering, transforming, sorting, and aggregating
- Explain the difference between `??` and `||`, with a concrete example of where they diverge
- Read a larger function and recognise which smaller technique each part is using
