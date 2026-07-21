// Exercise 1: Understanding Widening with BBC Regions

type BBCRegion = "Belfast" | "Salford" | "Glasgow" | "London" | "Newcastle";

// Step 2: Using `let` - widens to `string`
let officeLocation = "Belfast"; // Type: string (widened!)

// Step 3: Using `const` - stays narrow
const officeLocation2 = "Belfast"; // Type: "Belfast" (literal type)

// Step 4: Function that expects specific literal types
function getOfficeInfo(region: BBCRegion): string {
  return `BBC Office located in ${region}`;
}

// Step 5: This doesn't work - officeLocation is `string`, not `BBCRegion`
// getOfficeInfo(officeLocation); // Error: Argument of type 'string' is not assignable to parameter of type 'BBCRegion'

// Step 6: This works - officeLocation2 is `"Belfast"` which is assignable to `BBCRegion`
getOfficeInfo(officeLocation2); // ✅ Works!

// Step 7: Fix options:
// Option A: Type annotation
let officeLocation3: BBCRegion = "Belfast";
getOfficeInfo(officeLocation3); // ✅ Works

// Option B: as const
let officeLocation4 = "Belfast" as const;
getOfficeInfo(officeLocation4); // ✅ Works

// Option C: Change to const
const officeLocation5 = "Belfast";
getOfficeInfo(officeLocation5); // ✅ Works

// Step 8: Explanation
// `let` widens literal types to their general type because `let` variables can be reassigned
// `const` keeps literal types narrow because `const` variables cannot be reassigned
// This matters when passing values to functions that expect specific literal types

export {};
