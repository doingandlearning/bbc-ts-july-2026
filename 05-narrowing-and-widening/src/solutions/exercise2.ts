// Exercise 2: Object Widening with BBC Article Metadata

// Step 1: Using `let` - properties widen to general types
let articleMeta = {
  id: 12345,      // Type: number (widened)
  published: true, // Type: boolean (widened)
  priority: 1     // Type: number (widened)
};
// Type: { id: number; published: boolean; priority: number }

// Step 2: Using `const` - properties still widen (objects can be mutated)
const articleMeta2 = {
  id: 12345,
  published: true,
  priority: 1
};
// Type: { id: number; published: boolean; priority: number }
// Same as `let` because object properties can still be changed!

// Step 3: Can change properties with `let`
articleMeta.id = 999; // ✅ Works - id is `number`, can assign any number
articleMeta.id = "hello"; // ❌ Error - can't assign string to number

// Step 4: Can also change properties with `const` (object is mutable)
articleMeta2.id = 999; // ✅ Works - object properties are mutable
// articleMeta2 = {}; // ❌ Error - can't reassign the variable itself

// Step 5: Function that expects specific types
function processArticle(meta: { id: number; published: boolean; priority: number }): string {
  return `Article ${meta.id} is ${meta.published ? "published" : "draft"} with priority ${meta.priority}`;
}

processArticle(articleMeta);  // ✅ Works
processArticle(articleMeta2); // ✅ Works

// Step 8: Using `as const` - prevents widening AND makes readonly
const articleMeta3 = {
  id: 12345,
  published: true,
  priority: 1
} as const;
// Type: { readonly id: 12345; readonly published: true; readonly priority: 1 }

// articleMeta3.id = 999; // ❌ Error - readonly!

// Step 9: Explanation
// - Widening is helpful when you want to allow changes (use `let` or `const` without `as const`)
// - Literal types are useful when you want exact values preserved (use `as const`)
// - Practical impact: affects whether you can reassign properties and what types functions accept

export {};
