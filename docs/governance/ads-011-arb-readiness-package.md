# ADS-011 — ARB Submission Package

**Specification status:** FROZEN (2026-11-13)  
**Submission status:** FROZEN (ARB, 2026-11-13)  
**Date:** 2026-11-12  
**Branch:** `docs/ads-011-arb-submission`  
**Prepared by:** Architecture governance process  
**Decision body:** Architecture Review Board (ARB)  
**Initiative:** M12 — Documentation Platform  
**Parent proposal:** `docs/architecture/ads-011-documentation-platform.md`  
**Companion artifacts:** ADS-010 impact register, M12 roadmap proposal, ARB checklist, open
decisions register

> **Historical filename note.** This document was created during the readiness stage as
> `ads-011-arb-readiness-package.md`. The filename is retained for traceability; the content is now
> the formal ARB submission package.

> **This package records the ARB verdict of 2026-11-13: Approved with Observations, and the freeze
> of ADS-011 on 2026-11-13.** The observation was resolved by recording M11's exit criteria (roadmap
> Definition of Done) and the public-release state (pre-release/unpublished; npm registry 404 for
> `@ho-dev/primitives`). ADS-010 received a dated DOC-3a amendment record; the allowlist was
> applied; the official roadmap received the M12 section. No implementation, dependency
> installation, or publication was performed.

---

## 1. Executive Summary

M12 proposes a dedicated Documentation Platform at `apps/docs`, published at `/docs/` on the
existing GitHub Pages site, while preserving Storybook at `/` and the Playground at `/playground/`.

The architecture is documented in ADS-011. The proposal is ready for deliberation because the
sponsor selected a recommendation for each of the six governance decisions. None of those
recommendations is an ARB approval.

| ID        | Decision                 | Sponsor-selected recommendation                                                                                                                                   | ARB status                 |
| --------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| **ARB-1** | ADS-011 identifier       | Retire the prior Consumer Validation use of ADS-011 with a historical note; reuse ADS-011 for Documentation Platform.                                             | Approved with Observations |
| **ARB-2** | ADS-010 DOC-3            | Adopt the additive Amendment A-1 (DOC-3a), preserving the frozen DOC-3 row verbatim and distinguishing Storybook, the Documentation Platform, and the Playground. | Approved with Observations |
| **ARB-3** | Governance versioning    | Adopt a narrow `.gitignore` allowlist for the ADS-011/M12 artifacts; do not force-add.                                                                            | Approved with Observations |
| **ARB-4** | Roadmap                  | Place M12 after M11, with explicit entry and exit criteria.                                                                                                       | Approved with Observations |
| **ARB-5** | ADR                      | Dispense with a separate ADR; ADS-011 is the decision record.                                                                                                     | Approved with Observations |
| **ARB-6** | Implementation authority | Authorize only M12.1 planning; no implementation, dependency installation, code, workflow, or publication is authorized.                                          | Approved with Observations |

**Current state:** the five source documents and this package exist only in the working tree. They
are ignored by `.gitignore` and are not in the branch history. No application, configuration,
workflow, package, contract, ADS-010, `.gitignore`, or roadmap was changed.

---

## 2. Context — M12 Documentation Platform

### 2.1 What M12 is

M12 adds a documentation application that helps developers:

- discover the 16 public packages;
- understand which package owns a component;
- see the real import path and the smallest working example;
- distinguish component-specific props, variant props, and inherited HTML attributes;
- know whether a package is pre-release or published;
- find the source, contract, Storybook story, and Playground screen for a component.

It is inspired by the discovery and example-first experience of shadcn/ui documentation, but it does
not adopt a copy-paste distribution model. Packages remain independently versioned distribution
units.

### 2.2 What M12 is not

- It is not a replacement for Storybook.
- It is not a promotion of the Playground into a documentation product.
- It is not a new component library.
- It is not a package publication or release change.
- It is not a redesign of the public API.
- It is not an implementation task at this stage.

### 2.3 Surface responsibilities

| Surface                | Public path    | Owns                                                                                                              | Does not own                                                                  |
| ---------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Storybook              | `/`            | Interactive component states, controls, stories, technical component documentation, a11y panel, interaction tests | Package onboarding, installation state, editorial guidance, portal navigation |
| Documentation Platform | `/docs/`       | Package discovery, onboarding, installation state, usage guidance, curated examples, API summaries                | Component state matrix, interactive controls, product demo                    |
| Playground             | `/playground/` | Integration demonstrations, realistic composition, experimentation                                                | Per-component API documentation, search, installation guidance                |

The three surfaces are complementary. The portal links to Storybook and the Playground; it does not
embed them as its primary experience.

---

## 3. Architectural Problem ADS-011 Resolves

The repository has components, contracts, stories, and a Playground, but no single surface that
connects them for a consumer. Current documentation also contains known drift:

| Problem                                       | Evidence                                                                             | Consequence                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Button documentation contradicts source       | `packages/primitives/README.md` says 3 shapes; source defines 2                      | Consumers cannot trust README variant data                       |
| UI README exposes a non-existent export       | It imports `Breadcrumb` from `@ho-dev/ui`; `ui` does not export it                   | Copy-paste example fails                                         |
| UI README uses a non-existent variant         | It uses `variant="outlined"`; Card uses `bordered`                                   | Invalid API usage                                                |
| UI README declares an absent peer             | It lists `next ^15`; the manifest has no `next` peer                                 | Misleading install guidance                                      |
| Storybook introduction overstates the catalog | It lists Breadcrumb under UI and Line under charts                                   | Discovery points to missing components                           |
| Private packages look installable             | All 20 READMEs show `pnpm add`, including private packages                           | Users are invited to install packages that must not be published |
| Publication state is ambiguous                | Public packages are `0.2.0` and `private: false`; the root README says not published | `pnpm add` cannot be assumed to work                             |
| No machine-readable registry                  | No registry, props JSON, search index, or canonical example index                    | Every docs surface is assembled by hand and drifts               |

ADS-011 resolves the architecture: generated facts from source, curated editorial content, a single
public catalog, a pre-release-aware installation model, and a `/docs/` deployment that preserves the
existing surfaces.

---

## 4. Decisions Already Made by the Sponsor

These are product decisions. They are not ARB verdicts.

| ID  | Decision                                                                                                 |
| --- | -------------------------------------------------------------------------------------------------------- |
| S-1 | The initiative is M12 — Documentation Platform; M11 remains Open Source Readiness.                       |
| S-2 | The specification is ADS-011 — Documentation Platform.                                                   |
| S-3 | The future application is `apps/docs`, Next.js App Router, static export.                                |
| S-4 | The application consumes `@ho-dev/*` packages through workspace dependencies; no copied implementations. |
| S-5 | The catalog covers all 16 public packages; full component pages begin with a core set.                   |
| S-6 | The portal is published at `/docs/` on the same GitHub Pages site.                                       |
| S-7 | Metadata is generated from real sources; editorial content is reviewed manually.                         |
| S-8 | Unpublished packages are presented as pre-release; no misleading `pnpm add`.                             |
| S-9 | Storybook remains the interactive API reference; the Playground remains the integration demo.            |

The ARB may accept, modify, or reject the architecture. These decisions do not bypass governance
review.

---

## 5. Status Legend

Every statement in this package is labeled as one of:

| Label                               | Meaning                                                                                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| **Sponsor-selected recommendation** | The user chose this option for submission. It is not an ARB decision.                      |
| **Technical proposal**              | The recommended implementation or wording, subject to ARB review.                          |
| **ARB-approved**                    | A verdict actually recorded by the Architecture Review Board. None exists in this package. |
| **Pending**                         | The decision remains open.                                                                 |

---

## 6. The Six Decisions

### 6.1 ARB-1 — ADS-011 Identifier

**Sponsor-selected recommendation:** formally retire the prior ADS-011 use (Consumer Validation) and
reuse ADS-011 for Documentation Platform, preserving the historical record.

**Why this is defensible:**

- ADS-010 SPC-1 is the only tracked record of the prior ADS-011.
- No file named `ads-011-*` has ever existed in the repository history.
- The prior proposal was absorbed into ADS-010 and has no standalone specification text.
- The sponsor selected ADS-011 for this initiative.

**Historical retirement record (recorded 2026-11-13):**

> The previously proposed ADS-011 (Consumer Validation) was absorbed by ADS-010 and never became a
> standalone specification in this repository. Its identifier is retired. ADS-011 now designates the
> Documentation Platform (M12). This note preserves the historical reference in ADS-010 SPC-1; no
> prior ADS-010 text is deleted or rewritten.

**ARB decision:** Approved with Observations (2026-11-13). The options considered were:

| Option           | Description                                                                       |
| ---------------- | --------------------------------------------------------------------------------- |
| **A (selected)** | Retire the prior identifier with the note above and reuse ADS-011.                |
| B                | Renumber the Documentation Platform to the next free identifier (likely ADS-015). |
| C                | Use a disambiguated identifier such as `ADS-011-DOC`.                             |

**Fallback:** if the ARB rejects A, Option B (renumber) is available before freeze.

---

### 6.2 ARB-2 — ADS-010 DOC-3 Amendment A-1 (Additive DOC-3a)

**Sponsor-selected recommendation:** approve Amendment A-1 in additive form: keep the frozen DOC-3
row verbatim and append a dated DOC-3a row for the Documentation Platform.

**Current DOC-3 (FROZEN, preserved verbatim):**

```
| DOC-3 | Storybook as primary docs | **Storybook is the interactive API reference.** MUST be deployed to GitHub Pages for v1.0. Package READMEs MUST link to individual Storybook pages. | Storybook is already built and tested. GitHub Pages deployment is free. Chromatic/Vercel MAY be evaluated in v1.1. |
```

**Exact appended row DOC-3a (approved and appended 2026-11-13):**

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

**Justification:**

- It preserves Storybook as the interactive API reference, including its deployment at `/`.
- It gives the Documentation Platform a distinct primary responsibility: discovery, onboarding,
  installation, and usage guidance.
- It preserves the Playground as the integration demonstration and experimentation surface.
- It disambiguates “Storybook as primary docs” by surface without deleting or rewriting the frozen
  row; the amendment record quotes the exact approved text.
- It does not change Storybook deployment, package README obligations, or any package.

**ARB decision:** Approved with Observations (2026-11-13). A replacement of the DOC-3 row is not
proposed.

---

### 6.3 ARB-3 — Narrow Versioning Allowlist

**Sponsor-selected recommendation:** adopt a narrow `.gitignore` allowlist for the ADS-011/M12
artifacts without opening all of `docs/`.

**Applied to `.gitignore` on 2026-11-13:**

```gitignore
# ARB-3/ARB-3a allowlist — approved 2026-11-13 (applied)
!/docs/architecture/ads-011-documentation-platform.md
!/docs/architecture/ads-011-ads-010-impact.md
!/docs/governance/
/docs/governance/*
!/docs/governance/ads-011-arb-readiness-package.md
!/docs/governance/ads-011-arb-review-checklist.md
!/docs/governance/ads-011-open-decisions.md
!/docs/roadmap/
/docs/roadmap/*
!/docs/roadmap/m12-documentation-platform-proposal.md
!/docs/roadmap/engineering-execution-roadmap.md
```

**Why the ancestor rules are necessary:**

- `/docs/*` ignores the `docs/governance` and `docs/roadmap` directories as directory entries.
  Re-including a child file without first re-including the parent directory does not work.
- `!/docs/governance/` and `!/docs/roadmap/` make the directories traversable.
- `/docs/governance/*` and `/docs/roadmap/*` then re-ignore their contents.
- The final `!` rules re-include only the ADS-011/M12 files.

**Technical validation:** performed in an isolated temporary Git repository before the real edit.
The real `.gitignore` was updated on 2026-11-13. Results:

| Path                                                  | Expected  | Observed  |
| ----------------------------------------------------- | --------- | --------- |
| `docs/architecture/ads-011-documentation-platform.md` | trackable | trackable |
| `docs/architecture/ads-011-ads-010-impact.md`         | trackable | trackable |
| `docs/governance/ads-011-arb-readiness-package.md`    | trackable | trackable |
| `docs/governance/ads-011-arb-review-checklist.md`     | trackable | trackable |
| `docs/governance/ads-011-open-decisions.md`           | trackable | trackable |
| `docs/roadmap/m12-documentation-platform-proposal.md` | trackable | trackable |
| `docs/roadmap/engineering-execution-roadmap.md`       | trackable | trackable |
| `docs/architecture/ads-002-readme-implementation.md`  | ignored   | ignored   |
| `docs/architecture/ads-010-release.md`                | ignored   | ignored   |
| `docs/governance/deliverable-lifecycle.md`            | ignored   | ignored   |
| `docs/superpowers/<spec>.md`                          | ignored   | ignored   |
| `docs/reports/<report>.md`                            | ignored   | ignored   |

`docs/architecture/contracts/**` remains tracked by the existing rule and is outside this allowlist.

**Effect:** exactly the six submission artifacts plus the official roadmap are now normal untracked
files and can be staged without `-f`. No package, build, workflow, or contract behavior changes, and
no other `docs/**` file became trackable. The `.gitignore` edits were applied on 2026-11-13 (ARB-3
and ARB-3a).

**ARB decision:** Approved with Observations (2026-11-13).

---

### 6.4 ARB-4 — M12 After M11

**Sponsor-selected recommendation:** place M12 after M11 — Open Source Readiness.

**Dependency chain:**

```text
M10 Release Pipeline → M11 Open Source Readiness → M12 Documentation Platform
```

**Planning entry criteria:**

1. ADS-011 is approved/frozen.
2. The versioning policy for the submission artifacts is applied.
3. The release-state owner is identified.
4. No blocking package, release, or contract issue is open.

**Implementation entry criteria (in addition to planning):**

1. M11's exit criteria are recorded and its public-release state is explicitly known.
2. The M12 implementation plan is approved separately.

**Exit criteria for M12:**

1. All M12 acceptance criteria in ADS-011 §14 are satisfied.
2. The portal is available at `/docs/` and catalogs all 16 public packages.
3. The core 12 component pages satisfy the page contract.
4. Private packages are absent from public artifacts.
5. `/`, `/playground/`, and `/docs/` work from one Pages artifact.
6. Docs tests and the metadata gate pass.
7. The ARB approves M12 closure.

**Boundary:** M11 owns public repository posture, READMEs, community files, and Storybook
deployment. M12 owns the portal. M12 does not redefine M11 or reopen M10.

**ARB decision:** Approved with Observations (2026-11-13).

---

### 6.5 ARB-5 — No Separate ADR

**Sponsor-selected recommendation:** dispense with a separate ADR because ADS-011 is the decision
record.

**Evidence:**

- SPEC-GOVERNANCE-001 §12.2 says “ADRs document individual decisions” but does not require a
  separate ADR for every ADS.
- ADS-011 records DOCP-1..22 with resolution and rationale.
- No tracked ADR file exists in the repository (`git ls-files` finds no ADR path).
- The existing ADS-002 through ADS-010 are frozen without separate ADR files.
- A separate ADR that restates DOCP-1..22 would duplicate the source of truth and create two
  documents that can drift.

**Technical proposal:** no separate ADR. If the ARB requires one, it should be a short record that
references the relevant ADS-011 section (for example, DOCP-11 for the single Pages artifact) rather
than restating the architecture.

**ARB decision:** Approved with Observations (2026-11-13).

---

### 6.6 ARB-6 — Planning Authority Only

**Sponsor-selected recommendation:** approval authorizes only M12.1 planning.

**What approval authorizes:**

- Preparation of the M12.1 planning artifacts.
- Review of the plan by the sponsor and ARB.
- Definition of scope, acceptance criteria, tests, and branch sequencing.

**What approval does not authorize:**

- Creating `apps/docs`.
- Installing dependencies.
- Changing code, configuration, workflows, Storybook, Playground, or packages.
- Publishing the application.
- Starting M12.1 implementation.
- Starting any later M12 phase.

Implementation requires explicit subsequent authorization from the user after the M12.1 plan is
approved.

**ARB decision:** Approved with Observations (2026-11-13).

---

## 7. Consequences Matrix

| Decision            | What changes if approved                          | What does not change                                      | Main risk                                     |
| ------------------- | ------------------------------------------------- | --------------------------------------------------------- | --------------------------------------------- |
| ARB-1 A             | ADS-010 amendment note; ADS-011 historical status | Filenames; package/release architecture                   | Identifier reuse confusion                    |
| ARB-2 A-1 (DOC-3a)  | ADS-010 DOC-3a addendum; DOC-3 preserved          | Storybook, Playground, READMEs, release                   | Additive row perceived as duplicating DOC-3   |
| ARB-3 allowlist     | `.gitignore` rules; six artifacts become visible  | Package contracts and private-by-default policy elsewhere | Pattern maintenance                           |
| ARB-4 after M11     | Roadmap sequence and entry/exit criteria          | M10/M11 definitions                                       | M12 blocked if M11 slips                      |
| ARB-5 no ADR        | No additional decision record                     | ADS-011 remains decision record                           | ARB may prefer an ADR                         |
| ARB-6 planning only | M12.1 planning may begin                          | No implementation is authorized                           | Confusion between approval and implementation |

---

## 8. Formal Decisions Required From the ARB

| ID    | Decision                 | Sponsor-selected recommendation | ARB verdict                |
| ----- | ------------------------ | ------------------------------- | -------------------------- |
| ARB-1 | Identifier               | Retire prior ADS-011 and reuse  | Approved with Observations |
| ARB-2 | DOC-3                    | Additive DOC-3a (A-1)           | Approved with Observations |
| ARB-3 | Versioning               | Narrow allowlist                | Approved with Observations |
| ARB-4 | Roadmap                  | M12 after M11                   | Approved with Observations |
| ARB-5 | ADR                      | No separate ADR                 | Approved with Observations |
| ARB-6 | Implementation authority | Planning M12.1 only             | Approved with Observations |

All six rows were approved with observations on 2026-11-13.

---

## 9. Criteria for Considering ADS-011 Approved

ADS-011 may be recorded as **Approved** only when:

1. The ARB records Approved or Approved with Observations.
2. ARB-1 is resolved and the historical note is recorded.
3. ARB-2 is resolved with the exact additive DOC-3a text, and the amendment record is appended under
   ADS-010 §12.1.
4. ARB-3 is resolved with a versioning policy that makes the artifacts reviewable in Git.
5. ARB-4 is accepted, deferred, or explicitly separated from the ADS verdict.
6. ARB-5 is resolved.
7. ARB-6 is recorded, limiting authorization to planning.
8. All six review artifacts are versioned under the approved policy, not force-added ad hoc.
9. No blocking observation remains open.
10. ADS-011 scope and non-goals are unchanged.

**Status 2026-11-13:** items 1–7 are recorded; item 8 is applied locally but uncommitted. **Frozen
on 2026-11-13** after the observation was resolved (M11 DoD recorded; release state
pre-release/unpublished).

---

## 10. Next Steps After Approval

**Status 2026-11-13:** the verdict is recorded; ARB-1, ARB-2, ARB-3, and ARB-4 were applied locally;
ADS-011 was frozen; commit and planning remain unauthorized.

1. Record the ARB verdict in the checklist and open decisions register.
2. Apply ARB-1: append the historical retirement note to the ADS-010 amendment record; update
   ADS-011 §3.4 from “recommended” to “ARB-approved/retired.”
3. Apply ARB-2: append the additive DOC-3a record to ADS-010 per §12.1; DOC-3 remains verbatim, and
   the amendment record quotes the exact approved text.
4. Apply ARB-3: add the allowlist in a separate governance change; stage the six artifacts normally.
5. Apply ARB-4: update the official roadmap only after a separate Governance change.
6. Apply ARB-5: record that no separate ADR is required.
7. Apply ARB-6: authorize only the M12.1 planning work.
8. Prepare the M12.1 plan; no implementation until explicit subsequent authorization.

---

## 11. Evidence and Validation

### 11.1 Repository state

| Check                | Result                                                          |
| -------------------- | --------------------------------------------------------------- |
| Branch               | `docs/ads-011-arb-submission`                                   |
| HEAD                 | `b2fca948a32ec06d9e545fa4b8039b6f508257a8`                      |
| `origin/main`        | `b2fca948a32ec06d9e545fa4b8039b6f508257a8`                      |
| Merge-base           | `b2fca948a32ec06d9e545fa4b8039b6f508257a8`                      |
| Tracked working tree | modified (`.gitignore`, `docs/architecture/ads-010-release.md`) |
| Six documents        | present, allowlisted, untracked, absent from HEAD               |
| Official roadmap     | untracked (ignored by `/docs/*`); M12 applied locally           |

### 11.2 Historical ADS-011 evidence

| Command                                         | Result                                          |
| ----------------------------------------------- | ----------------------------------------------- |
| `git log --all -S'ADS-011' -- docs`             | only `a839982` (ADS-010 freeze)                 |
| `git log --all --name-only \| grep -i ads-011`  | no historical paths                             |
| `git grep -n 'ADS-011' HEAD -- docs`            | only `docs/architecture/ads-010-release.md:171` |
| `git log --all -S'Consumer Validation' -- docs` | only ADS-010 history                            |

### 11.3 ADR evidence

| Check                     | Result                                                 |
| ------------------------- | ------------------------------------------------------ |
| SPEC-GOVERNANCE-001 §12.2 | ADRs document individual decisions; no per-ADS mandate |
| Tracked ADR files         | none                                                   |
| ADS-011 decision table    | DOCP-1..22 present                                     |
| Existing ADS practice     | ADS-002..010 frozen without separate ADR files         |

### 11.4 Versioning validation

The allowlist was tested in an isolated temporary Git repository. It allowed exactly the six
ADS-011/M12 files and kept other architecture, governance, roadmap, reports, and superpowers paths
ignored. The real `.gitignore` was modified on 2026-11-13; `git status --short -uall` shows exactly
the six artifacts as untracked.

### 11.5 Documentation validation

| Command                                             | Result                                                        |
| --------------------------------------------------- | ------------------------------------------------------------- |
| `pnpm exec prettier --check <submission artifacts>` | PASS                                                          |
| `pnpm run format:check`                             | PASS                                                          |
| `pnpm run check:docs`                               | PASS — 4 existing documents; does not inspect these artifacts |
| `pnpm run check:exports`                            | PASS — 20/20 packages                                         |
| `test ! -d apps/docs`                               | PASS — absent                                                 |

`pnpm run all-checks` was not executed: this is a documentation-only package, and the new artifacts
are not integrated into the docs pipeline.

---

## 12. What This Package Does Not Do

- It does not create `apps/docs`.
- It does not install dependencies.
- It does not change code, configuration, workflows, Storybook, Playground, or packages.
- It does not change `.gitignore`.
- It does not modify ADS-010.
- It does not update the official roadmap.
- It does not declare ARB approval.
- It does not commit, push, or merge.
- It does not authorize M12.1 implementation.
- It does not authorize publication of the application or of any package.

---

## 13. Revision History

| Date       | Revision         | Change                                                                                                                                                                                                                                         |
| ---------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-11-12 | Correction round | DOC-3 amendment restated as additive DOC-3a; allowlist restricted to the six exact paths and re-validated; M11 gate made conjunctive; status vocabulary unified; planning, implementation, and publication authorization separated explicitly. |
| 2026-11-13 | ARB verdict      | Approved with Observations; DOC-3a appended to ADS-010; allowlist applied; M12 added to the roadmap; verification recorded.                                                                                                                    |
| 2026-11-13 | Freeze           | ADS-011 frozen after the observation was resolved (M11 DoD recorded; release state pre-release/unpublished).                                                                                                                                   |
| 2026-11-13 | ARB-3a           | Allowlist extended to the official roadmap; the roadmap now appears as an untracked artifact.                                                                                                                                                  |

---

## Appendix A — ARB Resolution Record

```markdown
## ADS-011 — ARB Verdict

**Date:** 2026-11-13 **Verdict:** Approved with Observations **Frozen:** 2026-11-13

**ARB-1:** A — retire prior ADS-011 and reuse **ARB-2:** additive DOC-3a (A-1) **ARB-3:** narrow
allowlist (six exact paths) **ARB-4:** M12 after M11 **ARB-5:** no separate ADR **ARB-6:** planning
M12.1 only

**Observations:**

1. Confirm M11's exit criteria and record the explicit public-release state before M12
   implementation. **Resolved 2026-11-13** (M11 DoD recorded in the roadmap; release state
   pre-release/unpublished).

**Conditions before freeze:**

1. None — resolved 2026-11-13.

**Recorded by:** Repository owner (session decision, 2026-11-13)
```

This record is the verdict.

---

**End of ARB submission package.**  
**ADS-011 is FROZEN (2026-11-13). ADS-010's frozen text is unchanged; a dated amendment record was
appended. No implementation performed.**
