// Exercise 5: Property Checks with `in` Operator
// Use the `in` operator to narrow union types, distinguishing BBC content types

// Step 1: Create an interface `BBCArticle` with:
// - headline: string
// - wordCount: number
// - author: string

// Step 2: Create an interface `BBCVideo` with:
// - title: string
// - duration: number
// - transcript?: string (optional property)

// Step 3: Create an interface `BBCAudio` with:
// - title: string
// - duration: number
// - podcastSeries?: string (optional property)

// Step 4: Create a function `processContent` that accepts `BBCArticle | BBCVideo | BBCAudio`
// The function should return a string describing how to process the content

// Step 5: Use the `in` operator to check for a unique property
// Since `wordCount` only exists on `BBCArticle`, check: `"wordCount" in content`
// In the `if` branch, TypeScript should narrow to `BBCArticle`
// Try accessing `content.headline` and `content.wordCount` - they should be available

// Step 6: In the `else` branch, you still have `BBCVideo | BBCAudio`
// Use another `in` check to distinguish between them
// Hint: Both have `duration`, but you could check for `transcript` (but be careful - it's optional!)
// Or check for `podcastSeries` to identify audio

// Step 7: Show how TypeScript narrows the type in each branch
// Hover over `content` in each branch to see the narrowed type

// Step 8: Create sample content:
// - An article: { headline: "Breaking News", wordCount: 500, author: "John Doe" }
// - A video: { title: "News Report", duration: 120, transcript: "Full transcript" }
// - An audio: { title: "Podcast Episode", duration: 1800, podcastSeries: "Today" }

// Step 9: Test your function with all three content types
// Show how the `in` operator helps TypeScript narrow the types

// Step 10: Think about the limitations:
// - What if two types share a property? (Like `duration` in Video and Audio)
// - What if a property is optional? (Like `transcript` or `podcastSeries`)
// - When would discriminated unions be better than `in` operator?

// Step 11: (Optional) Refactor to use discriminated unions instead
// Add a `type: "article" | "video" | "audio"` property to each interface
// Use a switch statement on `content.type` instead
// Compare the two approaches - which is clearer?

export {};
