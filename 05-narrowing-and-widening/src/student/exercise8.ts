// Exercise 8: Satisfies Operator for BBC Configuration
// Learn to use the `satisfies` operator to validate configuration without widening types

// Step 1: Create an interface `BBCApiConfig` with properties:
// - newsEndpoint: string
// - sportEndpoint: string
// - iPlayerEndpoint: string
// - timeout: number

// Step 2: Create a configuration object `config1` using a type annotation:
// const config1: BBCApiConfig = {
//   newsEndpoint: "https://www.bbc.co.uk/news",
//   sportEndpoint: "https://www.bbc.co.uk/sport",
//   iPlayerEndpoint: "https://www.bbc.co.uk/iplayer",
//   timeout: 5000
// }
// Hover over the URLs (like `newsEndpoint`) - what type are they?
// (They should be `string`, not the literal URL strings)

// Step 3: Create another configuration object `config2` using `satisfies`:
// const config2 = {
//   newsEndpoint: "https://www.bbc.co.uk/news",
//   sportEndpoint: "https://www.bbc.co.uk/sport",
//   iPlayerEndpoint: "https://www.bbc.co.uk/iplayer",
//   timeout: 5000
// } satisfies BBCApiConfig
// Hover over the URLs now - what type are they?
// (They should be the literal string values, like `"https://www.bbc.co.uk/news"`)

// Step 4: Show the difference:
// - With type annotation (`: BBCApiConfig`), you lose the exact URL values
// - With `satisfies`, you keep the literal types while still validating the shape

// Step 5: Try making `config2` invalid (e.g., remove a property or add a wrong type)
// TypeScript should still catch the error - `satisfies` validates the shape!

// Step 6: Create a function `makeRequest` that uses the config
// Show how `satisfies` gives you both:
// - Type safety (validates against the interface)
// - Literal types (preserves exact values for use in your code)

// Step 7: Compare `satisfies` with type assertions (`as`):
// const config3 = { ... } as BBCApiConfig
// Try making `config3` invalid - does TypeScript catch it?
// (No! `as` bypasses type checking, while `satisfies` validates)

// Step 8: Create a more complex configuration for BBC theme colors:
// interface Theme {
//   primary: string;
//   secondary: string;
//   accent: string;
// }
// Use `satisfies` to create a theme object with color hex codes
// Show how the literal color values are preserved

// Step 9: Use `as const` with `satisfies`:
// const config4 = { ... } as const satisfies BBCApiConfig
// What happens? Try to change a value - does it work?
// (No! `as const` makes everything readonly and preserves literal types)

// Step 10: Explain in comments:
// - When would you use `satisfies` vs type annotations?
// - Why is `satisfies` safer than type assertions (`as`)?
// - When would you combine `as const` with `satisfies`?

export {};
