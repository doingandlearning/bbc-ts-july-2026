# Section 2 — Initialising New Projects

These notes walk through the typical steps and files you create when starting a new TypeScript + Node project. Read them before you run the commands so you understand what each file and option does.

## Overview (what we’ll create)

- package.json (npm project manifest + scripts)
- package-lock.json (exact dependency tree)
- node_modules/ (installed packages)
- tsconfig.json (TypeScript compiler options)
- src/ (your TypeScript source)
- dist/ (compiled output)

## Common commands (sequence used in class)

1. npm init
2. npm install -D typescript tsx @types/node
3. npx tsc --init
4. Edit package.json scripts and tsconfig.json as needed
5. npm run dev (during development)
6. npm run build && npm start (for production/serve)

Example scripts added to package.json:

- "dev": "tsx --watch src/app.ts" — run the app from TS and watch for changes (tsx runs TS directly).
- "build": "tsc" — compile to JavaScript in dist/.
- "start": "node dist/app.js" — run compiled output.
- "test": placeholder for tests.

Dev dependencies in the example:

- typescript — the compiler
- tsx — fast dev runner for TypeScript/ESM
- @types/node — Node.js type declarations (useful when using Node APIs)

## What each file does

- package.json
  - Describes the project and contains npm scripts.
  - Stores dependency metadata (devDependencies vs dependencies).
  - Consider adding "type": "module" if you want Node to treat .js as ESM; otherwise Node behavior depends on file extensions (.mjs/.cjs) and tsconfig.module settings.

- package-lock.json
  - Records exact installed versions (reproducible installs).
  - Commit it to version control for apps; libraries may have different considerations.

- node_modules/
  - Installed packages — do not commit this folder; add to .gitignore.

- tsconfig.json
  - Central place to configure TypeScript compilation behavior (explained below).

## tsconfig.json — key options from the example and what they mean

- rootDir: "./src"
  - Where your TypeScript source files live. Compiler will treat this as the project root for sources.

- outDir: "./dist"
  - Where compiled JavaScript and maps are emitted.

- module: "nodenext"
  - Node + ESM-aware module semantics (recommended for Node ESM projects). Requires matching Node / package.json settings (see "type": "module") or using .mts/.cts extensions.

- target: "es2024"
  - Language level to emit. Pick a target compatible with the Node version you intend to run on (newer targets produce less-transpiled output).
  - Note: `target: "es5"` is deprecated as of TypeScript 6.0 and becomes a hard error in TypeScript 7 — don't reach for it in new configs even if you see it in older tutorials or Stack Overflow answers.

- types: ["node"]
  - Include Node type declarations (requires @types/node dev dependency).

- sourceMap: true
  - Emit source maps so debuggers and stack traces map back to TypeScript.

- noUncheckedIndexedAccess: true
  - Makes reading from index signatures produce possibly undefined results — safer but stricter.

- exactOptionalPropertyTypes: true
  - Differentiates between optional properties and properties that may be undefined.

- strict: true
  - Enables the strict type checking family (recommended).

- jsx: "react-jsx"
  - JSX transform variant (only relevant if you use JSX/React).

- verbatimModuleSyntax: true
  - Emit module syntax closer to the source; useful with Node ESM and bundlers.

- isolatedModules: true
  - Ensure each file can be transpiled in isolation (helps with tools like tsx, Babel).

- noUncheckedSideEffectImports: true
  - Warn if imports are used for side-effects but cannot be checked by TS (newer checks).

- moduleDetection: "force"
  - Force module detection to treat files as modules (useful when mixing scripts/modules).

- skipLibCheck: true
  - Skip type checking of declaration files to speed up compilation (tradeoff: subtle lib mismatches may be missed).

Notes:

- "declaration" and "declarationMap" are commented out. If you’re authoring a library, enable "declaration": true to emit .d.ts files.
- If you rely on Node global APIs, install @types/node and keep types: ["node"].
- Adjust "target" and "module" for compatibility with your Node runtime or browser targets.

## Development workflow

- Dev (fast iteration)
  - Use tsx --watch src/app.ts (or ts-node-dev, nodemon+tsx) to run TypeScript directly and reload on changes.
  - Keep source in src/ so tsc outDir works predictably.

- Build & Run (production)
  - npm run build → transpiles TS to JS in dist/
  - npm start → run dist/app.js with node

## Best practices / recommendations

- Add a .gitignore with at least:
  - node_modules/
  - dist/
  - .env (if using env files)
- Keep source in src/ and output to dist/.
- Use devDependencies for build/dev tools (typescript, tsx, @types/\*). Use dependencies for runtime libraries needed by your app when installed by end-users.
- Enable strict type checking (strict: true) to catch issues early.
- Choose a target appropriate for the Node version you run; upgrade Node to use newer ES targets.
- For Node ESM projects:
  - Either set package.json "type": "module" or use .mjs/.cjs file extensions.
  - Using "module": "nodenext" in tsconfig helps with Node's dual ESM/CJS semantics.
- Use source maps during development to get accurate stack traces.
- If publishing a library, enable "declaration": true and consider "moduleResolution" settings.
- Commit package-lock.json to ensure deterministic installs for apps.

## Common pitfalls & quick fixes

- "Cannot use import statement outside a module"
  - Ensure Node treats the file as a module: add "type": "module" in package.json, or compile to CommonJS, or use correct .mjs/.cjs extensions.

- ESM / CJS mismatch (ERR_REQUIRE_ESM)
  - Align tsconfig.module + package.json "type" + runtime expectations. For Node ESM use "nodenext" or output ESM files; for CommonJS use "commonjs".

- Missing Node types (TypeScript errors for global Node names)
  - Install @types/node and add "types": ["node"] to tsconfig or include it via typeRoots.

- Declaration files missing for libraries
  - Either install @types/yourlib or add a manual declaration (.d.ts) if necessary.

- Slow build times
  - Use incremental builds: add "incremental": true in tsconfig, and consider project references for very large repos.

## Quick command cheat sheet

- Initialize project: npm init
- Install dev tools: npm install -D typescript tsx @types/node
- Create tsconfig.json: npx tsc --init
- Run in dev mode: npm run dev
- Build: npm run build
- Run compiled code: npm start

## Short checklist (before first commit)

- [ ] src/ directory exists with an entry (src/app.ts)
- [ ] tsconfig.json configured (rootDir, outDir, target, module)
- [ ] package.json scripts include dev, build, start
- [ ] devDependencies installed (typescript, tsx, @types/node)
- [ ] .gitignore contains node_modules/ and dist/
- [ ] package-lock.json committed
