# Section 3 — Imports: CommonJS (CJS) vs ECMAScript Modules (ESM) and how TypeScript aligns

These notes explain the runtime differences between CJS and ESM, how module exports/imports work in each, how __dirname / __filename behave, and the recommended TypeScript settings and patterns to align TS with both module systems.

---

## Quick overview
- CommonJS (CJS)
  - Node classic: synchronous require(), module.exports / exports.
  - Provides globals: __dirname, __filename, module, exports, require.
- ECMAScript Modules (ESM)
  - Standard JS modules: import / export, static analysis, supports top-level await.
  - No CJS globals; use import.meta and URL helpers instead.
- TypeScript
  - Compiles to JS modules. Behavior depends on tsconfig "module" setting and package.json "type".
  - Use different emit strategies: CommonJS (for old Node) or Node ESM modes (node16 / nodenext) for ESM.

---

## CommonJS (CJS) — basics & example

Syntax:
- Exporting:
  - module.exports = value
  - exports.named = value (exports is an alias)
- Importing:
  - const mod = require('./mod')
  - const { named } = require('./mod')

Example (lib.cjs):
```js
// lib.cjs
function add(a, b) { return a + b; }
module.exports = { add };
```

Using it:
```js
// app.cjs
const { add } = require('./lib.cjs');
console.log(add(1, 2)); // 3
```

CJS runtime globals:
- __dirname and __filename are available and refer to the current file's folder and path.
- module is an object representing the current module (module.exports).

Notes:
- require() is synchronous and caches modules.
- Good for older Node projects or packages targeting CommonJS consumers.

---

## ESM — basics & example

Syntax:
- Exporting:
  - export const x = ...
  - export default ...
- Importing:
  - import { x } from './mod.js'
  - import defaultExport from './mod.js'
  - dynamic: await import('./mod.js')

Example (lib.mjs / lib.js when package.json "type": "module"):
```js
// lib.mjs
export function add(a, b) { return a + b; }
export default function subtract(a, b) { return a - b; }
```

Using it:
```js
// app.mjs
import { add } from './lib.mjs';
import subtract from './lib.mjs';
console.log(add(1,2), subtract(5,2));
```

No CJS globals:
- __dirname / __filename are not defined.
- Use import.meta.url and URL helpers to get file paths:
```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

Notes:
- Static imports are analyzable by tooling (tree-shaking).
- Supports top-level await in Node (if runtime supports it).

---

## Interop: using CJS and ESM together

Common interop issues & solutions:

1. Importing CommonJS from ESM
   - Default export behavior differs. A CJS module may expose exports on module.exports.
   - In pure ESM runtime, use createRequire:
     ```js
     import { createRequire } from 'module';
     const require = createRequire(import.meta.url);
     const cjs = require('./lib.cjs');
     ```
   - Or use dynamic import of a CommonJS-built file (may return an object with default).

2. Importing ESM from CommonJS
   - CJS cannot use static import; use dynamic import():
     ```js
     (async () => {
       const mod = await import('./lib.mjs');
       console.log(mod.add);
     })();
     ```

3. Default import differences
   - When compiling TS to CommonJS, tools like esModuleInterop or allowSyntheticDefaultImports affect whether you can write `import fs from 'fs'`.
   - Without esModuleInterop: import * as fs from 'fs' is the safe pattern for CommonJS modules.

4. createRequire
   - In ESM to use require: `import { createRequire } from 'module'; const require = createRequire(import.meta.url);`

---

## __dirname / __filename — differences & how to get them

- CJS:
  - __dirname and __filename are provided automatically.
  - Example (CJS):
    ```js
    console.log(__dirname, __filename);
    ```

- ESM:
  - Those globals are not available. Use:
    ```js
    import { fileURLToPath } from 'url';
    import { dirname } from 'path';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    ```
  - This works in JS and TS when targeting ESM.

---

## TypeScript: compiler settings & alignment

Key tsconfig options and package.json settings:

- package.json
  - "type": "module" → treat .js files as ESM
  - If omitted or "commonjs", .js emitted is CommonJS unless using .mjs extension

- tsconfig.json: module choices
  - "module": "commonjs"
    - Emit CommonJS modules (use when targeting old Node or CJS consumers)
  - "module": "node16" or "nodenext"
    - Emit ESM-aware output and support Node's resolution for .ts/.mts/.cts
    - Recommended for new Node ESM projects
  - "moduleResolution": "node" or "nodenext" (match module setting)

- Interop flags (help with imports):
  - "esModuleInterop": true
    - Adds compatibility helpers to enable default imports from CommonJS modules
  - "allowSyntheticDefaultImports": true
    - Allows `import x from 'cjs'` in typescript type system (no runtime transform)
  - "verbatimModuleSyntax": true (when you want tsc not to rewrite import/export forms — useful with Node ESM workflows)

- Other:
  - "isolatedModules": true if using tools that compile files separately (ts-jest, Babel, tsx)
  - Keep "types": ["node"] if you use Node globals (but note import.meta types come from lib options)

Examples of TS files for each target:

- TS compiled to CommonJS (tsconfig.module = "commonjs"):
  ```ts
  // src/lib.ts
  export function add(a: number, b: number) { return a + b; }

  // src/app.ts (CommonJS runtime will use compiled require)
  import { add } from './lib';
  console.log(add(2,3));
  ```

- TS targeting Node ESM (tsconfig.module = "nodenext" and package.json "type": "module"):
  ```ts
  // src/lib.ts
  export function add(a: number, b: number) { return a + b; }

  // src/app.ts
  import { add } from './lib.js'; // note .js extension in source import when using Node ESM resolution
  console.log(add(2,3));
  ```

Important: When using Node ESM + TypeScript with "nodenext", you often write imports with .js extensions in TS source so Node can resolve the emitted JS (tSC understands the mapping).

---

## TS-specific patterns: types-only imports & exports

- Prefer `import type` and `export type` for type-only imports (avoids runtime imports when transpiling to JS):
  ```ts
  // types.ts
  export type User = { id: string };

  // app.ts
  import type { User } from './types';
  ```

- Avoid importing types at runtime when not necessary.

---

## Common pitfalls & quick fixes

- “Cannot use import statement outside a module”
  - Set package.json "type": "module" for ESM, or compile to CommonJS.
- ESM/CJS mismatch (ERR_REQUIRE_ESM)
  - Align runtime (package.json "type") and tsconfig "module" output.
- Default import undefined (import x from 'cjs-lib' yields undefined)
  - Enable esModuleInterop or use `import * as x from 'cjs-lib'` or `const x = require('cjs-lib')`.
- __dirname undefined in ESM
  - Use fileURLToPath(import.meta.url) + dirname.
- Imported file extension missing/incorrect
  - With Node ESM, include `.js` extension in TS import statements (tsc maps it when emitting).

---

## Best practices & recommendations

- For new Node projects prefer ESM (module: "nodenext" or "node16" and package.json "type": "module") unless you need CJS compatibility.
- Use `esModuleInterop: true` if you want ergonomic default imports from many CommonJS packages.
- Use `import type` for purely type imports to avoid accidental runtime dependencies.
- When targeting Node ESM, write source imports with .js extensions so runtime resolution works after emit (tsc / nodenext handles mapping).
- Use createRequire in ESM only when you must consume CJS that cannot be migrated.
- Use fileURLToPath(import.meta.url) to obtain __filename/__dirname in ESM.

---

## Short cheat sheet / examples

CJS export + import:
```js
// lib.cjs
module.exports = { greet: (n) => `hi ${n}` };

// app.cjs
const { greet } = require('./lib.cjs');
```

ESM export + import:
```js
// lib.mjs
export function greet(n) { return `hi ${n}`; }

// app.mjs
import { greet } from './lib.mjs';
```

ESM __dirname / __filename:
```js
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

Using CJS from ESM:
```js
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const cjs = require('./lib.cjs');
```

TypeScript tsconfig recommendations:
- For ESM Node: { "module": "nodenext", "moduleResolution": "nodenext", "esModuleInterop": true }
- For CJS Node: { "module": "commonjs", "moduleResolution": "node", "esModuleInterop": true }


