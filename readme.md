# Intermediate TypeScript

- July 20th-22nd
- Kevin Cunningham
  - https://kevincunningham.co.uk
  - kevin@kevincunningham.co.uk
- [Feedback](https://forms.office.com/e/K8JjSZd9ai)

## Timings

- 9:30-11 Session 1
- 11-11.15 Coffee
- 11.15-12.45 Session 2
- 12.45-1.45 Lunch
- 1.45-3.15 Session 3
- 3.15-3.30 Tea
- 3.30-4.30 Session 4

## Units

1. **TS Intro** - Primitives vs non-primitives, TypeScript special types (any, unknown, void, never), type aliases and interfaces, unions and intersections, literal types, arrays, structural typing (duck typing), interface extension and declaration merging.
2. **Initializing New Projects** - Setting up package.json, tsconfig.json, src and dist directories, npm scripts, dev dependencies (typescript, tsx, @types/node), key tsconfig options (rootDir, outDir, module, target, strict mode), development workflow, and best practices.
3. **Imports** - CommonJS (CJS) vs ECMAScript Modules (ESM), runtime differences, module exports/imports, `__dirname`/`__filename` behavior, TypeScript compiler settings and alignment, interop patterns, and type-only imports.
4. **What's New in JS** - Default parameters, template literals (backticks) and template literal types, arrow functions, var/let/const and block scoping, spread operator and shallow copying, structuredClone (deep clone), array iteration methods (forEach, map, filter, reduce), optional chaining (?.) and nullish coalescing (??).
5. **Narrowing and Widening** - Understanding when types get more specific (narrowing) or general (widening), truthy checks, typeof and instanceof, property checks (in), discriminated unions, user-defined type guards, and avoiding over-widening with satisfies.
6. **Migration** - Moving from JavaScript to TypeScript pragmatically: using @ts-check in JS files, JSDoc for low-friction typing, introducing .d.ts files to describe existing shapes, converting core logic gradually, mixing JS and TS safely, and incremental migration strategies.
7. **Async** - The evolution of async in TypeScript: callbacks → promises → async/await, typing async data correctly, parallel async with Promise.all, cancellation with AbortController, and error handling in async code.
8. **Webpack** - Module bundling concepts: entry points and bundles, how Webpack fits with TypeScript (loaders), resolving imports, connecting to HTML, development vs production workflows, and understanding the bundling process.
9. **Error Handling** - Making failure explicit: no error handling, returning null, throwing exceptions, custom error types, returning error objects (Result types), Option types for absence, and choosing the right error handling approach.
10. **Creating Types from Others** - Type composition toolkit: generics (types with parameters), constraining generics with extends, utility types (Pick, Readonly, Partial), conditional types (types with logic), and mapped types with in (keyof transformations).
11. **Testing** - Testing in TypeScript: testing pure functions, what TypeScript gives you in tests, testing async code, mocking and isolation (light touch), and what not to over-test. Focus on behavior, not types.
12. **Kitchen Sink** - function overloading, tuples and records, branded types, const type parameters.
