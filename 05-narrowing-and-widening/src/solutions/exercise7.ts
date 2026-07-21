// Exercise 7: Truthy Checks and Optional Chaining with BBC DOM Elements

// Step 1: Get element (returns HTMLElement | null)
const headline = document.getElementById("bbc-headline");
// Type: HTMLElement | null

// Step 2: Direct access causes error
// headline.textContent; // ❌ Error: Object is possibly 'null'

// Step 3: Truthy check narrows the type
if (headline) {
  // TypeScript knows headline is `HTMLElement` here (not null)
  const text = headline.textContent;
  headline.classList.add("highlighted");
  headline.setAttribute("data-processed", "true");
  // All these work because TypeScript narrowed the type!
}

// Step 4: After the if block, type is back to HTMLElement | null
// headline.textContent; // ❌ Error again - narrowing only works in the if scope

// Step 5: Optional chaining doesn't narrow
const text = headline?.textContent;
// Type of headline is still: HTMLElement | null
// Optional chaining safely accesses but doesn't change the type

// Step 7: Function using narrowing for multiple operations
function processHeadline(elementId: string): void {
  const element = document.getElementById(elementId);
  
  if (element) {
    // Narrowed to HTMLElement - can do multiple operations
    element.textContent = "Updated headline";
    element.classList.add("processed");
    element.setAttribute("data-timestamp", new Date().toISOString());
  }
}

// Step 8: Function using optional chaining for simple access
function getHeadlineText(elementId: string): string {
  const element = document.getElementById(elementId);
  return element?.textContent ?? "No headline found";
  // Optional chaining + nullish coalescing for one-off access
}

// Step 9: Non-null assertion (use carefully!)
function getHeadlineTextUnsafe(elementId: string): string {
  const element = document.getElementById(elementId);
  return element!.textContent!; // ⚠️ Dangerous if element doesn't exist!
  // Only use when you're 100% certain the element exists
}

// Step 10: Comprehensive function
function safeGetArticleData(headlineId: string, bylineId: string, contentId: string) {
  const headline = document.getElementById(headlineId);
  const byline = document.getElementById(bylineId);
  const content = document.getElementById(contentId);
  
  // Use narrowing when you need multiple operations
  if (headline && byline && content) {
    return {
      headline: headline.textContent,
      byline: byline.textContent,
      content: content.textContent
    };
  }
  
  return null;
}

// Step 11: Explanation
// - Truthy checks narrow types in the scope where the check happens
// - Optional chaining doesn't narrow - it just safely accesses properties
// - Use narrowing (`if`) when you need multiple operations on the same element
// - Use optional chaining (`?.`) for simple one-off property access

export {};
