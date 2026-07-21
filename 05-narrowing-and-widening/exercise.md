# Practice Lab - Narrowing and Widening in TypeScript

In this module, we explore how TypeScript adjusts types to be more specific (narrowing) or more general (widening). Understanding these concepts helps you write safer code with fewer type assertions and better type inference.

## Getting Started

This exercise includes starter code in the `student/` folder:
- **Individual exercises**: `exercise1.ts` through `exercise9.ts` - Complete each exercise step by step
- **Complete practice**: `type-system-practice.ts` - All exercises in one file for comprehensive practice

## Learning Objectives

By the end of this exercise, you will understand:
- How `let` widens types vs `const` narrows them
- How object properties widen with `let` vs stay narrow with `const`
- How to narrow types using runtime checks (`typeof`, `instanceof`, `in` operator)
- How discriminated unions enable automatic type narrowing
- How to create custom type guards with the `is` keyword
- How truthy checks narrow types (but optional chaining doesn't)
- How the `satisfies` operator validates without widening
- How to combine all concepts in a BBC content management scenario

Follow the instructions for each task and ensure to run and compile your code to see the results.

---

## Exercise 1: Understanding Widening with BBC Regions

**Objective:** Understand how `let` widens types vs `const` narrows them, using BBC office locations.

**Context:** BBC has offices in Belfast, Salford, Glasgow, London, and Newcastle. You're building a function that needs to know the exact location.

**Tasks:**

1. Create a type `BBCRegion` that represents valid BBC office locations: `"Belfast" | "Salford" | "Glasgow" | "London" | "Newcastle"`

2. Create a variable `officeLocation` using `let` and assign it `"Belfast"`. Hover over the variable to see what type TypeScript infers.

3. Create another variable `officeLocation2` using `const` and assign it `"Belfast"`. Compare the inferred types - what's the difference?

4. Create a function `getOfficeInfo(region: BBCRegion)` that returns information about a BBC office.

5. Try passing both `officeLocation` and `officeLocation2` to `getOfficeInfo()`. Which one works? Which one causes an error? Why?

6. Fix the issue by either:
   - Adding a type annotation to `officeLocation`
   - Using `as const` assertion
   - Changing `let` to `const`

**Key Learning:** `let` widens literal types to their general type (e.g., `"Belfast"` → `string`), while `const` keeps them narrow (`"Belfast"` stays `"Belfast"`). This matters when passing values to functions that expect specific literal types.

---

## Exercise 2: Object Widening with BBC Article Metadata

**Objective:** Understand how object types widen with `let` vs `const`, using BBC article metadata.

**Context:** You're working with article metadata that needs to preserve exact values for some properties but allow flexibility for others.

**Tasks:**

1. Create an object `articleMeta` using `let` with properties:
   - `id`: `12345`
   - `published`: `true`
   - `priority`: `1`
   
   Hover over `articleMeta` to see the inferred type. What types are the properties?

2. Create another object `articleMeta2` using `const` with the same properties. Compare the inferred types - are they different?

3. Try assigning `articleMeta.id = "hello"` and `articleMeta2.id = "hello"`. What happens? Why?

4. Create a function `processArticle(meta: { id: number; published: boolean; priority: number })` and try passing both objects.

5. Use `as const` to create `articleMeta3` with the same properties. What type does TypeScript infer now?

6. Explain when object widening is helpful (allowing changes) vs when you want literal types (preserving exact values).

**Key Learning:** Object properties widen with `let` (allowing reassignment), but stay narrow with `const` or `as const` (preserving literal types). This affects whether you can change values and what types functions accept.

---

## Exercise 3: Narrowing with BBC Content Types

**Objective:** Practice narrowing types using runtime checks (`typeof` and `instanceof`), working with BBC content.

**Context:** BBC handles different content types (articles, videos, audio). You need to process them differently based on their type.

**Tasks:**

1. Create a function `processContent` that accepts `string | RegExp` as a search parameter.

2. Inside the function, use `typeof` to check if the search is a `string`. In that branch, use string methods like `.includes()`.

3. In the else branch (when it's a `RegExp`), use regex methods like `.exec()` or `.test()`.

4. Show how TypeScript narrows the type in each branch - hover over `search` in each branch to see the type.

5. Create a class `BBCVideo` and a class `BBCArticle`. Create a function that accepts `BBCVideo | BBCArticle` and uses `instanceof` to narrow the type.

6. In each branch, access properties specific to that class. Show how TypeScript knows which properties are available.

**Key Learning:** Runtime checks (`typeof`, `instanceof`) drive compile-time narrowing. TypeScript uses these checks to make types more specific in each code branch.

---

## Exercise 4: Discriminated Unions for BBC Content Status

**Objective:** Understand and use discriminated unions for type-safe content status management.

**Context:** BBC content goes through different states: draft, published, archived. Each state has different properties.

**Tasks:**

1. Define interfaces for different content states:
   - `DraftContent` with `status: "draft"` and `lastModified: Date`
   - `PublishedContent` with `status: "published"`, `publishedAt: Date`, and `views: number`
   - `ArchivedContent` with `status: "archived"`, `archivedAt: Date`, and `reason: string`

2. Create a type alias `ContentStatus` that is a union of all three states.

3. Write a function `getContentInfo` that accepts `ContentStatus` and uses a `switch` statement on the `status` property.

4. In each `case`, show how TypeScript automatically narrows the type. Try accessing `lastModified` in the "draft" case, `views` in the "published" case, etc.

5. Add a `default` case that uses `never` type for exhaustive checking:
   ```typescript
   default:
     const _exhaustive: never = content;
     return _exhaustive;
   ```

6. Create sample content in different states and test your function. Try adding a new status type and see how TypeScript catches missing cases.

**Key Learning:** Discriminated unions use a shared literal property (the "discriminant") to enable automatic type narrowing. This is the most robust pattern for handling different states.

---

## Exercise 5: Property Checks with `in` Operator

**Objective:** Use the `in` operator to narrow union types, distinguishing BBC content types.

**Context:** BBC has different content types (Article, Video, Audio) with different properties. You need to handle them differently.

**Tasks:**

1. Create interfaces:
   - `BBCArticle` with `headline: string`, `wordCount: number`, `author: string`
   - `BBCVideo` with `title: string`, `duration: number`, `transcript?: string`
   - `BBCAudio` with `title: string`, `duration: number`, `podcastSeries?: string`

2. Create a function `processContent` that accepts `BBCArticle | BBCVideo | BBCAudio`.

3. Use the `in` operator to check for a unique property. For example:
   - `"wordCount" in content` narrows to `BBCArticle`
   - `"transcript" in content` could narrow to `BBCVideo` (but be careful - it's optional!)

4. Show how TypeScript narrows the type in each branch. Access properties specific to each content type.

5. Compare this approach with discriminated unions. When would you use `in` vs discriminated unions?

**Key Learning:** The `in` operator narrows unions based on property existence. It works well when properties are unique, but discriminated unions are usually clearer and more maintainable.

---

## Exercise 6: User-Defined Type Guards for BBC User Roles

**Objective:** Create custom type guards with the `is` keyword for BBC user roles.

**Context:** BBC has different user roles (Editor, Journalist, Admin) with different permissions. You need to check roles and narrow types accordingly.

**Tasks:**

1. Create interfaces:
   - `BBCUser` with `id: number`, `name: string`, `email: string`, `role: "editor" | "journalist" | "admin"`
   - `Editor` extending `BBCUser` with `role: "editor"` and `sections: string[]`
   - `Journalist` extending `BBCUser` with `role: "journalist"` and `articles: number`
   - `Admin` extending `BBCUser` with `role: "admin"` and `permissions: string[]`

2. Create a type guard function `isEditor(user: BBCUser): user is Editor` that checks if `user.role === "editor"`.

3. Create similar type guards for `isJournalist` and `isAdmin`.

4. Write a function `getUserPermissions` that accepts `BBCUser` and uses your type guards to narrow the type.

5. In each branch (after the type guard), show how TypeScript knows the specific type. Access properties like `sections`, `articles`, or `permissions` that are only available on specific types.

6. Explain why custom type guards are useful - they make narrowing explicit, reusable, and self-documenting.

**Key Learning:** Custom type guards use the `is` keyword to tell TypeScript how to narrow types. They make your intent explicit and can be reused across your codebase.

---

## Exercise 7: Truthy Checks and Optional Chaining with BBC DOM Elements

**Objective:** Understand narrowing vs optional chaining when working with potentially null DOM elements.

**Context:** You're working with BBC web pages and need to safely access DOM elements that might not exist.

**Tasks:**

1. Use `document.getElementById("bbc-headline")` to get an element. Notice it returns `HTMLElement | null`.

2. Try accessing a property like `.textContent` directly - TypeScript will show an error. Why?

3. Use an `if` statement to check if the element exists:
   ```typescript
   if (headline) {
     // TypeScript knows headline is HTMLElement here
   }
   ```
   Show how TypeScript narrows the type inside the `if` block.

4. Use optional chaining `headline?.textContent`. Does this narrow the type? Check the type of `headline` after this line - it's still `HTMLElement | null`.

5. Compare the two approaches:
   - `if (headline) { headline.textContent }` - narrows the type
   - `headline?.textContent` - doesn't narrow, but safely accesses

6. Create a function that processes a BBC article element. Use truthy checks to narrow types when you need to do multiple operations on the element.

7. Use optional chaining for one-off property access where narrowing isn't needed.

**Key Learning:** Truthy checks (`if` statements) narrow types, allowing you to use the narrowed type in that scope. Optional chaining (`?.`) safely accesses properties but doesn't narrow the type.

---

## Exercise 8: Satisfies Operator for BBC Configuration

**Objective:** Learn to use the `satisfies` operator to validate configuration without widening types.

**Context:** You're configuring BBC API endpoints and want to ensure they match an interface while preserving exact URL strings.

**Tasks:**

1. Create an interface `BBCApiConfig` with properties:
   - `newsEndpoint: string`
   - `sportEndpoint: string`
   - `iPlayerEndpoint: string`
   - `timeout: number`

2. Create a configuration object using a type annotation `: BBCApiConfig`. Hover over the URLs - what type are they? (They're `string`, not the literal URLs)

3. Create another configuration object using `satisfies BBCApiConfig`. Hover over the URLs - what type are they now? (They're the literal string values!)

4. Show the difference: with type annotation, you lose the exact URL values. With `satisfies`, you keep them while still validating the shape.

5. Create a function that uses the config. Show how `satisfies` gives you both:
   - Type safety (validates against the interface)
   - Literal types (preserves exact values)

6. Compare `satisfies` with type assertions (`as`). Why is `satisfies` safer?

**Key Learning:** `satisfies` validates that a value matches a type without changing the inferred type. This gives you type safety while preserving literal types, which is perfect for configuration objects.

---

## Exercise 9: Integration - BBC Content Management System

**Objective:** Combine all narrowing and widening concepts in a BBC content management scenario.

**Context:** You're building a content management system for BBC that handles articles, videos, and audio in different states.

**Tasks:**

1. **Set up types:**
   - Create discriminated unions for content status (draft, published, archived) - use what you learned in Exercise 4
   - Create interfaces for different content types (Article, Video, Audio) - use what you learned in Exercise 5

2. **Handle widening:**
   - Create content metadata using `let` and show how properties widen
   - Fix widening issues using `const` or `as const` where you need literal types
   - Show when widening is helpful vs when you need narrow types

3. **Implement narrowing:**
   - Create type guards for content types (using `in` operator)
   - Create type guards for user roles (using `is` keyword)
   - Use `typeof` and `instanceof` where appropriate

4. **Process content:**
   - Create a function that processes content based on its type and status
   - Use discriminated unions with `switch` statements for automatic narrowing
   - Show how TypeScript narrows types in each branch

5. **Handle null safety:**
   - Work with DOM elements that might be null
   - Use truthy checks to narrow types when needed
   - Use optional chaining for safe property access

6. **Validate configuration:**
   - Create a BBC API configuration object
   - Use `satisfies` to validate without widening
   - Show how literal types are preserved

7. **Put it all together:**
   - Create a function that takes content, checks its type and status, processes it appropriately, and handles edge cases
   - Demonstrate how all the concepts work together
   - Show the benefits: type safety, fewer bugs, better IDE support

**Key Learning:** Widening, narrowing, type guards, and `satisfies` all work together to create type-safe, maintainable code. Understanding when types widen or narrow helps you write better TypeScript.

---

## Summary

After completing these exercises, you should understand:

- How `let` widens types and `const` narrows them
- How object properties widen with `let` vs stay narrow with `const`
- How runtime checks (`typeof`, `instanceof`, `in`) narrow types
- How discriminated unions enable automatic narrowing
- How custom type guards make narrowing explicit and reusable
- How truthy checks narrow but optional chaining doesn't
- How `satisfies` validates without widening
- How all these concepts work together in real BBC scenarios
