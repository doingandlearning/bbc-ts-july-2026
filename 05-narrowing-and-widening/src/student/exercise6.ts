// Exercise 6: User-Defined Type Guards for BBC User Roles
// Create custom type guards with the `is` keyword for BBC user roles

// Step 1: Create a base interface `BBCUser` with:
// - id: number
// - name: string
// - email: string
// - role: "editor" | "journalist" | "admin"

// Step 2: Create an interface `Editor` that extends `BBCUser` with:
// - role: "editor" (literal type - must be exactly "editor")
// - sections: string[] (sections they edit)

// Step 3: Create an interface `Journalist` that extends `BBCUser` with:
// - role: "journalist" (literal type)
// - articles: number (number of articles written)

// Step 4: Create an interface `Admin` that extends `BBCUser` with:
// - role: "admin" (literal type)
// - permissions: string[] (admin permissions)

// Step 5: Create a type guard function `isEditor`:
// function isEditor(user: BBCUser): user is Editor {
//   return user.role === "editor";
// }
// Notice the return type: `user is Editor` - this tells TypeScript how to narrow

// Step 6: Create similar type guards `isJournalist` and `isAdmin`
// Each should check the `role` property and return the appropriate `is` type

// Step 7: Create a function `getUserInfo` that accepts `BBCUser`
// Inside, use `if (isEditor(user))` to check the role

// Step 8: In the `if` branch (after the type guard), try accessing `user.sections`
// Hover over `user` - TypeScript should show it as `Editor`
// The `sections` property should be available!

// Step 9: Add `else if` branches for `isJournalist` and `isAdmin`
// In each branch, access the properties specific to that role:
// - Journalist: `user.articles`
// - Admin: `user.permissions`

// Step 10: Create sample users:
// - An editor: { id: 1, name: "Alice", email: "alice@bbc.co.uk", role: "editor", sections: ["News", "Sport"] }
// - A journalist: { id: 2, name: "Bob", email: "bob@bbc.co.uk", role: "journalist", articles: 50 }
// - An admin: { id: 3, name: "Charlie", email: "charlie@bbc.co.uk", role: "admin", permissions: ["delete", "publish"] }

// Step 11: Test your function with all three user types
// Show how the type guards narrow the types correctly

// Step 12: Explain in comments: Why are custom type guards useful?
// - They make your intent explicit
// - They're reusable across your codebase
// - They're self-documenting
// - They enable type narrowing automatically

export {};
