# Practice Lab - TypeScript Basics with BBC Articles

In this module, we're building basic type-safe structures for a BBC news article system: primitives, object types, interfaces, and functions that operate on them.

## Getting Started

Starter code is in `student/article-system.ts` (TODOs to fill in). A complete reference is in `solution/article-system.ts` — don't look until you've had a go.

---

## Exercise 1: Typing the Basics

**Objective:** Add type annotations to plain variables and see what TypeScript infers versus what you declare explicitly.

**Context:** You're storing metadata for a BBC article: its ID, headline, publication state, and view count.

**Tasks:**

1. Look at `articleId`, `headline`, `isPublished`, and `viewCount` in the starter file. Hover over each — what type has TypeScript already inferred, with no annotation at all?
2. Add explicit type annotations to each anyway (`number`, `string`, `boolean`, `number`). Nothing should change in the hover — why not?
3. Try changing `viewCount` to a string value (`"1250"`) and see what TypeScript says. Put it back.
4. Type the `author` object without an interface yet — just inline. What does TypeScript infer for its shape if you don't annotate it at all?

**Key Learning:** TypeScript infers types from initial values whether you annotate or not. Explicit annotations matter most for function parameters and empty structures where there's nothing to infer from.

---

## Exercise 2: Defining Article and Author Shapes

**Objective:** Replace inline shapes with named interfaces.

**Context:** Right now `author` is just an inferred object literal type. As the codebase grows, you want a name for "the shape of an article" and "the shape of an author" that you can reuse.

**Tasks:**

1. Define an `Article` interface with `id` (number), `headline` (string), `content` (string), `author` (string), `isPublished` (boolean), and `viewCount` (number).
2. Define an `Author` interface with `name`, `email`, and `department` (all strings).
3. Rewrite the `author` object from Exercise 1 with an explicit `: Author` annotation. Does anything change at the call site?
4. Try adding a property to a variable typed as `Author` that isn't in the interface (e.g. `role: "editor"`). What error do you get, and why does that matter for catching typos?

**Key Learning:** Interfaces give a shape a name you can reuse across variables, function parameters, and return types — and TypeScript checks assignments against that shape structurally (it doesn't care that you called it `Author`, only that the shape matches).

---

## Exercise 3: Building Sample Data

**Objective:** Construct values against your interfaces and see TypeScript catch mismatches before you run anything.

**Tasks:**

1. Create `sampleArticle: Article` with realistic BBC-style content (headline, body, author name, publish state, view count).
2. Create `sampleAuthor: Author` to match.
3. Delete one required property from `sampleArticle` and note the exact error TypeScript gives you. Put it back.
4. Add an extra, made-up property to the object literal for `sampleArticle` (not through a variable — inline). What happens, and how is this different from the error you'd get assigning through an already-typed variable?

**Key Learning:** TypeScript checks object literals more strictly than typed variables ("excess property checks") — this is why typos in inline object literals get caught immediately, but the same typo on a variable typed after the fact might not be.

---

## Exercise 4: Writing Functions Against Your Types

**Objective:** Use your interfaces as function parameter and return types.

**Tasks:**

1. Implement `getArticleSummary(article: Article): string`, returning something like `"Article: [headline] by [author]"`.
2. Implement `getAuthorInfo(author: Author): string`, returning `"[name] from [department]"`.
3. Call both functions with `sampleArticle` and `sampleAuthor`. Then try calling `getArticleSummary` with `sampleAuthor` by mistake — what does TypeScript tell you, and would plain JavaScript have caught this?
4. Create one more article and one more author from scratch, and confirm both functions work against them too.

**Key Learning:** Once a function's parameter is typed, TypeScript checks every call site against that shape — this is where interfaces start paying for themselves, catching mismatched arguments at compile time instead of producing `undefined` at runtime.

---

## Stretch: Structural Typing

**Objective:** See that TypeScript cares about shape, not the name of the type.

**Tasks:**

1. Create a plain object literal with `name`, `email`, and `department` properties, but don't annotate it as `Author` at all.
2. Pass it directly into `getAuthorInfo`. Does it work? Why?
3. Now add an *extra* property to that same object (e.g. `yearsOfService: number`) and pass it again. Still works — why doesn't the extra property break it here, when it broke things in Exercise 3?

**Key Learning:** This is structural typing (sometimes called "duck typing"): TypeScript only requires that a value has *at least* the properties a type needs. Excess property checks only apply to fresh object literals assigned directly to a typed slot — not to values passed as arguments or held in a variable first.

---

## Summary

By the end of this lab you should be able to:

- Explain when TypeScript infers a type versus when you need an annotation
- Define and reuse interfaces for object shapes
- Predict when TypeScript will flag an excess or missing property, and when it won't
- Use interfaces as function parameter and return types
- Explain structural typing in your own words
