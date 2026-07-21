// Exercise 3: Narrowing with BBC Content Types
// Practice narrowing types using runtime checks (`typeof` and `instanceof`)

// Step 1: Create a function `processContent` that accepts a parameter `search` of type `string | RegExp`
// This function will search through BBC content

// Step 2: Inside the function, use `typeof` to check if `search` is a `string`
// In the `if` branch (when it's a string), use string methods like `.includes()` or `.toLowerCase()`
// Hover over `search` inside this branch - what type does TypeScript show?

// Step 3: In the `else` branch (when it's not a string, so it's RegExp), use regex methods
// Use methods like `.exec()` or `.test()` on the RegExp
// Hover over `search` in this branch - what type does TypeScript show?

// Step 4: Test your function:
// - Call it with a string: `processContent("news")`
// - Call it with a RegExp: `processContent(/news/i)`
// Show how TypeScript narrows the type in each branch

// Step 5: Create a class `BBCVideo` with properties:
// - title: string
// - duration: number
// - transcript?: string (optional)

// Step 6: Create a class `BBCArticle` with properties:
// - headline: string
// - wordCount: number
// - author: string

// Step 7: Create a function `getContentInfo` that accepts `BBCVideo | BBCArticle`
// Use `instanceof` to check if the content is a `BBCVideo`

// Step 8: In the `if` branch (when it's BBCVideo), access properties like `duration` and `transcript`
// In the `else` branch (when it's BBCArticle), access properties like `wordCount` and `author`
// Show how TypeScript knows which properties are available in each branch

// Step 9: Test your function with instances of both classes
// Create a video: `new BBCVideo("Breaking News", 120, "Full transcript...")`
// Create an article: `new BBCArticle("Headline", 500, "John Doe")`
// Call `getContentInfo` with both and show the narrowing works

// Step 10: Explain in comments: How do runtime checks (`typeof`, `instanceof`) help TypeScript narrow types?
// Why is this useful compared to type assertions?

export {};
