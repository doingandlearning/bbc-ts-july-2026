// Exercise 8: Satisfies Operator for BBC Configuration

// Step 1: Define interface
interface BBCApiConfig {
  newsEndpoint: string;
  sportEndpoint: string;
  iPlayerEndpoint: string;
  timeout: number;
}

// Step 2: Type annotation - loses literal types
const config1: BBCApiConfig = {
  newsEndpoint: "https://www.bbc.co.uk/news",
  sportEndpoint: "https://www.bbc.co.uk/sport",
  iPlayerEndpoint: "https://www.bbc.co.uk/iplayer",
  timeout: 5000
};
// Type of config1.newsEndpoint: string (not the literal URL!)

// Step 3: Satisfies - preserves literal types
const config2 = {
  newsEndpoint: "https://www.bbc.co.uk/news",
  sportEndpoint: "https://www.bbc.co.uk/sport",
  iPlayerEndpoint: "https://www.bbc.co.uk/iplayer",
  timeout: 5000
} satisfies BBCApiConfig;
// Type of config2.newsEndpoint: "https://www.bbc.co.uk/news" (literal!)

// Step 4: Show the difference
function makeRequest(endpoint: string): void {
  console.log(`Requesting: ${endpoint}`);
}

// With config1, endpoint is just `string`
makeRequest(config1.newsEndpoint); // Works, but loses the exact URL

// With config2, endpoint is the literal URL string
makeRequest(config2.newsEndpoint); // Works, and preserves the exact URL

// Step 5: Satisfies still validates!
// const config3 = {
//   newsEndpoint: "https://www.bbc.co.uk/news",
//   // Missing sportEndpoint - TypeScript will error!
// } satisfies BBCApiConfig; // ❌ Error!

// Step 7: Compare with type assertion
const config4 = {
  newsEndpoint: "https://www.bbc.co.uk/news",
  // Missing properties - but `as` doesn't validate!
} as BBCApiConfig; // ⚠️ No error, but invalid!

// Step 8: Theme configuration
interface Theme {
  primary: string;
  secondary: string;
  accent: string;
}

const theme = {
  primary: "#3b82f6",
  secondary: "#64748b",
  accent: "#10b981"
} satisfies Theme;
// Preserves literal color values!

// Step 9: Combine with `as const`
const config5 = {
  newsEndpoint: "https://www.bbc.co.uk/news",
  sportEndpoint: "https://www.bbc.co.uk/sport",
  iPlayerEndpoint: "https://www.bbc.co.uk/iplayer",
  timeout: 5000
} as const satisfies BBCApiConfig;
// Makes everything readonly AND preserves literal types!

// config5.timeout = 10000; // ❌ Error - readonly!

// Step 10: Explanation
// - Use `satisfies` when you want type validation without losing literal types
// - Use type annotations (`: Type`) when you want to widen to the general type
// - Use `as const satisfies` when you want readonly + literal types + validation
// - `satisfies` is safer than `as` because it validates the shape

export {};
