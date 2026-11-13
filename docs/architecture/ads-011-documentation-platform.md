# ADS-011 — Documentation Platform

**Specification status:** FROZEN (2026-11-13)  
**Submission status:** FROZEN (ARB, 2026-11-13)  
**Initiative:** M12 — Documentation Platform  
**Author:** Architecture governance process  
**Sponsor:** Repository owner  
**Approver:** Architecture Review Board (ARB)  
**Date:** 2026-11-10  
**Updated:** 2026-11-12  
**Submission:** `docs/governance/ads-011-arb-readiness-package.md` (ARB Submission Package)  
**Predecessors:** SPEC-GOVERNANCE-001, SPEC-IDENTITY-001, ADS-004, ADS-006, ADS-008, ADS-009,
ADS-010  
**Input:** Phase 0 repository audit (2026-11-10); sponsor decisions recorded in §4.5; six
sponsor-selected ARB recommendations recorded in §3.4, §3.6, §15, and §17

> **Status notice.** The ARB approved this document with observations on 2026-11-13, and the
> document was frozen on 2026-11-13 after the observation was resolved. Resolution: M11's exit
> criteria are recorded in the roadmap's Definition of Done (including ARB approval), and the
> public-release state is registered as **pre-release/unpublished** — the npm registry returns 404
> for `@ho-dev/primitives`, and the root README states `0.2.0` is not published. The DOC-3a
> amendment was appended to ADS-010 as a dated record under §12.1; DOC-3 remains verbatim. No
> implementation, dependency installation, or publication is authorized.

---

## Section 1 — Purpose

This specification defines M12 — Documentation Platform: a dedicated documentation application that
helps developers discover, evaluate, install, and use the public packages of the HO Design System.

The platform is not a replacement for Storybook, and it is not a promotion of the Playground into a
documentation product. It adds the layer that neither currently provides: task-oriented onboarding,
package and component discovery, installation guidance that reflects the real publication state,
curated usage guidance, and a stable public information architecture at `/docs/`.

The specification establishes:

1. the application boundary for `apps/docs`;
2. the relationship between the portal, Storybook, and the Playground;
3. the source-of-truth hierarchy for generated metadata and editorial content;
4. the public catalog rules for the 16 publishable packages and the exclusion of private packages;
5. the publication model for the existing GitHub Pages site;
6. the pre-release communication rules for packages that are not yet available on npm;
7. the accessibility, performance, security, and quality requirements for the portal;
8. the implementation phases and acceptance criteria that a future implementation plan must satisfy.

This ADS does **not** implement the platform. It creates no application, generator, page, workflow,
dependency, or package change.

---

## Section 2 — Scope

### 2.1 In Scope

- The architectural role and boundaries of `apps/docs`.
- Next.js App Router with static export as the documentation application technology.
- Workspace consumption of the public `@ho-dev/*` packages.
- A catalog of all 16 publishable packages.
- Full component pages for an explicitly defined core set, plus package and guide pages for the rest
  of the public surface.
- Direct rendering of real design-system components in documentation previews.
- A generated metadata layer derived from manifests, public barrels, TypeScript, CVA definitions,
  contracts, stories, and examples.
- A separate editorial layer for descriptions, usage guidance, accessibility notes, and related
  content.
- Information architecture, navigation, URLs, search, theming, and responsive behavior.
- The `/docs/` subpath on the existing GitHub Pages site.
- Pre-release messaging for packages that are publishable but not yet published.
- Quality requirements and validation gates.
- The proposed ADS-010 amendment and the proposed M12 roadmap update.
- Implementation phases and acceptance criteria for M12.

### 2.2 Out of Scope

- Implementing `apps/docs`, its pages, components, generator, or tests.
- Installing dependencies or adding packages to the workspace.
- Changing `package.json`, `pnpm-workspace.yaml`, `turbo.json`, or any workspace configuration.
- Changing Storybook, the Playground, or the consumer-test application.
- Changing package source code, public exports, component behavior, or package metadata.
- Publishing packages to npm or changing release automation.
- Replacing Storybook as the interactive API reference.
- Converting the Playground into the documentation portal.
- Documenting private packages as installable products.
- Multi-version documentation, localized documentation, user accounts, comments, analytics, or a
  server-side search service.
- A custom CMS or a content editing UI.
- A copy-paste distribution model. The portal may offer copyable examples, but packages remain the
  distribution unit.
- Reopening M10 or M11 scope. M12 consumes their outputs and does not redefine them.

### 2.3 Boundary With M11

**M11 — Open Source Readiness** remains a separate initiative. It owns public repository readiness,
community infrastructure, and the public release posture. M12 owns the documentation platform.

**Roadmap position (ARB-4, approved 2026-11-13):** M12 follows M11. M12 planning may begin after
ADS-011 is frozen, but implementation begins only after M11's exit criteria are recorded and its
public-release state is explicitly known. M12 MUST NOT describe npm installation as available until
the release state is explicitly updated by the release owner. This is required even if Storybook,
the Playground, and the repository are already public.

---

## Section 3 — Governance

### 3.1 Authority

This is an Architecture Design Session document under SPEC-GOVERNANCE-001. It defines WHAT the
documentation platform is and what constraints it must satisfy. SPEC-GOVERNANCE-001 defines HOW the
change is implemented, reported, audited, and approved.

The change is architectural because it introduces:

- a new application and a new consumer boundary in the monorepo;
- a new public deployment path on GitHub Pages;
- a new documentation architecture and a new source-of-truth pipeline;
- a change to the relationship between Storybook and the primary documentation surface.

Per SPEC-GOVERNANCE-001 §8.4, these are architectural milestones. ARB approval is mandatory before
implementation and at M12 closure.

### 3.2 Relationship to Predecessor Specifications

| Specification                      | Relationship                                                                                                                                                                                                                                                             | Effect of ADS-011                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| SPEC-GOVERNANCE-001                | Preserved. ADS-011 follows the mandatory workflow and validation tiers.                                                                                                                                                                                                  | No change to governance mechanics.                                                     |
| SPEC-IDENTITY-001                  | Preserved. The portal is part of the public documentation surface described by the identity specification.                                                                                                                                                               | No identity change. The portal must use the approved identity and tone.                |
| ADS-004 (Repository Automation)    | Extended only at implementation time. M12 may add `check:docs:*` and `test:docs` scripts following the existing colon-delimited convention. The metadata generator is invoked by the docs build or by the check script; M12 does not introduce a new root script prefix. | No change to script ownership rules. New scripts require implementation-plan approval. |
| ADS-006 (Storybook Excellence)     | Preserved. Storybook remains mandatory and remains the interactive API reference.                                                                                                                                                                                        | The portal links to Storybook; it does not replace or reconfigure it.                  |
| ADS-008 (Accessibility Excellence) | Applied to the new portal surface. The portal must meet the same accessibility expectations as the design system.                                                                                                                                                        | Adds portal-level accessibility acceptance criteria.                                   |
| ADS-009 (Performance Excellence)   | Applied to the portal as an application. Package size budgets remain unchanged.                                                                                                                                                                                          | Adds portal-level performance criteria without changing package budgets.               |
| ADS-010 (Release Architecture)     | Partially complemented. DOC-1, DOC-2, PUB-1, VER-1..4, REL-1..5, VAL-1..3, PRE-1..3, COM-1, ROA-1, CI-1..3 remain valid. DOC-3 has an additive DOC-3a amendment (A-1) approved on 2026-11-13; SPC-1 has a retirement/reuse note recorded in the same amendment record.   | See §15, the companion impact register, and the submission package.                    |
| Master Blueprint §1.12 and §2.4    | Preserved. Storybook remains the visual documentation channel for components.                                                                                                                                                                                            | The portal is a discovery and usage layer, not a custom component explorer.            |

### 3.3 Change Categories

| Work                                                                  | Category                  | Validation tier                     |
| --------------------------------------------------------------------- | ------------------------- | ----------------------------------- |
| ADS-011, ADS-010 impact register, ARB checklist, roadmap proposal     | Architecture / Governance | Documentation                       |
| `apps/docs` application, metadata generator, tests, build integration | Implementation            | Dependency / Build / Infrastructure |
| Portal editorial content and examples                                 | Documentation             | Documentation                       |
| Future `.gitignore` change to version governance documents            | Governance                | Documentation                       |
| Future Pages workflow change                                          | Infrastructure            | Dependency / Build / Infrastructure |

### 3.4 Identifier History and Reconciliation

**Observed fact.** ADS-010 SPC-1 records that ADS-010 absorbed the scope of a previously proposed
ADS-011 (Consumer Validation), ADS-012 (Documentation Standards), ADS-013 (Community), and ADS-014
(npm Standards). The earlier ADS-011 was absorbed into ADS-010; no standalone ADS-011 specification
is present in the repository.

**Observed fact.** Before this submission, no file named `ads-011-*` existed in the repository
history; the identifier appeared only in the ADS-010 SPC-1 record. The historical investigation is
in the ARB submission package §11.2.

**Sponsor-selected recommendation (ARB-1, approved 2026-11-13).** Formally retire the prior Consumer
Validation use of ADS-011 and reuse ADS-011 for the Documentation Platform. The proposed historical
record is:

> The previously proposed ADS-011 (Consumer Validation) was absorbed by ADS-010 and never became a
> standalone specification in this repository. Its identifier is retired. ADS-011 now designates the
> Documentation Platform (M12). This note preserves the historical reference in ADS-010 SPC-1; no
> prior ADS-010 text is deleted or rewritten.

This is a recommendation, not an ARB decision. The alternative remains available: renumber this
proposal to the next free identifier (likely ADS-015), or use a disambiguated identifier. ADS-011
MUST NOT be frozen until the ARB records its choice. No historical text in ADS-010 may be deleted.

### 3.5 Approval Path

```
Proposed (this document)
    ↓
ARB review
    ↓
Approved / Approved with Observations / Rejected
    ↓
Resolve observations
    ↓
Frozen
    ↓
Implementation plan approved
    ↓
M12 implementation phases
```

ADS-010 remains frozen and unchanged during this review. If the ARB approves the proposed DOC-3
amendment, the ADS-010 §12.1 procedure applies: append a dated amendment record; do not rewrite the
historical decision. The roadmap update follows the Governance change category and is applied only
after approval.

### 3.6 Architecture Decision Record Assessment

**Sponsor-selected recommendation (ARB-5, approved 2026-11-13):** no separate ADR is required.
ADS-011 records the M12 decisions as DOCP-1..22.

Evidence:

- SPEC-GOVERNANCE-001 §12.2 says ADRs document individual decisions, but does not require a separate
  ADR for every ADS.
- No tracked ADR file exists in the repository.
- The existing ADS-002 through ADS-010 are frozen without separate ADR files.
- A second record that restates DOCP-1..22 would duplicate the source of truth and create two
  documents that can drift.

If the ARB requires an ADR for a cross-cutting decision, it SHOULD be a short record that references
the relevant ADS-011 section (for example, DOCP-11 for the single Pages artifact) rather than
restating the architecture. The ARB may make an ADR a condition of approval; this proposal does not
assume one is required.

---

## Section 4 — Context and Problem

### 4.1 Current Documentation Surfaces

| Surface                                        | Current role                                | Strength                                              | Limitation                                                                                                        |
| ---------------------------------------------- | ------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Storybook at `/`                               | Interactive component reference and stories | Isolated states, controls, a11y panel, visual testing | Weak package onboarding, information architecture, editorial guidance, release state, and cross-package discovery |
| Playground at `/playground/`                   | Integrated product screens                  | Realistic composition and layout                      | Not a documentation product; no per-component pages, metadata, search, or installation model                      |
| Package READMEs                                | Per-package entry point                     | Close to the package; npm display                     | Inconsistent tiers; known drift; not a cohesive catalog                                                           |
| Contracts under `docs/architecture/contracts/` | Public API intent and ownership boundaries  | Authoritative, CI-checked against barrels             | Written for maintainers, not for first-time consumers                                                             |
| Root README                                    | Repository landing page                     | Identity, package table, quick start                  | Cannot carry per-component guidance; depends on downstream accuracy                                               |
| `docs/architecture/ads-010-release.md`         | Release architecture                        | Defines publication and documentation obligations     | Frozen; not a consumer-facing documentation product                                                               |

### 4.2 Problems Confirmed by Repository Inspection

The Phase 0 audit and direct inspection found the following. These are evidence of documentation
drift, not isolated typos.

| Problem                                        | Evidence                                                                                                                                                  | Consequence                                                                          |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Button documentation contradicts source        | `packages/primitives/README.md` says “6 variants, 3 shapes, 2 sizes”; `packages/primitives/src/button.tsx` defines 6 variants, 2 shapes, 2 sizes          | Consumers cannot trust README variant data                                           |
| UI documentation exposes a non-existent export | `packages/ui/README.md` imports `Breadcrumb` from `@ho-dev/ui`; `packages/ui/src/index.ts` does not export it; Breadcrumb belongs to `@ho-dev/primitives` | Copy-paste example fails                                                             |
| UI documentation uses a non-existent variant   | `packages/ui/README.md` uses `variant="outlined"`; `packages/ui/src/card.tsx` defines `default`, `bordered`, `ghost`                                      | Consumer uses an invalid API                                                         |
| UI README declares an absent peer              | `packages/ui/README.md` lists `next ^15`; `packages/ui/package.json` does not declare a `next` peer                                                       | Install guidance is misleading                                                       |
| Storybook introduction overstates the catalog  | `apps/storybook/stories/Introduction.mdx` says UI includes Breadcrumb and charts include Line; current barrels do not                                     | Discovery points to missing components                                               |
| Root README repeats the UI/Breadcrumb drift    | `README.md` describes `@ho-dev/ui` as “Breadcrumb, Card”                                                                                                  | Public landing page is inaccurate                                                    |
| Private packages are presented as installable  | All 20 READMEs contain `pnpm add`, including `@ho-dev/auth`, `@ho-dev/api`, `@ho-dev/db`, and `@ho-dev/testing`                                           | Users are invited to install packages that must not be published                     |
| Package publication state is ambiguous         | Public packages are `0.2.0` and `private: false`, but the root README states they are not yet published to npm                                            | `pnpm add` cannot be assumed to work                                                 |
| No machine-readable catalog exists             | No registry, props JSON, search index, or canonical example index was found                                                                               | Every documentation surface must be assembled by hand and drifts independently       |
| Prop descriptions are sparse                   | Public components export `*Props` types, but per-prop JSDoc is mostly absent; Storybook `argTypes` exist for only a subset of stories                     | A generated API table alone would be structurally correct but editorially incomplete |
| CVA exposes no runtime metadata                | The installed `class-variance-authority@0.7.1` does not expose `variants`, `defaultVariants`, or `variantKeys` at runtime                                 | Variant extraction must use static AST/type analysis, not runtime introspection      |
| Most governance documents are unversioned      | `.gitignore` ignores `/docs/*` except architecture contracts and the already-tracked ADS-010                                                              | New governance artifacts cannot be committed by default; see §4.3                    |

### 4.3 Documentation Versioning Constraint

**Observed fact.** The current `.gitignore` contains:

```
/docs/*
!/docs/architecture/
/docs/architecture/*
!/docs/architecture/contracts/
!/docs/architecture/contracts/**
reports
```

Only `docs/architecture/contracts/**` and the already-tracked `docs/architecture/ads-010-release.md`
are versioned. The roadmap, accessibility contracts, superpowers specifications, and reports are
local/untracked.

**Consequence.** A governance artifact created under an ignored path is not part of the repository
history and cannot be relied on by CI. ADS-011 cannot be considered versioned merely because it
exists on disk. The ARB must decide how the new governance artifacts are versioned (see the open
decisions register). This ADS does not modify `.gitignore`; that is a separate governance change.

The portal implementation has the same constraint: content that CI must build from MUST live in a
tracked path under `apps/docs`, or the versioning policy must be amended. The portal MUST NOT depend
on untracked `docs/accessibility/**` or `docs/roadmap/**` at build time.

### 4.4 Why a Dedicated Portal

Storybook answers “what states does this component have?”. The Playground answers “what does an
integrated screen look like?”. Neither answers, in one place:

- Which packages exist, which are public, and which are installable today?
- Which package owns a component, and what is its real import path?
- What is the smallest working example for this task?
- Which props are component-specific, which are variants, and which are inherited HTML attributes?
- Is this package published, pre-release, or private?
- What are the accessibility and composition constraints?
- Where is the source, the contract, the Storybook story, and a realistic Playground example?

The portal exists to answer those questions with generated facts and curated guidance. It is
inspired by the discovery and example-first experience of shadcn/ui documentation, but it does not
adopt a copy-paste distribution model. The packages remain independently versioned and installable.

### 4.5 Sponsor Decisions (Product Decisions, Not ARB Approval)

The sponsor approved the following for this proposal:

1. The initiative is **M12 — Documentation Platform**; M11 remains Open Source Readiness.
2. The architectural specification is **ADS-011 — Documentation Platform**.
3. ADS-011 must define the relationship among Storybook, Playground, and the portal, including the
   effect on ADS-010 DOC-3.
4. The future application is `apps/docs`, using Next.js App Router and static export.
5. The application consumes existing `@ho-dev/*` packages through workspace dependencies; it does
   not copy or duplicate package implementations.
6. The catalog covers all 16 public packages. Full component pages are delivered first for a defined
   core set.
7. The portal is published on the same GitHub Pages site under `/docs/`, preserving Storybook at `/`
   and the Playground at `/playground/`.
8. Metadata is generated from real repository sources; descriptions and editorial content are
   manually reviewed.
9. Packages not yet published on npm are presented as pre-release; `pnpm add` is not presented as
   currently functional.

These are product decisions. They are not an ARB verdict, and they do not freeze this specification.
The six sponsor-selected recommendations submitted to the ARB are recorded in
`docs/governance/ads-011-arb-readiness-package.md`; they are also not ARB approvals.

---

## Section 5 — Proposed Architecture

### 5.1 Architectural Principles

1. **Consumer, not fork.** `apps/docs` consumes public package barrels. It does not copy component
   implementations, styles, or types into the docs app.
2. **Generated facts, curated meaning.** Structural facts come from source. Explanations come from
   reviewed editorial content. Neither is allowed to invent the other.
3. **Static first.** The public artifact is static HTML/CSS/JS. Client JavaScript is limited to
   search, previews, theme switching, and interactive controls.
4. **One public site.** Storybook, Playground, and the portal share one GitHub Pages artifact and
   one deployment.
5. **No silent drift.** A metadata gate fails when the catalog and the source disagree.
6. **No private surface.** Private packages never enter the public catalog, search index, install
   snippets, or package selector.
7. **Storybook remains.** The portal links to Storybook; it does not absorb, replace, or rebuild it.
8. **Progressive delivery.** Each phase is independently verifiable and does not require a big-bang
   migration.

### 5.2 Application Boundary

```
apps/docs/
  package.json            private, not published
  next.config.ts          output: 'export', basePath, trailingSlash, transpilePackages
  tsconfig.json           extends ../../tsconfig.base.json
  postcss.config.mjs      Tailwind v4 PostCSS pipeline
  turbo.json              build.outputs: ["out/**"]
  src/
    app/                  App Router routes
    components/           docs shell, navigation, search, preview, code block
    content/              categories, editorial overlays, release state
    examples/             real component examples
    generated/            generated metadata (registry, API, search index)
```

The application is private (`"private": true`) and is not part of the npm publish set. It owns its
Next.js, React, and Tailwind development dependencies, following the consumer pattern already used
by the Playground. Public `@ho-dev/*` packages are referenced with `workspace:*` and listed in
`transpilePackages`.

**Proposed Next.js settings:**

```ts
output: 'export',
basePath: '/holiveira-design-system/docs',
trailingSlash: true,
transpilePackages: [/* public packages used by the portal */],
```

**Proposed Turbo settings:**

```json
{
  "tasks": {
    "build": {
      "outputs": ["out/**"]
    }
  }
}
```

The exact package list in `transpilePackages` is an implementation detail derived from actual
imports. Private packages MUST NOT appear in it.

### 5.3 Package Consumption Rules

- The docs app MUST import only from public package entry points (`@ho-dev/<package>`), never from
  `packages/<package>/src/**` or `dist/**` internals.
- The docs app MUST NOT import `@ho-dev/auth`, `@ho-dev/api`, `@ho-dev/db`, or `@ho-dev/testing`.
- The docs app MUST NOT require package source changes to render a preview.
- The docs app MUST NOT change package `exports`, peer dependencies, CSS exports, or build scripts.
- If a preview reveals a missing public export, the correct response is a separate package change
  under ADS governance, not a docs-side workaround.

### 5.4 Content Layers

The portal separates three layers that must not be conflated:

```
Repository facts
  package.json, public barrels, TypeScript, CVA/implementation, contracts, stories
        │
        ▼
Generated metadata
  package/component records, props, variants, exports, install metadata, search index
        │
        ▼
Editorial layer
  descriptions, when-to-use guidance, anatomy, a11y notes, related components, example selection
        │
        ▼
Rendered documentation
  routes, navigation, page sections, previews, code blocks, links
```

**Generated metadata** is authoritative for facts. **Editorial content** is authoritative for
explanation. Editorial content may reference a generated fact; it may not redefine it. If editorial
content names a prop, variant, export, package, or example that does not exist, the metadata gate
fails.

### 5.5 Relationship Among the Three Surfaces

| Surface                | Owns                                                                                                            | Public path    | Does not own                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------- |
| Storybook              | Interactive component states, controls, stories, a11y panel, interaction tests                                  | `/`            | Package onboarding, installation state, editorial guidance, portal navigation |
| Playground             | Integrated product screens, realistic composition, visual integration evidence                                  | `/playground/` | Per-component documentation, API tables, search, installation guidance        |
| Documentation Platform | Discovery, package catalog, onboarding, installation state, curated examples, API summaries, editorial guidance | `/docs/`       | Component state matrix, interactive controls, product demo                    |

**Storybook is preserved.** The portal may deep-link to a story or docs page, but the primary
preview is rendered directly in the portal. The Storybook iframe is not the primary preview
mechanism because it couples the portal to Storybook chrome, routing, theme state, and artifact
lifecycle.

**The Playground is preserved.** The portal links to relevant Playground screens as integration
examples. It does not embed the Playground as the docs shell.

### 5.6 Information Architecture

```
/docs/
  Getting Started
    Overview
    Installation
    Local development
    Theming
  Foundations
    Design tokens
    Theme and dark mode
    Styling and Tailwind
    Accessibility
  Components
    Primitives
    Composition
    Forms
    Charts
    Layouts
  Packages
    All 16 public packages
  Guides
    Provider composition
    Forms and validation
    Charts
    Application layouts
    Icons
  Architecture
    Package layers
    Dependency ownership
    Contracts
  Storybook
  Playground
```

The sidebar is generated from the registry, not hand-maintained. Category membership and ordering
are editorial data; package and component existence are generated facts.

### 5.7 Catalog Scope

**All 16 public packages** receive a package page:

`types`, `config`, `constants`, `tokens`, `utils`, `i18n`, `eslint`, `providers`, `hooks`, `icons`,
`primitives`, `theme`, `forms`, `charts`, `layouts`, `ui`.

**Core 12 full component pages** are delivered first:

| #   | Page           | Package              | Why it is core                                        |
| --- | -------------- | -------------------- | ----------------------------------------------------- |
| 1   | Button         | `@ho-dev/primitives` | Most-used entry point; variants, sizes, shapes, icons |
| 2   | Alert          | `@ho-dev/primitives` | Severity variants and composition                     |
| 3   | Badge          | `@ho-dev/primitives` | Status semantics and variants                         |
| 4   | InputGroup     | `@ho-dev/primitives` | Form-adjacent primitive with label, icon, error       |
| 5   | Table          | `@ho-dev/primitives` | Multi-part component and accessibility                |
| 6   | Dropdown       | `@ho-dev/primitives` | Interaction, keyboard, and composition                |
| 7   | Card           | `@ho-dev/ui`         | Composition, variants, subcomponents                  |
| 8   | PageHeader     | `@ho-dev/ui`         | Layout/composition pattern                            |
| 9   | Form and Field | `@ho-dev/forms`      | Validation, peers, and integration                    |
| 10  | AreaChart      | `@ho-dev/charts`     | Heavy client preview and lazy-loading proof           |
| 11  | Sidebar        | `@ho-dev/layouts`    | Responsive shell and mobile behavior                  |
| 12  | Header         | `@ho-dev/layouts`    | Responsive shell and composition                      |

The remaining public components receive package-level summaries, links to Storybook, and a page when
the package owner supplies reviewed editorial content. A component does not need a full page to be
discoverable, but every public component export must appear in the generated registry.

**Guides** cover installation, local development, theming, tokens, styling, accessibility, provider
composition, forms, charts, layouts, icons, and package architecture. `ThemeProvider` is documented
as a guide, not as a component page.

### 5.8 URL Model

| Route                                 | Content                               | Stability          |
| ------------------------------------- | ------------------------------------- | ------------------ |
| `/docs/`                              | Landing page and discovery            | Stable             |
| `/docs/getting-started/`              | Overview                              | Stable             |
| `/docs/getting-started/installation/` | Install/pre-release/local development | Stable             |
| `/docs/getting-started/theming/`      | ThemeProvider and dark mode           | Stable             |
| `/docs/foundations/tokens/`           | Token reference                       | Stable             |
| `/docs/foundations/styling/`          | Tailwind and CSS architecture         | Stable             |
| `/docs/foundations/accessibility/`    | Accessibility guidance                | Stable             |
| `/docs/components/`                   | Component index                       | Stable             |
| `/docs/components/<slug>/`            | Component page                        | Stable per slug    |
| `/docs/packages/`                     | Package index                         | Stable             |
| `/docs/packages/<package>/`           | Package page                          | Stable per package |
| `/docs/guides/<slug>/`                | Guide                                 | Stable per slug    |
| `/docs/architecture/`                 | Package layers and contracts          | Stable             |
| `/docs/changelog/`                    | Optional release notes                | Deferred           |

Slugs are explicit in the registry. A slug is never derived solely from a display title at request
time. Renaming a slug requires a compatibility plan; static export has no server redirects, so a
renamed page MUST either keep an alias route or be treated as a breaking documentation change.

### 5.9 Component Page Contract

Every full component page MUST contain:

1. **Header** — component name, package, status, one-sentence summary, source and Storybook links.
2. **Description** — what it is, when to use it, and when not to use it.
3. **Installation** — package install state (pre-release or published), package name, peer
   dependencies, and local workspace alternative.
4. **Preview** — a real component rendered from a real example file, with theme and viewport
   controls.
5. **Variants and states** — actual variants, sizes, shapes, and states extracted from source.
6. **Usage** — one minimal example and one realistic example, with copyable source.
7. **Props/API** — component-specific props, variant props, defaults, required/optional status, and
   a separated inherited-native-props section.
8. **Accessibility** — keyboard behavior, ARIA ownership, focus behavior, and known constraints,
   sourced from ADS-008 contracts and component implementation.
9. **Related components** — explicit editorial relationships, not automatically inferred guesses.
10. **References** — source path, contract, Storybook story, Playground screen, and package page.

A page that cannot satisfy a required section MUST show an explicit “not documented yet” state for
that section and MUST fail the metadata gate if the missing section is required for a core page.

### 5.10 Previews

**Decision:** render examples directly in the docs app, in a client boundary, using the real public
components and the real theme.

Rules:

- Each example is a real `.tsx` file under `apps/docs/src/examples/**`.
- The preview and the code block use the same example source; the source string is generated at
  build time, not duplicated by hand.
- Preview controls are limited to theme, viewport, and state selection. They are not a replacement
  for Storybook Controls.
- Heavy examples (charts, layouts, auth screens) are loaded lazily and are not rendered on the
  category index.
- A preview MUST NOT import private packages or package internals.
- A preview MUST NOT rely on a hidden global provider that the example does not declare.
- The portal MUST provide an “Open in Storybook” link for the corresponding story when one exists.
- The portal SHOULD provide an “Open in Playground” link when a realistic screen exists.

### 5.11 Navigation and Search

- Global header: product mark, docs navigation, search, theme toggle, Storybook, Playground, GitHub.
- Sidebar: generated categories with active-route state; collapsible on mobile.
- Breadcrumbs on every page.
- Previous/next navigation within a section.
- Search: static index generated from the registry; client-side filtering; keyboard shortcut `/` and
  `Cmd/Ctrl+K`; accessible combobox semantics; no network request.
- Search result fields: title, package, category, type, summary, keywords, URL.
- Search MUST index all public packages and all documented components; it MUST NOT index private
  packages.
- Empty search state and no-results state are explicit.

### 5.12 Styling

**Observed pattern.** The Playground imports the theme source and adds an app-level `@source` rule
so utilities used only by the app are generated:

```css
@import '../../../../packages/theme/src/theme.css';
@source '../../src/**/*.{ts,tsx}';
```

The docs app MUST follow the same pattern, or an equivalent verified pipeline, because:

- the theme package scans package sources, not `apps/docs`;
- docs-only utilities would otherwise be missing;
- importing only `@ho-dev/theme/theme.css` is not sufficient for app-local classes.

The portal MUST NOT fork the token values or the theme. It uses `@ho-dev/tokens` and `@ho-dev/theme`
as the source of truth.

### 5.13 Build and Deployment Boundary

The portal produces `apps/docs/out`. It does not produce a separate Pages site.

The future integration MUST preserve:

- Storybook at `/`;
- Playground at `/playground/`;
- Documentation Platform at `/docs/`;
- one uploaded Pages artifact rooted at `apps/storybook/storybook-static`.

The build order is defined in §7.3. This ADS does not change the workflow.

### 5.14 Testing Boundary

The portal needs four test layers:

| Layer         | What it proves                                                                              | Proposed location                           |
| ------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------- |
| Unit          | Registry lookup, metadata merge rules, slug generation, install-state selection             | `apps/docs/src/**/*.test.ts`                |
| Metadata gate | Generated artifacts match source; private packages excluded; all public packages catalogued | `scripts/check-docs-metadata.ts` (proposed) |
| Static export | Routes exist; `_next` assets use the `/docs` base path; no root-relative asset leaks        | `apps/docs/src/**/*.test.ts` or a Node test |
| End-to-end    | Navigation, search, preview, theme, copy, keyboard, a11y                                    | `apps/docs/e2e/**` with Playwright          |

The root Vitest configuration currently includes only package tests and Playground tests. M12 MUST
extend the include list to the docs app in the implementation phase. It MUST NOT rely on tests that
the root runner never executes.

---

## Section 6 — Source of Truth and Metadata Generation

### 6.1 Precedence

When sources disagree, the portal MUST fail closed and surface the conflict. It MUST NOT choose a
convenient value.

| Rank | Source                                       | Authoritative for                                                                              | Conflict behavior                                                                                                         |
| ---: | -------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
|    1 | `packages/*/package.json`                    | Package identity, version, private/public status, dependencies, peer dependencies, exports map | Highest for package metadata; a docs record that disagrees fails the gate                                                 |
|    2 | Public barrel (`src/index.ts`)               | The actual export set                                                                          | A documented export not in the barrel fails the gate; an export in the barrel but absent from the registry fails coverage |
|    3 | TypeScript source and emitted declarations   | Prop names, types, required/optional status, signatures, ref support                           | Generated; never hand-typed in the registry                                                                               |
|    4 | CVA definitions and component implementation | Variant names, options, defaults, compound variants, sizes, shapes                             | Extracted statically; missing/unsupported patterns are reported, not guessed                                              |
|    5 | Tracked architecture contracts               | Intended public API and ownership boundaries                                                   | If a contract and a barrel disagree, the gate fails and the package owner resolves it; the portal does not pick a side    |
|    6 | Storybook stories and Playground screens     | Examples, interaction evidence, visual references                                              | Used as evidence and links; never the source of prop or variant facts                                                     |
|    7 | Editorial overlay                            | Descriptions, when-to-use guidance, anatomy, a11y notes, related components, example selection | Cannot invent facts; references to missing facts fail the gate                                                            |
|    8 | Release-state input                          | Whether packages are published and which dist-tag is current                                   | Cannot be inferred from `private: false`; see §8                                                                          |

**Important distinction:** `private: false` means “publishable”, not “published”. The portal MUST
not treat the manifest alone as proof of npm availability.

### 6.2 Generation Rules

The generator (implemented in a later phase) reads the repository and writes deterministic JSON/TS
metadata. It MUST:

- read every public package manifest;
- read every public barrel;
- extract exported component and type names;
- extract component-specific props and mark inherited native attributes separately;
- extract CVA variants, options, defaults, and compound variants through static analysis;
- extract package peer dependencies and public CSS subpath exports;
- link to contracts by package;
- link to stories by stable story title/ID when available;
- link to examples by explicit example IDs;
- include the current release state;
- exclude private packages from all public artifacts;
- sort arrays and keys deterministically;
- emit a stable error for any package it cannot parse.

It MUST NOT:

- run a browser or Storybook to infer API data;
- read README prose as a source of API facts;
- infer variants from class names or CSS;
- treat inherited HTML attributes as the primary API;
- fabricate descriptions, defaults, or deprecation status;
- include private package names in the public search index;
- depend on network access.

### 6.3 Generated Record Model

The exact schema is an implementation detail, but it MUST carry at least:

```ts
interface PackageRecord {
  name: string;
  version: string;
  private: false;
  category: 'core' | 'foundation' | 'primitives' | 'composition';
  layer: 0 | 1 | 2 | 3;
  description: string; // editorial
  peers: PeerRecord[]; // generated
  exports: ExportRecord[]; // generated
  cssExports: string[]; // generated
  contractPath: string; // generated
  storybookUrl?: string; // generated/link
  releaseState: ReleaseState; // generated from release-state input
}

interface ComponentRecord {
  slug: string;
  name: string;
  package: string;
  exportName: string;
  kind: 'component' | 'hook' | 'utility' | 'type';
  summary: string; // editorial
  props: PropRecord[]; // generated structure + editorial descriptions
  variants: VariantRecord[]; // generated
  examples: ExampleRecord[]; // editorial selection + generated source
  a11y: A11yRecord; // editorial, sourced from contracts
  related: string[]; // editorial
  storybookId?: string; // generated/link
}
```

### 6.4 Props Rules

- The main props table contains component-specific props and variant props.
- Inherited native attributes are collapsed into a separate “Inherited props” section or link.
- Required and optional status comes from TypeScript.
- Defaults come from destructuring/CVA defaults only when statically provable; otherwise the table
  says “not specified”.
- `forwardRef` support is stated explicitly.
- Deprecated props are shown only if the source has a deprecation marker.
- A prop without a reviewed description is marked “Description pending” and fails the core-page
  gate; it is not filled with generic prose.
- The docs MUST NOT claim a prop exists because Storybook controls show it; Storybook args are not
  the API.

### 6.5 Variant Rules

- Variant names and options come from CVA definitions.
- `defaultVariants` are shown.
- Compound variants are listed only when they change the rendered result in a user-meaningful way.
- Sizes, shapes, and tones are modeled as variant groups, not as free-form prose.
- A variant that exists only in a story but not in source is not documented.
- The docs MUST NOT infer a variant from a CSS class name.
- If static extraction cannot resolve a CVA expression, the generator fails with the file and line.

### 6.6 Installation Metadata

For each public package, the registry carries:

- package name;
- current version;
- peer dependencies;
- public CSS subpaths;
- publication state;
- install mode (`local-workspace`, `pre-release`, `published`);
- the command that is valid in that mode.

The generator MUST NOT print a `pnpm add` command as currently valid when the release state is
pre-release. It may show a clearly labeled “After publication” command.

### 6.7 Private Package Exclusion

Private packages are excluded from:

- the package catalog;
- the component catalog;
- the search index;
- install snippets;
- the package selector;
- cross-package recommendations;
- generated JSON consumed by the public app.

A test MUST assert that no `private: true` package name appears in the public generated artifacts. A
generic “architecture” page may explain that server packages exist, but it MUST NOT present them as
installable.

### 6.8 Editorial Overlay

Editorial content lives in a separate, reviewable layer (for example
`apps/docs/src/content/overrides.ts` and guide pages). It owns:

- package and component summaries;
- when to use / when not to use;
- anatomy and composition guidance;
- accessibility guidance sourced from ADS-008 contracts;
- related-component relationships;
- selection of which examples are shown;
- migration notes and caveats.

It does not own:

- package names, versions, visibility, peers;
- export existence;
- prop names, types, required/optional status;
- variant names/options;
- install state.

Editorial content that contradicts generated facts is a gate failure.

### 6.9 Drift Gate

A future gate, proposed as `check:docs:metadata`, MUST run the generator in read-only `--check` mode
and fail when:

- a public package has no registry entry;
- a private package appears in a public artifact;
- a documented export does not exist in the barrel;
- a barrel export is absent from the registry;
- a documented prop or variant does not exist;
- a documented example file is missing;
- an install command does not match the release state;
- the committed generated artifacts differ from a fresh generation;
- a core page is missing a required section;
- a docs route references a missing registry slug.

The gate is a quality gate (`check:*`), owned by the root, read-only, and suitable for `all-checks`.
It follows the existing token-generation precedent (`generate:tokens` + `check:tokens`).

### 6.10 Failure Handling

- A metadata failure blocks the docs build and the gate. It is not downgraded to a warning.
- A source parse failure reports the package, file, and construct that could not be resolved.
- A contract/barrel conflict is reported to the package owner; the portal does not hide it.
- A missing editorial description on a non-core component may be a warning with an explicit
  “description pending” UI state, but a missing structural fact is always an error.
- Generated artifacts are rebuilt, never hand-edited. A hand edit is detected by `--check`.

---

## Section 7 — Publication Model

### 7.1 Public Paths

| Path           | Artifact                             | Owner             |
| -------------- | ------------------------------------ | ----------------- |
| `/`            | Storybook static build               | `apps/storybook`  |
| `/playground/` | Playground static export             | `apps/playground` |
| `/docs/`       | Documentation Platform static export | `apps/docs`       |

The repository is a GitHub project site, so the full URL prefix is `/holiveira-design-system/`. The
docs app base path is therefore `/holiveira-design-system/docs`.

### 7.2 Single Artifact

The deployment MUST remain one GitHub Pages artifact:

```
apps/storybook/storybook-static/
  index.html
  iframe.html
  assets/
  sb-*/
  playground/
    index.html
    _next/
    ...
  docs/
    index.html
    _next/
    ...
```

This preserves:

- one Pages environment;
- one custom domain or project URL;
- one deployment workflow;
- one cache/invalidation surface;
- existing links to `/` and `/playground/`.

Multiple Pages sites, multiple artifacts, or a separate docs domain are rejected for M12. They add
routing, DNS, certificate, and cross-site consistency problems without solving a current need.

### 7.3 Build Order

The Storybook build cleans `storybook-static`. Therefore the order is mandatory:

```text
1. pnpm run build
   - builds packages
   - builds apps/docs/out (if docs has a build script)
   - builds apps/playground/out
2. pnpm run build:storybook
   - produces apps/storybook/storybook-static
3. copy apps/playground/out/. -> storybook-static/playground/
4. copy apps/docs/out/.       -> storybook-static/docs/
5. upload storybook-static
```

The Playground and docs copies MUST happen after step 2. Copying before the Storybook build loses
both subpaths.

If the docs app is not yet part of `pnpm run build`, step 1 must explicitly build it before step 2.
The implementation plan must choose one ordering and test it.

### 7.4 Base Path and Assets

The docs app MUST set:

```ts
basePath: '/holiveira-design-system/docs';
trailingSlash: true;
```

The static export test MUST assert:

- `apps/docs/out/index.html` exists;
- route directories contain `index.html` because `trailingSlash` is true;
- every `src`/`href` referencing `/_next/` starts with `/holiveira-design-system/docs/_next/`;
- no root-relative `/_next/` reference leaks;
- links to `/`, `/playground/`, and Storybook are correct;
- `docs` assets do not resolve to the domain root.

This mirrors the existing Playground export test but uses the docs base path.

### 7.5 Deployment Validation

Before changing the workflow, a local static-server smoke test MUST prove:

- `/` serves Storybook;
- `/playground/` serves the Playground;
- `/docs/` serves the docs home;
- a deep docs route resolves with trailing slash;
- assets load with the full base path;
- no 404s for CSS, JS, fonts, or images.

Only then may the Pages workflow be updated. The workflow change is a separate implementation phase
and requires its own validation evidence.

### 7.6 No Workflow Change in This ADS

This specification defines the target deployment shape but does not modify
`.github/workflows/pages.yml`. The current workflow remains authoritative until the implementation
phase is approved.

---

## Section 8 — Pre-Release and Publication State

### 8.1 Current State

**Observed on 2026-11-10:**

| Fact                        | Value                                                                          |
| --------------------------- | ------------------------------------------------------------------------------ |
| Public/publishable packages | 16                                                                             |
| Version of public packages  | `0.2.0`                                                                        |
| Private packages            | 4: `@ho-dev/auth`, `@ho-dev/api`, `@ho-dev/db`, `@ho-dev/testing`              |
| Root README status          | “Pre-release… not yet published to npm”                                        |
| Release workflow            | `workflow_dispatch` manual publish; no evidence of a completed npm publication |
| Storybook/Playground        | Deployed on GitHub Pages                                                       |
| npm availability            | Not established by repository evidence                                         |

The portal MUST treat npm availability as unknown/unpublished until an explicit release state says
otherwise.

### 8.2 Presentation Rules

When the release state is `pre-release`:

- show a persistent, page-level banner: “Pre-release — packages are not yet published to npm”;
- show the current version (`0.2.0`) and the publication state;
- show local workspace/development instructions;
- do not show an active `pnpm add` command;
- if a future install command is shown, label it “After publication” and visually separate it;
- do not show npm badges as if they resolve;
- link to the repository and Storybook for current usage.

When the release state is `published`:

- show the install command generated from the package name and current dist-tag;
- show peer dependencies;
- show CSS import paths;
- keep the pre-release banner off;
- do not claim a package is published unless the release state says so.

### 8.3 Release-State Input

Publication cannot be derived from `private: false`. The portal MUST read a single explicit release
state, maintained by the release owner, for example:

```ts
type ReleaseState = {
  status: 'pre-release' | 'published';
  distTag: 'next' | 'latest';
  publishedAt: string | null;
  packageVersions: Record<string, string>;
};
```

The exact file location is an implementation detail. The architecture requires:

- one source, not per-page flags;
- a release owner responsible for updating it;
- a gate that checks every public package version in the state matches its manifest;
- no network lookup at build time;
- no automatic “published” inference from a version number.

The current release path in ADS-010 PRE-1..3 and the `.specs` AD-005 decision (`0.2.x` on `next`
first) must be respected when the state flips.

### 8.4 Install Modes

| Mode              | Condition                                     | UI                                                                        |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| `local-workspace` | Pre-release, repository contributor           | Show clone/install/build/dev commands; no npm claim                       |
| `pre-release`     | A prerelease dist-tag is explicitly published | Show `pnpm add @ho-dev/<pkg>@<tag>` with the tag and a prerelease warning |
| `published`       | GA dist-tag is `latest`                       | Show `pnpm add @ho-dev/<pkg>` and peer install guidance                   |

The portal MUST NOT show a GA command while the state is pre-release or prerelease.

### 8.5 Transition Procedure

When packages are published:

1. release owner confirms registry availability and dist-tag;
2. release state is updated in a reviewed change;
3. metadata gate verifies versions and commands;
4. docs are rebuilt and deployed;
5. banner changes from pre-release to published;
6. README and Storybook links are checked for consistency.

The portal does not publish packages and does not change release automation.

---

## Section 9 — Security, Accessibility, and Quality

### 9.1 Accessibility

The portal MUST meet WCAG 2.2 AA for its own shell and content:

- semantic landmarks: header, nav, main, complementary, contentinfo;
- one `h1` per page and a logical heading order;
- skip link to main content;
- visible focus indicators;
- keyboard-operable navigation, search, theme toggle, copy buttons, and preview controls;
- no keyboard traps;
- sufficient color contrast in light and dark themes;
- reduced-motion support for transitions and previews;
- accessible names for icon-only controls;
- live-region announcements for copy success and search result counts;
- form controls with labels and descriptions;
- no ARIA that contradicts native semantics.

Component previews inherit the component’s accessibility contract. The portal must not “fix” a
component’s semantics in the docs shell in a way that hides a real issue. If a component has a known
accessibility limitation, the page states it and links to the relevant ADS-008 contract.

### 9.2 Keyboard Navigation

- Tab order follows visual order.
- Mobile sidebar is a modal/disclosure with focus management.
- Search is a combobox with arrow-key navigation, Escape to close, Enter to open.
- Code copy is a button, not a clickable `div`.
- Preview controls are reachable and labeled.
- “Open in Storybook” and “Open in Playground” are normal links.
- No custom key handler may override browser or assistive-technology shortcuts.

### 9.3 Responsiveness

- Supported widths: 375px through 1440px and beyond.
- Sidebar collapses to a drawer below the desktop breakpoint.
- Tables scroll horizontally without breaking the page layout.
- Code blocks wrap or scroll, never overflow the viewport.
- Preview frames resize without clipping interactive components.
- The page remains usable at 200% zoom.

### 9.4 Search

- Static index only; no server, no third-party search service.
- The index is generated from the registry.
- Private packages are excluded.
- Search is keyboard accessible and announces result counts.
- Search MUST work with JavaScript disabled only to the extent that navigation remains usable; the
  docs content itself must be server-rendered/static.
- A missing index is a build failure, not an empty search box.

### 9.5 Performance

Proposed targets, to be baselined in M12.1 and enforced in M12.6:

| Metric                           | Target                                     |
| -------------------------------- | ------------------------------------------ |
| Shell JavaScript                 | ≤ 150 KB gzip (proposed)                   |
| Search index                     | ≤ 100 KB gzip (proposed)                   |
| LCP on a mid-tier mobile profile | ≤ 2.5 s                                    |
| CLS                              | ≤ 0.1                                      |
| INP                              | ≤ 200 ms                                   |
| Preview loading                  | No category index loads all heavy examples |

Rules:

- Server components by default; client boundaries only for search, theme, previews, and copy.
- Charts and large layouts are dynamically imported.
- The landing page does not import every package.
- Fonts are local or system; no render-blocking third-party font request.
- No analytics or third-party scripts in v1.

### 9.6 Metadata Integrity

- Generated artifacts are deterministic and sorted.
- `--check` mode fails on any difference.
- Hand-edited generated files are detected.
- The gate runs in CI before deployment.
- A docs page cannot render a component that is absent from the registry.
- A registry entry cannot point to a missing example or route.

### 9.7 Private Package Protection

- Private packages are filtered at generation time, not hidden with CSS.
- The public search index is generated from the filtered registry.
- A test inspects the generated public artifacts for private package names.
- The docs app's `transpilePackages` and imports are checked by a boundary test.
- A build failure occurs if a private package is imported.

### 9.8 GitHub Pages and Static Export Compatibility

- No server runtime, API routes, middleware, ISR, or dynamic server rendering.
- No `next/image` optimization that requires a server; use static assets or `unoptimized` where
  appropriate.
- No route that depends on request headers, cookies, or query-time data.
- `basePath` and `trailingSlash` are explicit.
- All internal links are generated from the base path.
- The docs app does not assume it owns the domain root.
- The docs app does not overwrite Storybook or Playground paths.

### 9.9 Security

- No secrets, database access, auth, or server packages in the docs app.
- No `dangerouslySetInnerHTML` for editorial content; MDX/TSX is compiled at build time from trusted
  repository content.
- External links use safe `rel` attributes where appropriate.
- No remote iframes as the primary preview; Storybook/Playground links open the existing site.
- No user-generated content.
- Dependency additions follow ADS-003b ownership and require review; the docs app does not become a
  dependency owner for design-system domains.
- The public artifact contains only content intended for public consumption.

### 9.10 Content Quality

- Every core page has a reviewed description, usage guidance, and accessibility note.
- Every example compiles and renders.
- Every code block is copyable and matches the example source.
- Every page has a source link and a Storybook link where applicable.
- No placeholder “Lorem ipsum” content is published.
- “Description pending” is allowed only outside the core set and is visibly marked.
- Editorial content uses the project’s language and identity standards.

---

## Section 10 — Architectural Decisions

| ID      | Decision                  | Resolution                                                                                                                     | Rationale                                                                                                                                                                  |
| ------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DOCP-1  | Application location      | Create `apps/docs` as a private workspace application.                                                                         | The workspace already includes `apps/*`; a private app keeps docs out of the npm publish set and separates documentation from packages.                                    |
| DOCP-2  | Application technology    | Next.js App Router with `output: 'export'`.                                                                                    | The Playground and consumer-test already prove Next 16 static export, base paths, and Tailwind v4 in this repository. A new framework adds risk without a current benefit. |
| DOCP-3  | Package consumption       | Consume public `@ho-dev/*` packages with `workspace:*` and `transpilePackages`; never copy implementations.                    | Keeps one implementation of each component and validates the real public API.                                                                                              |
| DOCP-4  | Public/private boundary   | Catalog only the 16 publishable packages; exclude all `private: true` packages from public artifacts.                          | Prevents users from installing server/testing packages that are not distributed.                                                                                           |
| DOCP-5  | Preview strategy          | Render real examples directly in the docs app; use Storybook links as secondary references.                                    | Direct rendering gives control over theme, viewport, code/preview parity, and page composition; iframe-first couples the portal to Storybook.                              |
| DOCP-6  | Metadata strategy         | Generate structural metadata; keep editorial descriptions in a separate reviewed layer.                                        | Fully manual docs drift; fully generated docs cannot explain intent. The hybrid keeps facts correct and prose accountable.                                                 |
| DOCP-7  | Source precedence         | `package.json` → public barrel → TypeScript → CVA/implementation → contracts → stories/examples → editorial → release state.   | Matches the repository’s actual sources of truth and makes conflicts explicit.                                                                                             |
| DOCP-8  | Component page contract   | Every core page includes header, description, installation, preview, variants, usage, API, accessibility, related, references. | Gives the catalog a predictable, testable shape.                                                                                                                           |
| DOCP-9  | Catalog scope             | All 16 public packages receive pages; the core 12 components receive full pages first.                                         | Meets the sponsor’s catalog requirement without pretending that every component has equal editorial maturity.                                                              |
| DOCP-10 | Search                    | Static, generated, client-filtered index; no external search service.                                                          | Static export cannot rely on a server; a small index is sufficient for this catalog and preserves privacy.                                                                 |
| DOCP-11 | Deployment shape          | One GitHub Pages artifact with `/`, `/playground/`, and `/docs/`.                                                              | Preserves existing URLs and infrastructure; avoids multiple domains/artifacts.                                                                                             |
| DOCP-12 | Build order               | Build docs and Playground before Storybook; copy both into `storybook-static` after the Storybook build.                       | The Storybook build cleans its output directory. Copying earlier loses the subpaths.                                                                                       |
| DOCP-13 | Pre-release communication | Use an explicit release-state input; do not treat `private: false` as published.                                               | The repository currently has publishable packages that are not published.                                                                                                  |
| DOCP-14 | Metadata validation       | Add a read-only `check:docs:metadata` gate with `--check` mode.                                                                | Makes drift a CI failure instead of a review-time hope.                                                                                                                    |
| DOCP-15 | Tests                     | Extend Vitest to the docs app and add static-export, Playwright, and axe coverage.                                             | Tests that the root runner does not execute provide false confidence.                                                                                                      |
| DOCP-16 | Styling                   | Import theme source and add app-level `@source`, following the Playground pattern.                                             | Utilities used only in the docs app are outside the theme’s package-source scan.                                                                                           |
| DOCP-17 | Storybook relationship    | Storybook remains the interactive API reference; the portal links to it and does not replace it.                               | Preserves ADS-006 and DOC-3’s durable intent while adding the missing discovery layer.                                                                                     |
| DOCP-18 | Playground relationship   | The Playground remains an integration demo; the portal links to it and does not absorb it.                                     | The Playground proves composition; converting it would damage that role.                                                                                                   |
| DOCP-19 | Content versioning        | Docs content required by CI lives under `apps/docs` and is versioned; the portal does not build from untracked docs.           | SPEC-GOVERNANCE-001 §2.3 requires documentation as code.                                                                                                                   |
| DOCP-20 | No package/API changes    | M12 does not change package exports, APIs, behavior, metadata, or publishing.                                                  | Documentation must describe the system, not become a backdoor API change.                                                                                                  |
| DOCP-21 | Identifier reconciliation | Do not freeze ADS-011 until the historical ADS-011/SPC-1 conflict is resolved.                                                 | Preserves traceability and avoids a silent identifier reuse.                                                                                                               |
| DOCP-22 | Approval sequencing       | ADS-011 must be approved/frozen before implementation; ADS-010 amendment and roadmap update follow their own approval steps.   | SPEC-GOVERNANCE-001 §2.2 and ADS-010 §12.1.                                                                                                                                |

---

## Section 11 — Alternatives and Trade-offs

### 11.1 Storybook-Only

**Proposal:** expand Storybook with MDX pages for installation, package overviews, and guides.

**Why rejected:** Storybook is optimized for component states and controls, not for package
onboarding, catalog search, installation state, or a documentation information architecture. Heavy
MDX expansion would couple the public docs experience to Storybook upgrades and make the sidebar a
mix of stories and product documentation. Storybook remains the interactive reference.

### 11.2 Playground as Portal

**Proposal:** add documentation routes and prose to `apps/playground`.

**Why rejected:** the Playground is an integration demo. It has no registry, no per-component
metadata, no docs navigation, and no publication-state model. Converting it would compromise its
role as realistic composition evidence and mix product demo code with documentation code.

### 11.3 Astro / Starlight

**Proposal:** use Astro with Starlight for a docs-first stack.

**Why rejected for M12:** Astro is a strong documentation stack, but it introduces a new framework,
a new build pipeline, a new React integration path, and a new styling proof. The repository already
has two Next static-export consumers. The documentation problem is information architecture and
metadata, not the rendering framework. Revisit only if Next proves unable to meet the docs
requirements.

### 11.4 Docusaurus

**Proposal:** use Docusaurus, which is React-based and docs-oriented.

**Why rejected:** Docusaurus brings its own routing, versioning, theming, and build conventions.
Live design-system previews and Tailwind v4 integration would require additional adapters. It is
heavier than needed for a catalog whose components already exist as React packages.

### 11.5 VitePress

**Proposal:** use VitePress.

**Why rejected:** Vue-based; the design system is React. Embedding every preview would require React
islands and an additional integration layer.

### 11.6 Iframe-First Previews

**Proposal:** render each preview as a Storybook iframe.

**Why rejected:** iframe-first makes the portal dependent on Storybook’s artifact, sidebar, theme
state, and URL scheme. Code/preview synchronization, viewport control, and page performance become
harder. Storybook links remain available for users who want controls and isolated states.

### 11.7 Fully Manual Documentation

**Proposal:** hand-write every page from READMEs and contracts.

**Why rejected:** the repository already demonstrates README drift. Manual docs would reproduce it
at a larger scale and provide no drift gate.

### 11.8 Fully Generated Documentation

**Proposal:** generate every page, including descriptions, from TypeScript and contracts.

**Why rejected:** generated structure is reliable; generated prose is not. Prop descriptions are
sparse, CVA exposes no runtime metadata, and contracts are written for maintainers. A generated page
without editorial review would be technically populated and practically unhelpful.

### 11.9 Multiple Pages Artifacts

**Proposal:** deploy docs as a separate Pages site or repository.

**Why rejected:** it creates separate URLs, deployments, certificates, and cross-site navigation. It
also risks breaking the existing Storybook and Playground paths. One artifact preserves the current
public contract.

### 11.10 Docs as a Package

**Proposal:** publish the docs app or a docs package.

**Why rejected:** documentation is a consumer application, not a distributable package. Publishing
it would add a release surface and couple docs deployment to npm.

---

## Section 12 — Risks and Mitigation

|    # | Risk                                                                              | Probability | Impact   | Mitigation                                                                                                                    |
| ---: | --------------------------------------------------------------------------------- | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
|  R-1 | ADS-011 identifier collides with the historical ADS-011 recorded in ADS-010 SPC-1 | High        | High     | Resolve before freeze; recommend explicit retirement note (Option A) or renumber.                                             |
|  R-2 | ADS-010 DOC-3 is interpreted as forbidding a second documentation surface         | Medium      | High     | Propose a narrow amendment that preserves Storybook as interactive API reference and adds the portal as discovery/onboarding. |
|  R-3 | New governance docs are ignored by `.gitignore` and never versioned               | High        | High     | Decide versioning policy before commit; keep docs content in a tracked path; do not rely on untracked files in CI.            |
|  R-4 | Pages copy order deletes `/docs/` or `/playground/`                               | Medium      | High     | Copy after `build:storybook`; test the exact order; assert all three paths in a local static server.                          |
|  R-5 | Docs asset URLs resolve to the domain root and 404                                | Medium      | High     | Full `basePath`; export test for `/_next/` prefix; no root-relative assets.                                                   |
|  R-6 | Existing Playground workflow tests fail on a docs copy step                       | High        | Medium   | Update the tests in the same phase; add docs assertions; do not weaken existing assertions.                                   |
|  R-7 | Metadata drifts from source                                                       | High        | High     | Generated artifacts + `--check` gate; no hand-edited generated files.                                                         |
|  R-8 | CVA/TypeScript extraction misses a variant or prop                                | Medium      | Medium   | Static AST analysis with explicit parse failures; allowlist only reviewed exceptions; no guessing.                            |
|  R-9 | Editorial content invents a prop or variant                                       | Medium      | High     | Gate validates editorially referenced facts; review checklist.                                                                |
| R-10 | Private package leaks into the public catalog/search                              | Low         | Critical | Filter at generation; boundary test; inspect generated artifacts.                                                             |
| R-11 | Pre-release packages are presented as npm-installable                             | High        | High     | Single release-state input; pre-release banner; no active `pnpm add`; gate checks state.                                      |
| R-12 | Docs duplicate Storybook and become a second stale API source                     | Medium      | Medium   | Storybook owns interactive states; portal owns discovery/usage; both derive from source; cross-link, don’t clone controls.    |
| R-13 | Docs app CSS misses app-only utilities                                            | Medium      | Medium   | Import theme source and `@source`; visual regression of docs shell.                                                           |
| R-14 | Docs build is too heavy or slow for CI                                            | Medium      | Medium   | Lazy previews; no all-package landing import; Turbo caching; budget gate.                                                     |
| R-15 | Docs tests never run under the root Vitest include                                | High        | Medium   | Extend `vitest.config.ts` in the implementation phase; add a test that asserts the include.                                   |
| R-16 | Storybook deep links are unstable                                                 | Medium      | Low      | Generate from stable story IDs; fall back to Storybook root; link check.                                                      |
| R-17 | Docs pages are inaccessible                                                       | Medium      | High     | WCAG 2.2 AA requirements; axe + keyboard e2e; review with assistive technology.                                               |
| R-18 | Release-state flag is forgotten after publishing                                  | Medium      | High     | Release checklist; metadata gate compares versions; owner assigned.                                                           |
| R-19 | Docs app becomes a backdoor for package API changes                               | Low         | High     | DOCP-20; boundary test; package changes require separate ADS.                                                                 |
| R-20 | Content maintenance collapses after launch                                        | High        | High     | Assign ownership per package; generated coverage gate; “description pending” visibility; phase-based content plan.            |

---

## Section 13 — Implementation Phases (Future Work)

This section defines the implementation sequence for a future plan. None of it is executed by this
ADS.

| Phase                | Objective                                          | Main deliverables                                                                          | Acceptance evidence                                                    |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| M12.0 — Governance   | Approve this ADS and its amendments                | ADS-011, ADS-010 impact register, ARB checklist, open decisions, roadmap proposal          | ARB verdict; no code                                                   |
| M12.1 — Foundation   | Create a buildable, private docs app               | `apps/docs` manifest, Next config, TS config, PostCSS, Turbo output, basePath, empty shell | Static `out/` builds; basePath test; no package changes                |
| M12.2 — Metadata     | Generate the catalog and API structure             | Generator, generated registry/API/search artifacts, `check:docs:metadata`, unit tests      | All 16 public packages represented; private excluded; `--check` passes |
| M12.3 — Shell        | Build the docs navigation and discovery shell      | Layout, header, sidebar, breadcrumbs, search, theme toggle, mobile drawer                  | Routes render; search works; axe/keyboard smoke; export test           |
| M12.4 — Core pages   | Prove the full page contract on the core 12        | Component page template, preview, code block, props table, a11y section, examples          | All core sections; previews compile; copy works; visual/a11y tests     |
| M12.5 — Full catalog | Cover all public packages and remaining components | Package pages, guide pages, remaining component summaries, related links                   | All 16 package pages; no undocumented public export; gate passes       |
| M12.6 — Deployment   | Integrate `/docs/` into the single Pages artifact  | Pages copy step, workflow tests, static smoke, README/docs links                           | `/`, `/playground/`, `/docs/` all served; existing URLs preserved      |
| M12.7 — Closure      | Full validation and ARB review                     | All checks, docs e2e/a11y, size/perf evidence, architecture audit                          | `all-checks` green; ARB approval at M12 closure                        |

Each phase must be its own branch created from the latest `origin/main`; branches are not reused.
Each phase must produce an implementation report, an architecture audit, and validation evidence.
The final phase is an architectural milestone and requires ARB approval.

**Authorization boundary (ARB-6, approved 2026-11-13):** approval of ADS-011 authorizes only M12.1
planning. It does not authorize creating `apps/docs`, installing dependencies, changing code or
workflows, or publishing the application. Planning approval, plan approval, implementation
authorization, and publication authorization are four separate decisions. Implementation requires
explicit subsequent authorization from the user after the M12.1 plan is approved; publication
requires a separate release authorization.

---

## Section 14 — Acceptance Criteria for M12

| #      | Criterion                                                                        | Category      |
| ------ | -------------------------------------------------------------------------------- | ------------- |
| M12-1  | ADS-011 approved and frozen before implementation                                | Governance    |
| M12-2  | `apps/docs` exists as a private workspace app and builds a static `out/`         | Architecture  |
| M12-3  | Docs base path is `/holiveira-design-system/docs` and assets use it              | Deployment    |
| M12-4  | The catalog contains all 16 public packages                                      | Metadata      |
| M12-5  | No private package appears in the public catalog, search, or install snippets    | Security      |
| M12-6  | The core 12 component pages satisfy the page contract                            | Content       |
| M12-7  | Every public component export appears in the registry                            | Metadata      |
| M12-8  | Previews are real components rendered directly, with copyable source             | Content       |
| M12-9  | Props and variants are generated from source; inherited HTML props are separated | Metadata      |
| M12-10 | Editorial descriptions are reviewed and do not override generated facts          | Content       |
| M12-11 | Pre-release state is explicit and `pnpm add` is not presented as currently valid | Publication   |
| M12-12 | Search is static, keyboard accessible, and excludes private packages             | UX            |
| M12-13 | Navigation, breadcrumbs, and URL model match this specification                  | UX            |
| M12-14 | Portal meets WCAG 2.2 AA for shell and content                                   | Accessibility |
| M12-15 | Responsive behavior works from 375px to 1440px and at 200% zoom                  | UX            |
| M12-16 | Docs tests run under the root runner; e2e/axe pass                               | Quality       |
| M12-17 | `check:docs:metadata` fails on drift and passes on the approved tree             | Quality       |
| M12-18 | `apps/docs/out` is copied into `storybook-static/docs` after the Storybook build | Deployment    |
| M12-19 | `/`, `/playground/`, and `/docs/` all work from one local artifact               | Deployment    |
| M12-20 | Existing Storybook and Playground URLs are preserved                             | Deployment    |
| M12-21 | `pnpm run all-checks` passes with the docs additions                             | Quality       |
| M12-22 | ARB approves M12 closure                                                         | Governance    |

---

## Section 15 — Relationship to ADS-010

ADS-010 remains frozen and authoritative. This section summarizes the proposed relationship; the
decision-by-decision assessment and exact amendment text live in
`docs/architecture/ads-011-ads-010-impact.md`.

| ADS-010 decision                           | Status under ADS-011                                      | Explanation                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DOC-1 — Package README tiers               | Preserved                                                 | The portal links to package READMEs; it does not replace their tiered role.                                                                                                                                                                                                                                                                                                                                |
| DOC-2 — Root README                        | Preserved                                                 | M11 owns the root README; M12 adds a portal link after approval.                                                                                                                                                                                                                                                                                                                                           |
| DOC-3 — Storybook as primary docs          | **Preserved — additive DOC-3a approved (ARB 2026-11-13)** | Storybook remains the interactive API reference for states, stories, and technical component documentation at `/`. The portal becomes the primary discovery, onboarding, installation, and usage surface at `/docs/`. The Playground remains the integration demonstration and experimentation surface at `/playground/`. DOC-3 is preserved verbatim; a dated DOC-3a row is appended under ADS-010 §12.1. |
| PUB-1 — Publish set                        | Preserved                                                 | The portal consumes the same 16 public packages; private packages remain excluded.                                                                                                                                                                                                                                                                                                                         |
| PUB-2..5 — Exports, CSS, files, provenance | Preserved                                                 | The portal imports public entry points and CSS subpaths; no package metadata change.                                                                                                                                                                                                                                                                                                                       |
| VER-1..4 — Versioning                      | Preserved                                                 | The portal displays independent package versions; it does not change versioning.                                                                                                                                                                                                                                                                                                                           |
| REL-1..5 — Release pipeline                | Preserved                                                 | The portal does not publish packages or change release automation.                                                                                                                                                                                                                                                                                                                                         |
| VAL-1..3 — Consumer validation             | Preserved                                                 | Docs tests are additional; they do not replace consumer validation.                                                                                                                                                                                                                                                                                                                                        |
| PRE-1..3 — Prerelease strategy             | Preserved                                                 | The portal reflects the prerelease state and dist-tags.                                                                                                                                                                                                                                                                                                                                                    |
| COM-1 — Community files                    | Preserved                                                 | No change.                                                                                                                                                                                                                                                                                                                                                                                                 |
| ROA-1 — M10/M11 merge                      | Preserved                                                 | M12 is a new milestone; it does not reopen M10/M11.                                                                                                                                                                                                                                                                                                                                                        |
| CI-1..3 — Release CI                       | Preserved                                                 | Docs deployment is on Pages, not the release workflow.                                                                                                                                                                                                                                                                                                                                                     |
| SPC-1 — Related specifications             | **Conflict requiring reconciliation**                     | ADS-010 records a prior proposed ADS-011 (Consumer Validation) that was absorbed. This document reuses ADS-011. The ARB must resolve the identifier before freeze.                                                                                                                                                                                                                                         |
| §12.1 — Amendment procedure                | Applied                                                   | If approved, append a dated amendment to ADS-010; do not rewrite the frozen text.                                                                                                                                                                                                                                                                                                                          |
| Freeze rules                               | Preserved                                                 | No package publish set, versioning, exports, CSS, or release change.                                                                                                                                                                                                                                                                                                                                       |

**Proposed DOC-3 clarification (summary):** Storybook is the interactive API reference for component
states, stories, and technical component documentation; the Documentation Platform is the primary
discovery, onboarding, installation, and usage surface; the Playground is the integration
demonstration and experimentation surface. The portal does not replace Storybook or the Playground.
Package READMEs link to Storybook and the portal. The exact additive DOC-3a text is in the impact
register §4.6 and the submission package §6.2.

**What ADS-011 does not do:** it does not edit ADS-010, does not rewrite or supersede the frozen
DOC-3 row, and does not claim that the proposed DOC-3a addendum is already in force.

---

## Section 16 — Freeze Rules

The following rules are binding:

1. **Storybook remains.** The portal MUST NOT remove, replace, or reconfigure Storybook as the
   interactive API reference.
2. **Playground remains.** The portal MUST NOT convert the Playground into the docs shell or remove
   its integration-demo role.
3. **One Pages artifact.** `/`, `/playground/`, and `/docs/` MUST be served from one artifact unless
   a new ADS approves a different deployment.
4. **Public packages only.** Private packages MUST NOT enter the public catalog, search, install
   snippets, or package selector.
5. **Generated facts win.** Editorial content MUST NOT override package identity, exports, props,
   variants, peers, or publication state.
6. **Pre-release truth.** The portal MUST NOT claim npm availability without an explicit release
   state.
7. **No package API changes through docs.** If a preview needs a new export or behavior, that is a
   separate package change under ADS governance.
8. **Metadata gate required.** A docs build without a passing metadata gate is not releasable.
9. **No silent ADS-010 changes.** DOC-3 amendments follow ADS-010 §12.1 and preserve history.
10. **No untracked build inputs.** CI MUST NOT build public docs from gitignored content.
11. **Docs tests must run.** A test that the root runner does not include is not evidence.
12. **Identifier resolution before freeze.** The ADS-011/SPC-1 conflict must be resolved.

---

## Section 17 — Approval Request

The ARB is asked to decide the six submission items recorded in
`docs/governance/ads-011-arb-readiness-package.md`:

| ID    | Decision                 | Sponsor-selected recommendation                                                                                                            |
| ----- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| ARB-1 | ADS-011 identifier       | Retire the prior Consumer Validation use with a historical note and reuse ADS-011.                                                         |
| ARB-2 | ADS-010 DOC-3            | Adopt the additive Amendment A-1 (DOC-3a), preserving DOC-3 verbatim and distinguishing Storybook, Documentation Platform, and Playground. |
| ARB-3 | Governance versioning    | Adopt a narrow `.gitignore` allowlist for the ADS-011/M12 artifacts and the official roadmap (ARB-3a).                                     |
| ARB-4 | M12 roadmap              | Place M12 after M11, with entry/exit criteria.                                                                                             |
| ARB-5 | ADR                      | Dispense with a separate ADR; ADS-011 is the decision record.                                                                              |
| ARB-6 | Implementation authority | Authorize only M12.1 planning; no implementation or publication is authorized.                                                             |

**ARB verdict (2026-11-13): Approved with Observations** for ARB-1 through ARB-6. **The document was
frozen on 2026-11-13** after the observation was resolved. No implementation may begin on the
strength of this approval, and freezing does not authorize creating `apps/docs`, installing
dependencies, changing code or workflows, or publishing the application. Those actions require
explicit subsequent authorization from the user after the M12.1 plan is approved, and publication
requires a separate release authorization.

**Observation resolved (2026-11-13):** M11's exit criteria are recorded in the roadmap's Definition
of Done (including ARB approval); the public-release state is registered as pre-release/unpublished
(npm registry 404 for `@ho-dev/primitives`; root README `0.2.0`). M12 must present packages as
pre-release, and implementation still requires explicit authorization.

---

## Section 18 — References

- `docs/superpowers/specs/architecture-governance-workflow.md` — SPEC-GOVERNANCE-001
- `docs/architecture/ads-010-release.md` — Release Architecture (frozen)
- `docs/architecture/ads-006-storybook-excellence.md` — Storybook Excellence
- `docs/architecture/ads-008-accessibility-excellence.md` — Accessibility Excellence
- `docs/architecture/ads-009-performance.md` — Performance Excellence
- `docs/superpowers/specs/project-identity.md` — Public identity and documentation principles
- `docs/architecture/master-blueprint.md` — Storybook and documentation architecture
- `docs/architecture/contracts/` — Package contracts
- `apps/playground/next.config.ts` — Static export and base-path precedent
- `apps/playground/src/app/globals.css` — Theme source and `@source` precedent
- `docs/governance/ads-011-arb-readiness-package.md` — ARB submission package
- `docs/governance/ads-011-open-decisions.md` — Open decisions register
- `.github/workflows/pages.yml` — Current single-artifact deployment
- `README.md` — Current pre-release status

---

## Appendix A — Proposed Directory Layout

```text
apps/docs/
├── package.json
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── turbo.json
├── playwright.config.ts
├── e2e/
│   └── docs.spec.ts
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── getting-started/
    │   ├── foundations/
    │   ├── components/
    │   │   ├── page.tsx
    │   │   └── [slug]/page.tsx
    │   ├── packages/
    │   │   ├── page.tsx
    │   │   └── [package]/page.tsx
    │   ├── guides/
    │   └── architecture/
    ├── components/
    │   ├── docs-shell.tsx
    │   ├── sidebar.tsx
    │   ├── search.tsx
    │   ├── preview.tsx
    │   ├── code-block.tsx
    │   └── props-table.tsx
    ├── content/
    │   ├── categories.ts
    │   ├── overrides.ts
    │   └── release-state.ts
    ├── examples/
    │   ├── button/basic.tsx
    │   └── ...
    └── generated/
        ├── registry.json
        ├── api.json
        └── search-index.json
```

This is a proposed layout, not an implementation. Exact file names may change in the implementation
plan without changing the architecture, provided the boundaries in §5 remain intact.

## Appendix B — Proposed Metadata Pipeline

```text
packages/*/package.json
packages/*/src/index.ts
packages/*/src/**/*.tsx
packages/*/src/**/*.stories.tsx
docs/architecture/contracts/*.md
apps/docs/src/examples/**/*.tsx
apps/docs/src/content/overrides.ts
apps/docs/src/content/release-state.ts
        │
        ▼
scripts/generate-docs-metadata.ts
        │
        ├── registry.json
        ├── api.json
        ├── search-index.json
        └── coverage report
        │
        ▼
apps/docs (static export)
```

The generator is not implemented by this ADS.

## Appendix C — Proposed Page Inventory

| Page                                  | Type      | Priority |
| ------------------------------------- | --------- | -------- |
| `/docs/`                              | Landing   | P0       |
| `/docs/getting-started/`              | Guide     | P0       |
| `/docs/getting-started/installation/` | Guide     | P0       |
| `/docs/getting-started/theming/`      | Guide     | P0       |
| `/docs/foundations/tokens/`           | Reference | P1       |
| `/docs/foundations/styling/`          | Guide     | P1       |
| `/docs/foundations/accessibility/`    | Guide     | P1       |
| `/docs/components/`                   | Index     | P0       |
| 12 core component pages               | Component | P0       |
| Remaining component pages             | Component | P1       |
| 16 package pages                      | Package   | P0       |
| `/docs/guides/forms/`                 | Guide     | P1       |
| `/docs/guides/charts/`                | Guide     | P1       |
| `/docs/guides/layouts/`               | Guide     | P1       |
| `/docs/guides/icons/`                 | Guide     | P1       |
| `/docs/architecture/`                 | Reference | P1       |

## Appendix D — Open Decisions

The companion `docs/governance/ads-011-open-decisions.md` records the decisions that require ARB or
sponsor resolution. The six submission decisions are:

1. ARB-1 — ADS-011 identifier retirement/reuse;
2. ARB-2 — DOC-3 additive Amendment A-1 (DOC-3a);
3. ARB-3 — governance versioning allowlist;
4. ARB-4 — M12 after M11;
5. ARB-5 — no separate ADR;
6. ARB-6 — planning authority only.

Other open items (core set confirmation, release-state ownership, search dependency, visual
regression scope, closure vs npm publication, and `/docs/` launch timing) remain in the register.

---

**End of ADS-011.**  
**Status: FROZEN (2026-11-13). No implementation performed.**
