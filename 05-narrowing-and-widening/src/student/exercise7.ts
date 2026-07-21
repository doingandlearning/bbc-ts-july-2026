// Exercise 7: Truthy Checks and Optional Chaining with BBC DOM Elements
// Understand narrowing vs optional chaining when working with potentially null DOM elements

// Step 1: Use `document.getElementById("bbc-headline")` to get an element
// Store it in a variable `headline`
// Notice the return type: `HTMLElement | null`
// Why does it return `null`? (The element might not exist in the DOM)

// Step 2: Try accessing a property directly: `headline.textContent`
// What error does TypeScript show? Why?

// Step 3: Use an `if` statement to check if the element exists:
// if (headline) {
//   // Inside this block
// }
// Inside the `if` block, try accessing `headline.textContent`
// Hover over `headline` inside the block - what type does TypeScript show?
// (It should be `HTMLElement`, not `HTMLElement | null`)

// Step 4: After the `if` block, try accessing `headline.textContent` again
// What type is `headline` now? (It's back to `HTMLElement | null`)
// This shows that narrowing only works within the scope where the check happened

// Step 5: Use optional chaining: `headline?.textContent`
// Does this work? Yes! But check the type of `headline` after this line
// Hover over `headline` - is it still `HTMLElement | null`?
// (Yes - optional chaining doesn't narrow the type, it just safely accesses)

// Step 6: Compare the two approaches:
// Approach A: `if (headline) { headline.textContent }` - narrows the type
// Approach B: `headline?.textContent` - doesn't narrow, but safely accesses
// When would you use each?

// Step 7: Create a function `processHeadline` that:
// - Gets an element by ID
// - Uses an `if` check to narrow the type
// - Does multiple operations on the element (e.g., get textContent, add a class, set an attribute)
// Show how narrowing helps when you need to do multiple things

// Step 8: Create a function `getHeadlineText` that:
// - Gets an element by ID
// - Uses optional chaining to safely get the textContent
// - Returns the text or a default value
// Show how optional chaining is useful for one-off property access

// Step 9: Try using non-null assertion: `headline!.textContent`
// The `!` tells TypeScript "I know this isn't null, trust me"
// When is this safe? When is it dangerous?
// (Safe: When you're certain the element exists. Dangerous: When it might not exist)

// Step 10: Create a function that processes BBC article elements
// The function should:
// - Get multiple elements (headline, byline, content)
// - Use truthy checks to narrow types when you need to do multiple operations
// - Use optional chaining for simple property access
// - Handle cases where elements might not exist

// Step 11: Explain in comments:
// - When do truthy checks narrow types? (In the scope where the check happens)
// - When doesn't optional chaining narrow? (It never narrows, just safely accesses)
// - When should you use each approach?

export {};
