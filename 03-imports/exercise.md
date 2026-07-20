# Practice Lab - CJS, ESM, and TypeScript Modules

In this module, we're comparing how CommonJS, ESM, and TypeScript actually behave at runtime — not just the syntax difference, but what Node does with each, and how TypeScript's compiled output bridges the two.

## Getting Started

Three parallel folders hold the same idea implemented three ways:

- `cjs/` — plain CommonJS (`require`/`module.exports`)
- `esm/` — plain ESM (`import`/`export`)
- `ts/` — TypeScript, compiled with `module: "nodenext"`

Run each with `node cjs/app.js`, `node esm/app.js`, and (inside `ts/`) `npm run dev` before you start changing anything — see what each one prints first.

---

## Exercise 1: CommonJS Globals

**Objective:** See what CJS gives you for free that ESM doesn't.

**Tasks:**

1. Run `node cjs/app.js`. It logs the whole `module` object and the whole `utils` object (`require("./utils")` with no destructuring) — find `location: "Salford"` and `company: "BBC"` inside `utils`, and find `module.exports` inside `module`.
2. Add `console.log(__dirname, __filename)` to `cjs/app.js` and rerun. These work with zero setup in CJS — keep that in mind for Exercise 2.
3. Change `const utils = require("./utils")` to a destructured form — `const { location, company } = require("./utils")` — and log `location`/`company` directly instead of via `utils.`.

**Key Learning:** CommonJS gives you `require`, `module`, `__dirname`, and `__filename` as ambient globals in every file, because each CJS file is wrapped in a function that Node injects them into.

---

## Exercise 2: ESM Has None of That

**Objective:** Confirm those CJS globals genuinely don't exist in ESM, and see the ESM alternative.

**Tasks:**

1. Run `node esm/app.js`. Note it uses a namespace import (`import * as utils from "./utils.js"`) and logs `utils.location, utils.company` — not a destructured import.
2. Try adding `console.log(__dirname)` to `esm/app.js`. What error do you get?
3. Fix it using `import.meta.url` with `fileURLToPath` and `dirname` from `node:url` / `node:path`.
4. Change the import to a named/destructured form — `import { location, company } from "./utils.js"` — and confirm it behaves the same as the namespace import, just with a different access style.
5. The file also imports `fs` from `"node:fs"` but never uses it. Log something from it (e.g. `fs.existsSync("./utils.js")`) to confirm Node built-ins import the same way as local files.

**Key Learning:** ESM has no implicit globals for module-relative paths — everything goes through `import.meta`. This isn't an oversight; it's because ESM modules are meant to be resolvable by URL, not just filesystem path.

---

## Exercise 3: Where TypeScript Sits

**Objective:** See what `ts/` actually compiles to, and why the source imports look slightly odd.

**Tasks:**

1. Open `ts/src/app.ts`. Note the import: `import { location, company } from "./utils.js"` — the file is `utils.ts`, but the import says `.js`. Before running anything, guess why.
2. Run `npm run build` inside `ts/`, then open `dist/app.js`. Confirm the emitted import still says `.js` — TypeScript didn't invent that extension, it preserved what you wrote.
3. Check `ts/package.json` for `"type": "module"` and `ts/tsconfig.json` for `"module": "nodenext"`. Try changing `tsconfig.json`'s `module` to `"commonjs"`, rebuild, and diff `dist/app.js` — what changed in the emitted code?
4. Put `tsconfig.json` back to `"nodenext"` before moving on.

**Key Learning:** With `nodenext`, Node's ESM resolver requires an extension in every import, and that has to be the extension the file will have *after* compilation — `.js`, not `.ts`. TypeScript checks against `utils.ts` but never rewrites the specifier; that's on you to get right in the source.

---

## Exercise 4: Type-Only Imports Get Erased

**Objective:** See the difference between an import that survives compilation and one that doesn't.

**Tasks:**

1. In `ts/src/app.ts`, find `import type { VALID_URL_VALUE } from "./types.js"`. Rebuild, then open `dist/types.js` — it's empty (just `export {}`). Why did the whole file compile away to nothing?
2. Temporarily change that line to a regular `import` (drop the word `type`) and rebuild. Does `dist/app.js` now contain an import from `./types.js`? Put `import type` back afterwards.
3. Look at `ts/src/utils.ts` — it opens with `import type { Url } from "node:url"`, a type-only import from a Node built-in that's never actually used as a value in the file. Rebuild and check `dist/utils.js`: does any trace of that import survive?

**Key Learning:** `import type` is a promise to the compiler that you only want the type, never the value — TypeScript can then erase the whole import (and, if nothing else in the file has runtime content, the whole file) with total confidence it won't break anything at runtime.

---

## Exercise 5: Importing JSON

**Objective:** See what it takes to import a non-JS file into a TypeScript/ESM project, and notice one quirk of this project's tsconfig.

**Tasks:**

1. Look at `import data from "./user.json" with { type: "json" }` in `app.ts`. `user.json` is an array with one entry that has a *nested* `location: { country, city }` object — that's why `app.ts` reads `data[0]?.location?.city` rather than just `data[0]?.location`.
2. Delete `with { type: "json" }` and try to rebuild. What does `tsc` tell you?
3. Now check `ts/tsconfig.json` — it has `"noEmitOnError": false`. Even with the type error from step 2 still in place, run `npm run build` again and check whether `dist/app.js` was still written. What does that tell you about what `noEmitOnError: false` actually buys you, versus what it doesn't (type safety)?
4. Put the `with { type: "json" }` assertion back, rebuild, and confirm `dist/app.js` preserves the clause unchanged (unlike the type-only imports in Exercise 4).

**Key Learning:** `noEmitOnError: false` decouples "did it type-check" from "did it produce output" — useful when you want to keep iterating on JS output even with type errors present, but it means a red squiggly line is no longer a guarantee that `npm run build` will stop you. Don't mistake "it built" for "it's correct" on this config.

---

## Exercise 6: Stretch — Interop

**Objective:** Try consuming a CommonJS module from an ESM/TypeScript context, and see where the friction actually shows up.

**Tasks:**

1. From inside `ts/src/`, try `import { location } from "../../cjs/utils.js"`. What happens — does it work, error at compile time, or error at runtime?
2. If it fails, try the `createRequire` pattern instead: `import { createRequire } from "module"; const require = createRequire(import.meta.url);` and then `require("../../cjs/utils.js")`.
3. Note what `esModuleInterop` and `allowSyntheticDefaultImports` in `tsconfig.json` are for, even though this project doesn't need them here — when would a default import from a CJS package (`import fs from "some-cjs-lib"`) fail without them?

**Key Learning:** CJS and ESM aren't automatically compatible — ESM can load CJS under specific conditions (whole-module import, no static named imports of things that don't exist on `module.exports`), but the reverse is asymmetric. This is usually where real projects hit their first "why won't this import" bug.

---

## Summary

By the end of this lab you should be able to:

- Say what CJS gives you as ambient globals that ESM doesn't, and why
- Explain why TypeScript source written for `nodenext` uses `.js` extensions for files that are actually `.ts`
- Predict whether a given import will survive compilation or be erased
- Import JSON with the correct assertion syntax, including nested structures
- Describe at least one concrete situation where CJS/ESM interop causes friction, and one fix for it
