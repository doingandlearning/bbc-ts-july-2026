// Exercise 1: Understanding Widening with BBC Regions
// Learn how `let` widens types vs `const` narrows them

// Step 1: Create a type `BBCRegion` that represents valid BBC office locations
// The type should be: "Belfast" | "Salford" | "Glasgow" | "London" | "Newcastle"

// Step 2: Create a variable `officeLocation` using `let` and assign it the value "Belfast"
// Hover over `officeLocation` to see what type TypeScript infers
// What type is it? (Hint: it's not the literal "Belfast")

// Step 3: Create another variable `officeLocation2` using `const` and assign it "Belfast"
// Compare the inferred types - what's the difference between the two variables?

// Step 4: Create a function `getOfficeInfo` that accepts a parameter of type `BBCRegion`
// The function should return a string with information about the office
// For example: return `Office located in ${region}`

// Step 5: Try passing `officeLocation` to `getOfficeInfo(officeLocation)`
// Does it work? What error do you get? Why?

// Step 6: Try passing `officeLocation2` to `getOfficeInfo(officeLocation2)`
// Does this work? Why is it different?

// Step 7: Fix the issue with `officeLocation` by choosing one of these approaches:
// Option A: Add a type annotation: `let officeLocation: BBCRegion = "Belfast"`
// Option B: Use `as const`: `let officeLocation = "Belfast" as const`
// Option C: Change `let` to `const`: `const officeLocation = "Belfast"`
// Try each approach and see which one works and why

// Step 8: Explain in a comment: Why does `let` widen the type but `const` doesn't?
// What does this mean for passing values to functions?

export {};
