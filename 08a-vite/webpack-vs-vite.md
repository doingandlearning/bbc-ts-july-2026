# Webpack vs. Vite — Reference for Teaching Unit 8

## The core architectural difference

Webpack bundles before it serves. When you run the dev server, it reads the whole dependency graph, resolves every import, and builds a complete bundle in memory — then serves that. On a large app this means a real wait (30–90 seconds isn't unusual) before you can start working.

Vite doesn't bundle in development at all. It serves your source files over native ES modules and transforms each file on demand, the first time the browser actually requests it. That's the one idea that explains almost every other difference in this doc — everything downstream (startup time, HMR speed, why config feels lighter) follows from "bundle upfront" vs. "transform on demand."

Production is different for both. Vite still bundles for production — via Rollup historically, and as of Vite 8 (March 2026) via **Rolldown**, its own Rust-based bundler, now the default. Rolldown hit 1.0 in May 2026, though its minification feature is still marked alpha.

## Dev server & HMR

- Cold start: Vite is commonly cited at roughly 5–6x faster than Webpack on large projects (sub-2-second starts vs. tens of seconds).
- HMR: reported 20–40x faster on large codebases, because Vite only needs to re-transform the one changed module, not re-run a bundling pass.
- Webpack's dev-server story has improved a lot with persistent caching and `webpack-dev-server` improvements, but the fundamental "bundle first" architecture puts a floor under how fast it can be.

## Production builds

Vite/Rolldown builds are generally reported 2–3x faster than Webpack for comparable projects, though this gap is narrower than the dev-server gap and depends heavily on plugin usage on both sides.

## Configuration

Webpack's configuration surface is large by design — loaders, plugins, `resolve`, `optimization`, `module.rules` — which is exactly what gives it its flexibility. Real production `webpack.config.js` files commonly exceed 200 lines.

Vite ships sensible defaults for the common cases (dev server, JSX/TS transform via esbuild, CSS handling) so a lot of projects need little to no config. When you do need to extend it, Vite plugins are a (mostly) compatible superset of the Rollup plugin interface.

## How TypeScript fits in

Worth being explicit with students here, since it's a common point of confusion: neither tool actually type-checks your code as part of the fast path.

- Webpack + `ts-loader` can type-check during the build, but that's slow — most real setups use `babel-loader` or `swc-loader` to transpile TS→JS quickly, and run `tsc --noEmit` separately (in CI, in the editor, or as a lint step) for the actual type checking.
- Vite uses esbuild (or Rolldown itself now) to strip types and transpile — fast, but zero type-checking. The standard pairing is `vite-plugin-checker` or a separate `tsc --noEmit` run, same idea as the Webpack side.

This is a good moment to connect back to Unit 2/6: the compiler (`tsc`) and the bundler are doing two different jobs, and both tools have quietly decided "don't make the bundler responsible for type-checking" — it belongs in its own fast, separate step.

## Ecosystem / plugin maturity

Webpack has the longer track record — more mature plugins for edge cases, more prior art for unusual bundling requirements (micro-frontends, complex multi-entry setups, legacy CJS-heavy dependency trees).

**Module Federation** — Webpack's mechanism for sharing code/dependencies live across independently-deployed apps (the backbone of a lot of micro-frontend architectures) — reached a stable **2.0** release in 2026 and, notably, is no longer Webpack-exclusive: it now has support across Webpack, Rspack, Rollup, Rolldown, Rsbuild, Vite, and Metro. One caveat worth mentioning if it comes up: the Next.js-specific Module Federation plugin is being wound down through 2026, so that particular combination is heading toward end-of-life even as Module Federation itself keeps expanding.

## What's new as of mid-2026 (worth a "state of the union" slide)

- **Vite 8** (March 2026) ships Rolldown as its default bundler — a from-scratch Rust bundler, not a Rust-ified wrapper around the old JS-based Rollup.
- **Cloudflare acquired VoidZero** (the company behind Vite, Vitest, Rolldown, and Oxc) in June 2026, with a stated $1M commitment to a Vite ecosystem fund and a promise that everything stays open source. Worth flagging to students as a live example of how fast this tooling layer moves — genuinely new since most write-ups on this topic.
- Webpack itself isn't going anywhere or being deprecated — its 2026 roadmap is focused on maintainability and easing integration with modern runtimes rather than a ground-up rewrite.

## Framing for "which one do I reach for"

- **New project, no unusual constraints:** Vite. This is close to consensus advice in 2026 — there's little reason to start a new React/Vue/vanilla-TS project on Webpack today.
- **Existing large Webpack app, working fine:** Not an urgent migration. Webpack is stable, well-supported, and a full bundler migration on a mature app is real, risky work for a speed win that may not matter much at production-build time.
- **Complex bundling requirements** (heavy Module Federation micro-frontend setup, unusual legacy dependency graphs, unusual `require` patterns): Webpack's maturity and configurability still matter here, though Module Federation's spread to Rspack/Vite is eroding this as a Webpack-only advantage.
- **Teaching moment:** this is a good place to contrast with Section 2 (`tsx`/`esbuild` in your own course setup) — students have already been using esbuild under the hood via `tsx`, so Vite's dev-time approach (also esbuild/Rolldown-based transforms) isn't a new idea, just the same tradeoff applied to a full app rather than a single script.

---

### Sources

- [Vite vs Webpack: Build Tool Comparison for 2026 — DEV Community](https://dev.to/_d7eb1c1703182e3ce1782/vite-vs-webpack-build-tool-comparison-for-2026-je0)
- [Vite vs. Webpack in 2026: A Complete Migration Guide and Deep Performance Analysis — DEV Community](https://dev.to/pockit_tools/vite-vs-webpack-in-2026-a-complete-migration-guide-and-deep-performance-analysis-5ej5)
- [Webpack vs Vite vs Rspack vs Turbopack (2026) — DevToolReviews](https://www.devtoolreviews.com/reviews/webpack-vs-vite-vs-rspack-vs-turbopack-2026)
- [Vite 8.0 is out! — vite.dev blog](https://vite.dev/blog/announcing-vite8)
- [Vite team claims 10-30x faster builds with Rolldown — The Register](https://www.theregister.com/2026/03/16/vite_8_rolldown/)
- [What's New in ViteLand: January 2026 Recap — VoidZero](https://voidzero.dev/posts/whats-new-jan-2026)
- [rolldown-vite releases (archived March 2026) — GitHub](https://github.com/vitejs/rolldown-vite/releases)
- [Module Federation 2.0 Reaches Stable Release — InfoQ](https://www.infoq.com/news/2026/04/module-federation-2-stable/)
- [Next.js Support is in maintenance mode — module-federation/core Issue #3153](https://github.com/module-federation/core/issues/3153)
- [Webpack Roadmap 2026 — webpack.js.org](https://webpack.js.org/blog/2026-02-04-roadmap-2026/)
