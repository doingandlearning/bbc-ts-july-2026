// Const Type Parameters (TypeScript 5.0+)
// Preserves literal types in generic functions without the caller needing
// to add `as const` themselves.

// Without const - literal widens to its base type
function identity<T>(value: T): T {
  return value;
}
const result1 = identity("hello");

function processConfig<const T>(config: T): T {
  return config;
}
const config1 = processConfig({
  apiUrl: "https://api.example.com",
  timeout: 5000,
});
