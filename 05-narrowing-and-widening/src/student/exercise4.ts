// Exercise 4: Discriminated Unions for BBC Content Status
// Understand and use discriminated unions for type-safe content status management

// Step 1: Define an interface `DraftContent` with:
// - status: "draft" (literal type)
// - lastModified: Date

// Step 2: Define an interface `PublishedContent` with:
// - status: "published" (literal type)
// - publishedAt: Date
// - views: number

// Step 3: Define an interface `ArchivedContent` with:
// - status: "archived" (literal type)
// - archivedAt: Date
// - reason: string

// Step 4: Create a type alias `ContentStatus` that is a union of all three:
// type ContentStatus = DraftContent | PublishedContent | ArchivedContent

// Step 5: Write a function `getContentInfo` that accepts `ContentStatus` as a parameter
// The function should return a string describing the content

// Step 6: Inside the function, use a `switch` statement on `content.status`
// Create cases for "draft", "published", and "archived"

// Step 7: In the "draft" case, try accessing `content.lastModified`
// Hover over `content` - what type does TypeScript show? (It should be `DraftContent`)

// Step 8: In the "published" case, try accessing `content.views` and `content.publishedAt`
// Hover over `content` - what type does TypeScript show? (It should be `PublishedContent`)

// Step 9: In the "archived" case, try accessing `content.reason` and `content.archivedAt`
// Hover over `content` - what type does TypeScript show? (It should be `ArchivedContent`)

// Step 10: Add a `default` case with exhaustive checking:
// default:
//   const _exhaustive: never = content;
//   return _exhaustive;
// This ensures TypeScript catches missing cases at compile time

// Step 11: Create sample content in different states:
// - A draft: { status: "draft", lastModified: new Date() }
// - A published piece: { status: "published", publishedAt: new Date(), views: 1000 }
// - An archived piece: { status: "archived", archivedAt: new Date(), reason: "Outdated" }

// Step 12: Test your function with all three content states
// Show how TypeScript automatically narrows the type in each case

// Step 13: (Optional challenge) Try adding a new status type like "deleted"
// Add it to the union and see how TypeScript forces you to handle it in the switch
// This demonstrates exhaustive checking!

export {};
