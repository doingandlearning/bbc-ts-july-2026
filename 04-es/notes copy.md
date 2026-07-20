# Section 4 — What's New in JS (since ES6) — Student Notes

These notes explain the modern JavaScript features shown in the reference code (with TypeScript notes where relevant). Read the short explanations and examples, and keep the "Remember" bullets in mind when you write code.

---

## 1. Default parameters
- Functions can declare defaults for parameters. Later parameters can default to earlier ones.
- Example:
```ts
function areaOfRect(length = 1, width = length) {
  return length * width;
}
areaOfRect();      // 1  (1 * 1)
areaOfRect(5);     // 25 (5 * 5)
areaOfRect(3, 4);  // 12
```
- TS note: You can type parameters and return type: `function areaOfRect(length = 1, width = length): number { ... }`.

Remember:
- Defaults run at call time; expressions can reference earlier parameters.

---

## 2. Template literals (backticks)
- Backticks (`` `...` ``) allow embedded expressions, multi-line strings and easier concatenation.
```ts
const name = "Duncan";
const location = "Glasgow";
const team = "Data Capabilities";
const description = `${name} lives in ${location} and works in the ${team} team.

`;
```
- Useful for readable multi-line strings, interpolation and small templates.

Remember:
- Use `${expr}` for interpolation, preserves newlines.

---

## 3. Template literal types (TypeScript)
- TypeScript can build string literal types from other literal types:
```ts
type Greeting = "Hello" | "Bonjour" | "Gutentag";
type Target = "World" | "Planet";
type GreetOptions = `${Greeting} ${Target}`; // e.g. "Hello World"
```
- You can compose URL-like types:
```ts
type Area = "news" | "sport" | "iplayer";
type ValidUrls = `https://${Area}.bbc.co.uk`;
type NewUrls = `https://bbc.co.uk/${Area}`;
type AllValid = ValidUrls | NewUrls;
```

Remember:
- Template literal types are compile-time constraints, not runtime values.

---

## 4. Arrow functions (=>)
- Concise syntax, lexical `this` (doesn't bind its own `this`), implicit return for single expressions.
```ts
type BinaryOperation = (a: number, b: number) => number;
const perimeterOfRect: BinaryOperation = (length, width) => 2 * length + 2 * width;
```
- TS tip: annotate arrow variable with function type to carry parameter defaults/types safely:
```ts
let areaOfRectArrow: BinaryOperation = (length = 1, width) => length * width;
```

Remember:
- Arrow functions do not have their own `this`, `arguments` or `new`-target.

---

## 5. var / let / const and block scoping
- `var` is function-scoped and hoisted; `let` / `const` are block-scoped and not usable before initialization (temporal dead zone).
- `const` creates a constant binding (the value it points to for objects/arrays can still be mutated).
- Common closure pitfall (fixed by `let` in loops):
```ts
for (let i = 1; i <= 3; i++) {
  const element = pseudoDom[`button${i}`];
  element.click = function () {
    return `Item ${i} is clicked.`;
  };
}
```
- If `i` were `var`, all callbacks could capture the final `i` value instead of each iteration's value.

Remember:
- Prefer `const` by default, `let` when reassigning. Avoid `var`.

---

## 6. Spread operator and shallow copying
- The spread operator `...` copies array elements (shallow copy).
```ts
const num2: number[] = [1,4,9,16];
const nums3 = [...num2]; // new array, values copied
nums3.push(81);
```
- For objects/arrays with nested objects, spread creates a shallow clone (nested objects are still shared).

Remember:
- To deep-clone nested structures use structuredClone (or a library) — or JSON-based approaches with caveats.

---

## 7. structuredClone (deep clone)
- A modern builtin for deep cloning structured data (preserves nested objects, arrays, Dates, Maps, Sets, etc. where supported).
```ts
const people = [{ name: "Duncan" }, { name: "Angel" }];
let newPeople = structuredClone(people); // deep clone
newPeople.push({ name: "Kelly" });
people[0].name = "DUNCAN";
```
- After structuredClone, `people` and `newPeople` do not share nested objects.

Caveats:
- structuredClone has good support in modern Node and browsers; check availability or polyfill if targeting older environments.
- JSON.parse(JSON.stringify(obj)) is a rough alternative but loses functions, undefined, Symbols, Dates, and more.

Remember:
- Use structuredClone for reliable deep copies where available.

---

## 8. Array iteration and transformation methods
- forEach — iterate for side effects:
```ts
newPeople.forEach(person => console.log(`Hello ${person.name}`));
```
- map — transform each item into a new array (TS: you can provide a generic return type):
```ts
type UpdatedPerson = { name: string; nameLength: number };
const result = newPeople
  .map<UpdatedPerson>(person => ({ name: person.name, nameLength: person.name.length }))
  .filter(p => p.nameLength < 6);
```
- filter — narrow the array by predicate.
- reduce — accumulate into a single value:
```ts
const nextResult = result.reduce<string[]>((acc, cur) => [...acc, cur.name], []);
```
- Useful array helpers: some, every, find, findIndex, flatMap, includes, etc.

Performance note:
- Using `[...acc, cur.name]` creates a new array each iteration (functional style). For large arrays prefer mutating the accumulator: `acc.push(cur.name); return acc;`.

Remember:
- Prefer map/filter/reduce for expressive transformations; choose mutation vs allocation based on performance needs.

---

## 9. Iterator helpers and Set methods (ES2025)
- Iterator helpers add chainable methods directly to any iterator — `.map()`, `.filter()`, `.take()`, `.drop()`, `.reduce()`, `.toArray()` — without first converting to an array:
```ts
function* wordCounts(articles: { title: string }[]) {
  for (const article of articles) yield article.title.split(" ").length;
}

const totalWords = wordCounts(articles)
  .filter(count => count > 0)
  .take(10)
  .reduce((sum, count) => sum + count, 0);
```
- Set gained first-class set algebra methods: `union`, `intersection`, `difference`, `symmetricDifference`, `isSubsetOf`, `isSupersetOf`:
```ts
const newsReaders = new Set(["Jane", "John", "Sarah"]);
const sportReaders = new Set(["John", "Priya"]);

const readsBoth = newsReaders.intersection(sportReaders); // Set {"John"}
const readsEither = newsReaders.union(sportReaders);       // Set {"Jane","John","Sarah","Priya"}
```
- Supported in Node 22+ and current evergreen browsers.

Remember:
- Reach for Set methods instead of manual `.filter()` + `.has()` combinations when comparing two collections — it's both clearer and avoids O(n²) mistakes.

---

## 10. Optional chaining and nullish coalescing (?. and ??)
- Optional chaining `?.` lets you safely access nested properties that might be null/undefined.
- Nullish coalescing `??` returns the right-hand side only if the left is `null` or `undefined` (unlike `||` which treats falsy values like `0` or `""` as triggers).
```ts
function getUserCountryCodeModern(user: User): string {
  return user.address?.country?.code ?? "Unknown";
}
function getUserThemeModern(user: User): string {
  return user.preferences?.theme ?? "light";
}
```
- Optional chaining also works with calls and array indexes: `obj.method?.()` and `arr?.[0]`.
- `??` is what you want for defaults where a falsy-but-valid value (`0`, `""`, `false`) shouldn't be overwritten:
```ts
function createUser(name?: string) {
  return { name: name ?? "Unknown" }; // "Unknown" only if name is null/undefined
}
```

Remember:
- `?.` short-circuits and returns `undefined` if any part is null/undefined. Use `??` over `||` whenever `0`, `''`, or `false` are valid values you don't want replaced.

---

## 11. Miscellaneous tips & gotchas
- Default param expressions are evaluated at call time; be careful with expensive expressions.
- Arrow functions and `this`: use arrows for callbacks that should not bind their own `this`.
- structuredClone will error on un-clonable values (e.g., functions in some contexts) — prefer serialization/explicit handling for functions.
- Template literal types are purely compile-time (useful for strong string constraints).
- Be mindful of shallow vs deep copy when using spread; mutation of nested objects affects all references.
- For array reduces, prefer in-place push for performance when building arrays.
- Import-related syntax (`import type`, ESM `__dirname` via `import.meta.url`) is covered in Section 3 — not repeated here.

---

## Quick "What to Remember" summary
- Default params: shorter and can reference previous params.
- Template literals: cleaner interpolation and multiline.
- Arrow functions: concise + lexical `this`.
- Use `const`/`let` not `var`; `let` fixes loop-closure bugs.
- Spread copies shallowly; structuredClone -> deep copy.
- Array helpers: forEach, map, filter, reduce (use generics in TS).
- Iterator helpers chain lazily on any iterator; Set gained union/intersection/difference (ES2025, Node 22+).
- Optional chaining `?.` and nullish coalescing `??` are safer than deep checks and `||`.
- Template literal types in TS let you compose string types at compile time.
