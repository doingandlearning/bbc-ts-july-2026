// Exercise 9: Integration - BBC Content Management System
// Combine all narrowing and widening concepts in a BBC content management scenario

// ============================================================================
// PART 1: Set up types and handle widening
// ============================================================================

// Step 1: Create discriminated unions for content status
// Define interfaces for:
// - DraftContent: { status: "draft", lastModified: Date }
// - PublishedContent: { status: "published", publishedAt: Date, views: number }
// - ArchivedContent: { status: "archived", archivedAt: Date, reason: string }
// Create a union type: type ContentStatus = DraftContent | PublishedContent | ArchivedContent

// Step 2: Create interfaces for different content types
// - BBCArticle: { headline: string, wordCount: number, author: string }
// - BBCVideo: { title: string, duration: number, transcript?: string }
// - BBCAudio: { title: string, duration: number, podcastSeries?: string }
// Create a union: type ContentType = BBCArticle | BBCVideo | BBCAudio

// Step 3: Handle widening issues
// Create content metadata using `let`:
// let metadata = { id: 12345, priority: 1, region: "London" }
// Show how properties widen (hover over them)
// Fix widening where you need literal types using `const` or `as const`

// ============================================================================
// PART 2: Implement narrowing with type guards
// ============================================================================

// Step 4: Create type guards for content types using `in` operator
// Write functions:
// - isArticle(content: ContentType): content is BBCArticle
// - isVideo(content: ContentType): content is BBCVideo
// - isAudio(content: ContentType): content is BBCAudio
// Use the `in` operator to check for unique properties

// Step 5: Create type guards for user roles
// Create interfaces: Editor, Journalist, Admin (extending a base BBCUser)
// Write type guards:
// - isEditor(user: BBCUser): user is Editor
// - isJournalist(user: BBCUser): user is Journalist
// - isAdmin(user: BBCUser): user is Admin
// Use the `is` keyword for type predicates

// ============================================================================
// PART 3: Process content with discriminated unions
// ============================================================================

// Step 6: Create a function `processContent` that:
// - Accepts content with both type and status
// - Uses type guards to narrow the content type
// - Uses a switch statement on status for automatic narrowing
// - Handles each combination appropriately
// Show how TypeScript narrows types in each branch

// Step 7: Create a function `getContentDisplayInfo` that:
// - Takes ContentType and ContentStatus
// - Uses discriminated unions with switch statements
// - Accesses properties specific to each type/status combination
// - Returns formatted information about the content

// ============================================================================
// PART 4: Handle null safety
// ============================================================================

// Step 8: Work with DOM elements that might be null
// Create a function that:
// - Gets BBC article elements from the DOM (headline, byline, content)
// - Uses truthy checks (`if`) to narrow types when you need multiple operations
// - Uses optional chaining (`?.`) for simple property access
// - Handles cases where elements might not exist

// Step 9: Create a function `safeGetArticleData` that:
// - Gets an article element by ID
// - Uses narrowing to safely extract multiple properties
// - Returns an object with the data or null if element doesn't exist

// ============================================================================
// PART 5: Validate configuration with satisfies
// ============================================================================

// Step 10: Create a BBC API configuration interface
// interface BBCApiConfig {
//   endpoints: { news: string, sport: string, iPlayer: string }
//   timeout: number
//   retries: number
// }

// Step 11: Create a configuration object using `satisfies`
// Show how it validates the shape while preserving literal types
// Use the config in a function to demonstrate both type safety and literal preservation

// ============================================================================
// PART 6: Put it all together
// ============================================================================

// Step 12: Create a comprehensive function `manageContent` that:
// - Takes content (with type and status), a user, and configuration
// - Uses type guards to check content type and user role
// - Uses discriminated unions to handle different statuses
// - Uses narrowing to safely access properties
// - Uses satisfies-validated config
// - Handles all edge cases (null elements, missing properties, etc.)

// Step 13: Create sample data:
// - Different content types (article, video, audio)
// - Different statuses (draft, published, archived)
// - Different user roles (editor, journalist, admin)
// - Configuration object

// Step 14: Test your `manageContent` function with various combinations
// Show how all the concepts work together:
// - Widening/narrowing
// - Type guards
// - Discriminated unions
// - Null safety
// - Satisfies

// Step 15: Explain in comments how each concept contributes:
// - How widening/narrowing affects type inference
// - How type guards make narrowing explicit and reusable
// - How discriminated unions enable automatic narrowing
// - How null safety prevents runtime errors
// - How satisfies gives type safety without losing literal types

export {};
