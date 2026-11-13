# Holiveira Engineering Execution Roadmap

## Executive Summary

This document defines the engineering execution plan for the Holiveira design system repository from
the current state to the first public release. The roadmap is organized into 12 sequential
milestones, each producing a measurable improvement to repository health.

The repository currently has 19 packages with 75 components, a functional build system, and internal
documentation. What it lacks is stability guarantees, developer tooling, engineering automation,
standards, component review, visual documentation, automated testing, accessibility compliance,
performance budgets, a release pipeline, and open source readiness — delivered in that order.

---

## Engineering Philosophy

1. **Platform first.** The build, type-check, lint, and test pipeline must be healthy before any
   other work.
2. **Tooling second.** Developer workflow automation prevents future regressions.
3. **Automation third.** Engineering scripts and quality gates automate what tooling cannot enforce.
4. **Standards fourth.** Conventions ensure consistency across 19 packages.
5. **Quality fifth.** Components are reviewed and improved before being documented.
6. **Documentation sixth.** Stories verify and showcase what we claim.
7. **Testing seventh.** Tests guarantee component behavior across versions.
8. **Accessibility eighth.** Measured, not guessed.
9. **Performance ninth.** Budgets enforced by automation.
10. **Release tenth.** Publishing is automated and trustworthy.
11. **Open source eleventh.** Community infrastructure opens only when everything is ready.
12. **Documentation platform twelfth.** The portal follows public readiness and does not replace
    Storybook or the Playground.

---

## Dependency Graph

```
M1 → M2 → M3 → M4 → M5 → M6 ─┐
                │    │         ├──→ M8
                │    └→ M7 ───┘
                │
                ├→ M9
                │
                └→ M10 → M11 → M12
```

**Main chain:** M1 → M2 → M3 → M4 → M5 → M6. Each milestone depends on the previous.

**Branching at M3 (Engineering Standards):**

- **M7 (Testing)** — infrastructure and utility tests can start once standards are set. Component
  tests integrate with M5-reviewed components. M7 does not depend on M5 or M6 for its foundation
  phase.
- **M9 (Performance)** — independent analysis of existing code. Does not depend on M5-M8 work.
- **M10 (Release)** — release infrastructure is independent of visual documentation and testing. Can
  run in parallel with M5-M9.

**Convergence at M8 (Accessibility):**

- M6 (Storybook) and M7 (Testing) both feed into M8. Accessibility audit uses stories from M6;
  automated a11y testing uses test infrastructure from M7.

**Final chain:**

- M10 → M11 → M12. Open source depends on publishing capability; the documentation platform follows
  public readiness.

**M12 dependency narrative:**

- **M12 (Documentation Platform)** depends on an approved/frozen ADS-011 and consumes the public
  package surface stabilized by M10/M11. It may be planned before M11 closes, but implementation
  begins only after M11's exit criteria are recorded and its public-release state is explicitly
  known. It MUST present packages as pre-release until the release owner updates the portal's
  release state. It does not change M10 or M11 scope.

---

## Milestone Overview

| #         | Milestone                          | Effort         | Depends On                                           | Blocks              |
| --------- | ---------------------------------- | -------------- | ---------------------------------------------------- | ------------------- |
| M1        | Engineering Platform Stabilization | 2-3d           | —                                                    | M2                  |
| M2        | Developer Tooling                  | 3-4d           | M1                                                   | M3                  |
| M3        | Engineering Standards              | 3-4d           | M2                                                   | M4, M5, M7, M9, M10 |
| M4        | Repository Automation              | 2-3d           | M3                                                   | M5, M9, M10         |
| M5        | Component Review                   | 4-6d           | M4                                                   | M6                  |
| M6        | Storybook Excellence               | 7-10d          | M5                                                   | M8                  |
| M7        | Testing Excellence                 | 8-12d          | M3                                                   | M8                  |
| M8        | Accessibility                      | 5-7d           | M6, M7                                               | —                   |
| M9        | Performance                        | 4-5d           | M3                                                   | —                   |
| M10       | Release Pipeline                   | 3-4d           | M3                                                   | M11                 |
| M11       | Open Source Readiness              | 4-6d           | M10                                                  | M12                 |
| M12       | Documentation Platform             | 10–15d         | ADS-011; M11 public-release state for install claims | —                   |
| **Total** |                                    | **55-77 days** |                                                      |                     |

Note: M7 testing infrastructure and utility tests can begin once M3 completes — they do not depend
on M5 or M6. Component tests are more effective after M5 but can run in parallel if needed.

---

# Milestone 1 — Engineering Platform Stabilization

**Objective:** Repository builds, typechecks, lints, and passes CI with zero errors.

**Why this milestone exists:** No work can proceed until the platform is healthy. Type errors,
vestigial configuration, and inconsistent tooling must be resolved first.

**Dependencies:** None.

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **TSConfig strategy:** Confirm `target: ES2017` is acceptable or upgrade to `ES2020`. Confirm
      `composite` + `declaration` required on all buildable packages.
- [ ] **ESLint strategy:** Decide whether to keep `@next/eslint-plugin-next` (no Next.js app exists)
      or remove it. Confirm `@typescript-eslint/eslint-plugin` as the authoritative TS lint source.
- [ ] **Prettier strategy:** Review print-width (100), quotes (single), trailing commas (all), and
      confirm Tailwind class sorting pipeline.
- [ ] **Build strategy:** Confirm Turbo pipeline tasks match all workspace needs. Decide on
      `turbo.json` outputs format.
- [ ] **Repository hygiene:** Confirm `.syncpackrc.json` policy scope. Decide `.nvmrc` precision
      level.

---

## Deliverables

### D1.1 — TypeScript Configuration [Critical]

**Acceptance Criteria:**

- `packages/auth/tsconfig.json` emits `.d.ts` files via `composite: true` + `declaration: true`
- `packages/icons/tsconfig.json` includes `declarationMap: true`
- `packages/testing/tsconfig.json` includes `declarationMap: true`
- TS2742 errors in `@holiveira/testing` and `@holiveira/auth` are resolved

**Validation:** `pnpm run typecheck` — zero errors across all 19 packages.

- [ ] Fix `packages/auth/tsconfig.json` — add `"composite": true`, `"declaration": true`
- [ ] Fix `packages/icons/tsconfig.json` — add `"declarationMap": true`
- [ ] Fix `packages/testing/tsconfig.json` — add `"declarationMap": true`
- [ ] Fix `packages/testing/` TS2742 type inference error (known pre-existing)
- [ ] Fix `packages/auth/` TS2742 type inference errors (known pre-existing)

### D1.2 — Build System [High]

**Acceptance Criteria:**

- `turbo.json` has no vestigial Next.js references
- All required pipeline tasks are defined
- `prisma.config.ts` uses `dotenv` instead of `@next/env`
- Storybook tsconfig reflects actual directory structure
- Storybook has an explicit `vite.config.ts`

**Validation:** `npx turbo build` and `npx turbo storybook` succeed.

- [ ] Remove vestigial `.next/**` from `turbo.json` `build.outputs`
- [ ] Add `test` task definition to `turbo.json`
- [ ] Remove `@next/env` from `prisma.config.ts` — replace with `dotenv`
- [ ] Fix Storybook `tsconfig.json` — remove non-existent `stories/**` from `include`
- [ ] Add `vite.config.ts` to `apps/storybook/` with Vite, PostCSS, and monorepo alias configuration

### D1.3 — ESLint Foundation [High]

**Acceptance Criteria:**

- `@typescript-eslint/eslint-plugin` installed and configured
- `reportUnusedDisableDirectives` at correct config level
- No vestigial Next.js plugin without Next.js app

**Validation:** `pnpm run lint` — zero errors.

- [ ] Install `@typescript-eslint/eslint-plugin` at root `devDependencies`
- [ ] Fix `reportUnusedDisableDirectives` — move to top-level `linterOptions` in `eslint.config.mjs`
- [ ] Remove or guard `@next/eslint-plugin-next` (no Next.js application exists in this repository)

### D1.4 — Prettier Full Review [Medium]

**Acceptance Criteria:**

- All file types covered by Prettier configuration (`.ts`, `.tsx`, `.js`, `.jsx`, `.json`, `.md`,
  `.yml`, `.yaml`)
- `.prettierignore` is complete (build output, generated code, coverage)
- Tailwind plugin correctly handles `cn()` and `cva()` utility functions
- Formatting rules documented and consistent

**Validation:** `pnpm dlx prettier --check .` — zero violations.

- [ ] **Plugins:** Verify `prettier-plugin-tailwindcss` properly configured with
      `tailwindFunctions: ["cva", "cn"]`
- [ ] **Overrides:** Add Prettier overrides for specific file types:
  - Markdown — prose wrap at 100 characters
  - YAML — 2-space indent, no trailing commas
  - JSON — 2-space indent
  - `package.json` — standard npm formatting (2-space, sorted keys optional)
- [ ] **Markdown formatting:** Verify `.md` files formatted consistently
- [ ] **YAML formatting:** Verify `.yml` and `.yaml` files (CI workflows, pnpm workspace)
- [ ] **JSON formatting:** Verify `.json` and `.jsonc` files across all packages
- [ ] **`package.json` formatting:** Verify consistent key ordering and indentation across all 19
      packages
- [ ] **Tailwind plugin:** Verify class sorting works with `cn()` and `cva()` utility functions
- [ ] **Line endings:** Verify LF enforcement across all files via `.editorconfig`
- [ ] **Print width:** Verify 100-char limit is appropriate for component code readability
- [ ] **Quote strategy:** Verify single-quotes rule across `.ts`, `.tsx`, `.js`, `.jsx`
- [ ] **Trailing commas:** Verify `all` trailing comma rule applied consistently
- [ ] **`.prettierignore` completeness:**
  - Add `storybook-static`
  - Add `prisma/migrations`
  - Add `CHANGELOG.md`
  - Add `coverage/`

### D1.5 — Repository Hygiene [Medium]

**Acceptance Criteria:**

- `.syncpackrc.json` has explicit version policies
- `.nvmrc` specifies a full semver version
- CI has required environment variables
- `.gitignore` has no duplicate patterns

**Validation:** `pnpm run lint:deps` passes. CI is green.

- [ ] Configure `.syncpackrc.json` — add `semverRange`, `versionGroups`, sort policies
- [ ] Fix `.nvmrc` — replace bare `22` with full semver (e.g. `22.14.0`)
- [ ] Fix `ci.yml` — add `DATABASE_URL` env var (needed for `db:generate`)
- [ ] Clean up `.gitignore` duplicate Prisma generated output patterns (lines 56/58)
- [ ] Verify root `tsconfig.tsbuildinfo` is gitignored or add it to `.gitignore`

---

## Expected State After M1

```
pnpm run all-checks → 7/7 PASS
  ✓ lint        — zero errors
  ✓ lint:deps   — dependency consistency verified
  ✓ typecheck   — zero TypeScript errors
  ✓ build       — all 19 packages compile
  ✓ build:storybook — Storybook static site builds
  ✓ test        — test runner passes (with passWithNoTests)
  ✓ check:deps  — syncpack validation passes
```

The repository compiles, typechecks, lints, and builds end-to-end. All vestigial Next.js references
from ADS-003a are removed. CI is green on every push and PR.

---

## Definition of Done

M1 is done when:

- [x] `pnpm run all-checks` passes 7/7 with zero errors
- [x] All TS2742 errors resolved across all packages
- [x] No vestigial Next.js references in configuration files
- [x] `.nvmrc` contains full semver version
- [x] `DATABASE_URL` available in CI
- [x] `.syncpackrc.json` has version policies configured
- [x] `.prettierignore` covers all generated/build output
- [x] `ci.yml` workflow succeeds on push and PR
- [x] Architecture Review Board approves M1 completion

---

# Milestone 2 — Developer Tooling

**Objective:** Daily development workflow is fully standardized and automated through git hooks,
ESLint enforcement, and editor integration.

**Why this milestone exists:** Automated tooling prevents regressions before they reach the
repository. Without hooks and enforced rules, code quality degrades with every contribution.

**Dependencies:** M1 (platform must be stable before tooling).

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **ESLint rules:** Which `@typescript-eslint` rules to enable. Establish severity policy (error
      vs warn). Decide on `no-explicit-any` tolerance.
- [ ] **Git hooks strategy:** Pre-commit scope (lint-staged vs full lint), pre-push scope
      (all-checks vs subset), commit-msg validation (conventional commits).
- [ ] **Editor integration:** Decide whether `.vscode/` stays gitignored. If gitignored, provide
      `.example` template. Which settings are mandatory vs recommended?

---

## Deliverables

### D2.1 — ESLint Rule Enforcement [High]

**Acceptance Criteria:**

- At least 11 TypeScript-aware ESLint rules configured and enforced
- All violations fixed across 19 packages
- `eslint-disable` comments minimized and documented
- Rule configuration documented with rationale

**Validation:** `pnpm run lint` — zero errors, zero warnings.

- [ ] Configure TypeScript-aware ESLint rules:
  - `@typescript-eslint/no-unused-vars`
  - `@typescript-eslint/no-explicit-any`
  - `@typescript-eslint/consistent-type-imports`
  - `@typescript-eslint/consistent-type-exports`
  - `@typescript-eslint/array-type`
  - `@typescript-eslint/no-non-null-assertion`
  - `@typescript-eslint/prefer-optional-chain`
  - `@typescript-eslint/no-unnecessary-type-assertion`
  - `@typescript-eslint/ban-ts-comment`
  - `@typescript-eslint/no-empty-interface`
  - `@typescript-eslint/no-import-type-side-effects`
- [ ] Run `pnpm run lint` and document all violations found
- [ ] Fix all ESLint violations across all 19 packages
- [ ] Remove `eslint-disable` comments that are no longer necessary
- [ ] Add `eslint-disable` with documented reasoning for any intentional rule exceptions
- [ ] Document all enabled ESLint rules and rationale

### D2.2 — Git Hooks [High]

**Acceptance Criteria:**

- Pre-commit blocks commits with lint errors on staged files
- Commit-msg rejects non-conventional commit messages
- Pre-push blocks pushes when `all-checks` fails
- `lint-staged` configured for all relevant file types

**Validation:** Manual testing of each hook with bad input.

- [ ] Create `.husky/pre-commit` hook — run `lint-staged` on staged files
- [ ] Create `.husky/commit-msg` hook — validate conventional commit format
- [ ] Create `.husky/pre-push` hook — gate push on `pnpm run all-checks`
- [ ] Add `lint-staged` to root `devDependencies`
- [ ] Configure `.lintstagedrc.json`:
  - ESLint auto-fix on `*.{ts,tsx}`
  - Prettier format on `*.{ts,tsx,js,jsx,json,md,yml,yaml}`
  - No operations on `pnpm-lock.yaml`, `prisma/`, generated files

### D2.3 — Editor Integration [Medium]

**Acceptance Criteria:**

- `.vscode/settings.json.example` exists with recommended settings
- Editor setup documented in AGENTS.md
- New contributors can configure editor from documentation

**Validation:** Documentation review. New contributor can follow setup steps.

- [ ] Create `.vscode/settings.json.example` for team reference:
  - `typescript.tsdk` — workspace TypeScript version
  - `editor.codeActionsOnSave` — ESLint auto-fix
  - `editor.defaultFormatter` — Prettier
  - `editor.formatOnSave` — enabled
  - `tailwindCSS.experimental.classRegex` — for `cn()`, `cva()`
- [ ] Document editor setup in AGENTS.md under "Development Environment"

---

## Expected State After M2

```
git commit -m "fix stuff" → rejected (non-conventional format)
git commit -m "fix: add missing type" (with lint errors) → rejected by pre-commit
git push (with broken build) → rejected by pre-push
New contributor setup: clone → pnpm install → editor configured → contribute
```

Every workflow that can be automated is automated. Commits, pushes, and formatting are enforced by
tooling. Developers receive immediate feedback without waiting for CI.

---

## Definition of Done

M2 is done when:

- [x] All 11+ ESLint TypeScript rules configured and violations fixed
- [x] `pnpm run lint` — zero errors, zero warnings
- [x] Pre-commit hook validates staged files
- [x] Commit-msg hook validates conventional commit format
- [x] Pre-push hook validates `all-checks`
- [x] `.vscode/settings.json.example` available
- [x] Editor setup documented in AGENTS.md
- [x] Architecture Review Board approves M2 completion

---

# Milestone 4 — Repository Automation

**Objective:** Engineering quality gates are automated through a unified script architecture,
removing manual verification from the development workflow.

**Why this milestone exists:** Tooling enforces rules at commit time. Automation extends that
enforcement to the repository level — verifying exports, formatting, bundle sizes, dependencies, and
build integrity through a single command interface. Without this layer, quality checks require
institutional knowledge to run.

**Dependencies:** M2 (ESLint rules and git hooks must be in place before creating automation around
them).

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **Script architecture:** Centralized root scripts vs per-package scripts. Naming convention
      for `check:*` vs `test:*` vs `build:*`.
- [ ] **All-checks composition:** Which scripts belong in `all-checks`? Which are diagnostic-only
      (non-blocking)?
- [ ] **Turbo pipeline scope:** Which tasks need `inputs` for cache optimization? Which tasks need
      `dependsOn`?
- [ ] **CI integration:** Which quality gates run in CI vs only locally? Which gates block PRs?
- [ ] **Exit codes:** Which scripts fail on warnings vs only on errors?

---

## Deliverables

### D4.1 — Script Architecture [High]

**Acceptance Criteria:**

- Script naming convention documented and applied consistently
- All `check:*` scripts follow the same interface (exit 0 on pass, exit 1 on fail)
- Script documentation embedded as comments or in AGENTS.md

**Validation:** All scripts documented. Naming convention verified.

- [ ] Define and document script naming convention:
  - `check:*` — quality gate (blocking)
  - `check:deps*` — dependency validation
  - `build:*` — build output
  - `db:*` — database operations
  - `auth:*` — auth operations
  - `dev*` — development servers
- [ ] Document all scripts with purpose, exit behavior, and dependencies
- [ ] Verify scripts that require environment variables are documented in `.env.example`

### D4.2 — Quality Gate Scripts [High]

**Acceptance Criteria:**

- `pnpm run check:exports` — validates public API surface per package contracts
- `pnpm run check:format` — validates Prettier compliance across all files
- `pnpm run check:size` — validates bundle size budgets per package
- `pnpm run check:deps` — validates dependency consistency (existing)
- `pnpm run check:deps:peer` — diagnostic peer dependency report (existing)

**Validation:** Each script produces clear pass/fail output. All scripts work in CI.

- [ ] Create `pnpm run check:exports` — validate each package's `src/index.ts` against
      `docs/contracts/`
- [ ] Create `pnpm run check:format` — run `prettier --check` across all files
- [ ] Create `pnpm run check:size` — size-limit check per package (configuration in M9)
- [ ] Verify existing scripts: `check:deps` (syncpack), `check:deps:peer` (pnpm peers)
- [ ] Add `check:format` to CI workflow

### D4.3 — All-Checks Pipeline [Critical]

**Acceptance Criteria:**

- `pnpm run all-checks` runs all quality gates in correct dependency order
- Pipeline order: lint → lint:deps → check:format → typecheck → build → build:storybook → test →
  check:exports → check:size → check:deps
- Non-blocking diagnostic scripts (`check:deps:peer`) remain outside `all-checks`

**Validation:** `pnpm run all-checks` passes end-to-end. CI runs `all-checks`.

- [ ] Review and document `all-checks` composition
- [ ] Add `check:format`, `check:exports`, `check:size` to `all-checks` pipeline
- [ ] Verify `check:deps:peer` remains diagnostic-only (not in `all-checks`)
- [ ] Document pipeline order rationale in AGENTS.md

### D4.4 — Turbo Pipeline Refinement [Medium]

**Acceptance Criteria:**

- All Turbo tasks have appropriate `inputs` for cache optimization
- All tasks have correct `dependsOn` for build ordering
- `test` and `check:*` tasks are defined in pipeline

**Validation:** `npx turbo build` respects pipeline dependencies. Cache hits verified.

- [ ] Review all Turbo tasks for `inputs` configuration
- [ ] Add `inputs` to any tasks missing cache optimization
- [ ] Add `test` task to pipeline if not present (from M1.2)
- [ ] Verify `dependsOn` chains: `^build` on typecheck, storybook, test
- [ ] Document Turbo pipeline tasks and their dependencies

### D4.5 — CI Script Integration [Medium]

**Acceptance Criteria:**

- CI runs `all-checks` as single validation step
- CI workflow is documented
- CI configuration is DRY (no duplicated scripts between CI and package.json)

**Validation:** Push to main triggers CI. CI passes `all-checks`.

- [ ] Verify CI workflow runs `pnpm run all-checks`
- [ ] Remove any CI-specific script duplication (use root scripts)
- [ ] Add `timeout-minutes` appropriate to pipeline duration
- [ ] Document CI workflow in AGENTS.md or CONTRIBUTING.md

---

## Expected State After M4

```

pnpm run all-checks → all gates pass:
  ✓ lint
  ✓ lint:deps
  ✓ check:format
  ✓ typecheck
  ✓ build
  ✓ build:storybook
  ✓ test
  ✓ check:exports
  ✓ check:size
  ✓ check:deps

pnpm run check:deps:peer → diagnostic report (non-blocking)
```

Every quality gate is automated. No manual verification steps remain. A single command validates the
entire repository. Script architecture is documented and consistent.

---

## Definition of Done

M4 is done when:

- [x] Script naming convention documented and applied
- [x] `check:exports` validates public API against contracts
- [x] `check:format` validates Prettier compliance
- [x] `check:size` validates bundle budgets
- [x] `all-checks` pipeline documented with clear composition and order
- [x] All Turbo tasks have `inputs` for cache optimization
- [x] CI runs `all-checks` as single validation step
- [x] Diagnostic scripts (`check:deps:peer`) remain non-blocking
- [x] Script architecture documented in AGENTS.md
- [x] Architecture Review Board approves M4 completion

---

# Milestone 3 — Engineering Standards

**Objective:** All 19 packages follow consistent naming, structure, and export conventions.

**Why this milestone exists:** ESLint and automation enforce rules. Engineering standards define
conventions that tools cannot validate — folder organization, file naming, barrel export patterns,
and cross-package consistency. Without these, the repository diverges with every new package.

**Dependencies:** M2 (developer tooling must be in place before establishing engineering standards).

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **Naming convention:** Component files match component names (PascalCase). Hook files match
      hook names (`use` prefix). Utility files use kebab-case. Confirm before auditing 19 packages.
- [ ] **Import order:** Define explicit import ordering convention. Decide on grouping strategy
      (external → internal → relative → types).
- [ ] **Barrel exports:** Decide explicit exports policy. Forbid `export *` from internal files.
      Confirm before auditing all `src/index.ts`.
- [ ] **Folder organization:** Define canonical package structure. Decide on flat vs nested
      directory strategy.
- [ ] **`type: module`:** Decide whether all packages should use `"type": "module"` or allow
      variation.

---

## Deliverables

### D3.1 — Naming Conventions [High]

**Acceptance Criteria:**

- All components named with PascalCase, files match
- All hooks prefixed with `use`
- All types/interfaces named with PascalCase, no `I` prefix
- All utility files use kebab-case
- All packages under `@holiveira/*` scope, directory matches package name

**Validation:** Audit passes — zero naming convention violations across 19 packages.

- [ ] Audit component naming across all 75 components — document and fix violations
- [ ] Audit hook naming across all hooks — document and fix violations
- [ ] Audit type/interface naming across all packages — document and fix violations
- [ ] Audit file naming across all packages — document and fix violations
- [ ] Audit package naming and directory consistency

### D3.2 — Import Organization [Medium]

**Acceptance Criteria:**

- Import order convention documented
- All files follow import order convention
- No barrel re-exports from third-party libraries (e.g., `export { useState } from 'react'`)
- Named exports preferred over default exports

**Validation:** Audit passes. ESLint `import/order` rule optionally configured.

- [ ] Document standard import order:
  1. External dependencies (`react`, `next`, third-party)
  2. Internal workspace dependencies (`@holiveira/*`)
  3. Relative imports (`./`, `../`)
  4. Type imports (separate `import type` blocks)
- [ ] Audit all packages for import order violations — document and fix
- [ ] Remove any barrel re-exports from third-party libraries
- [ ] Verify named exports used consistently (no default exports for components/hooks)

### D3.3 — Barrel Exports [High]

**Acceptance Criteria:**

- Every package has `src/index.ts` as single public API entry point
- Barrel exports are explicit (no `export *` from internal files)
- No internal implementation leaks in public API
- Barrel exports match documented contracts in `docs/contracts/`

**Validation:** `pnpm run check:exports` (created in M4) passes for all packages.

- [ ] Audit all 19 `src/index.ts` files — document violations
- [ ] Fix any `export *` from internal files — replace with explicit exports
- [ ] Remove any internal implementation leaks (test utilities, private constants, internal helpers)
- [ ] Cross-reference exports with `docs/contracts/*.md` — document and fix mismatches

### D3.4 — Folder Organization [Medium]

**Acceptance Criteria:**

- Standard package structure documented
- All 19 packages follow the structure
- No unnecessary nested `src/` directories
- No circular imports within or across packages

**Validation:** Folder audit passes. `dpdm` or similar detects zero circular imports.

- [ ] Document standard package structure:
  ```
  packages/<name>/
    src/
      index.ts          — public API barrel (required)
      <component>.tsx   — one component per file
      <hook>.ts         — one hook per file
      <utility>.ts      — one concern per file
      types.ts          — package-level types (optional)
      components/       — subcomponents (optional)
    package.json
    tsconfig.json
    README.md
  ```
- [ ] Audit all packages against the standard — document and fix violations
- [ ] Detect and resolve any circular imports

### D3.5 — Package Consistency [Medium]

**Acceptance Criteria:**

- All `package.json` files have consistent `sideEffects`, `exports`, `peerDependencies`
- Dependency levels correct per ADS-003b (dependency ownership architecture)
- `"type": "module"` consistent across packages (or documented exceptions)

**Validation:** `pnpm run lint:deps` passes. `pnpm run check:deps:peer` documented.

- [ ] Audit `sideEffects` declarations across all 19 packages
- [ ] Audit `exports` field structure for consistency
- [ ] Audit `peerDependencies` for correctness and completeness
- [ ] Audit dependency levels (dep vs devDep vs peerDep per ADS-003b)
- [ ] Verify `"type": "module"` consistency

### D3.6 — Public API Contract Validation [Medium]

**Acceptance Criteria:**

- Every package's public API matches its contract in `docs/contracts/`
- Auth package type declarations verified (M1 fix validated)
- `check:exports` script integration verified

**Validation:** `pnpm run check:exports` returns zero mismatches.

- [ ] Validate each package's public API against its contract
- [ ] Verify auth package type declarations from M1 fix
- [ ] Verify `pnpm run check:exports` integration

---

## Expected State After M3

```

pnpm run check:exports → all 19 packages validated
All packages follow identical naming, structure, and export conventions
Public API surface matches documented contracts
New package onboarding follows documented template
Pull request reviewers have clear standards to enforce
```

Every package in the repository looks like it belongs to the same project. A developer can open any
package and predict its structure, imports, and exports.

---

## Definition of Done

M3 is done when:

- [x] Naming convention audit passed — zero violations
- [x] Import order convention documented and applied
- [x] All barrel exports explicit — no `export *` from internal files
- [x] Standard folder structure documented and applied
- [x] Package consistency audit passed — all `package.json` consistent
- [x] `pnpm run check:exports` — all packages pass
- [x] Zero circular imports detected
- [x] Public API contracts validated and matching
- [x] Architecture Review Board approves M3 completion

---

# Milestone 5 — Component Review

**Objective:** Review and improve every public component before writing documentation.

**Why this milestone exists:** Writing stories for components with design flaws locks in bad APIs.
Reviewing components first ensures that what gets documented is what we want to ship.

**Dependencies:** M3 (engineering standards must be established to evaluate components against
them).

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **Component API standard:** Define what constitutes a well-designed component API. Required
      props pattern. Variant vs prop boolean strategy. Controlled/uncontrolled pattern.
- [ ] **Review methodology:** Review order (by package layer). Review criteria weight.
      Fix-before-proceed or document-and-batch?
- [ ] **Breaking changes policy:** Can component reviews result in breaking API changes? Approval
      process for breaking changes.
- [ ] **Cross-cutting standards:** `className` forwarding required. `ref` forwarding for interactive
      components. `'use client'` directive auditing.

---

## Deliverables

### D5.1 — Primitives Review [Critical]

**Acceptance Criteria:** All 11 primitive components reviewed against API design, variants,
composition, accessibility, performance, naming, and responsibilities criteria. Issues documented
with fix paths.

**Validation:** Review checklist completed for each component. Typecheck and lint pass after fixes.

- [ ] **Button** — API design, variants, shapes, sizes, `forwardRef`, icon integration, disabled,
      loading
- [ ] **Alert** — severity variants, dismiss behavior, role attributes, icon integration
- [ ] **Skeleton** — shapes, animation, `prefers-reduced-motion`
- [ ] **Checkbox** — controlled/uncontrolled, label, indeterminate, error
- [ ] **Radio** — controlled/uncontrolled, label, group, disabled
- [ ] **Switch** — controlled/uncontrolled, label, on/off semantics
- [ ] **InputGroup** — input types, label, description, error, icon, file variant
- [ ] **TextArea** — label, description, error, resize behavior
- [ ] **Select** — typed items, placeholder, error, disabled items
- [ ] **Table** — composition API (7 sub-components), empty state, loading, responsive
- [ ] **Dropdown** — composition API (4 sub-components), focus trap, keyboard, positioning

For each component review:

- API design — props intuitive? Required vs optional correct?
- Variants — all states covered? (default, hover, focus, active, disabled, loading, error)
- Composition — components combine naturally?
- Accessibility — focus management, ARIA attributes, keyboard interaction
- Performance — unnecessary re-renders, memoization opportunities
- Naming — follows M3 conventions?
- Responsibilities — single concern? Separation correct?
- Document issues found and fix path

### D5.2 — UI Components Review [High]

**Acceptance Criteria:** All 3 UI components reviewed against same criteria.

**Validation:** Review checklist completed. Fixes applied.

- [ ] **Breadcrumb** — navigation semantics, link vs span, collapse behavior
- [ ] **Card** — variants, composition, clickable card pattern
- [ ] **ShowcaseSection** — layout responsibility, heading hierarchy

### D5.3 — Forms Review [High]

**Acceptance Criteria:** All 8 form components reviewed against same criteria.

**Validation:** Review checklist completed. Fixes applied.

- [ ] **Form** — native form semantics, `noValidate`, submit handling
- [ ] **Field** — label-input-description-error composition, spacing
- [ ] **Label** — `htmlFor` association, required indicator
- [ ] **Description** — `aria-describedby` linkage
- [ ] **ErrorMessage** — `role="alert"`, `aria-live`, error ID linkage
- [ ] **Submit** — loading state, disabled when invalid
- [ ] **MultiSelect** — controlled/uncontrolled, keyboard, search, clear
- [ ] **DatePicker** — controlled/uncontrolled, format, locale, range mode

### D5.4 — Layouts Review [High]

**Acceptance Criteria:** All 4 layout components reviewed against same criteria.

**Validation:** Review checklist completed. Fixes applied.

- [ ] **SidebarProvider** + **useSidebarContext** — context design, state shape, leak prevention
- [ ] **Sidebar** — expanded/collapsed, mobile overlay, scroll behavior, logo slot
- [ ] **Header** — compound component pattern (Toggle, Actions), responsive behavior
- [ ] **Application shell** — Sidebar + Header + content area composition

### D5.5 — Charts Review [Medium]

**Acceptance Criteria:** All 3 chart components reviewed against same criteria.

**Validation:** Review checklist completed. Fixes applied.

- [ ] **BarChart** — data structure, color mapping, dark mode, responsive
- [ ] **AreaChart** — data structure, gradient, dark mode, responsive
- [ ] **PieChart** — data structure, donut variant, legend, dark mode, responsive

### D5.6 — Icons Review [Medium]

**Acceptance Criteria:** All 37 icons reviewed for consistency, naming, and tree-shaking.

**Validation:** Review checklist completed. Fixes applied.

- [ ] Review `IconWrapper` — `forwardRef`, `currentColor`, size handling, `title` prop
- [ ] Review icon consistency — stroke width, fill rules, viewBox
- [ ] Review naming — all follow `*Icon` suffix convention
- [ ] Review tree-shaking — importing one icon imports only that icon

### D5.7 — Cross-Cutting Review [High]

**Acceptance Criteria:** Every component satisfies cross-cutting standards.

**Validation:** Audit passes for all 75 components.

- [ ] **`className` prop:** Every visual component accepts `className` for consumer overrides
- [ ] **`ref` forwarding:** Interactive components use `forwardRef`
- [ ] **`'use client'` directive:** Only components using browser APIs or hooks have it
- [ ] **Variant consistency:** `cva` usage is consistent — same pattern for all variant components
- [ ] **Error boundaries:** Components with async or complex state consider error boundaries
- [ ] **Prop documentation:** Every public prop has a JSDoc comment

### D5.8 — Fix Implementation [Critical]

**Acceptance Criteria:** All issues from D5.1-D5.7 fixed. No breaking changes without ARB approval.

**Validation:** `pnpm run typecheck` and `pnpm run lint` pass after fixes.

- [ ] Implement fixes for all issues identified
- [ ] Re-run typecheck and lint after fixes
- [ ] Verify no breaking changes to documented contracts without ARB approval

---

## Expected State After M5

Every component has been systematically reviewed and improved. Component APIs are stable and
intentional. Known design flaws are resolved before documentation begins. Components follow
consistent patterns for variants, ref forwarding, class merging, and accessibility.

---

## Definition of Done

M5 is done when:

- [x] All 75 components reviewed against 7 criteria (API, variants, composition, a11y, performance,
      naming, responsibilities)
- [x] Cross-cutting review completed: `className`, `ref`, `'use client'`, `cva`, `JSDoc`
- [x] All identified issues have documented fix paths or are resolved
- [x] No breaking changes without ARB approval
- [x] `pnpm run typecheck` — zero errors
- [x] `pnpm run lint` — zero errors, zero warnings
- [x] Architecture Review Board approves M5 completion

---

# Milestone 6 — Storybook Excellence

**Objective:** Storybook becomes the official component documentation and development platform.

**Why this milestone exists:** The design system has zero stories. Consumers need visual
documentation to understand component behavior, variants, and usage patterns. Stories also serve as
the primary development and review environment.

**Dependencies:** M5 (components must be reviewed and stable before writing stories).

---

## Architecture Review (No Code)

Review and decide before writing stories:

- [ ] **Autodocs strategy:** Auto-generated documentation per component or explicit MDX pages?
- [ ] **CSF format:** CSF3 (default) or CSF2? Decide before any story is written.
- [ ] **MDX usage:** Introduction page, getting started guide, patterns documentation.
- [ ] **Controls:** `react-docgen-typescript` already configured — verify prop tables auto-generate.
- [ ] **Themes addon:** Configure `@storybook/addon-themes` for light/dark mode toggle.
- [ ] **Accessibility:** `@storybook/addon-a11y` already configured — define per-story policy.
- [ ] **Documentation strategy:** Autodocs for component reference + standalone MDX for patterns.
- [ ] **Chromatic:** Evaluate for visual regression testing and public deployment.
- [ ] **Story organization:** Folder hierarchy matching package structure.

---

## Deliverables

### Phase 1 — Storybook Platform

### D6.1 — Platform Foundation [Critical]

**Acceptance Criteria:**

- Storybook dev server starts without errors
- Storybook static site builds without errors
- Global decorators configured (ThemeProvider, font loading)
- Viewport addon configured with custom breakpoints
- Introduction and getting started MDX pages created

**Validation:** `npx turbo storybook` builds. Dev server serves all stories.

- [ ] Fix `vite.config.ts` (from M1.2) — verify Storybook dev server and build
- [ ] Configure global decorators (ThemeProvider wrapper, font loading)
- [ ] Configure viewport addon with custom breakpoints (`2xsm`, `xsm`, `3xl`)
- [ ] Create `stories/Introduction.mdx` — welcome, philosophy, package overview
- [ ] Create `stories/GettingStarted.mdx` — installation per package, quick start code

### Phase 2 — Component Stories

### D6.2 — Primitives Stories [Critical]

**Acceptance Criteria:** All 11 primitive components have interactive stories covering all variants,
states, and interactions.

**Validation:** Every primitive has at least one story. All controls work. A11y checks pass.

- [ ] **Button** — all variants × all shapes × all sizes, icon, disabled, loading
- [ ] **Alert** — success, warning, error, with/without dismiss action
- [ ] **Skeleton** — text, circle, rectangle, custom dimensions, prefers-reduced-motion
- [ ] **Checkbox** — checked, unchecked, indeterminate, disabled, error
- [ ] **Radio** — selected, unselected, disabled, radio group
- [ ] **Switch** — on, off, disabled, with label
- [ ] **InputGroup** — text, email, password, with label, icon, description, error
- [ ] **TextArea** — default, with label, error state, custom rows
- [ ] **Select** — with items, placeholder, prefix icon, error, disabled items
- [ ] **Table** — full composition (header, body, footer, rows, cells), empty state
- [ ] **Dropdown** — trigger + content, keyboard navigation, close on escape/outside

### D6.3 — UI Stories [High]

**Acceptance Criteria:** All 3 UI components have interactive stories.

**Validation:** Every UI component has at least one story.

- [ ] **Breadcrumb** — single level, nested, long paths, with icons
- [ ] **Card** — default, bordered, ghost, with children, clickable
- [ ] **ShowcaseSection** — with title, children, empty

### D6.4 — Forms Stories [High]

**Acceptance Criteria:** All 8 form components have interactive stories with react-hook-form
integration.

**Validation:** Every form component has at least one story.

- [ ] **Form** — full react-hook-form integration example, validation errors, submit
- [ ] **Field + Label + Description + ErrorMessage** — composed field with all sub-components
- [ ] **Submit** — enabled, disabled, loading spinner
- [ ] **MultiSelect** — controlled, uncontrolled, search filter, clear all
- [ ] **DatePicker** — controlled, uncontrolled, range mode, locale

### D6.5 — Layouts Stories [High]

**Acceptance Criteria:** All 4 layout components have interactive stories.

**Validation:** Every layout component has at least one story.

- [ ] **Sidebar** — expanded, collapsed states, mobile overlay, with navigation items
- [ ] **Header + HeaderToggle + HeaderActions** — compound composition
- [ ] **Application shell** — full Sidebar + Header + content layout

### D6.6 — Charts Stories [Medium]

**Acceptance Criteria:** All 3 chart components have interactive stories with mock data and dark
mode.

**Validation:** Every chart component has at least one story.

- [ ] **BarChart** — single series, multi-series, horizontal, dark mode
- [ ] **AreaChart** — single area, stacked, gradient fill, dark mode
- [ ] **PieChart** — pie, donut, with legend, dark mode

### D6.7 — Icons Gallery [Medium]

**Acceptance Criteria:** All 37 icons displayed in a searchable gallery with accessibility examples.

**Validation:** Gallery renders all 37 icons. Size variants and `title` prop demonstrated.

- [ ] Create `IconGallery` story — searchable grid of all 37 icons with names
- [ ] Icon with `title` prop examples — screen reader accessible usage
- [ ] Icon size variants — 16px, 20px, 24px, 32px

### Phase 3 — Documentation Stories

### D6.8 — Documentation Stories [Medium]

**Acceptance Criteria:** Design tokens, theme, patterns, and accessibility stories exist.

**Validation:** Documentation stories render correctly. Patterns are copyable.

- [ ] **Design tokens** — color palette, spacing scale, typography, shadows, CSS variables
- [ ] **Theme** — light/dark mode comparison, theme provider setup
- [ ] **Patterns** — form + validation, table + dropdown, sidebar + breadcrumb
- [ ] **Accessibility** — screen reader demo, keyboard navigation, focus management

### Phase 4 — Validation

### D6.9 — Accessibility Integration [High]

**Acceptance Criteria:** All stories pass `@storybook/addon-a11y` checks or violations are
documented.

**Validation:** `@storybook/addon-a11y` panel shows zero violations on all stories.

- [ ] Verify all stories pass `@storybook/addon-a11y` checks
- [ ] Document a11y violations that cannot be fixed in Storybook (dynamic content)

---

## Expected State After M6

```
npx turbo storybook → builds without errors
All 75 components have interactive stories with controls
Storybook serves as the complete component catalog
Autodocs generate component reference pages automatically
Consumers browse, inspect, and copy component usage from Storybook
All stories pass automated accessibility checks
```

---

## Definition of Done

M6 is done when:

- [x] Storybook platform configured and documented
- [x] All 75 components have at least one interactive story
- [x] Introduction and Getting Started pages exist
- [x] Documentation stories cover tokens, theme, patterns, accessibility
- [x] Icon gallery displays all 37 icons
- [x] All stories pass `@storybook/addon-a11y` or violations documented
- [x] `npx turbo storybook` builds without errors
- [x] Architecture Review Board approves M6 completion

---

# Milestone 7 — Testing Excellence

**Objective:** Repository has a validated testing strategy and meaningful coverage across all
packages.

**Why this milestone exists:** Zero tests exist across 19 packages. A design system without tests
cannot guarantee component behavior across versions. Testing must follow a deliberate strategy, not
ad-hoc test writing.

**Dependencies:** M3 (code quality and engineering standards must be established). M7 can begin once
M3 completes — testing infrastructure and utility tests do not depend on M5 or M6.

---

## Architecture Review (No Code)

Review and decide before writing tests:

- [ ] **Testing strategy:** Unit tests for utilities and hooks, component tests for
      primitives/forms/layouts, integration tests for charts/auth. Visual regression via Storybook
      (Chromatic).
- [ ] **Testing standards:** What must every package test?
  - Public API — every export covered
  - Edge cases — null, undefined, empty, boundary values
  - Accessibility — automated a11y assertions on components
  - Variants — every variant rendered and verified
- [ ] **Test helpers:** Audit `@holiveira/testing`. Missing helpers?
  - Existing: `renderWithProviders`, `mockRouter`, `mockSession`, `mockHeaders`,
    `mockResizeObserver`
  - Missing candidates: test fixture factory, form integration helper, chart render helper
- [ ] **Mock strategy:** What to mock vs integration test:
  - Mock: browser APIs (ResizeObserver, IntersectionObserver), Next.js router, auth session, fetch
  - Integration test: form submission flow, chart rendering, sidebar transitions
- [ ] **Fixture strategy:** Static fixture files per package or factory functions?
- [ ] **Coverage targets per package role:**
  - Utilities/hooks/config/types: 90% statements, 85% branches, 90% functions, 90% lines
  - Components (primitives/forms/ui/layouts): 80% statements, 70% branches, 80% functions, 80% lines
  - Charts/auth/api: 60% statements, 50% branches, 60% functions, 60% lines
  - Icons/testing: 50% minimum
- [ ] **CI integration:** Coverage reports, failure policies, coverage trend tracking

---

## Deliverables

### Phase 1 — Testing Strategy

_(Architecture Review section above serves as the strategy document. This section implements it.)_

### Phase 2 — Testing Platform

### D7.1 — Platform Improvements [High]

**Acceptance Criteria:**

- TS2742 fixed in `@holiveira/testing`
- Missing helpers added per architecture review
- Coverage thresholds set at initial values
- Coverage exclusions configured properly
- Coverage report integrated into CI

**Validation:** `pnpm run test` works. Coverage report generated.

- [ ] Fix TS2742 type inference error in `@holiveira/testing`
- [ ] Add missing test helpers identified in architecture review
- [ ] Set initial coverage thresholds: statements 50%, branches 40%, functions 50%, lines 50%
- [ ] Configure `coverage.exclude` (generated code, mocks, types-only, test files)
- [ ] Add coverage report artifact to CI workflow

### Phase 3 — Foundation Tests

### D7.2 — Foundation Tests [Critical]

**Acceptance Criteria:** All 7 foundation packages have tests covering public API.

**Validation:** `pnpm run test:coverage` shows coverage for all foundation packages.

- [ ] **`@holiveira/utils`** — `cn()`, `cva()`, `slugify()`, `compactFormat()`, `standardFormat()`,
      `pick()`, `omit()`, `merge()`, `isDefined()`, `isPlainObject()`, `assertDefined()`,
      `debounce()`, `throttle()`
- [ ] **`@holiveira/tokens`** — token object integrity, CSS custom property mapping, type
      constraints
- [ ] **`@holiveira/config`** — `defineConfig()`, `getEnv()`, `requireEnv()`, schema validation,
      environment helpers
- [ ] **`@holiveira/constants`** — route pattern uniqueness, query key factory, storage key
      uniqueness
- [ ] **`@holiveira/hooks`** — `useClickOutside`, `useIsMobile`
- [ ] **`@holiveira/i18n`** — `formatDate`, `formatCurrency`, `formatMessageTime`
- [ ] **`@holiveira/testing`** — verify `renderWithProviders`, `mockRouter`, `mockSession` work

### Phase 4 — Component Tests

### D7.3 — Component Tests [Critical]

**Acceptance Criteria:** All component packages have tests covering rendering, variants, events, and
accessibility.

**Validation:** Component test coverage meets per-package thresholds.

- [ ] **`@holiveira/primitives`** — each component: render, variants, events, a11y attributes, state
      transitions, error states
- [ ] **`@holiveira/forms`** — form integration, validation, field composition, MultiSelect,
      DatePicker
- [ ] **`@holiveira/ui`** — Card variants, Breadcrumb rendering, ShowcaseSection layout
- [ ] **`@holiveira/icons`** — all 37 icons render, `size` prop, `title` prop accessibility

### Phase 5 — Integration Tests

### D7.4 — Integration Tests [Medium]

**Acceptance Criteria:** Integration tests cover auth, charts, and layout state transitions.

**Validation:** Integration tests pass. `@holiveira/auth` coverage ≥ 60%, `@holiveira/charts` ≥ 60%.

- [ ] **`@holiveira/auth`** — auth client, session hooks, proxy creation, permission checks
- [ ] **`@holiveira/charts`** — render with mock data, theme switching, responsive resize
- [ ] **`@holiveira/layouts`** — sidebar context transitions, mobile toggle, header composition

### Phase 6 — Coverage Gates

### D7.5 — Coverage Milestones [Medium]

**Acceptance Criteria:** Coverage thresholds progressively raised as test suites complete.

**Validation:** Each phase threshold enforced in CI.

- [ ] Phase 1: Thresholds at 50/40/50/50 after foundation tests
- [ ] Phase 2: Thresholds at 60/50/60/60 after component tests
- [ ] Phase 3: Thresholds at per-package targets after integration tests
- [ ] Final: Enforce per-package thresholds based on package role

---

## Expected State After M7

```
pnpm run test → all suites pass
pnpm run test:coverage → meets or exceeds per-package thresholds
CI coverage report generated and visible on every PR
Utility packages ≥ 90% coverage
Component packages ≥ 80% coverage
Chart/auth packages ≥ 60% coverage
Testing infrastructure documented for contributor use
```

---

## Definition of Done

M7 is done when:

- [x] Testing strategy documented and approved
- [x] `@holiveira/testing` TS2742 fixed
- [x] All 7 foundation packages have tests ≥ 90% coverage
- [x] All component packages have tests ≥ 80% coverage
- [x] Chart and auth packages have tests ≥ 60% coverage
- [x] Coverage thresholds enforced in CI
- [x] `pnpm run test` and `pnpm run test:coverage` added to `all-checks`
- [x] Architecture Review Board approves M7 completion

---

# Milestone 8 — Accessibility

**Objective:** All design system components meet WCAG 2.2 AA and accessibility is automated in CI.

**Why this milestone exists:** A design system sets the accessibility baseline for every consumer
application. Components that are not accessible by default create inaccessible products at scale.

**Dependencies:** M6 (stories needed for visual a11y audit) + M7 (tests needed for automated a11y
assertions).

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **WCAG target:** WCAG 2.2 AA. Confirm scope — all primitives? All components? Documentation
      only?
- [ ] **A11y utility design:** `ScreenReaderOnly` component scope. `useFocusTrap` API. `useAnnounce`
      interface. `useReducedMotion` integration point.
- [ ] **Audit methodology:** Automated (axe-core) + manual (keyboard, screen reader). Per-component
      or batch?
- [ ] **Enforcement:** Automated checks in Storybook + Vitest. Block PRs on new violations. Existing
      violations documented with fix timeline.

---

## Deliverables

### D8.1 — Accessibility Utilities [High]

**Acceptance Criteria:**

- `ScreenReaderOnly` component available in `@holiveira/primitives`
- `useFocusTrap`, `useAnnounce`, `useReducedMotion` hooks available in `@holiveira/hooks`
- Keyboard navigation utilities available

**Validation:** All utilities exportable and importable. Unit tests verify behavior.

- [ ] Create `ScreenReaderOnly` component in `@holiveira/primitives`
- [ ] Create `useFocusTrap` hook in `@holiveira/hooks`
- [ ] Create `useAnnounce` hook in `@holiveira/hooks` — live region announcements
- [ ] Create `useReducedMotion` hook in `@holiveira/hooks` — respects `prefers-reduced-motion`
- [ ] Add keyboard navigation utilities — roving tabindex, focus ring management

### D8.2 — Component Accessibility Audit [Critical]

**Acceptance Criteria:** All primitives audited against WCAG 2.2 AA criteria. Violations documented
with fix paths.

**Validation:** Audit report complete. All violations have documented resolution.

- [ ] **Focus management:** All interactive elements reachable via `Tab`. Focus order logical. No
      keyboard traps.
- [ ] **Color contrast:** Text ≥ 4.5:1, large text ≥ 3:1, UI components ≥ 3:1 against background
- [ ] **Screen reader labels:** Interactive elements have accessible names (`aria-label`,
      `aria-labelledby`, visible text)
- [ ] **Focus indicators:** Visible focus ring on all interactive elements. No `outline: none`
      without replacement.
- [ ] **Error announcements:** Form errors announced via `role="alert"` or `aria-live`
- [ ] **State communication:** `aria-expanded`, `aria-selected`, `aria-checked`, `aria-disabled`
      where applicable
- [ ] **Landmarks and headings:** Semantic HTML where appropriate, ARIA landmarks where not
- [ ] **Dynamic content:** Live regions for content that changes without page reload
- [ ] Document violations found and implement fixes

### D8.3 — Automated Accessibility Testing [High]

**Acceptance Criteria:**

- `@storybook/addon-a11y` runs on all stories in CI
- `axe-core` integrated with Vitest for automated a11y assertions
- PRs blocked on new a11y violations
- Accessibility dashboard available

**Validation:** CI a11y checks pass. Violation report generated.

- [ ] Configure `@storybook/addon-a11y` to run on all stories in CI
- [ ] Add `axe-core` integration with Vitest — automated a11y assertions in component tests
- [ ] Create accessibility violation report that blocks PRs on new violations
- [ ] Add accessibility dashboard (Chromatic or static HTML report)

### D8.4 — Accessibility Documentation [Medium]

**Acceptance Criteria:**

- Consumer accessibility guidelines documented
- Utility usage documented
- Accessibility section in Storybook Introduction
- Component accessibility checklist for proposals
- Testing instructions in CONTRIBUTING.md

**Validation:** Documentation review. Guidelines accessible from Storybook and README.

- [ ] Write accessibility guidelines for consumers
- [ ] Document `ScreenReaderOnly`, `useFocusTrap`, `useAnnounce`, `useReducedMotion`
- [ ] Add accessibility section to Storybook Introduction
- [ ] Create accessibility checklist for new component proposals
- [ ] Add accessibility testing instructions to CONTRIBUTING.md

---

## Expected State After M8

```
All Storybook stories pass @storybook/addon-a11y with zero violations
Automated axe-core assertions pass in component test suite
All primitives meet WCAG 2.2 AA compliance
Accessibility utilities are documented and importable
New components require accessibility review before merge
```

---

## Definition of Done

M8 is done when:

- [x] All a11y utilities created and documented
- [x] All primitives audited against WCAG 2.2 AA
- [x] All WCAG violations resolved or documented with fix timeline
- [x] Automated a11y testing integrated in Storybook CI and Vitest
- [x] PRs blocked on new a11y violations
- [x] Accessibility documentation complete and accessible
- [x] Architecture Review Board approves M8 completion

---

# Milestone 9 — Performance

**Objective:** Design system packages have measurable performance budgets and verified tree-shaking.

**Why this milestone exists:** Design systems add weight to consumer bundles. Without budgets and
verification, bloat accumulates silently. Every kilobyte matters for end-user experience.

**Dependencies:** M3 (engineering standards must be established). Can begin after M3 — independent
of M5-M8 work.

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **Bundle analysis tool:** `@size-limit/preset-small-lib` or alternative. Per-package or
      aggregate?
- [ ] **Budget thresholds:** What size is acceptable per package role? Primitive < 5KB? Chart <
      50KB? Icons < who-knows?
- [ ] **Tree-shaking verification methodology:** Import one export, measure bundle. Which packages
      need explicit verification?
- [ ] **Code splitting strategy:** `React.lazy` + `Suspense` for charts. What about icons? Dynamic
      import pattern?
- [ ] **Performance budgets in CI:** Block PRs on size increase? Warn only? Percentage or absolute
      thresholds?

---

## Deliverables

### D9.1 — Bundle Analysis [High]

**Acceptance Criteria:**

- Size-limit configured per package
- Baseline bundle sizes recorded for all packages
- `check:size` script integrated (from M4)
- Bundle size check in CI

**Validation:** `pnpm run check:size` produces per-package report. CI blocks size regressions.

- [ ] Add `@size-limit/preset-small-lib` to root `devDependencies`
- [ ] Configure size-limit per package in each `package.json`
- [ ] Establish baseline bundle sizes:
  - Tree-shaken import (import one component)
  - Full package import
  - Record sizes for comparison
- [ ] Verify `pnpm run check:size` script (created in M4) functions correctly
- [ ] Add bundle size check to CI — fail PRs that exceed budgets

### D9.2 — Tree-Shaking Verification [High]

**Acceptance Criteria:**

- All `sideEffects` declarations verified and correct
- Icons tree-shaking verified (one icon = one icon in bundle)
- Charts tree-shaking verified (one chart = one chart in bundle)
- Primitives tree-shaking verified (one component = one component in bundle)
- Tree-shaking guarantees documented

**Validation:** Bundle analysis reports for tree-shaken imports.

- [ ] Verify all `sideEffects` declarations:
  - `false` — hooks, icons, layouts, primitives, providers, ui
  - `["*.css"]` — charts, forms, theme
  - Default — api, auth, config, constants, db, i18n, testing, tokens, types, utils
- [ ] Test icons tree-shaking — import `ArrowDownIcon` only, verify no other icons
- [ ] Test charts tree-shaking — import `BarChart` only, verify no other charts
- [ ] Test primitives tree-shaking — import `Button` only, verify no other primitives
- [ ] Document tree-shaking guarantees per package

### D9.3 — Runtime Performance [Medium]

**Acceptance Criteria:**

- Heavy packages code-split with `React.lazy` + `Suspense`
- `useMemo`/`useCallback` audit complete
- Component render counts profiled
- Performance budgets documented

**Validation:** Bundle split verified. Render profiling complete.

- [ ] Add `React.lazy` + `Suspense` boundaries for heavy packages:
  - Charts bundle (apexcharts is large)
  - Icons package (37 SVGs)
- [ ] Audit `useMemo` / `useCallback` usage — unnecessary memoization, missing memoization
- [ ] Profile component render counts in Storybook — identify wasted renders
- [ ] Add performance budgets: FCP < 1.5s, TTI < 3s on reference page

### D9.4 — Build Output Quality [Medium]

**Acceptance Criteria:**

- `preserveModules` enabled for better consumer tree-shaking
- CSS output audited — no duplicates, no unused utilities
- No CSS-in-JS runtime overhead confirmed
- No unnecessary polyfills for `target: ES2017`

**Validation:** Build output analysis. CSS audit complete.

- [ ] Enable `preserveModules` in build output
- [ ] Audit CSS output — no duplicate styles, no unused utilities
- [ ] Verify no CSS-in-JS runtime overhead (Tailwind v4 is build-time)
- [ ] Verify no unnecessary polyfills or downlevel transforms

---

## Expected State After M9

```
pnpm run check:size → all packages within budget
Bundle analysis report in CI on every PR
Importing one icon adds only that icon to the bundle
Charts are code-split with Suspense boundaries
Performance budgets documented and enforced
```

---

## Definition of Done

M9 is done when:

- [x] Size-limit configured per package
- [x] Bundle size baselines established and recorded
- [x] `pnpm run check:size` integrated into `all-checks` and CI
- [x] Tree-shaking verified for icons, charts, and primitives
- [x] `React.lazy` + `Suspense` applied to charts and icons
- [x] `useMemo`/`useCallback` audit complete
- [x] CSS output audited — zero duplicates
- [x] Performance budgets enforced in CI
- [x] Architecture Review Board approves M9 completion

---

# Milestone 10 — Release Pipeline

**Objective:** Packages can be versioned, published to npm, and released with a single command.

**Why this milestone exists:** Without an automated release pipeline, versioning is manual,
error-prone, and inconsistent. Consumers need predictable versioning and changelogs.

**Dependencies:** M3 (engineering standards ensure packages are trustworthy before publishing).

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **Versioning strategy:** Semantic versioning per package. Which packages version together
      (linked groups)? What triggers major/minor/patch?
- [ ] **Publishing scope:** Which of 19 packages are publishable? Which remain private?
- [ ] **Prerelease workflow:** Alpha → beta → rc pipeline. Dist-tag strategy.
- [ ] **Release cadence:** Scheduled releases or on-demand? Release approval process?
- [ ] **Changelog format:** Changesets default or custom format? Keep-a-changelog standard?

---

## Deliverables

### D10.1 — Package Configuration [Critical]

**Acceptance Criteria:**

- Changesets `access: "public"` configured
- Linked groups defined for interdependent packages
- Publishable packages set to `private: false`
- npm scope `@holiveira` accessible
- `publishConfig` added to publishable packages

**Validation:** `pnpm run changeset` creates changeset. `npm publish --dry-run` succeeds.

- [ ] Set `access: "public"` in `.changeset/config.json`
- [ ] Configure `linked` groups:
  - Core primitives: `primitives`, `icons`, `hooks`, `theme`, `tokens`, `utils`
  - Composition layer: `forms`, `layouts`, `charts`, `ui`
  - Utilities: `types`, `constants`, `config`, `i18n`
- [ ] Set target packages to `private: false` (testing, providers may remain private)
- [ ] Verify npm scope `@holiveira` is registered and accessible
- [ ] Add `publishConfig: { "access": "public" }` to publishable packages

### D10.2 — Release Workflow [Critical]

**Acceptance Criteria:**

- `.github/workflows/release.yml` creates Version Packages PR
- On merge: packages published to npm with `--provenance`
- GitHub release generated with changelog
- npm token configured as GitHub secret

**Validation:** Push to main creates Version Packages PR. Merge publishes to npm.

- [ ] Create `.github/workflows/release.yml`:
  - Trigger on push to main (after CI)
  - Run Changesets action to create "Version Packages" PR
  - On PR merge: publish to npm with `--provenance`
  - Generate GitHub release with changelog
- [ ] Add `npm publish --dry-run` validation step
- [ ] Configure npm token as GitHub Actions secret

### D10.3 — Prerelease Workflow [Medium]

**Acceptance Criteria:**

- Prerelease mode configured for alpha/beta/rc
- Convenience scripts available
- npm dist-tags configured

**Validation:** `pnpm run changeset:beta` creates prerelease. Published under beta dist-tag.

- [ ] Configure Changesets prerelease mode for alpha/beta/rc
- [ ] Add convenience scripts: `pnpm run changeset:alpha`, `pnpm run changeset:beta`
- [ ] Configure npm dist-tags: `alpha`, `beta`, `latest`

### D10.4 — Release Documentation [Medium]

**Acceptance Criteria:**

- Release checklist documented
- Semantic versioning policy defined
- Deprecation policy defined

**Validation:** Documentation review.

- [ ] Create release checklist document
- [ ] Document semantic versioning policy — major/minor/patch criteria
- [ ] Document deprecation policy — breaking change communication

---

## Expected State After M10

```
pnpm run changeset → creates changeset file interactively
Push to main → Changesets creates Version Packages PR
Merge PR → packages published to npm with changelog
Prerelease: pnpm run changeset:beta → published under beta dist-tag
Release process documented and repeatable
```

---

## Definition of Done

M10 is done when:

- [x] Changesets configured with public access
- [x] Linked groups defined for interdependent packages
- [x] Publishable packages marked `private: false`
- [x] Release workflow creates Version Packages PR on push to main
- [x] `npm publish --dry-run` succeeds for all publishable packages
- [x] Prerelease workflow configured (alpha/beta/rc)
- [x] Release documentation complete (checklist, semver, deprecation)
- [x] Architecture Review Board approves M10 completion

---

# Milestone 11 — Open Source Readiness

**Objective:** Repository is ready for public consumption, contribution, and community growth.

**Why this milestone exists:** Open source is not just publishing code. It requires documentation,
community infrastructure, contribution workflows, and public-facing resources.

**Dependencies:** M10 (must be publishable before going public).

---

## Architecture Review (No Code)

Review and decide before implementation:

- [ ] **Documentation visibility:** Which internal docs become public? Architecture patterns?
      Contracts? Governance? What stays gitignored?
- [ ] **Community tooling:** Issues (bug, feature, proposal), PR template, Discussions. Self-service
      or gated?
- [ ] **Contribution workflow:** CLA required? DCO sign-off? Automated checks on PR? Review
      requirements?
- [ ] **Storybook deployment:** Chromatic (paid) or GitHub Pages (free)? Custom domain?
- [ ] **Launch readiness:** Announcement channels. Version 1.0.0 or 0.x? Branding review.

---

## Deliverables

### D11.1 — Public Documentation [Critical]

**Acceptance Criteria:**

- Architecture patterns, contracts, and design standards publicly visible
- Package-level READMEs for all publishable packages
- Root README updated with installation, quick start, Storybook link, contributing link
- Migration guide written

**Validation:** Documentation accessible from repository root. README quick start works.

- [ ] Un-ignore architecture documentation from `.gitignore`:
  - Architecture patterns
  - Package contracts
  - Design standards
  - Engineering roadmap (this document)
- [ ] Keep gitignored: reports, superpowers specs, governance, Foundation Sprint artifacts
- [ ] Create package-level README for all publishable packages
- [ ] Update root `README.md`:
  - Per-package installation instructions
  - Quick start with working code example
  - Link to deployed Storybook
  - Link to contributing guide
- [ ] Write migration guide — how to upgrade between major versions

### D11.2 — Community Infrastructure [High]

**Acceptance Criteria:**

- `CONTRIBUTING.md` with development setup, PR process, code standards, testing requirements
- `CODE_OF_CONDUCT.md`
- `SECURITY.md` with vulnerability reporting process
- GitHub issue templates (bug, feature, component proposal)
- GitHub PR template with checklist
- GitHub Discussions enabled

**Validation:** All community files present. Templates work when creating issues/PRs.

- [ ] Create `CONTRIBUTING.md`:
  - Development environment setup
  - PR process and review expectations
  - Code standards reference (M3 conventions)
  - Testing requirements per change type
  - Storybook story requirement for new components
- [ ] Create `CODE_OF_CONDUCT.md`
- [ ] Create `SECURITY.md` — vulnerability reporting process
- [ ] Add GitHub issue templates:
  - Bug report
  - Feature request
  - Component proposal
- [ ] Add GitHub PR template — description, related issues, checklist
- [ ] Enable GitHub Discussions

### D11.3 — Environment & Tooling [Medium]

**Acceptance Criteria:**

- `.env.example` has descriptions for every variable
- Clean checkout works without environment variables
- Dependabot or Renovate configured

**Validation:** `git clone → pnpm install → pnpm run all-checks → PASS` (zero config).

- [ ] Improve `.env.example` with descriptions for every variable
- [ ] Verify clean checkout workflow works without env vars
- [ ] Configure Dependabot or Renovate for automated dependency updates

### D11.4 — Public Storybook [High]

**Acceptance Criteria:**

- Storybook deployed to a public URL
- Deployment URL in README, repository description, `package.json` `homepage`
- Automated deploy on push to main

**Validation:** Public Storybook URL accessible and renders correctly.

- [ ] Deploy Storybook to Chromatic or GitHub Pages
- [ ] Add deployment URL to README, repository description, `package.json` `homepage`
- [ ] Configure automated Storybook deploy on push to main

### D11.5 — Launch Preparation [Medium]

**Acceptance Criteria:**

- Public-facing text reviewed for branding consistency
- MIT license verified
- Repository metadata configured (description, topics, website)
- Repository visibility set to public

**Validation:** GitHub repository page complete and accurate.

- [ ] Review all public-facing text for branding consistency (SPEC-IDENTITY-001)
- [ ] Verify MIT license copyright year and holder
- [ ] Configure GitHub repository: description, topics, website link
- [ ] Ensure repository visibility is public

---

## Expected State After M11

```
New contributor:
  git clone → pnpm install → pnpm run all-checks → PASS (zero configuration)
  Open Storybook URL → complete component catalog, installation guides
  Read CONTRIBUTING.md → clear path to submitting first PR
  Read package README → understand what each package provides
  Open an issue → guided by template

Public resources:
  npm: @holiveira/* packages published with documentation links
  Storybook: publicly deployed component catalog
  GitHub: issues, discussions, PR templates, community guidelines
```

---

## Definition of Done

M11 is done when:

- [x] Architecture documentation publicly visible (patterns, contracts, standards)
- [x] Package-level READMEs for all publishable packages
- [x] Root README updated with quick start and links
- [x] Migration guide written
- [x] `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` created
- [x] Issue templates and PR template live
- [x] `.env.example` documented
- [x] Clean checkout → `all-checks` passes without env vars
- [x] Storybook publicly deployed
- [x] Repository public with correct metadata
- [x] Architecture Review Board approves M11 completion

---

# Milestone 12 — Documentation Platform

**Objective:** Provide a dedicated public documentation platform that helps developers discover,
evaluate, install, and use the design system, while preserving Storybook as the interactive API
reference and the Playground as the integration demo.

**Why this milestone exists:** Storybook documents component states; the Playground demonstrates
integrated screens; neither provides package onboarding, a catalog of all public packages, a
publication-state-aware installation model, or a single discovery surface. M12 adds that layer
without replacing the existing documentation surfaces.

**Dependencies:** ADS-011 approved and frozen. M11 exit criteria recorded and public-release state
explicitly known. M12 implementation plan approved separately. The portal may be planned in
pre-release mode before npm publication; implementation requires explicit authorization.

---

## Architecture Review (No Code)

- [ ] Confirm the ADS-011 application boundary and `/docs/` path.
- [ ] Confirm the 16-package catalog and the core component set.
- [ ] Confirm the metadata source hierarchy and `--check` gate.
- [ ] Confirm the single-artifact Pages model and build order.
- [ ] Confirm the pre-release presentation rules.
- [ ] Confirm the docs test integration and ownership.

---

## Deliverables

### D12.1 — Documentation Application Foundation [Critical]

**Acceptance Criteria:**

- `apps/docs` is a private workspace app using Next.js App Router and static export.
- `basePath` is `/holiveira-design-system/docs`; `trailingSlash` is true.
- The app builds `apps/docs/out` under Turbo.
- The app consumes public packages with `workspace:*` and `transpilePackages`.
- No private package is imported.
- No package API or configuration changes.

**Validation:** static build; base-path test; boundary test; `pnpm run typecheck`.

### D12.2 — Generated Metadata [Critical]

**Acceptance Criteria:**

- A generator reads manifests, public barrels, TypeScript, CVA definitions, contracts, stories, and
  examples.
- It emits deterministic package/component/API/search metadata.
- All 16 public packages are represented.
- All 4 private packages are excluded.
- `check:docs:metadata --check` passes on a clean tree and fails on drift.
- Unit tests cover manifest filtering, barrel coverage, prop/variant extraction, and private-package
  exclusion.

**Validation:** `pnpm run check:docs:metadata`; unit tests; `pnpm run check:exports`.

### D12.3 — Documentation Shell [High]

**Acceptance Criteria:**

- Landing page, global header, sidebar, breadcrumbs, and previous/next navigation.
- Static search index with accessible keyboard interaction.
- Theme toggle and dark mode.
- Responsive drawer below the desktop breakpoint.
- Skip link, landmarks, focus states, and reduced-motion support.

**Validation:** Playwright smoke; axe; keyboard test; visual snapshot.

### D12.4 — Core Component Pages [Critical]

**Acceptance Criteria:**

- Full pages for Button, Alert, Badge, InputGroup, Table, Dropdown, Card, PageHeader, Form/Field,
  AreaChart, Sidebar, and Header.
- Each page satisfies the ADS-011 page contract.
- Previews render real components; code blocks are copyable and match the example source.
- Props distinguish component-specific, variant, and inherited native props.
- Accessibility notes are reviewed.
- Storybook and source links are present.

**Validation:** page tests; visual/a11y checks; metadata gate; link check.

### D12.5 — Full Public Catalog [Critical]

**Acceptance Criteria:**

- All 16 public packages have package pages.
- All public component exports appear in the registry.
- Remaining components have at least a package summary and Storybook link.
- Guides cover installation, theming, tokens, styling, accessibility, forms, charts, layouts, icons,
  and architecture.
- No private package appears in the public catalog, search, or install snippets.

**Validation:** `check:docs:metadata`; coverage report; link check.

### D12.6 — Pages Integration [Critical]

**Acceptance Criteria:**

- `apps/docs/out` is copied to `storybook-static/docs` after `build:storybook`.
- `/`, `/playground/`, and `/docs/` work from one artifact.
- Docs assets use the full base path.
- Existing Storybook and Playground paths are preserved.
- The Playground workflow tests are updated to assert the docs copy.
- A local static-server smoke test proves all three paths.

**Validation:** workflow tests; export tests; Playwright routes; `pnpm run build` and
`pnpm run build:storybook`.

### D12.7 — Validation and ARB Closure [Critical]

**Acceptance Criteria:**

- `pnpm run all-checks` passes with the docs additions.
- Docs e2e and accessibility checks pass.
- Performance evidence is recorded against the ADS-011 targets.
- Implementation report and architecture audit are complete.
- ARB approves M12 closure.

**Validation:** full `all-checks`; docs e2e; a11y; performance report; architecture audit.

---

## Expected State After M12

```text
Public site:
  /                 Storybook (unchanged)
  /playground/      Playground (unchanged)
  /docs/            Documentation Platform

Catalog:
  16 public packages
  12 core component pages
  generated registry/API/search metadata
  private packages excluded

Quality:
  metadata drift gate
  docs e2e/a11y
  static export and base-path tests
  all-checks green
```

---

## Definition of Done

M12 is done when:

- [ ] ADS-011 is approved and frozen.
- [ ] `apps/docs` exists and builds a static export.
- [ ] The 16 public packages are catalogued.
- [ ] The core 12 component pages satisfy the page contract.
- [ ] Private packages are excluded from public artifacts.
- [ ] Pre-release state is explicit and install commands are accurate.
- [ ] `/`, `/playground/`, and `/docs/` work from one Pages artifact.
- [ ] Docs tests run under the root runner.
- [ ] `all-checks` passes.
- [ ] ARB approves M12 closure.

---

## Success Criteria

The roadmap is complete when:

1. `pnpm run all-checks` passes 10/10 on every commit (M1, M4)
2. Git hooks validate commits before they reach the repository (M2)
3. All quality gates are automated through a unified script architecture (M4)
4. All 19 packages follow identical engineering conventions (M3)
5. Every component has been reviewed and improved before documentation (M5)
6. Every component has interactive Storybook stories with accessibility checks (M6)
7. Every package has tests with meaningful coverage thresholds (M7)
8. All components meet WCAG 2.2 AA with automated enforcement (M8)
9. All packages have bundle budgets and verified tree-shaking (M9)
10. Packages are published to npm with automated versioning (M10)
11. Repository is publicly accessible with community infrastructure (M11)
12. The repository has a public documentation platform at `/docs/` that catalogs all 16 public
    packages, documents the core component set, and preserves Storybook at `/` and the Playground at
    `/playground/`.

---

## Recommended Execution Order

1. **M1** — must come first. Cannot proceed without a healthy platform.
2. **M2** — immediately after. Developer workflow prevents regressions.
3. **M3** — after tooling. Standards define conventions that tooling and automation enforce.
4. **M4** — after standards. Automation wraps what standards enforce.
5. **M5** — after M4. Review components before documenting them.
6. **M6** — after component review. Stories document stable components.
7. **M7** — test infrastructure after M3. Write tests in parallel with M5/M6 if needed.
8. **M8** — after M6 and M7. Accessibility depends on stories (audit) and tests (automation).
9. **M9** — after M3. Independent analysis of existing code.
10. **M10** — after M3. Release infrastructure is independent of visual documentation.
11. **M11** — opens the doors only when everything is ready.
12. **M12** — after ADS-011 approval and after M11's exit criteria are recorded and its
    public-release posture is known. Implement in pre-release mode if npm publication is not
    complete; flip the release state only when the release owner confirms publication.
