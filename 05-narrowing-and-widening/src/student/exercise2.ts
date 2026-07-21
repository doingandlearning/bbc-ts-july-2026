// Exercise 2: Object Widening with BBC Article Metadata
// Understand how object types widen with `let` vs `const`

// Step 1: Create an object `articleMeta` using `let` with these properties:
// - id: 12345
// - published: true
// - priority: 1
// Hover over `articleMeta` to see the inferred type
// What types are id, published, and priority? (Are they literals or general types?)

// Step 2: Create another object `articleMeta2` using `const` with the same properties
// Compare the inferred types - are they different from `articleMeta`?

// Step 3: Try assigning a different value to `articleMeta.id`
// For example: `articleMeta.id = "hello"`
// What happens? Does TypeScript allow it? Why or why not?

// Step 4: Try assigning a different value to `articleMeta2.id`
// For example: `articleMeta2.id = "hello"`
// What happens? Is it different from `articleMeta`?

// Step 5: Create a function `processArticle` that accepts an object with:
// - id: number
// - published: boolean
// - priority: number
// The function should return a string describing the article

// Step 6: Try passing `articleMeta` to `processArticle(articleMeta)`
// Does it work? Why?

// Step 7: Try passing `articleMeta2` to `processArticle(articleMeta2)`
// Does it work? Is there any difference?

// Step 8: Create `articleMeta3` using `as const`:
// `const articleMeta3 = { id: 12345, published: true, priority: 1 } as const`
// Hover over it - what type is inferred now?
// Try to change `articleMeta3.id = 999` - what happens?

// Step 9: Explain in comments:
// - When is object widening helpful? (When would you want `let`?)
// - When do you want literal types? (When would you use `const` or `as const`?)
// - What's the practical impact on your code?

export {};
