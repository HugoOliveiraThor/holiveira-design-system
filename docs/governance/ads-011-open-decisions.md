# ADS-011 — Open Decisions Register

**Specification status:** FROZEN (2026-11-13)  
**Submission status:** FROZEN (ARB, 2026-11-13)  
**Decision register:** six submitted decisions approved with observations; ADS-011 frozen; remaining
items open  
**Parent proposal:** `docs/architecture/ads-011-documentation-platform.md`  
**ARB submission package:** `docs/governance/ads-011-arb-readiness-package.md` (historical filename;
current title: ARB Submission Package)  
**Date:** 2026-11-10  
**Updated:** 2026-11-12  
**Owner of the register:** Architecture governance process  
**Decision authority:** Architecture Review Board (ARB), except where a sponsor product decision is
explicitly noted

> This register separates product decisions already made by the sponsor from governance decisions
> that still require the ARB. A sponsor decision is not an ARB verdict. An open decision is not a
> blocker for reading the proposal, but it is a blocker for freezing or implementing the affected
> scope.

**Submission mapping:** ARB-1 = OD-1, ARB-2 = OD-2, ARB-3 = OD-3, ARB-4 = OD-4, ARB-5 = OD-9, ARB-6
= OD-11. The remaining OD items are not part of the six-item ARB submission and stay open.

---

## 1. Settled Sponsor Decisions (Not ARB Approvals)

These are recorded to prevent re-litigation. They are product decisions, not governance approvals.

| ID  | Decision                                                                                     | Status           |
| --- | -------------------------------------------------------------------------------------------- | ---------------- |
| S-1 | The initiative is M12 — Documentation Platform; M11 remains Open Source Readiness.           | Sponsor-approved |
| S-2 | The specification is ADS-011 — Documentation Platform.                                       | Sponsor-approved |
| S-3 | The future app is `apps/docs`, Next.js App Router, static export.                            | Sponsor-approved |
| S-4 | The app consumes `@ho-dev/*` packages via workspace dependencies; no copied implementations. | Sponsor-approved |
| S-5 | The catalog covers all 16 public packages; full pages start with a core set.                 | Sponsor-approved |
| S-6 | The portal is published at `/docs/` on the same GitHub Pages site.                           | Sponsor-approved |
| S-7 | Metadata is generated from real sources; editorial content is reviewed manually.             | Sponsor-approved |
| S-8 | Unpublished packages are presented as pre-release; no misleading `pnpm add`.                 | Sponsor-approved |

The ARB may still reject the architecture or require changes. These decisions do not bypass review.

---

## 2. Open Decisions

### OD-1 — ADS-011 Identifier Conflict

**Question:** How should the project reconcile the current ADS-011 (Documentation Platform) with
ADS-010 SPC-1, which records a prior proposed ADS-011 (Consumer Validation) that was absorbed?

**Why it matters:** ADS identifiers are historical governance references. Reusing an identifier
without a record weakens traceability. ADS-011 cannot be frozen while the history is ambiguous.

**Options:**

| Option           | Description                                                                                                              | Effect                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| **A (selected)** | Add a dated ADS-010 amendment note retiring the prior ADS-011 identifier; ADS-011 now designates Documentation Platform. | Keeps the sponsor’s identifier; requires explicit historical note.                  |
| B                | Renumber this proposal and all companion artifacts to the next free ADS identifier.                                      | Strict uniqueness; invalidates the sponsor’s requested ID and requires renumbering. |
| C                | Treat the current proposal as unnumbered and keep ADS-011 for the old concept.                                           | Not viable; an unnumbered spec cannot be frozen or traced.                          |

**Sponsor-selected recommendation:** Option A, with the exact historical note in the ADS-010
amendment record.

**ARB decision:** Approved with Observations (2026-11-13).  
**Decision owner:** ARB.  
**Blocking:** ADS-011 freeze.  
**If unresolved:** ADS-011 remains Proposed; no implementation.

---

### OD-2 — DOC-3 Amendment Form

**Question:** Should ADS-010 DOC-3 be preserved with an appended DOC-3a row (additive Amendment
A-1), or replaced with a “Documentation surfaces” row?

**Why it matters:** DOC-3 is frozen. The portal adds a second docs surface, so “Storybook as primary
docs” becomes ambiguous. The ARB must choose how to preserve history.

**Options:**

| Option                | Description                                                                                                         | Effect                                                                    |
| --------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| **DOC-3a (selected)** | Keep DOC-3 exactly; append a dated DOC-3a row for the portal's discovery, onboarding, installation, and usage role. | Additive and prospective; frozen text preserved verbatim; history intact. |
| A-1 replacement       | Replace the DOC-3 row with a “Documentation surfaces” row.                                                          | Removes ambiguity but rewrites frozen text; not proposed.                 |
| Other                 | ARB-drafted text.                                                                                                   | Must be recorded verbatim.                                                |

**Sponsor-selected recommendation:** additive DOC-3a under Amendment A-1.

**ARB decision:** Approved with Observations (2026-11-13).  
**Decision owner:** ARB.  
**Blocking:** ADS-011 freeze; ADS-010 amendment.  
**If unresolved:** ADS-010 remains unchanged; ADS-011 cannot claim to modify it.

---

### OD-3 — Versioning of Governance Artifacts

**Question:** How will ADS-011 and its companion governance files be versioned, given that
`.gitignore` excludes most `docs/**` content?

**Why it matters:** SPEC-GOVERNANCE-001 §2.3 requires documentation as code. A governance artifact
that exists only on disk is not repository governance.

**Options:**

| Option           | Description                                                                                                                                                         | Effect                                                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **A (selected)** | Add a narrow `.gitignore` allowlist for the six ADS-011/M12 artifacts plus the official roadmap (ARB-3a), with the ancestor-directory rules validated in isolation. | Makes the artifacts versioned without opening all of `docs/**`; does not use force-add. Requires a governance change. |
| B                | Keep the current ignore policy and treat ADS-011 as a local review artifact only.                                                                                   | Not compatible with “documentation as code”; cannot be CI evidence.                                                   |
| C                | Move the artifacts to an already-tracked path.                                                                                                                      | Semantically wrong; contracts path is for package contracts.                                                          |
| D                | Force-add the six files without a policy.                                                                                                                           | Prohibited by the task; future clones/CI still ignore the artifacts; no durable policy.                               |

**Sponsor-selected recommendation:** Option A, decided alongside the ADS-011 approval. Do not
silently force-add without a policy. The exact allowlist is in the submission package §6.3 and was
technically validated in an isolated temporary repository.

**ARB decision:** Approved with Observations (2026-11-13). The allowlist was applied to `.gitignore`
on the same date. **Blocking:** Repository governance of ADS-011; not the content review.  
**If unresolved:** The proposal can be reviewed but cannot be cited as a tracked specification.

---

### OD-4 — M12 Roadmap Placement

**Question:** Is M12 strictly after M11, or can it run in parallel with a release-state gate?

**Why it matters:** The portal can be built before npm publication, but public installation claims
must wait. The roadmap dependency affects sequencing, not the architecture.

**Options:**

| Option           | Description                                                                                                                                                                                       | Effect                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **A (selected)** | M10 → M11 → M12 in the roadmap; M12 planning may start after ADS-011 freeze, but implementation begins only after M11 entry/exit criteria are recorded and its release state is explicitly known. | Clear public sequence; preserves the M11 boundary.                |
| B                | M12 parallel to M11 with a release-state gate.                                                                                                                                                    | Faster, but roadmap complexity and release-state coupling.        |
| C                | M12 after npm GA only.                                                                                                                                                                            | Safest install messaging, but delays documentation unnecessarily. |

**Sponsor-selected recommendation:** Option A (M12 after M11, with entry and exit criteria).

**ARB decision:** Approved with Observations (2026-11-13). The roadmap was updated on the same date.

**Decision owner:** ARB + sponsor.  
**Blocking:** Roadmap application.  
**If unresolved:** Roadmap stays at 11 milestones; M12 proposal remains pending. **Outcome:** the
roadmap was updated to 12 milestones on 2026-11-13.

---

### OD-5 — Core Component Set

**Question:** Is the proposed core 12 the right first-release set?

**Proposed core 12:** Button, Alert, Badge, InputGroup, Table, Dropdown, Card, PageHeader,
Form/Field, AreaChart, Sidebar, Header.

**Why it matters:** The core set determines content effort and which page contracts are proven
first. It does not limit the catalog; all public packages are still catalogued.

**Options:**

| Option              | Description                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| **A (recommended)** | Accept the core 12 as proposed.                                                |
| B                   | Replace one or more with components the sponsor considers more representative. |
| C                   | Reduce the core set to accelerate the first release; move the rest to phase 2. |

**Recommendation:** Option A. The set covers primitives, composition, forms, charts, and layouts,
and includes a heavy client preview (AreaChart) and a responsive shell (Sidebar/Header).

**Decision owner:** Sponsor, with ARB confirmation.  
**Blocking:** Content plan, not ADS freeze.  
**If unresolved:** Use the proposed set as the default plan and record changes in the implementation
plan.

---

### OD-6 — Release-State Source and Ownership

**Question:** Which single source declares whether packages are published, and who updates it?

**Why it matters:** `private: false` means publishable, not published. The current root README says
pre-release. The portal must not guess npm availability.

**Options:**

| Option              | Description                                                                                                           | Effect                                          |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| **A (recommended)** | A reviewed `release-state` file in `apps/docs/src/content/`, owned by the release owner, validated against manifests. | Deterministic builds; explicit transition.      |
| B                   | Build-time npm registry query.                                                                                        | Network dependency, flaky CI, not static-first. |
| C                   | Per-page flags or README parsing.                                                                                     | Duplication and drift; rejected.                |

**Recommendation:** Option A. The release owner updates it as part of the publication checklist; the
metadata gate verifies versions.

**Decision owner:** Release owner + ARB.  
**Blocking:** Installation UI implementation, not ADS freeze.  
**If unresolved:** The portal must default to pre-release and show no active `pnpm add`.

---

### OD-7 — Search Dependency

**Question:** Is a no-dependency static search sufficient, or is a library such as `cmdk`/Fuse
approved?

**Why it matters:** A dependency adds supply-chain and bundle cost; a custom combobox adds
accessibility risk.

**Options:**

| Option              | Description                                                                                                             | Effect                                                   |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| **A (recommended)** | Start with a small static index and an accessible custom filter; evaluate a library only if the UX proves insufficient. | No new dependency; requires careful a11y implementation. |
| B                   | Add a vetted combobox/search library in M12.1.                                                                          | Faster UI; new dependency and ownership review.          |

**Recommendation:** Option A. Revisit with measured need.

**Decision owner:** ARB / implementation plan.  
**Blocking:** None for ADS freeze.  
**If unresolved:** Implement the no-dependency path.

---

### OD-8 — Docs Visual Regression Scope

**Question:** Does M12 require visual regression for every docs page, or only the shell and core
pages?

**Why it matters:** Full-page visual snapshots are expensive and noisy; no snapshots weakens layout
protection.

**Options:**

| Option              | Description                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| **A (recommended)** | Snapshot the shell, landing, one page per template, and the core 12; skip every guide page in v1. |
| B                   | Snapshot every docs route.                                                                        |
| C                   | No visual regression in M12; rely on e2e and a11y.                                                |

**Recommendation:** Option A.

**Decision owner:** ARB / implementation plan.  
**Blocking:** None for ADS freeze.  
**If unresolved:** Use the default in the implementation plan.

---

### OD-9 — Separate ADR Requirement

**Question:** Does the ARB require a separate Architecture Decision Record for M12?

**Why it matters:** ADS-011 already records DOCP-1..22. A separate ADR could duplicate decisions and
violate the single-source-of-truth principle.

**Options:**

| Option           | Description                                                                          |
| ---------------- | ------------------------------------------------------------------------------------ |
| **A (selected)** | No separate ADR; ADS-011 is the decision record.                                     |
| B                | Create an ADR for one or more cross-cutting decisions (e.g., single Pages artifact). |
| C                | Create a full ADR series.                                                            |

**Sponsor-selected recommendation:** Option A. Evidence: SPEC-GOVERNANCE-001 §12.2 does not mandate
a separate ADR; no tracked ADR file exists; ADS-011 records DOCP-1..22; existing ADS-002..010 are
frozen without separate ADRs.

**ARB decision:** Approved with Observations (2026-11-13). A short ADR for the deployment shape may
still reference ADS-011 rather than restate it.

**Decision owner:** ARB.  
**Blocking:** None for ADS freeze, unless the ARB makes it a condition.

---

### OD-10 — M12 Closure vs npm Publication

**Question:** Can M12 be declared complete while packages are still pre-release?

**Why it matters:** The portal’s pre-release mode is a valid product state. Requiring npm GA would
couple documentation closure to release timing.

**Options:**

| Option              | Description                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **A (recommended)** | M12 can close in pre-release mode if the portal accurately presents that state. A later release-state change flips install messaging. |
| B                   | M12 closes only after npm GA.                                                                                                         |

**Recommendation:** Option A. M12’s acceptance criteria are about documentation correctness, not npm
availability.

**Decision owner:** ARB + sponsor.  
**Blocking:** M12 closure criteria.  
**If unresolved:** Use pre-release closure as the default.

---

### OD-11 — Implementation-Plan Authority

**Question:** Does ADS-011 approval authorize only M12.1 planning, M12.1 implementation, or the full
M12 program?

**Why it matters:** The governance workflow separates specification approval from implementation
authorization. A blanket approval could bypass phase gates.

**Options:**

| Option           | Description                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **A (selected)** | ADS-011 approval authorizes only M12.1 planning. No implementation, dependency installation, code/workflow change, or publication is authorized. |
| B                | ADS-011 approval authorizes M12.1 immediately.                                                                                                   |
| C                | ADS-011 approval authorizes the full M12 program.                                                                                                |

**Sponsor-selected recommendation:** Option A. It preserves the phase gates and matches
SPEC-GOVERNANCE-001. The user must explicitly authorize implementation after the M12.1 plan is
approved.

**ARB decision:** Approved with Observations (2026-11-13); planning only, no implementation or
publication.

**Decision owner:** ARB.  
**Blocking:** Implementation start.  
**If unresolved:** No implementation.

---

### OD-12 — Public `/docs/` Launch Timing

**Question:** Should `/docs/` be deployed as soon as it is technically ready, or held until M11’s
public-release posture is settled?

**Why it matters:** A public docs site with pre-release packages is acceptable if labeled; a docs
site that implies availability is not.

**Options:**

| Option              | Description                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------------- |
| **A (recommended)** | Deploy when the pre-release presentation and metadata gate pass; keep M11 messaging separate. |
| B                   | Hold until M11 is formally closed.                                                            |
| C                   | Deploy only after npm GA.                                                                     |

**Recommendation:** Option A, because the pre-release state is an explicit product state and the
portal must be tested in public conditions before GA.

**Decision owner:** Sponsor + ARB.  
**Blocking:** Deployment phase, not ADS freeze.  
**If unresolved:** Do not deploy `/docs/`; build and test locally only.

---

## 3. Decision Matrix

| ID   | Decision           | Owner | Blocks freeze? | Blocks implementation? | Sponsor-selected recommendation |
| ---- | ------------------ | ----- | -------------- | ---------------------- | ------------------------------- |
| OD-1 | ADS-011 identifier | ARB   | Yes            | Yes                    | Option A                        |
| OD-2 | DOC-3 form         | ARB   | Yes            | Yes                    | DOC-3a (A-1)                    |

**ARB verdict (2026-11-13):** OD-1, OD-2, OD-3, OD-4, OD-9, and OD-11 were approved with
observations; the remaining OD items stay open. | OD-3 | Governance versioning | ARB + owner | Yes
(for tracked governance) | Yes (for CI evidence) | Option A | | OD-4 | Roadmap placement | ARB +
sponsor | No | No (roadmap only) | Option A | | OD-5 | Core 12 | Sponsor + ARB | No | No (content
plan) | Option A | | OD-6 | Release-state source | Release owner + ARB | No | Yes (install UI) |
Option A | | OD-7 | Search dependency | ARB / plan | No | No | Option A | | OD-8 | Visual regression
scope | ARB / plan | No | No | Option A | | OD-9 | Separate ADR | ARB | No | No | Option A (no ADR)
| | OD-10 | Closure vs publication | ARB + sponsor | No | No (closure criteria) | Option A | | OD-11
| Implementation authority | ARB | No | Yes | Option A (planning only) | | OD-12 | `/docs/` launch
timing | Sponsor + ARB | No | Yes (deployment) | Option A |

---

## 4. Decision Log Template

When a decision is resolved, append a record:

```markdown
### D-XXX — [Decision title]

- **Decision:** [exact decision]
- **Date:** YYYY-MM-DD
- **Authority:** ARB / sponsor / release owner
- **Rationale:** [why]
- **Affected artifacts:** [paths]
- **Conditions:** [if any]
- **Status:** accepted / rejected / superseded
```

Do not mark a decision accepted based on this register. The authority records it.

### D-2026-11-13 — ARB verdict on ARB-1 through ARB-6

- **Decision:** Approved with Observations.
- **Date:** 2026-11-13.
- **Authority:** ARB (recorded via repository owner session decision).
- **Rationale:** the package was corrected and independently verified; the six recommendations are
  coherent.
- **Affected artifacts:** ADS-011, ADS-010 amendment record, `.gitignore`, official roadmap.
- **Conditions:** confirm M11 exit criteria and public-release state before implementation; freeze
  remains a separate step.
- **Freeze:** 2026-11-13.
- **Status:** accepted.

---

## 5. Current Blocking Summary

At the time of this submission (2026-11-13):

- **ADS-011 is frozen (2026-11-13)** after the observation (M11 exit criteria and explicit release
  state) was resolved as pre-release/unpublished.
- **The six governance artifacts are allowlisted and untracked**; they become repository evidence
  once committed.
- **The roadmap was updated** with M12 on 2026-11-13.
- **No implementation may start**; only M12.1 planning is authorized, and only after the freeze plus
  an explicit authorization.
- **The portal cannot claim npm availability** until OD-6 is resolved and the release state says so.
- **`/docs/` cannot be deployed** until OD-12 is resolved and the deployment phase is approved.

The six submitted decisions were approved with observations on 2026-11-13 and ADS-011 was frozen;
the remaining decisions stay open. No implementation has been performed.

---

**End of open decisions register.**
