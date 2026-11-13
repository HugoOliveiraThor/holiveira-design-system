# ADS-011 — Impact Assessment on ADS-010 and Related Contracts

**Specification status:** FROZEN (2026-11-13)  
**Submission status:** FROZEN (ARB, 2026-11-13)  
**Parent proposal:** `docs/architecture/ads-011-documentation-platform.md`  
**Target specification:** `docs/architecture/ads-010-release.md` (FROZEN)  
**Date:** 2026-11-10  
**Updated:** 2026-11-12  
**Submission package:** `docs/governance/ads-011-arb-readiness-package.md`  
**Author:** Architecture governance process  
**Approver:** Architecture Review Board (ARB)

> **No silent modification.** This document does not edit ADS-010. It records what ADS-011 would
> preserve, complement, or require the ARB to change. ADS-010 remains frozen and authoritative until
> an amendment is approved and appended under its own §12.1 procedure.

---

## 1. Purpose

This assessment exists because ADS-011 introduces a second documentation surface and a new public
deployment path. ADS-010 already defines documentation architecture and release obligations. The ARB
needs a precise answer to four questions:

1. Which ADS-010 decisions remain valid without change?
2. Which decisions are complemented by ADS-011?
3. Which decisions require an amendment?
4. Which related contracts, specifications, and governance artifacts are affected?

The assessment intentionally separates **preserved**, **complemented**, **amended**, and
**conflicting** items. It does not treat “the user approved the portal” as “the ARB approved an
ADS-010 change.”

---

## 2. Method

The assessment reads ADS-010 decision by decision, including:

- VER-1..4 (versioning);
- PUB-1..5 (publishing);
- REL-1..5 (release pipeline);
- VAL-1..3 (consumer validation);
- PRE-1..3 (prerelease);
- DOC-1..3 (documentation);
- COM-1 (community);
- CI-1..3 (release CI);
- ROA-1 (roadmap structure);
- SPC-1 (related specifications);
- §11 freeze rules, §12 amendment procedure, §13 validation.

It then compares those decisions with the architecture proposed in ADS-011 and with the current
repository state. The comparison uses four classifications:

| Classification   | Meaning                                                                                                                             |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Preserved**    | ADS-011 does not change the decision; no ADS-010 amendment is needed.                                                               |
| **Complemented** | The decision remains valid, but ADS-011 adds a new surface or obligation that must be read alongside it.                            |
| **Amended**      | The decision text or scope must change for the two specifications to be consistent. Requires ARB approval and an ADS-010 amendment. |
| **Conflict**     | Two statements cannot both be true without a decision. Requires explicit ARB resolution.                                            |

---

## 3. Summary

| ADS-010 area                               | Classification                                            | Short conclusion                                                                                                             |
| ------------------------------------------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| VER-1..4 — Versioning                      | Preserved                                                 | Portal displays independent versions; no versioning change.                                                                  |
| PUB-1 — Publish set                        | Preserved                                                 | Same 16 public packages; 4 private packages remain out.                                                                      |
| PUB-2..5 — Exports, CSS, files, provenance | Preserved                                                 | Portal consumes public entry points and CSS subpaths; no package metadata change.                                            |
| REL-1..5 — Release pipeline                | Preserved                                                 | Portal does not publish packages or alter release automation.                                                                |
| VAL-1..3 — Consumer validation             | Preserved                                                 | Docs tests are additional; consumer validation remains mandatory.                                                            |
| PRE-1..3 — Prerelease strategy             | Preserved                                                 | Portal reflects the prerelease state and dist-tags.                                                                          |
| DOC-1 — README tiers                       | Preserved                                                 | Portal links to READMEs; it does not replace their tiered role.                                                              |
| DOC-2 — Root README                        | Preserved                                                 | M11 owns the root README; M12 adds a link later.                                                                             |
| DOC-3 — Storybook as primary docs          | **Preserved — additive DOC-3a approved (ARB 2026-11-13)** | Storybook remains interactive API reference; portal becomes discovery/onboarding/usage; Playground remains integration demo. |
| COM-1 — Community files                    | Preserved                                                 | No change.                                                                                                                   |
| CI-1..3 — Release CI                       | Preserved                                                 | Docs deployment is a Pages concern, not a release-pipeline concern.                                                          |
| ROA-1 — M10/M11 merge                      | Preserved                                                 | M12 is a new milestone; it does not reopen M10/M11.                                                                          |
| SPC-1 — Related specifications             | **Conflict**                                              | ADS-010 records a prior ADS-011 (Consumer Validation) that was absorbed; this proposal reuses the identifier.                |
| §11 freeze rules                           | Preserved                                                 | No package publish/versioning/exports/CSS change.                                                                            |
| §12 amendment procedure                    | Applied                                                   | If approved, append a dated amendment; do not rewrite history.                                                               |

**Bottom line:** ADS-011 does not require a broad rewrite of ADS-010. It requires one documentation
clarification (DOC-3), one identifier reconciliation (SPC-1), and an explicit statement that the
release and publishing decisions remain untouched. The identifier conflict is the more serious
governance issue because it undermines traceability.

---

## 4. Decision-by-Decision Assessment

### 4.1 Versioning (VER-1..4)

| Decision                                  | Classification | Assessment                                                                                                              |
| ----------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| VER-1 — Independent semver                | Preserved      | The portal displays each package’s independent version. It does not synchronize versions or require a monorepo release. |
| VER-2 — Changesets                        | Preserved      | The portal does not change the versioning tool.                                                                         |
| VER-3 — Public access                     | Preserved      | The portal consumes public packages only and does not change access mode.                                               |
| VER-4 — Internal dependency update policy | Preserved      | No package dependency change.                                                                                           |

**Effect:** None. The portal must not imply a single product version. It should display package
versions individually and avoid a single “HO Design System version” that contradicts independent
semver.

### 4.2 Publishing (PUB-1..5)

| Decision                           | Classification | Assessment                                                                                                                            |
| ---------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| PUB-1 — 16 publish, 4 private      | Preserved      | The catalog uses the same split. `@ho-dev/auth`, `@ho-dev/api`, `@ho-dev/db`, and `@ho-dev/testing` remain out of the public catalog. |
| PUB-2 — Exports point to `./dist/` | Preserved      | The portal imports public package entry points; it does not introduce `./src/` exports.                                               |
| PUB-3 — CSS exports                | Preserved      | The portal imports public CSS subpaths where needed; it does not change the CSS copy mechanism.                                       |
| PUB-4 — Package files              | Preserved      | No tarball change.                                                                                                                    |
| PUB-5 — Provenance                 | Preserved      | No release change.                                                                                                                    |

**Effect:** The portal must be a consumer of the published/public API shape. It must not require
source-only imports or a new export just to render documentation. If a missing export is discovered,
that is a separate package change under ADS governance.

### 4.3 Release Pipeline (REL-1..5)

| Decision                          | Classification | Assessment                                                        |
| --------------------------------- | -------------- | ----------------------------------------------------------------- |
| REL-1 — Automated changesets flow | Preserved      | The portal does not publish and does not change the release flow. |
| REL-2 — Concurrency               | Preserved      | No workflow change.                                               |
| REL-3 — Commit convention         | Preserved      | No release commit change.                                         |
| REL-4 — Git tags                  | Preserved      | No tag change.                                                    |
| REL-5 — GitHub Releases           | Preserved      | No release change.                                                |

**Observed current-state note:** the checked-in `.github/workflows/release.yml` is a manual
`workflow_dispatch` publish workflow, while ADS-010 REL-1 and `.specs` AD-002 describe an automated
changesets flow. That discrepancy is an M10/M11 release concern. ADS-011 does not resolve it and
must not depend on either interpretation. The portal’s release-state input is independent of the
release workflow’s current implementation.

### 4.4 Consumer Validation (VAL-1..3)

| Decision                               | Classification | Assessment                                                                       |
| -------------------------------------- | -------------- | -------------------------------------------------------------------------------- |
| VAL-1 — Permanent consumer test app    | Preserved      | The docs app is not a replacement for `apps/consumer-test`.                      |
| VAL-2 — Six validation dimensions      | Preserved      | No change.                                                                       |
| VAL-3 — Validation gate before publish | Preserved      | Docs tests do not replace install/SSR/RSC/tree-shaking/CSS/isolation validation. |

**Effect:** M12 adds docs-specific validation (`check:docs:metadata`, export tests, e2e/a11y). These
are additional gates. They do not weaken or replace the consumer validation architecture.

### 4.5 Prerelease Strategy (PRE-1..3)

| Decision                  | Classification | Assessment                                                             |
| ------------------------- | -------------- | ---------------------------------------------------------------------- |
| PRE-1 — Beta → RC → 1.0.0 | Preserved      | The portal reflects the current stage; it does not change the path.    |
| PRE-2 — Dist-tags         | Preserved      | The portal reads the current dist-tag from release state and shows it. |
| PRE-3 — `next` deferred   | Preserved      | The portal does not introduce a new dist-tag.                          |

**Effect:** The portal must not assume `latest` exists. At the time of this proposal, the repository
shows public package versions `0.2.0` and a root README stating they are not yet published. The
portal’s default state must therefore be pre-release.

### 4.6 Documentation (DOC-1..3)

#### DOC-1 — Package README tiers: Preserved

ADS-010 defines Full, Compact, and Minimal README tiers. ADS-011 does not replace them.

- Package pages link to the package README.
- The portal does not absorb the README’s role as the package-level npm entry point.
- The portal may surface the same generated facts, but the README remains the package-local
  document.
- A future README correction is still owned by the package/M11 work, not by the docs portal.

#### DOC-2 — Root README: Preserved

ADS-010 requires the root README to match SPEC-IDENTITY-001. M11 owns that work.

- M12 may add a Documentation Platform link to the root README after the portal exists.
- M12 does not rewrite the root README as part of the portal implementation.
- If the root README already links to Storybook and the Playground, the future change is additive.

#### DOC-3 — Storybook as primary docs: Proposed Additive Amendment A-1 (DOC-3a)

**Current text (ADS-010 §4.6, preserved verbatim):**

```
| DOC-3 | Storybook as primary docs | **Storybook is the interactive API reference.** MUST be deployed to GitHub Pages for v1.0. Package READMEs MUST link to individual Storybook pages. | Storybook is already built and tested. GitHub Pages deployment is free. Chromatic/Vercel MAY be evaluated in v1.1. |
```

**What remains valid:**

- Storybook is the interactive API reference.
- Storybook MUST remain deployed on GitHub Pages.
- Package READMEs MUST link to Storybook.
- Storybook is not replaced by the portal.

**What needs clarification:**

The label “Storybook as primary docs” and the phrase “primary docs” can be read as “the only
documentation surface.” ADS-011 adds a second public documentation surface at `/docs/`. Both cannot
be the sole primary surface. The durable intent is better expressed as:

- Storybook = primary **interactive API reference**;
- Documentation Platform = primary **discovery, onboarding, installation, and usage** surface;
- Playground = integration demo;
- package READMEs = package-local entry points.

This is a complement, not a rejection of Storybook. The amendment is additive: it keeps the DOC-3
row verbatim and appends one dated row, DOC-3a, without deleting or rewriting any frozen text. It
does not remove Storybook or weaken its deployment obligation.

**Approved Amendment A-1 (additive; applied as a dated record on 2026-11-13):**

Append this row after DOC-3; do not modify DOC-3:

```markdown
| DOC-3a | Documentation Platform (supplement to DOC-3) | **A separate `apps/docs` portal at
`/docs/` is the primary surface for package discovery, onboarding, installation, and usage
guidance.** Storybook remains the interactive API reference for component states, stories, and
technical component documentation, and MUST stay deployed at the GitHub Pages root. The Playground
at `/playground/` remains the integration demonstration and experimentation surface. Package READMEs
MUST link to Storybook and the Documentation Platform. The Documentation Platform does not replace
Storybook or the Playground. | The portal adds the discovery and editorial layer Storybook does not
own; it does not remove Storybook or change its deployment. |
```

**Why the additive form:** the frozen DOC-3 row is preserved verbatim, the historical record is not
rewritten, and the new obligation is prospective. Replacing the DOC-3 row is not proposed.

The ARB approved this additive form on 2026-11-13. The amendment record in ADS-010 quotes the exact
text, and the frozen DOC-3 row remains verbatim.

**What this amendment does not do:**

- It does not remove Storybook.
- It does not move Storybook from `/`.
- It does not make the portal the interactive API reference.
- It does not change ADS-006.
- It does not change the README tiers.
- It does not change any package.

### 4.7 Community Infrastructure (COM-1)

| Decision                       | Classification | Assessment                                                                        |
| ------------------------------ | -------------- | --------------------------------------------------------------------------------- |
| COM-1 — Community health files | Preserved      | The portal does not change issue templates, CoC, security, or contribution files. |

**Effect:** None. The portal may link to community files; it does not own them.

### 4.8 Release CI (CI-1..3)

| Decision                | Classification | Assessment                                       |
| ----------------------- | -------------- | ------------------------------------------------ |
| CI-1 — Release workflow | Preserved      | The portal does not change the release workflow. |
| CI-2 — Publish script   | Preserved      | No publish-script change.                        |
| CI-3 — Secrets          | Preserved      | The docs app uses no secrets and no database.    |

**Effect:** The docs deployment is a Pages workflow concern, not a release-pipeline concern. Adding
a docs copy step to `.github/workflows/pages.yml` is a future infrastructure change. It must not be
bundled into release CI.

### 4.9 Roadmap Structure (ROA-1)

| Decision                                         | Classification | Assessment                                                                  |
| ------------------------------------------------ | -------------- | --------------------------------------------------------------------------- |
| ROA-1 — M10 is a single milestone with M10a/M10b | Preserved      | M12 is a new milestone after M11; it does not split, reopen, or rename M10. |

**Effect:** The roadmap remains an 11-milestone document until the M12 proposal is approved. The
proposal is additive: a new M12 section, a new overview row, and updated success/order sections. It
does not change M10 or M11 definitions.

### 4.10 Specification Governance (SPC-1) — Conflict

**Current text (ADS-010 §4.10):**

> **SPC-1 | Related specifications | ADS-010 is self-contained. It absorbs the scope of
> previously-proposed ADS-011 (Consumer Validation), ADS-012 (Documentation Standards), ADS-013
> (Community), and ADS-014 (npm Standards).**

**Conflict:** ADS-010 records that ADS-011 was previously used for a Consumer Validation proposal.
This ADS-011 uses the same identifier for Documentation Platform. Even though the earlier proposal
was absorbed and never frozen as a separate file, the identifier is part of the historical record.
Reusing it without an explicit retirement note creates ambiguous traceability.

**What is true:**

- The earlier ADS-011 (Consumer Validation) was absorbed into ADS-010.
- It was never frozen as a standalone ADS-011 file in this repository.
- ADS-010 SPC-1 is the historical record of that absorption.
- The current ADS-011 is a different proposal with a different scope.
- The sponsor explicitly requested the ADS-011 identifier for this proposal.

**What is not true:** that this document can silently occupy the identifier and leave ADS-010’s
historical statement untouched.

**Resolution options:**

| Option           | Action                                                                                                                                                                                     | Assessment                                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| **A (selected)** | Add an amendment note to ADS-010: the prior Consumer Validation proposal was absorbed, never frozen, and its ADS-011 identifier is retired; ADS-011 now designates Documentation Platform. | Preserves the sponsor’s requested ID and makes the reuse explicit. Requires the ARB to accept the retirement note.             |
| **B**            | Renumber this proposal and all companion artifacts to the next free ADS identifier.                                                                                                        | Strict uniqueness, but discards the sponsor’s approved identifier and creates churn across the checklist, roadmap, and branch. |
| **C**            | Leave ADS-010 SPC-1 unchanged and treat the current ADS-011 as an unnumbered proposal.                                                                                                     | Not acceptable: a proposed specification without a stable identifier cannot be traced or frozen.                               |

**Sponsor-selected recommendation (ARB-1, approved 2026-11-13):** Option A, with a dated amendment
record. The proposed historical note is:

> The previously proposed ADS-011 (Consumer Validation) was absorbed by ADS-010 and never became a
> standalone specification in this repository. Its identifier is retired. ADS-011 now designates the
> Documentation Platform (M12). This note preserves the historical reference in ADS-010 SPC-1; no
> prior ADS-010 text is deleted or rewritten.

This recommendation is not an ARB decision. If the ARB selects Option B, every artifact in this
submission must be renumbered before approval; the content does not change.

---

## 5. Contracts Impact

### 5.1 Package Contracts

The portal consumes public APIs. It does not change them. The following contracts remain
authoritative and unchanged:

| Contract                                           | Impact | Notes                                                                                                                                 |
| -------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `contracts/primitives.md`                          | None   | Portal imports `@ho-dev/primitives` public entry point.                                                                               |
| `contracts/ui.md`                                  | None   | Portal uses `PageHeader`, `Card`, `ShowcaseSection`, and `ButtonGroup`; it must not document a `Breadcrumb` export from `@ho-dev/ui`. |
| `contracts/forms.md`                               | None   | Portal imports `Form`, `Field`, and related public exports.                                                                           |
| `contracts/charts.md`                              | None   | Portal imports `AreaChart` and chart types from the public entry point.                                                               |
| `contracts/layouts.md`                             | None   | Portal imports `Sidebar`, `Header`, and related public exports.                                                                       |
| `contracts/theme.md`                               | None   | Portal uses `ThemeProvider` and the public theme CSS.                                                                                 |
| `contracts/tokens.md`                              | None   | Portal uses public token APIs/CSS; no token change.                                                                                   |
| `contracts/icons.md`                               | None   | Portal uses public icon exports.                                                                                                      |
| Other public contracts                             | None   | No package API change.                                                                                                                |
| Private contracts (`auth`, `api`, `db`, `testing`) | None   | Portal must not import or document them as installable.                                                                               |

### 5.2 Contract Enforcement

- `check:exports` continues to compare contracts to package barrels. ADS-011 does not change its
  scope or behavior.
- The future `check:docs:metadata` gate is a documentation gate, not a replacement for
  `check:exports`.
- If a contract and a barrel disagree, `check:exports` remains the blocking authority. The docs
  generator must fail closed rather than choose one.
- The portal must not add a contract entry just to make a docs page pass. Contract changes are
  architectural and follow their own review.

### 5.3 New Documentation Contracts

ADS-011 introduces no new package contract. It introduces documentation-internal contracts:

- generated registry schema;
- generated API schema;
- page contract for core components;
- release-state schema;
- private-package exclusion rule;
- base-path/export rule.

These are documentation architecture rules, not package public APIs. They belong in ADS-011 and the
future implementation plan, not in `docs/architecture/contracts/`.

---

## 6. Related Specifications and Governance Artifacts

| Artifact                                | Impact                                                                                                                                                                 | Required action                                                    |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| SPEC-GOVERNANCE-001                     | No change to mechanics. ADS-011 follows the workflow.                                                                                                                  | ARB review; no edit.                                               |
| SPEC-IDENTITY-001                       | Portal must follow the public identity; no identity change.                                                                                                            | Content review only.                                               |
| ADS-004                                 | M12 may add `check:docs:*` and `test:docs` scripts at implementation time. The generator is invoked by the docs build or check script; no new root prefix is proposed. | Implementation-plan approval; no change to script ownership rules. |
| ADS-006                                 | Storybook remains mandatory and unchanged.                                                                                                                             | No edit.                                                           |
| ADS-008                                 | Portal must meet accessibility requirements; no component a11y contract change.                                                                                        | Portal a11y acceptance criteria.                                   |
| ADS-009                                 | Portal should meet performance targets; package budgets unchanged.                                                                                                     | Portal performance criteria.                                       |
| ADS-010                                 | Additive DOC-3a (Amendment A-1) and SPC-1 identifier retirement/reuse.                                                                                                 | ARB decision + amendment append.                                   |
| Master Blueprint §1.12 / §2.4           | Storybook remains the visual documentation channel.                                                                                                                    | No edit; portal is additive.                                       |
| Engineering roadmap                     | M12 is a new milestone; M11 unchanged.                                                                                                                                 | Separate roadmap proposal.                                         |
| `.gitignore` / documentation versioning | New governance docs are currently ignored.                                                                                                                             | Separate governance decision; not changed here.                    |
| `README.md`                             | M11 owns public README; M12 adds a portal link later.                                                                                                                  | No edit in this task.                                              |
| `apps/storybook`                        | No change.                                                                                                                                                             | No edit.                                                           |
| `apps/playground`                       | No change.                                                                                                                                                             | No edit.                                                           |
| `apps/consumer-test`                    | No change.                                                                                                                                                             | No edit.                                                           |

---

## 7. What Must Not Change

The following are explicitly out of bounds for ADS-011 and for the governance task that produced it:

- package names, versions, exports, APIs, behavior, or metadata;
- the 16 public / 4 private split;
- package build scripts or CSS copy mechanisms;
- changesets, release workflow, npm publishing, provenance;
- Storybook configuration, stories, addons, or deployment path;
- Playground routes, configuration, or deployment path;
- consumer-test validation;
- `pnpm-workspace.yaml`, `turbo.json`, root `package.json`, or any package manifest;
- GitHub Actions workflows;
- Next.js configuration for existing apps;
- the frozen text of ADS-010.

ADS-011 is a documentation architecture proposal, not a package or release change.

---

## 8. Amendment Procedure (Applied 2026-11-13)

ADS-010 §12.1 requires an ADS proposal, ARB review, an updated specification with a change log, and
a frozen amendment appended to the document. The procedure for this proposal is:

1. ARB reviews ADS-011, this impact assessment, and the ARB submission package.
2. ARB decides DOC-3 (additive DOC-3a under Amendment A-1) and SPC-1 (Option A/B/C).
3. If approved, a dated **ADS-010 Amendment A-1** record is appended to
   `docs/architecture/ads-010-release.md`.
4. The amendment record contains:
   - the date;
   - the ARB verdict;
   - the exact text added or replaced;
   - the reason;
   - a reference to ADS-011;
   - the SPC-1 identifier resolution and the retirement note in §4.10.
5. The historical DOC-3 text is not deleted. The amendment records the change and preserves
   traceability.
6. If the ARB rejects the amendment, ADS-010 remains unchanged and ADS-011 cannot claim to modify
   it.

**Applied 2026-11-13:** the amendment record below was appended to ADS-010; the template is retained
for traceability.

**Amendment record template (canonical record appended to ADS-010 on 2026-11-13):**

```markdown
## Amendment A-1 — Documentation Platform (ADS-011)

**Date:** YYYY-MM-DD **Status:** [FROZEN — only after the ARB approves the amendment] **Approved
by:** [Architecture Review Board — record the actual verdict] **Proposal:** ADS-011 — Documentation
Platform

### Change

[Exact additive DOC-3a text approved by the ARB. The frozen DOC-3 row remains verbatim; SPC-1
resolution recorded.]

### Reason

[ARB-approved rationale.]

### Historical note

The prior proposed ADS-011 (Consumer Validation) was absorbed by ADS-010 and never frozen as a
standalone specification. [Identifier resolution text.]

### Effect

No change to versioning, publishing, exports, CSS, consumer validation, release automation, or
package APIs. Storybook remains deployed at `/`. The Documentation Platform is added at `/docs/`.
```

---

## 9. Traceability

| Item              | State before 2026-11-13                    | State after the verdict                      |
| ----------------- | ------------------------------------------ | -------------------------------------------- |
| ADS-010 DOC-3     | Frozen, ambiguous “primary docs” label     | Complemented by a dated DOC-3a record        |
| ADS-010 SPC-1     | Says ADS-011 was Consumer Validation       | Historical retirement/reuse note recorded    |
| ADS-011           | Proposed, not approved                     | Frozen (2026-11-13)                          |
| Roadmap           | 11 milestones, M11 = Open Source Readiness | 12 milestones; M12 added 2026-11-13          |
| Package contracts | Unchanged                                  | Unchanged                                    |
| Storybook         | Deployed at `/`                            | Unchanged                                    |
| Playground        | Deployed at `/playground/`                 | Unchanged                                    |
| Docs portal       | Does not exist                             | Not implemented; planning not yet authorized |

---

## 10. Resolution of Submitted Items

The ARB resolved the submitted items on 2026-11-13:

1. **ADS-011 identifier conflict** — Option A approved; historical note recorded in ADS-010.
2. **DOC-3 form** — additive DOC-3a approved; appended as a dated record.
3. **Versioning of these governance artifacts** — narrow allowlist approved and applied to
   `.gitignore`.
4. **M12 roadmap placement** — M12 after M11 approved and applied to the roadmap.
5. **ADR** — no separate ADR approved.
6. **Implementation authority** — M12.1 planning only; implementation and publication not
   authorized.
7. **Release-state ownership** — still open.

These are recorded in `docs/governance/ads-011-open-decisions.md` and consolidated in
`docs/governance/ads-011-arb-readiness-package.md`.

---

## 11. Verdict

**The ARB approved ADS-011 with observations on 2026-11-13.** This assessment concluded that:

- the release, versioning, publishing, validation, and community decisions in ADS-010 are preserved;
- DOC-3 needs a narrow clarification because ADS-011 adds a second documentation surface;
- SPC-1 contains a real identifier conflict that must be resolved before ADS-011 is frozen;
- no contract change is required;
- no package, release, CI, Storybook, or Playground change is authorized by this proposal.

**Outcome:** the six submission items were approved with observations and recorded on 2026-11-13;
the identifier and DOC-3 resolutions were appended to the ADS-010 amendment record; the allowlist
and the M12 roadmap entry were applied; ADS-011 was frozen on 2026-11-13 after the observation was
resolved. Implementation remains unauthorized, and planning requires an explicit authorization.
Publication requires a separate release authorization.

---

**End of impact assessment.**  
**ADS-010's frozen text is unchanged; a dated amendment record was appended on 2026-11-13.**
