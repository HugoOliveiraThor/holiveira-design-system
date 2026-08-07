# ADS-010 — Release Architecture

**Status:** FROZEN
**Author:** Architecture governance process
**Date:** 2026-07-27
**Predecessors:** ADS-001, ADS-003b, ADS-003c, ADS-004, ADS-005, ADS-009, SPEC-GOVERNANCE-001
**Input:** M10 Architectural Exploration v2 (2026-07-27), ARB Final Review (2026-07-27)
**Frozen:** 2026-07-27

---

## Section 1 — Purpose

This specification defines the release architecture for the Holiveira Design System. It establishes versioning strategy, publishing infrastructure, consumer validation, package metadata standards, documentation architecture, and CI/CD release automation.

**Why:** The repository is architecturally ready for release (M1-M9 complete, 31/31 AC pass) but has zero release infrastructure: all 20 packages are `"private": true`, exports maps point to source files, no CI/CD release automation exists, and no package has ever been published to npm. This specification closes that gap.

---

## Section 2 — Scope

### 2.1 In Scope

- Independent semver versioning via changesets
- Publishing architecture (16 public packages, 4 private)
- Exports map correction (src/ → dist/)
- CSS file copy mechanism for CSS-exporting packages
- Package metadata standardization (package.json, publishConfig, files, sideEffects)
- npm provenance configuration
- Consumer validation architecture (6 dimensions, permanent test application)
- Release CI/CD pipeline (changesets/action workflow, concurrency, branch protection)
- Prerelease strategy (beta → rc → 1.0.0)
- CHANGELOG generation (per-package + GitHub Releases)
- Git tag convention for independent versioning
- Documentation architecture (tiered READMEs, root README, Storybook)
- Community infrastructure (health files, issue templates, CoC)
- Engineering Standards ES-001 (Package README Template) and ES-002 (Community Health Files)

### 2.2 Out of Scope

- GitHub organization creation (administrative)
- npm account registration (administrative)
- Marketing website (holiveira.dev) — v1.1
- Migration guide — v1.1
- `next` dist-tag (canary releases) — post-v1.0
- Preview releases (pkg.pr.new) — v1.1
- GitHub Discussions (use Issues first) — v1.1
- GitHub Sponsors — v1.1
- Automated announcements — v1.1
- Dependabot configuration — v1.1
- Chromatic/Vercel Storybook hosting — v1.1 (use GitHub Pages)
- Server package publication (auth, api, db) — remain private indefinitely
- Consumer application performance profiling
- Replacing apexcharts or any third-party dependency

---

## Section 3 — Governance

### 3.1 Authority

This specification is an Architecture Design Session document. Once frozen, it governs all release-related architectural decisions. Changes require an ARB review per SPEC-GOVERNANCE-001.

### 3.2 Relationship to Predecessor Specifications

| ADS | Relationship | Impact |
|-----|-------------|--------|
| ADS-001 (Toolchain) | Preserved. changesets is already installed. | None |
| ADS-003b (Dependency Ownership) | Preserved. Published packages maintain ownership of their third-party dependencies. Inter-package dependencies use `workspace:*` which resolves to semver ranges during publish. | Workspace protocol verification required before first publish. |
| ADS-003c (Build Architecture) | Preserved. tsc build with composite and declaration output. Build output (`dist/`) is the publish target. CSS files must be copied to dist/ as `tsc` does not copy non-TS files. | CSS-exporting packages gain a copy step in their build script (§8.7). |
| ADS-004 (Repository Automation) | Adds `changeset`, `version`, and `release:publish` scripts to root. Adds `release.yml` to CI workflows. | Root scripts and `.github/workflows/` gain new entries. |
| ADS-005 (Component Review) | Extended. Component review checklist gains three release-related gates: (1) exports map entry documented in contract, (2) README.md tier determined, (3) changeset added for the feature/bugfix. | None |
| ADS-009 (Performance) | Preserved. Bundle size budgets are validated during release CI before publish. | None |
| SPEC-GOVERNANCE-001 | Release follows mandatory governance workflow: Implementation → Reports → Audit → ARB → Next Stage. | Release stages (beta, rc, GA) align with governance approval gates. |

### 3.3 Change Categories

| Category | Definition | Validation Tier |
|----------|-----------|----------------|
| **Architecture** | Defines versioning, publishing, validation, and release infrastructure | Dependency/Build/Infrastructure |
| **Implementation** | Configures changesets, exports maps, CI workflows, consumer test app, READMEs | Per deliverable scope |
| **Governance** | Updates release pipeline, branch protection, community files | Per deliverable scope |
| **Documentation** | Creates package READMEs, root README, community health files | Documentation |
| **Maintenance** | Updates npm token, dependency versions, CHANGELOGs | Per scope of affected files |

---

## Section 4 — Architectural Decisions

All decisions from the M10 Architectural Exploration are resolved here. Each decision is prefixed by its domain code and is binding.

### 4.1 Versioning (VER-1 through VER-4)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| VER-1 | Versioning strategy | **Independent semver per package.** Each package has its own MAJOR.MINOR.PATCH. A breaking change in `@ho-dev/charts` MUST NOT force a major bump in `@ho-dev/types`. | Design system packages have asymmetric maturity. Forcing synchronized versioning falsely signals stability in stable packages. Industry standard for React design systems. |
| VER-2 | Versioning tool | **Changesets.** `@changesets/cli` is already installed and configured. No alternative tool justifies migration cost. | Industry standard for monorepo publishing. Native pnpm `workspace:*` support. Built-in prerelease, changelog, and GitHub Release support. |
| VER-3 | Changesets access mode | **`"public"`** in `.changeset/config.json`. Scoped npm packages default to restricted. All `@ho-dev/*` packages MUST be public. | Setting in changesets config cascades to all publishable packages via `publishConfig.access`. |
| VER-4 | Internal dependency update policy | **`"updateInternalDependencies": "patch"`.** When a dependency bumps minor, dependent packages get a patch bump. The `^X.Y.Z` range already accepts the new version. | Minimizes consumer churn. A new hook in `@ho-dev/hooks` (minor) SHOULD NOT force `@ho-dev/primitives` to also bump minor. |

### 4.2 Publishing (PUB-1 through PUB-5)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| PUB-1 | Package publish set | **16 packages publish, 4 remain private.** Publish: types, tokens, constants, utils, hooks, i18n, providers, theme, icons, primitives, ui, forms, charts, layouts, eslint, config. Private: auth, api, db (server infrastructure), testing (dev-only). | auth, api, db are server-side packages with no consumer value. testing is a development dependency distributed via the repository. eslint is publishable as a standalone config preset. |
| PUB-2 | Exports map standard | **Exports maps MUST point to `./dist/` for npm consumers.** Types field MUST be `"./dist/index.d.ts"`. Import field MUST be `"./dist/index.js"`. Dev convenience (`./src/index.ts`) MUST be moved to tsconfig paths or Storybook aliases. | npm consumers never receive `src/`. Building is the package author's responsibility. The published tarball only includes `dist/` (per PUB-4). |
| PUB-3 | CSS exports | **CSS sub-exports MUST point to `./dist/`.** CSS files MUST be copied to `dist/` during the build step. Each CSS-exporting package (theme, tokens, charts, forms) MUST modify its build script to copy CSS files after `tsc` compilation. | `tsc` does not copy non-TS files. Without explicit copying, CSS exports resolve to non-existent paths in the published tarball. |
| PUB-4 | Package files | **`"files": ["dist", "README.md", "LICENSE"]`.** No source files, test files, or story files MAY be included in the npm tarball. | Minimizes published package size. Prevents accidental source exposure. README is required for npm display. LICENSE is legally required. |
| PUB-5 | npm provenance | **Enabled.** `publishConfig.provenance: true` on all publishable packages. Release workflow MUST include `id-token: write` permission. `NPM_TOKEN` MUST be an automation token, not a user token. | Zero-cost supply-chain trust. npm displays provenance badge. Increasingly expected by the ecosystem. |

### 4.3 Release Pipeline (REL-1 through REL-5)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| REL-1 | Pipeline architecture | **Fully automated via `changesets/action@v2`.** The action opens a Version PR when changesets accumulate on `main`. Merging the PR triggers quality gates + consumer validation + publish. | Industry standard. Version PR provides human review gate. Publish is automatic after merge — prevents forgotten publishes. |
| REL-2 | Concurrency control | **`concurrency: ${{ github.workflow }}-${{ github.ref }}`** in `release.yml`. Only one release workflow MAY run per branch at a time. | Prevents race conditions on version bumps when multiple pushes land on main in quick succession. |
| REL-3 | Commit convention | **`chore(release): version packages`** for changeset version commits. MUST follow existing commitlint conventional commit config. | Scope `release` is already defined in `commitlint.config.mjs`. Consistent with repository conventions. |
| REL-4 | Git tag convention | **`@ho-dev/<pkg>@<version>`** per package. Created automatically by changesets on publish. | Required for independent versioning. Consumers can track individual package versions. `git tag -l '@ho-dev/*'` lists all release tags. |
| REL-5 | GitHub Release strategy | **One GitHub Release per publish containing all changed packages.** `create-github-releases: true` in changesets action configuration. | Per-package releases for 16 packages would flood the releases page. One release per publish is the pragmatic choice. Consumers tracking a single package SHOULD use per-package CHANGELOG.md or git tags. |

> **Partial publish failure:** changesets publishes packages sequentially. If the publish fails mid-stream (e.g., package 6 of 10 fails), packages 1-5 are already on npm at their new versions. The release workflow MUST be re-triggered after fixing the failure. Published packages remain unaffected at their new versions. Unreleased packages remain at their previous versions. Common causes are npm registry downtime or token expiration; the `timeout-minutes: 15` limit in release.yml handles the first case. This scenario is rare and requires no architectural change — retry is the correct response.

### 4.4 Consumer Validation (VAL-1 through VAL-3)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| VAL-1 | Validation architecture | **Permanent consumer test application in `apps/consumer-test/`.** Next.js 16 App Router. Uses `workspace:*` during development, validates against `dist/` during release. | External test projects drift out of sync. In-repo app guarantees validation matches current code. Maintenance scope: validates *public API surface stability*, not feature coverage. |
| VAL-2 | Validation dimensions | **6 dimensions, ordered by criticality:** (1) TypeScript compilation with consumer tsconfig, (2) SSR rendering (no `window` errors), (3) RSC boundary (`"use client"`), (4) Tree-shaking efficacy (one component ≠ entire package), (5) CSS loading (all CSS files load without errors), (6) Install isolation (each package installs + compiles with only its declared peer deps). | Types are the #1 consumer-facing issue. SSR is critical for Next.js consumers. Install isolation catches missing dependency declarations that monolithic validation masks. |
| VAL-3 | Validation gate | **All 6 dimensions MUST pass before publish.** Any failure blocks the release. The validation script MUST exit non-zero on any failure. CI MUST run consumer validation after quality gates and before publish. | No package reaches npm without being validated from a real consumer's perspective. This is the architectural guarantee that `npm install @ho-dev/primitives` works for target consumers. |

### 4.5 Prerelease Strategy (PRE-1 through PRE-3)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| PRE-1 | First release path | **Graduated: `beta` → `rc` → `1.0.0`.** Each stage validates against increasingly realistic consumer environments before promotion. | Risk management for first-time publisher. Dev preview validates infrastructure. Beta validates with design partners. RC validates with public. 1.0.0 signals production readiness. |
| PRE-2 | dist-tags | **`beta` → `rc` → `latest`.** Consumers opt-in explicitly: `pnpm add @ho-dev/primitives@beta`. `npm install @ho-dev/primitives` resolves to `latest` (GA). | Standard npm convention. Clear opt-in for prerelease channels. `latest` is the default resolution target. |
| PRE-3 | `next` dist-tag | **Deferred to post-v1.0.** The `next` tag is useful for ongoing canary/nightly releases during active development cycles. Before v1.0, every prerelease is effectively a canary — `next` adds ceremony without benefit. MUST be added as part of post-v1.0 release strategy. | Pre-v1.0 there is no `latest` to distinguish from. Adding `next` post-v1.0 is a documentation change, not an architectural change. |

### 4.6 Documentation (DOC-1 through DOC-3)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| DOC-1 | Package README tiers | **Tiered scope: Full, Compact, Minimal.** Full tier (primitives, forms, charts, theme, icons): description, install, usage, API reference, bundle size, peer deps. Compact tier (hooks, utils, i18n, layouts, ui, providers): description, install, usage, link to Storybook. Minimal tier (types, tokens, constants, config, eslint): one-liner description, install command, link to docs. | Packages with zero public API complexity SHOULD NOT carry full READMEs. Consumers of `@ho-dev/types` don't need usage examples — they need the type definitions. |
| DOC-2 | Root README | **MUST match SPEC-IDENTITY-001.** Hero section, installation, quick example (5-10 lines), package directory table, documentation links, status, community, license. | Root README is the landing page for npm and GitHub. It is the first impression for potential consumers. |
| DOC-3 | Storybook as primary docs | **Storybook is the interactive API reference.** MUST be deployed to GitHub Pages for v1.0. Package READMEs MUST link to individual Storybook pages. | Storybook is already built and tested. GitHub Pages deployment is free. Chromatic/Vercel MAY be evaluated in v1.1. |

### 4.7 Community Infrastructure (COM-1)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| COM-1 | Community health files | **MUST include:** `.github/ISSUE_TEMPLATE/bug_report.md`, `feature_request.md`, `.github/PULL_REQUEST_TEMPLATE.md`, `CODE_OF_CONDUCT.md` (Contributor Covenant), `CONTRIBUTING.md` (dev setup + changeset guide), `SECURITY.md`, `CODEOWNERS`. Detailed templates are defined in ES-002. | Standard open-source repository requirements. GitHub displays these files in the repository UI. Issues are the primary community feedback channel. |

### 4.8 Release CI (CI-1 through CI-3)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| CI-1 | Release workflow | **`release.yml` using `changesets/action@v2`.** MUST include: checkout, pnpm setup, Node.js setup with npm registry URL, frozen-lockfile install, all-checks, consumer validation, changesets action with publish-script. MUST include `timeout-minutes: 15`. | Single workflow for both Version PR creation and publishing. Follows Turborepo and Changesets documented best practices. |
| CI-2 | Publish script | **`"release:publish": "turbo run build --filter='./packages/*' && changeset publish"`** in root package.json. Rebuilds packages before publish to ensure dist/ matches version-bumped source. | Quality gates already ran. Rebuild ensures publish output matches bumped versions. |
| CI-3 | Secrets | **`NPM_TOKEN`** (automation token, publish scope only), **`GITHUB_TOKEN`** (automatic), **`DATABASE_URL`** (required by all-checks Prisma generate step). If `DATABASE_URL` is unavailable, Prisma generate MUST be made conditional or a dummy connection string MUST be used — release infrastructure MUST NOT be coupled to database availability. | `DATABASE_URL` is a pre-existing requirement of the `all-checks` pipeline. This dependency MUST be documented and mitigated to prevent release CI failures. |

### 4.9 Roadmap Structure (ROA-1)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| ROA-1 | M10/M11 merge | **M10 is a single milestone with two phases.** M10a (Release Infrastructure): changesets, exports, CSS copy, release CI, READMEs. M10b (Community & Validation): consumer test app, community files, Storybook deploy, examples, technical debt. | Release infrastructure and open source readiness are interdependent. Release without community readiness is a ghost town. Community readiness without a release pipeline is a billboard with no product. |

### 4.10 Specification Governance (SPC-1)

| Rule | Decision | Resolution | Rationale |
|------|----------|-----------|-----------|
| SPC-1 | Related specifications | **ADS-010 is self-contained.** It absorbs the scope of previously-proposed ADS-011 (Consumer Validation), ADS-012 (Documentation Standards), ADS-013 (Community), and ADS-014 (npm Standards). Engineering Standards ES-001 (Package README Template) and ES-002 (Community Health Files) are referenced but defined separately — they contain implementation templates, not architectural decisions. | Fragmentation across 5 interdependent specs creates governance overhead. ADS-010 is the single source of truth for release architecture. ES documents provide templates referenced by ADS-010. |

---

## Section 5 — Release Principles

### 5.1 Core Principles

1. **Consumer validation is mandatory.** No package reaches npm without passing all 6 validation dimensions from a real Next.js 16 consumer application. Internal quality gates (format, lint, typecheck, test) are necessary but not sufficient.

2. **Independent versioning respects asymmetric maturity.** `@ho-dev/types` MUST NOT bump to `2.0.0` because `@ho-dev/charts` has a breaking change. Each package evolves at its own velocity.

3. **Every package pays its own bundle cost.** The published tarball contains only `dist/`, `README.md`, and `LICENSE`. Source files, tests, and stories are excluded. The consumer's bundler is responsible for tree-shaking — Holiveira's responsibility is to ensure tree-shaking is *possible*.

4. **CSS is compiled at build time, copied at publish time.** Tailwind v4 produces build-time CSS. Packages that export CSS files MUST copy them to dist/ during the build step. `tsc` does not copy non-TS files — the build script is responsible.

5. **Release is automated after review.** Humans review the Version PR. Machines validate, build, and publish. No manual publish steps. No forgotten publishes.

6. **Prereleases validate before GA.** `beta` validates with design partners. `rc` validates with the public. `1.0.0` signals production readiness. Each stage gates on the same 6 validation dimensions.

7. **Documentation is tiered by complexity.** A package with 5 type exports does not need the same documentation surface as a package with 11 interactive components. Documentation effort is proportional to API surface.

8. **Trust is built from zero.** As a first-time publisher, Holiveira MUST signal trust through: npm provenance, comprehensive documentation, consumer-verified quality, clean package metadata, and transparent versioning.

### 5.2 Anti-Patterns

| Anti-pattern | Why it is wrong | Correct approach |
|-------------|----------------|-----------------|
| Publishing with `./src/` in exports maps | npm consumers cannot resolve source files. The published tarball excludes `src/`. | Exports maps point to `./dist/`. Dev convenience uses tsconfig paths. |
| Assuming `tsc` copies CSS | `tsc` compiles TypeScript. It does not copy `.css` files. CSS exports resolve to non-existent paths. | Build script copies CSS files to `dist/` after compilation. |
| Validating all packages as a monolith | Masks missing dependency declarations. Consumer installing `@ho-dev/primitives` must not need `@ho-dev/charts` as a transitive. | Per-package install isolation testing. |
| Fixed versioning across asymmetric packages | Forces unnecessary major bumps in stable packages. `@ho-dev/tokens` at `2.0.0` because `@ho-dev/charts` broke — consumer confusion. | Independent semver per package. |
| Publishing without consumer validation | Internal quality gates validate the *author's* perspective. They do not validate SSR rendering, RSC boundaries, or real consumer bundler behavior. | Consumer test app with 6 validation dimensions. |
| Manual release process | Humans forget to publish. Builds drift. `latest` tag points to stale version. | Fully automated via changesets/action. Version PR reviewed by humans, publish automatic. |
| 16 separate READMEs with identical structure | `@ho-dev/types` does not need a usage example. `@ho-dev/primitives` does. Uniform templates create noise. | Tiered README scope: Full, Compact, Minimal. |
| Premature `next` dist-tag before v1.0 | No `latest` exists to distinguish from. Every prerelease is effectively `next`. Ceremony without benefit. | `beta → rc → 1.0.0`. Add `next` post-v1.0 for canary releases. |

---

## Section 6 — Package Classification

### 6.1 Publishing Categories

| Category | Packages | Action |
|----------|---------|--------|
| **Public Core** | types, tokens, constants, utils, hooks, i18n, providers, theme, icons, primitives, ui, forms, charts, layouts, eslint, config | Publish to npm with `publishConfig.access: "public"` |
| **Private Infrastructure** | auth, api, db | Keep `"private": true`. Used internally via `workspace:*`. Excluded from changesets. |
| **Private Development** | testing | Keep `"private": true`. Vitest helpers — only useful in repository context. |

### 6.2 CSS-Exporting Packages

| Package | CSS files | Copy mechanism required? |
|---------|----------|:---:|
| `@ho-dev/theme` | `theme.css` | ✅ Yes — build script copies to dist/ |
| `@ho-dev/tokens` | `tokens.css` | ✅ Yes — build script copies to dist/ |
| `@ho-dev/charts` | `chart-styles.css` | ✅ Yes — build script copies to dist/ |
| `@ho-dev/forms` | `date-picker-styles.css` | ✅ Yes — build script copies to dist/ |

### 6.3 Inter-Package Dependencies

| Dependency Type | Resolution During Publish |
|----------------|--------------------------|
| `workspace:*` | Resolved to exact semver version by pnpm |
| `workspace:^` | Resolved to caret range by pnpm |
| Third-party `dependencies` | Published as-is (consumer installs transitively) |
| `peerDependencies` | Published as-is (consumer must install) |

### 6.4 Version Stability Mapping

| Stability | Packages | Expected Major Bump Frequency |
|-----------|---------|:---:|
| **High** | types, tokens, constants, utils, i18n, providers, eslint, config | Rare (years) |
| **Medium** | hooks, theme, icons, primitives, ui, layouts | Occasional (months) |
| **Low-Medium** | forms | Quarterly |
| **Low** | charts | Rare (wrapper, limited surface) |

---

## Section 7 — Build Architecture for Publishing

### 7.1 Build Pipeline

```
tsc (per package) → dist/*.js + dist/*.d.ts
CSS copy (per package) → dist/<name>.css
Turbo: ^build dependency ordering
Root publish: turbo run build --filter='./packages/*' && changeset publish
```

### 7.2 Build Script Template for Pure-JS Packages

```json
{
  "scripts": {
    "build": "tsc"
  }
}
```

### 7.3 Build Script Template for CSS-Exporting Packages

```json
{
  "scripts": {
    "build": "tsc && cp src/theme.css dist/"
  }
}
```

Each CSS-exporting package MUST include the CSS copy in its build script. The copy command MUST succeed (exit 0) for the build to pass.

---

## Section 8 — Implementation Deliverables

### 8.1 D10a — Release Infrastructure

#### D10a.1 — Release Infrastructure Configuration

| Property | Detail |
|----------|--------|
| **Objective** | Configure changesets, exports maps, CSS copy, package metadata for all 16 publishable packages |
| **Dependencies** | ADS-010 frozen |
| **Estimated Effort** | 5-7 hours |
| **Verification** | Direct file audit + CI |

**Acceptance Criteria:**
1. All 16 publishable packages have `"private": false`
2. All have `publishConfig.access: "public"` and `publishConfig.provenance: true`
3. All exports maps point to `./dist/` (types: `./dist/index.d.ts`, import: `./dist/index.js`)
4. All 4 CSS-exporting packages have CSS sub-exports pointing to `./dist/` and CSS copy in build script
5. `files` includes `["dist", "README.md", "LICENSE"]` on all packages
6. All inter-package dependencies verified as `workspace:*`
7. `pnpm publish --dry-run` succeeds for all 16 packages
8. `.changeset/config.json` has `"access": "public"` and `"baseBranch": "main"`
9. `.changeset/config.json` has `"updateInternalDependencies": "patch"`

#### D10a.2 — Release CI Workflow

| Property | Detail |
|----------|--------|
| **Objective** | Create `.github/workflows/release.yml` with changesets automation |
| **Dependencies** | D10a.1, npm token |
| **Estimated Effort** | 2-3 hours |
| **Verification** | CI dry-run + workflow dispatch test |

**Acceptance Criteria:**
1. Uses `changesets/action@v2`
2. `concurrency: ${{ github.workflow }}-${{ github.ref }}`
3. all-checks runs before publish
4. Consumer validation step exists in release.yml. If consumer-test app is not yet built (M10a phase), the step logs a warning and continues. After M10b completion, the step MUST be unconditional and block publish on failure.
5. `NPM_TOKEN` secret configured
6. `id-token: write` permission for provenance
7. `create-github-releases: true`
8. Dry-run succeeds end-to-end

#### D10a.3 — Package READMEs

| Property | Detail |
|----------|--------|
| **Objective** | Create tiered README.md for all 16 publishable packages |
| **Dependencies** | ES-001 template |
| **Estimated Effort** | 4-5 hours |
| **Verification** | File existence + template compliance check |

**Acceptance Criteria:**
1. 16 README.md files exist (one per publishable package)
2. Full tier (5 packages): description, install, usage, API reference, bundle size, peer deps
3. Compact tier (6 packages): description, install, usage, link to Storybook
4. Minimal tier (5 packages): one-liner + install command + link to docs
5. All READMEs link to Storybook and GitHub repository
6. All READMEs list correct `peerDependencies` as shown in package.json

#### D10a.4 — Root README Rewrite

| Property | Detail |
|----------|--------|
| **Objective** | Rewrite root README per SPEC-IDENTITY-001 with public-facing content |
| **Dependencies** | D10a.3 |
| **Estimated Effort** | 3-4 hours |
| **Verification** | SPEC-IDENTITY-001 compliance review |

**Acceptance Criteria:**
1. Hero section with tagline and badges (npm, license, build, size)
2. Installation instructions (single command)
3. Quick example (5-10 lines: Button + ThemeProvider)
4. Package directory table with npm badges and descriptions for all 16 packages
5. Documentation links (Storybook, contributing, architecture)
6. Community section (issues, discussions, CoC)
7. License (MIT)
8. Matches SPEC-IDENTITY-001 tone and positioning

### 8.2 D10b — Community & Validation

#### D10b.1 — Consumer Test Application

| Property | Detail |
|----------|--------|
| **Objective** | Create `apps/consumer-test/` — Next.js 16 app with 6 validation dimensions |
| **Dependencies** | D10a.1 (exports correction) |
| **Estimated Effort** | 6-8 hours |
| **Verification** | All 6 validation dimensions pass + CI integration |

**Acceptance Criteria:**
1. Next.js 16 App Router compiles with all 16 publishable packages
2. SSR page renders without `window` and `document` errors
3. RSC page renders without server-client mismatch (no `"use client"` boundary violations)
4. Bundle analysis confirms tree-shaking: importing one Button does not pull all primitives
5. TypeScript compilation passes (`tsc --noEmit` against consumer app)
6. All CSS files load without console errors (theme.css, tokens.css, chart-styles.css, date-picker-styles.css)
7. Per-package install isolation: each package installs + compiles independently with only its declared peer deps
8. `scripts/validate.ts` exits non-zero on any failure
9. CI workflow blocks publish on validation failure

#### D10b.2 — Community Health Files

| Property | Detail |
|----------|--------|
| **Objective** | Create GitHub community files per ES-002 |
| **Dependencies** | GitHub org |
| **Estimated Effort** | 2-3 hours |
| **Verification** | File existence + template compliance |

**Acceptance Criteria:**
1. `.github/ISSUE_TEMPLATE/bug_report.md` (YAML frontmatter: name, about, labels)
2. `.github/ISSUE_TEMPLATE/feature_request.md` (YAML frontmatter)
3. `.github/PULL_REQUEST_TEMPLATE.md`
4. `CODE_OF_CONDUCT.md` (Contributor Covenant 2.1)
5. `CONTRIBUTING.md` (dev setup: pnpm install, turbo build; changeset guide: pnpm changeset)
6. `SECURITY.md` (reporting vulnerabilities)
7. `CODEOWNERS` (root `.github/CODEOWNERS`)
8. Labels configured: `bug`, `enhancement`, `docs`, `good first issue`, `triage`

#### D10b.3 — Storybook Deployment

| Property | Detail |
|----------|--------|
| **Objective** | Deploy Storybook to GitHub Pages |
| **Dependencies** | GitHub Pages enabled on repository (requires admin access — may be blocked if admin credentials are unavailable) |
| **Estimated Effort** | 2-3 hours |
| **Verification** | URL accessible + package README links work |

**Acceptance Criteria:**
1. GitHub Actions workflow (or release step) deploys `build:storybook` output to `gh-pages` branch
2. Storybook accessible at `https://<org>.github.io/holiveira-design-system`
3. Root README links to Storybook URL
4. Package READMEs link to individual Storybook pages (e.g., `?path=/docs/primitives-button`)

#### D10b.4 — Examples

| Property | Detail |
|----------|--------|
| **Objective** | Create usage examples demonstrating common patterns |
| **Dependencies** | D10b.1 |
| **Estimated Effort** | 4-6 hours |
| **Verification** | All examples render without errors in consumer test app |

**Acceptance Criteria:**
1. Form example: Form + Field + DatePicker + zod validation
2. Chart example: AreaChart + React.lazy + ChartSkeleton
3. Theme example: ThemeProvider + dark mode toggle + custom color tokens
4. Layout example: Sidebar + Header + Breadcrumb
5. All examples import from `@ho-dev/*` packages (named imports, not relative paths)

#### D10b.5 — Technical Debt Resolution

| Property | Detail |
|----------|--------|
| **Objective** | Resolve or document pre-existing TS2742 errors |
| **Dependencies** | D10a.1 |
| **Estimated Effort** | 4-6 hours |
| **Verification** | TypeScript compilation + updated debt registry |

**Acceptance Criteria:**
1. TS2742 errors in `@ho-dev/testing` resolved OR documented in technical debt registry with rationale
2. TS2742 errors in `@ho-dev/auth` resolved OR documented in technical debt registry with rationale
3. `check:deps` passes (zero dependency violations)
4. `docs/architecture/technical-debt-registry.md` updated with current status
5. No new technical debt introduced by M10 work

### 8.3 Effort Summary

| Phase | Deliverable | Effort |
|-------|-------------|:---:|
| M10a | D10a.1 — Release Infrastructure | 5-7 h |
| M10a | D10a.2 — Release CI | 2-3 h |
| M10a | D10a.3 — Package READMEs | 4-5 h |
| M10a | D10a.4 — Root README | 3-4 h |
| M10b | D10b.1 — Consumer Test App | 6-8 h |
| M10b | D10b.2 — Community Files | 2-3 h |
| M10b | D10b.3 — Storybook Deploy | 2-3 h |
| M10b | D10b.4 — Examples | 4-6 h |
| M10b | D10b.5 — Technical Debt | 4-6 h |
| **Total** | | **32-47 h** |

---

## Section 9 — Acceptance Criteria for M10 Completion

| # | Criterion | Deliverable | Category |
|---|-----------|-------------|:---:|
| M10-1 | All 16 publishable packages: `"private": false`, `publishConfig.access: "public"` | D10a.1 | Infrastructure |
| M10-2 | All exports maps: `types` → `./dist/index.d.ts`, `import` → `./dist/index.js` | D10a.1 | Infrastructure |
| M10-3 | CSS packages: CSS files in dist/, build script copies CSS | D10a.1 | Infrastructure |
| M10-4 | `pnpm publish --dry-run` succeeds for all 16 packages | D10a.1 | Infrastructure |
| M10-5 | `.changeset/config.json`: `access: "public"`, `baseBranch: "main"`, `updateInternalDependencies: "patch"` | D10a.1 | Infrastructure |
| M10-6 | `release.yml` workflow exists with changesets/action@v2 | D10a.2 | CI/CD |
| M10-7 | `concurrency` prevents race conditions | D10a.2 | CI/CD |
| M10-8 | `NPM_TOKEN` configured as GitHub Secret | D10a.2 | CI/CD |
| M10-9 | 16 package READMEs exist at correct tiers | D10a.3 | Documentation |
| M10-10 | Root README rewritten per SPEC-IDENTITY-001 | D10a.4 | Documentation |
| M10-11 | Consumer test app builds + passes all 6 validation dimensions | D10b.1 | Validation |
| M10-12 | Per-package install isolation passes for all 16 packages | D10b.1 | Validation |
| M10-13 | CI blocks publish on consumer validation failure | D10b.1 | CI/CD |
| M10-14 | Community health files (7 files) exist | D10b.2 | Community |
| M10-15 | Storybook deployed to GitHub Pages and accessible | D10b.3 | Documentation |
| M10-16 | 4 examples render in consumer test app | D10b.4 | Documentation |
| M10-17 | Technical debt registry updated | D10b.5 | Governance |
| M10-18 | `check:deps` passes | D10b.5 | Quality |
| M10-19 | `release.yml` dry-run succeeds end-to-end | D10a.2 | CI/CD |
| M10-20 | First changeset file generated via `pnpm changeset` | — | Process |

---

## Section 10 — Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|------|:---:|:---:|------------|
| R-1 | Package publishes with `./src/` references | Critical | High | CI grep for `./src/` in dist. Block publish. |
| R-2 | Breaking change published unintentionally | Medium | Critical | Changesets explicit bump type. PR review. Consumer validation. |
| R-3 | npm token compromised | Low | Critical | Automation token only. Rotate quarterly. Publish-only scope. |
| R-4 | Consumer install fails (broken peer deps) | Medium | High | Consumer test app validates install + build + typecheck. Install isolation tests. |
| R-5 | Tree-shaking fails in consumer bundler | Medium | High | Test with webpack (size-limit) + Turbopack (consumer test app). |
| R-6 | CSS not loaded by consumer | Medium | High | Consumer test app verifies all CSS loading. CSS copy mechanism verified. |
| R-7 | Private package leaked to public npm | Low | High | check:exports. Private packages excluded from changesets. |
| R-8 | Version conflict: workspace:* resolved wrong | Low | High | `pnpm publish --dry-run` verification. |
| R-9 | `"use client"` boundary missing → SSR errors | Medium | Medium | ESLint rule. RSC validation in consumer test app. |
| R-10 | Exports map missing export → import failure | Medium | Medium | check:exports blocks mismatch. |
| R-11 | npm provenance fails | Medium | Medium | Dry-run before first publish. |
| R-12 | Changeset includes private package accidentally | Low | Medium | `"private": true` excluded. Root `ignore: ["holiveira"]`. |
| R-13 | Build output differs CI vs local | Low | Medium | Turbo `inputs` excludes dist/. CI `--force` on release. |
| R-14 | Consumer validates against stale dist/ | Medium | Low | Consumer test app runs `turbo run build` before validation. |
| R-15 | CHANGELOG auto-generated incomplete | Medium | Low | Human-written changeset summaries. Version PR review. |
| R-16 | Consumer test app maintenance burden | Medium | Medium | Per VAL-1: validates public API surface stability, not feature coverage. |
| R-17 | GitHub Pages requires org-level config | Medium | Low | Documented as D10b.3 dependency. |
| R-18 | DATABASE_URL couples release CI to DB | Medium | Medium | Dummy URL or conditional Prisma generate. |

---

## Section 11 — Freeze Rules

1. **Independent versioning is permanent.** The decision to use per-package semver via changesets (VER-1) MAY only be changed by a new ADS with ARB approval. The cost of migrating 16 packages from independent to fixed versioning (or vice versa) includes rewriting all past version history, invalidating existing tags, and confusing consumers.

2. **The consumer validation architecture is permanent.** The consumer test app in `apps/consumer-test/` MUST exist for the lifetime of the repository. Removing it would eliminate the only architectural guarantee that packages work from a consumer's perspective.

3. **Prerelease path MAY be extended but not contracted.** Adding stages (e.g., `alpha` before `beta`) is allowed with ADS amendment. Removing stages (e.g., skipping `rc` before GA) requires ARB approval.

4. **Package publish set changes require ARB approval.** Promoting a private package (auth, api, db) to public status, or demoting a public package to private, is an architectural change.

5. **Exports map standard MAY NOT be weakened.** All public packages MUST export from `./dist/`. No public package MAY expose `./src/` in its exports map.

6. **CSS copy mechanism is mandatory.** Any package exporting CSS files MUST copy them to `dist/` during build. No workaround (symlinks, src/-based exports) is permitted.

7. **Release pipeline automation is mandatory.** Manual `npm publish` outside the changesets/action workflow is prohibited. All releases flow through the Version PR → Quality Gates → Publish pipeline.

8. **npm provenance is mandatory.** All published packages MUST carry provenance attestation. Disabling provenance requires ARB approval and a documented security rationale.

---

## Section 12 — Amendments

### 12.1 Amendment Procedure

Per SPEC-GOVERNANCE-001 §8, amendments to this specification require:
1. Architecture Design Session (ADS) proposal
2. ARB review
3. Updated specification with change log
4. Frozen amendment appended to this document

### 12.2 Allowable Amendments Without Full ARB Review

| Change | Approval Required |
|--------|:---:|
| Adding a new package to the publish set | ARB |
| Removing a package from the publish set | ARB |
| Changing versioning strategy (VER-1) | ARB |
| Adding a prerelease stage | ARB (new ADS section) |
| Updating README tier assignments | Package maintainer |
| Adjusting build script CSS copy paths | Package maintainer |
| Adding a new workflow to release CI | ARB |
| Rotating NPM_TOKEN | Repository admin (no ARB) |

---

## Section 13 — Specification Validation

### 13.1 Internal Consistency

All 20 architectural decisions (VER-1 through SPC-1) are:
- Independent: no decision contradicts another
- Complete: every release concern is addressed
- Binding: each decision uses normative language (MUST, MUST NOT, SHOULD, MAY)

### 13.2 Cross-Reference Matrix

| ADS Section | Depends On | Referenced By |
|-------------|-----------|---------------|
| VER-1 to VER-4 | — | REL-1, REL-4, PRE-1 |
| PUB-1 to PUB-5 | VER-1 | CI-1, §8 |
| REL-1 to REL-5 | VER-1, VER-2 | CI-1, §5 |
| VAL-1 to VAL-3 | PUB-2, PUB-3 | D10b.1 |
| PRE-1 to PRE-3 | VER-1, VER-2 | REL-1 |
| DOC-1 to DOC-3 | PUB-4 | D10a.3, D10a.4 |
| COM-1 | — | D10b.2 |
| CI-1 to CI-3 | REL-1 to REL-5 | D10a.2 |
| ROA-1 | — | D10a, D10b |
| SPC-1 | All above | ES-001, ES-002 |

### 13.3 Backward Compatibility

This specification introduces no changes to existing packages beyond package.json metadata. TypeScript compiles identically. Build outputs are augmented (CSS copy), not replaced. Existing imports continue to work. The change from `"types": "./src/index.ts"` to `"types": "./dist/index.d.ts"` affects only npm consumers — repository development continues to resolve types via tsconfig paths.

---

## Appendix A — Consumer Test Application Architecture

### A.1 Directory Structure

```
apps/consumer-test/
├── package.json           # workspace:* deps on all 16 public packages
├── next.config.ts         # Next.js 16 App Router
├── tsconfig.json          # extends ../../tsconfig.base.json
├── src/
│   ├── app/
│   │   ├── layout.tsx     # ThemeProvider + tokens.css import
│   │   ├── page.tsx       # Component gallery
│   │   ├── ssr/page.tsx   # SSR validation
│   │   ├── rsc/page.tsx   # RSC validation
│   │   ├── charts/page.tsx
│   │   └── forms/page.tsx
│   └── tests/
│       ├── ssr.test.ts
│       ├── rsc.test.ts
│       ├── bundle.test.ts
│       ├── types.test.ts
│       └── isolation.test.ts
├── scripts/
│   └── validate.ts        # Orchestration: build → validate → report
└── README.md              # "Consumer validation harness — not a demo"
```

### A.2 Validation Dimensions in Detail

| # | Dimension | Test Methodology | Failure Mode |
|---|-----------|-----------------|-------------|
| 1 | TypeScript | `tsc --noEmit` with consumer tsconfig importing all packages | Import errors, missing types |
| 2 | SSR | Next.js page renders without `window is not defined` or `document is not defined` | Hydration errors, SSR crash |
| 3 | RSC | Next.js App Router page — no "use client" boundary violations | Server-client mismatch warning |
| 4 | Tree-Shaking | Build consumer app, analyze bundle — single component import ≠ full package | Full package in consumer bundle |
| 5 | CSS | Import all CSS files in layout.tsx — zero console errors | Missing CSS, 404 on CSS import |
| 6 | Isolation | Per package: temp dir → `pnpm init` → add pkg + peer deps → `tsc --noEmit` | Missing dependency declarations |

---

## Appendix B — release.yml Reference Implementation

> **DATABASE_URL note:** This reference assumes `DATABASE_URL` is configured as a GitHub Secret, matching the existing `ci.yml` workflow. The `all-checks` pipeline requires this for the Prisma generate step. If `DATABASE_URL` is unavailable during a release, the Quality Gates step fails with a non-release-related error. Per CI-3, this coupling MUST be documented and mitigated — the existing `ci.yml` workflow already has the secret configured, so for the initial release setup no additional action is required.

```yaml
name: Release

on:
  push:
    branches:
      - main

concurrency: ${{ github.workflow }}-${{ github.ref }}

permissions:
  contents: write
  pull-requests: write
  id-token: write
  packages: read

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Setup pnpm
        uses: pnpm/action-setup@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version-file: .nvmrc
          registry-url: https://registry.npmjs.org

      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Quality Gates
        run: pnpm run all-checks
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}

      - name: Consumer Validation
        run: pnpm run validate --filter=consumer-test
        continue-on-error: false

      - name: Create Release PR or Publish
        id: changesets
        uses: changesets/action@v2
        with:
          publish-script: pnpm release:publish
          commit-message: 'chore(release): version packages'
          pr-title: 'chore(release): version packages'
          create-github-releases: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Appendix C — Package Metadata Reference

### C.1 Pure-JS Package (e.g., `@ho-dev/utils`)

```json
{
  "name": "@ho-dev/utils",
  "version": "1.0.0",
  "private": false,
  "type": "module",
  "license": "MIT",
  "publishConfig": {
    "access": "public",
    "provenance": true
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/HugoOliveiraThor/holiveira-design-system.git",
    "directory": "packages/utils"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "sideEffects": false,
  "files": ["dist", "README.md", "LICENSE"],
  "keywords": ["holiveira", "design-system", "react", "typescript", "utilities"],
  "author": "Holiveira",
  "homepage": "https://github.com/HugoOliveiraThor/holiveira-design-system#readme",
  "bugs": {
    "url": "https://github.com/HugoOliveiraThor/holiveira-design-system/issues"
  }
}
```

### C.2 CSS-Exporting Package (e.g., `@ho-dev/theme`)

```json
{
  "name": "@ho-dev/theme",
  "version": "1.0.0",
  "private": false,
  "type": "module",
  "license": "MIT",
  "publishConfig": {
    "access": "public",
    "provenance": true
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/HugoOliveiraThor/holiveira-design-system.git",
    "directory": "packages/theme"
  },
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./theme.css": {
      "import": "./dist/theme.css",
      "default": "./dist/theme.css"
    }
  },
  "sideEffects": ["*.css"],
  "files": ["dist", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsc && cp src/theme.css dist/"
  },
  "keywords": ["holiveira", "design-system", "react", "typescript", "theme"],
  "author": "Holiveira"
}
```

---

**ADS-010 — Release Architecture is frozen.**  
**20 architectural decisions. 8 sections. 3 appendices. 20 acceptance criteria. 18 risks. 8 freeze rules.**
