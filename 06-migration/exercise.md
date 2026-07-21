# Practice Lab - Migrating Legacy JS to TypeScript

In this module, we're taking a real piece of untyped JavaScript — a small in-memory user database — and migrating it to TypeScript incrementally, splitting it into proper modules along the way.

## Getting Started

Start from `src/student/index.js`. The finished shape of where you're heading is `src/solution/` — don't open `userModel.ts`, `userOperations.ts`, or `index.ts` until you've had a go, but they're there to check your work against at the end. `notes.md` in this folder has the same phases worked through on a different example (a shape-area calculator) if you want a second worked reference.

---

## Exercise 1: Turning On the Safety Net

**Objective:** Get TypeScript checking the file without splitting or rewriting anything yet.

**Tasks:**

1. Add `// @ts-check` as the first line of `student/index.js`.
2. Run `tsc --noEmit` (or watch your editor's Problems panel). You should see implicit-`any` errors on every function parameter — `addUser`, `findUser`, `deleteUser` all take untyped arguments right now.
3. Don't fix anything yet — just confirm you can see the full list of what needs typing.

**Key Learning:** `@ts-check` on a `.js` file costs you nothing structurally — no renamed files, no rewritten code — and it's what tells you the shape of the work ahead before you commit to it.

---

## Exercise 2: Defining the `User` Shape

**Objective:** Give the data a name before typing the functions that operate on it.

**Context:** Right now `database` is just `[]` with no declared shape — every function that touches it is implicitly working with `any`.

**Tasks:**

1. Define an interface (or type) `User` with `id: number`, `username: string`, `age: number`, `email: string`, and `created: Date`.
2. Define `type UserDatabase = User[]`.
3. Type `database` itself as `UserDatabase`.
4. Don't move this into its own file yet — just get it compiling in place first.

**Key Learning:** Typing the data before typing the functions that operate on it is usually the easier order — once `User` and `UserDatabase` exist, every function signature below basically writes itself.

---

## Exercise 3: Typing the Functions and Losing the Manual Loops

**Objective:** Apply `User`/`UserDatabase` to each function, and replace the hand-written loops with array methods while you're in there.

**Tasks:**

1. Type `addUser(username: string, age: number, email: string): User`.
2. Type `findUser(username: string): User | null`, and replace the manual `for` loop with `.find(...)`.
3. Type `deleteUser(id: number): User | null`, and replace the manual `for` loop with `.findIndex(...)` + `.splice(...)`.
4. Type `listUsers(): UserDatabase`.
5. Replace every `var` in the file with `const` or `let`.

**Key Learning:** `.find()` and `.findIndex()` return `undefined`, not `null`, when nothing matches — so `database.find(...) || null` is doing real work here, not just decoration. Worth checking what TypeScript infers for `findUser`'s return type if you drop the `|| null`.

---

## Exercise 4: Converting to `.ts` and Splitting Into Modules

**Objective:** Rename to `.ts`, then split one file into three: data model, operations, and entry point — matching `src/solution/`'s shape.

**Tasks:**

1. Rename your file to `.ts` and drop the `@ts-check` comment (it's implied now).
2. Create `userModel.ts` containing just `User`, `UserDatabase`, and the `database` constant, each `export`ed.
3. Create `userOperations.ts` containing `addUser`, `findUser`, `deleteUser`, `listUsers`, importing `User`/`UserDatabase`/`database` from `userModel`.
4. Create a slim `index.ts` that imports from `userOperations` and runs the same `console.log` calls the original file had — no logic of its own.
5. Confirm everything still runs the same as it did in Exercise 3, just spread across three files now.

**Key Learning:** Splitting into "data model / operations / entry point" isn't required for a migration to work — the single-file typed version from Exercise 3 would have been perfectly valid TypeScript. It's a separate, optional step you take when a file has grown enough that mixing shape definitions, logic, and "the actual program" together stops being convenient.

---

## Exercise 5: Check Against the Solution

**Objective:** Compare your three files against `src/solution/`.

**Tasks:**

1. Diff `userModel.ts`, `userOperations.ts`, and `index.ts` against your own versions. You won't match exactly — note anywhere your approach differs and whether yours is better, worse, or just different.
2. Check one specific thing: do the solution's imports (`from "./userModel"`) have `.js` extensions on them? Compare that against what Section 3 taught about `nodenext` resolution, and decide whether that's something worth fixing if you were shipping this for real.

**Key Learning:** A finished "solution" file isn't gospel — Exercise 5.2 is deliberately there because the solution itself has a small inconsistency worth spotting, not just copying.
