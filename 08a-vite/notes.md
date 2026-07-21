# Section 8 — A Brief Introduction to Webpack

Webpack is a **module bundler**. Its job is to take your project’s files (TypeScript, JavaScript, CSS, assets), follow their imports, and produce **one or more browser-ready bundles**.

Think of it as the bridge between *modern modular code* and *what the browser can actually load*.

---

## The problem Webpack solves

Browsers don’t understand:

* TypeScript
* module graphs spread across many files
* build-time transformations

Your source code might look like this:

```ts
// app.ts
import { renderApp } from "./render";

renderApp();
```

But the browser needs something like:

```html
<script src="bundle.js"></script>
```

Webpack connects those two worlds.

---

## The core idea: entry → bundle

At its simplest, Webpack works like this:

1. Start at an **entry file**
2. Follow every `import`
3. Bundle everything into an **output file**

From the config:

```js
module.exports = {
  entry: "./app.ts",
  output: {
    filename: "bundle.js",
  },
};
```

* `entry` is where Webpack starts building the dependency graph
* `bundle.js` is what the browser loads

---

## How Webpack fits with TypeScript

Webpack does **not** understand TypeScript by default.

That’s why we add a loader:

```js
module: {
  rules: [
    {
      test: /\.ts$/,
      use: "ts-loader",
      exclude: /node_modules/,
    },
  ],
},
```

What this means:

* files ending in `.ts` are handled specially
* `ts-loader` runs the TypeScript compiler
* the output is plain JavaScript inside the bundle

TypeScript still controls:

* type-checking
* language features
* compiler options

Webpack controls:

* file loading
* bundling
* output format

---

## Resolving imports

When Webpack sees this:

```ts
import { something } from "./utils";
```

It needs to know what files to look for.

```js
resolve: {
  extensions: [".ts", ".js"],
},
```

This allows:

* `./utils.ts`
* `./utils.js`

without specifying extensions in imports.

This mirrors how TypeScript resolves modules, keeping things consistent.

---

## Connecting to HTML

Webpack doesn’t touch your HTML by default.

Your `index.html` simply loads the bundle:

```html
<body>
  <div id="content"></div>
  <script src="bundle.js"></script>
</body>
```

Webpack builds the file.
The browser runs it.

Clean separation of concerns.

---

## Development vs production (conceptually)

In this section, we’re keeping things simple — but it’s worth knowing the direction of travel.

Webpack *can*:

* watch files and rebuild
* optimise bundles
* split code
* handle CSS and assets
* inject environment variables

For now, the key idea is **bundling**, not optimisation.

---

## Common pitfalls & quick fixes

* **“Webpack is doing TypeScript errors”**
  → No — that’s `ts-loader` invoking `tsc`.

* **Imports work in TS but not in the browser**
  → Webpack bundles; the browser never sees your original files.

* **Forgetting loaders**
  → Webpack only understands JS unless told otherwise.

* **Confusing Webpack config with TS config**
  → `webpack.config.js` ≠ `tsconfig.json`

---

## What to remember

* Webpack bundles modules into browser-ready files
* It starts from an entry point and follows imports
* Loaders teach Webpack how to handle non-JS files
* TypeScript still owns type-checking
* The browser only ever sees the final bundle

---

### Final checklist

* [ ] Do I know where Webpack starts (`entry`)?
* [ ] Do I understand what the bundle contains?
* [ ] Can I explain why a loader is needed for TypeScript?
* [ ] Do I know which config controls what?
* [ ] Can I trace source → bundle → browser?

