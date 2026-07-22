export function add(a: number, b: number) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Each argument should be a number.");
  }
  return a + b;
}
