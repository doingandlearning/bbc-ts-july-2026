# Practice Lab - Bundling TypeScript with Webpack

In this module, we're taking a small TypeScript + DOM app and working out exactly what Webpack does to it between `src/app.ts` and what the browser actually loads.

## Getting Started

Run `npm run build` once before you start, and look at what lands in `dist/` — you should see an `index.html` and a `main.[some-hash].js`. Then run `npm run dev` to bring up the dev server and see the page render.

---

## Exercise 1: Entry, Bundle, Output

**Objective:** Connect what's in `webpack.config.js` to what actually gets produced.

**Tasks:**

1. Open `webpack.config.js` and find `entry: "./src/app.ts"` and `output.filename: "main.[contenthash].js"`. Rebuild (`npm run build`) and confirm the filename in `dist/` matches that pattern.
2. Make a small, harmless change to `src/app.ts` (e.g. change the paragraph text), rebuild, and check whether the output filename's hash changed. Why would a bundler want the filename to change when the content does?
3. Delete the entire `dist/` folder and rebuild from scratch. Confirm everything reappears — nothing in `dist/` is meant to be hand-edited or preserved between builds.

**Key Learning:** The hash in the filename is a cache-busting technique — browsers aggressively cache JS files by name, so changing the name whenever the content changes forces a fresh download instead of a stale cached copy.

---

## Exercise 2: Why Webpack Needs a Loader for TypeScript

**Objective:** See what happens when Webpack doesn't know what to do with a file type.

**Tasks:**

1. In `webpack.config.js`, comment out the entire `ts-loader` rule inside `module.rules`.
2. Run `npm run build` and read the error carefully — Webpack should complain it doesn't know how to parse the `.ts` file at all.
3. Restore the rule and confirm the build works again.

**Key Learning:** Webpack's core job is bundling — it has no built-in understanding of TypeScript syntax. `ts-loader` is what actually invokes the TypeScript compiler for each file Webpack encounters; without it, `.ts` is just an unrecognized file extension as far as Webpack is concerned.

---

## Exercise 3: Resolving Imports Without Extensions

**Objective:** See `resolve.extensions` in action by splitting the app into two files.

**Tasks:**

1. Move the paragraph-creation logic out of `app.ts` into a new file, e.g. `render.ts`, exporting a function that does the DOM work.
2. Back in `app.ts`, import it with **no file extension** — `import { renderMessage } from "./render"` — and call it.
3. Rebuild. It should just work, because of the `resolve: { extensions: [".ts", ".js", ".tsx"] }` block in the config.
4. Temporarily remove `.ts` from that `extensions` array and rebuild. What error do you get now?

**Key Learning:** This is Webpack's own module resolution, separate from (but designed to mirror) how TypeScript resolves imports — the two configs have to agree, or you get imports that type-check fine but fail to bundle, or vice versa.

---

## Exercise 4: HtmlWebpackPlugin Isn't Copying Your HTML

**Objective:** Confirm `dist/index.html` is generated, not copied, from `src/index.html`.

**Tasks:**

1. Change the `<h1>` text in `src/index.html` to something else and rebuild.
2. Open `dist/index.html` and confirm the change is there — but also look at its `<script>` tag. Compare the filename referenced there to the actual hashed filename in `dist/`.
3. Rebuild once more without changing anything, and diff the two `dist/index.html` versions. The script tag's hash should still match whatever the current bundle is named.

**Key Learning:** `HtmlWebpackPlugin` regenerates the HTML file on every build and automatically injects a `<script>` tag pointing at whatever the current output filename actually is — this is exactly why you don't hand-write `<script src="main.js">` in a project using content-hashed filenames; you'd have to update it by hand every single build.

---

## Exercise 5: Type-Checking Is a Separate Concern from Bundling

**Objective:** Find out whether a broken type actually stops the bundle from being built.

**Tasks:**

1. Look at `package.json`'s scripts — there's `"typeCheck": "tsc"` and `"build": "webpack"` as two separate commands.
2. Deliberately introduce a type error in `app.ts` (e.g. `let location: string = 42;`).
3. Run `npm run typeCheck`. Confirm it fails, as expected.
4. Now run `npm run build` (the actual webpack/`ts-loader` build). Does it also fail, or does it still produce a `dist/` bundle? Report what you actually observed — don't assume.
5. Fix the type error before moving on.

**Key Learning:** `ts-loader` does run full type-checking by default as part of the Webpack build (unlike faster alternatives such as `esbuild-loader`, which only strip types and don't check them) — but it's still worth running `tsc`/`typeCheck` as its own step, because a dedicated type-check is faster to run in isolation and doesn't require a full bundle just to tell you your types are wrong.

---

## Exercise 6: The Dev Server Loop

**Objective:** See the watch-and-reload cycle `webpack-dev-server` gives you.

**Tasks:**

1. Run `npm run dev` and confirm the page loads in a browser.
2. With the dev server still running, change something visible in `app.ts` and save. Watch what happens in the browser without you touching it.
3. Check whether a `dist/` folder appears on disk while `npm run dev` is running, or whether the dev server is serving the bundle from memory. What does that tell you about the difference between `npm run dev` and `npm run build`?

**Key Learning:** `webpack-dev-server` rebuilds in memory and pushes updates to the browser automatically — it's built for iteration speed, not for producing the deployable artifact. `npm run build` is the one that actually writes what you'd ship.

---

## Summary

By the end of this lab you should be able to:

- Explain what `entry` and `output` control, and why hashed filenames exist
- Explain why Webpack needs `ts-loader` (or an equivalent) to handle `.ts` files at all
- Predict when an import will fail to resolve, based on `resolve.extensions`
- Explain what `HtmlWebpackPlugin` actually does to your HTML on each build
- Say definitively whether a type error will stop a Webpack build for this project, based on what you observed rather than what you assumed
