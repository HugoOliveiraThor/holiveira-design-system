# M12 — Documentation Platform (Proposed Roadmap Update)

**Specification status:** FROZEN (2026-11-13)  
**Submission status:** FROZEN (ARB, 2026-11-13)  
**Parent proposal:** `docs/architecture/ads-011-documentation-platform.md`  
**ARB submission package:** `docs/governance/ads-011-arb-readiness-package.md`  
**Target roadmap:** `docs/roadmap/engineering-execution-roadmap.md`  
**Date:** 2026-11-10  
**Updated:** 2026-11-13  
**Author:** Architecture governance process  
**Approver:** Architecture Review Board (ARB)

> **Applied 2026-11-13 under the ARB verdict.** The engineering roadmap now defines 12 milestones,
> with M11 = Open Source Readiness and M12 = Documentation Platform. This document remains the
> traceability record; it does not reuse M11 and does not mark M12 complete.

---

## 1. Decision Requested

The ARB is asked to approve the addition of:

**M12 — Documentation Platform**

as a new milestone after M11, with:

- a dependency on an approved/frozen ADS-011;
- a public-release-state dependency for npm installation claims;
- the deliverables and acceptance criteria in §5–§6;
- no change to M10 or M11 scope.

The roadmap update is a Governance change. It is applied only after the ARB approves ADS-011 and
this proposal.

---

## 2. Why a New Milestone

The existing roadmap already assigns:

- **M10 — Release Pipeline**;
- **M11 — Open Source Readiness**.

M11 includes documentation as part of public readiness, but its documentation deliverables are
root/package READMEs, a migration guide, and the public Storybook link. It does not define:

- a dedicated documentation application;
- a generated package/component registry;
- a component page contract;
- a publication-state-aware installation model;
- a `/docs/` deployment path;
- a docs-specific metadata gate and test suite.

Adding those to M11 would silently expand an already-defined milestone and blur its completion
criteria. M12 keeps the documentation platform independently reviewable, testable, and closable.

**M11 is preserved.** M12 consumes M11’s outputs (public repository posture, READMEs, community
files, Storybook deployment) but does not redefine them. M12 does not reopen M10 or M11.

---

## 3. Current Roadmap Facts

The existing roadmap states:

- 11 sequential milestones;
- M11 = Open Source Readiness;
- M10 → M11 as the final chain;
- total effort 45–62 days;
- success criteria numbered 1–11, ending with “Repository is publicly accessible with community
  infrastructure (M11)”;
- recommended execution order ending with “M11 — always last.”

Those statements must be updated only after approval. This proposal provides the exact additive
changes.

**Current-state caveat:** the roadmap marks many M11 items complete, but the root README still says
the packages are pre-release and not published to npm. M12 must not assume that M11’s public-release
outcome is complete. The portal’s release state is the authority for install messaging.

---

## 4. Proposed Roadmap Changes

### 4.1 Dependency Graph

Current final chain:

```text
M10 → M11
```

Proposed:

```text
M10 → M11 → M12
              ↑
         ADS-011 approval
```

`ADS-011` is a governance input, not a milestone. M12 planning must not start before the ADS is
frozen; implementation must not start before M11's exit criteria are recorded and its public-release
state is explicitly known. Public installation claims additionally require an explicit release
state; M12 can be implemented in pre-release mode before npm publication.

### 4.2 Milestone Overview Row

Add after M11:

| #   | Milestone              | Effort | Depends On                                           | Blocks |
| --- | ---------------------- | ------ | ---------------------------------------------------- | ------ |
| M12 | Documentation Platform | 10–15d | ADS-011; M11 public-release state for install claims | —      |

**Total effort:** 45–62 days becomes **55–77 days**, using the existing total plus the indicative
M12 range. The implementation plan refines the estimate.

### 4.3 Dependency Narrative

Add to the roadmap’s dependency section:

> **M12 (Documentation Platform)** depends on an approved/frozen ADS-011 and consumes the public
> package surface stabilized by M10/M11. It may be planned before M11 closes, but implementation
> begins only after M11’s exit criteria are recorded and its public-release state is explicitly
> known. It MUST present packages as pre-release until the release owner updates the portal’s
> release state. It does not change M10 or M11 scope.

### 4.4 Success Criteria

Append criterion 12:

> 12. The repository has a public documentation platform at `/docs/` that catalogs all 16 public
>     packages, documents the core component set, and preserves Storybook at `/` and the Playground
>     at `/playground/`.

### 4.5 Recommended Execution Order

Append:

> 12. **M12** — after ADS-011 approval and after M11’s exit criteria are recorded and its
>     public-release posture is known. Implement in pre-release mode if npm publication is not
>     complete; flip the release state only when the release owner confirms publication.

### 4.6 Entry and Exit Criteria

**Planning entry criteria:**

1. ADS-011 is approved/frozen.
2. The governance versioning policy for the submission artifacts is applied.
3. The release-state owner is identified.
4. No blocking package, release, or contract issue is open.

**Implementation entry criteria (in addition to planning):**

1. M11’s Definition of Done is recorded and its public-release state is explicitly known.
2. The M12 implementation plan is approved separately.

**Exit criteria for M12:**

1. All M12 acceptance criteria in ADS-011 §14 are satisfied.
2. The Documentation Platform is available at `/docs/`.
3. All 16 public packages are catalogued.
4. The core 12 component pages satisfy the page contract.
5. Private packages are absent from public artifacts.
6. `/`, `/playground/`, and `/docs/` work from one Pages artifact.
7. Docs tests and the metadata gate pass.
8. The ARB approves M12 closure.

**Boundary:** M11 owns repository public readiness, READMEs, community files, and Storybook
deployment. M12 owns the portal. M12 does not reopen M10/M11.

---

## 5. Proposed M12 Section

The following section is written in the roadmap’s existing style. It is proposed text, not an
applied edit.

````markdown
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
````

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

```

---

## 6. Mapping to ADS-011

| ADS-011 section | Roadmap deliverable |
|---|---|
| §5 Architecture, §5.12 Styling | D12.1 |
| §6 Source of truth, §6.9 Gate | D12.2 |
| §5.6–5.11 IA, navigation, search, previews | D12.3 |
| §5.7 Core 12, §5.9 Page contract | D12.4 |
| §5.7 Full catalog, §5.6 Guides | D12.5 |
| §7 Publication model | D12.6 |
| §9 Quality, §14 Acceptance criteria | D12.7 |

This mapping is traceability, not a substitute for ADS-011.

---

## 7. Exact Application Instructions (Applied 2026-11-13)

Applied on 2026-11-13 under the ARB verdict.

1. In `docs/roadmap/engineering-execution-roadmap.md`, update the executive summary count from 11 to
   12 milestones.
2. Add the M12 row to “Milestone Overview” after M11.
3. Add M12 to the dependency graph and dependency narrative.
4. Append the full “Milestone 12 — Documentation Platform” section after M11.
5. Add success criterion 12.
6. Add M12 to “Recommended Execution Order.”
7. Update the total effort from 45–62 days to 55–77 days, or to the estimate approved by the ARB.
8. Update any “11 milestones” or “M11 is last” language.
9. Do not change M10 or M11 definitions.
10. Record the roadmap change as a Governance change with its own audit trail.

---

## 8. Impact on Existing Roadmap Content

| Existing content | Impact |
|---|---|
| M10 — Release Pipeline | None. |
| M11 — Open Source Readiness | None. M12 is additive. |
| “M10 → M11” final chain | Becomes “M10 → M11 → M12.” |
| 11 milestones | Becomes 12. |
| 45–62 days total | Becomes 55–77 days, or the approved estimate. |
| Success criteria 1–11 | Criterion 12 is appended. |
| “M11 — always last” | Replaced by M12 as the last milestone, after M11. |
| M11 documentation deliverables | Unchanged; M12 adds the portal, not a README rewrite. |

---

## 9. What This Proposal Does Not Do

- It did not edit the roadmap before approval; the M12 section was applied on 2026-11-13.
- It does not create `apps/docs`.
- It does not install dependencies.
- It does not change workflows.
- It does not change Storybook or the Playground.
- It does not change package APIs, exports, versions, or publishing.
- It does not claim M11 is complete or incomplete.
- It does not mark M12 complete.

---

## 10. Open Decisions

**Selected for ARB submission:** M12 is placed after M11. The remaining roadmap questions are:

1. Is the 10–15 day estimate acceptable?
2. Does M12 close before or after npm publication?
3. Is the core 12 set correct for the first release?
4. Who owns the release-state update after publication?
5. Should the official roadmap be updated only after M11 is formally closed, or as soon as ADS-011 is
   approved?

These are recorded in `docs/governance/ads-011-open-decisions.md`; the placement recommendation is
ARB-4, approved 2026-11-13.

---

## 11. Verdict

**Frozen (2026-11-13); applied to the roadmap.** The roadmap now has 12 milestones; M11 remains Open
Source Readiness and M12 follows it.

**Applied 2026-11-13.** The official roadmap contains the M12 section, overview row, dependency
narrative, success criterion 12, and execution-order entry. The observation (M11 exit criteria and
public-release state) was resolved as pre-release/unpublished; implementation still requires explicit
authorization.

---

**End of M12 roadmap proposal.**
```
