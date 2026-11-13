# ADS-011 — ARB Review Checklist

**Review target:** ADS-011 — Documentation Platform  
**Initiative:** M12 — Documentation Platform  
**Specification status:** FROZEN (2026-11-13)  
**Submission status:** FROZEN (ARB, 2026-11-13)  
**Date prepared:** 2026-11-10  
**Updated:** 2026-11-12  
**Branch:** `docs/ads-011-arb-submission`  
**Prepared by:** Architecture governance process  
**Decision body:** Architecture Review Board (ARB)

> This checklist organized evidence for review. The ARB issued its verdict on 2026-11-13: Approved
> with Observations. ADS-011 was frozen on 2026-11-13; no implementation is authorized.

---

## 1. How to Use This Checklist

For each item, record one of:

- **PASS** — evidence satisfies the requirement;
- **FAIL** — evidence is missing or contradicts the requirement;
- **N/A** — not applicable, with a reason;
- **OBSERVATION** — acceptable with a condition or follow-up.

Do not mark an item PASS because the proposal asserts it. Mark PASS only when the referenced
artifact supports it.

The review has four possible outcomes:

1. **Approved** — proceed to freeze and implementation planning.
2. **Approved with Observations** — proceed, but resolve the observations before the next
   architectural milestone or before freeze, as the ARB specifies.
3. **Rejected** — return to the author; no implementation.
4. **Deferred** — a specific decision is missing; record the blocking item.

---

## 2. Submission Set

| Artifact                | Path                                                  | Purpose                                                                               | Present |
| ----------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------- | ------- |
| ADS-011                 | `docs/architecture/ads-011-documentation-platform.md` | Main architectural specification                                                      | [ ]     |
| ADS-010 impact register | `docs/architecture/ads-011-ads-010-impact.md`         | Decision-by-decision impact and proposed amendment                                    | [ ]     |
| M12 roadmap proposal    | `docs/roadmap/m12-documentation-platform-proposal.md` | Proposed additive milestone                                                           | [ ]     |
| Open decisions register | `docs/governance/ads-011-open-decisions.md`           | Decisions requiring ARB/sponsor resolution                                            | [ ]     |
| ARB submission package  | `docs/governance/ads-011-arb-readiness-package.md`    | Consolidated executive analysis of ARB-1 through ARB-6 (historical filename retained) | [ ]     |
| This checklist          | `docs/governance/ads-011-arb-review-checklist.md`     | Review structure and verdict                                                          | [ ]     |

**Reviewer note:** the current `.gitignore` excludes most `docs/**` content. Confirm whether these
files are versioned, staged, or only available in the working tree before treating them as
repository evidence. See §5.

### 2.1 Sponsor-Selected Recommendations (Not ARB Approvals)

The sponsor selected the following recommendations for ARB deliberation. None is approved.

| ID    | Decision                 | Selected recommendation                                                     | ARB verdict                |
| ----- | ------------------------ | --------------------------------------------------------------------------- | -------------------------- |
| ARB-1 | ADS-011 identifier       | Retire prior Consumer Validation use with a historical note; reuse ADS-011. | Approved with Observations |
| ARB-2 | ADS-010 DOC-3            | Additive Amendment A-1 (DOC-3a), preserving DOC-3 verbatim.                 | Approved with Observations |
| ARB-3 | Versioning               | Narrow allowlist: six artifacts + roadmap (ARB-3a).                         | Approved with Observations |
| ARB-4 | Roadmap                  | M12 after M11.                                                              | Approved with Observations |
| ARB-5 | ADR                      | No separate ADR.                                                            | Approved with Observations |
| ARB-6 | Implementation authority | M12.1 planning only.                                                        | Approved with Observations |

---

## 3. Identity and Status

|   # | Check                                                           | Evidence                  | Result |
| --: | --------------------------------------------------------------- | ------------------------- | ------ |
|   1 | Document is titled ADS-011 — Documentation Platform             | ADS-011 header            | [ ]    |
|   2 | Initiative is M12, not M11                                      | ADS-011 header and §2.3   | [ ]    |
|   3 | Status is Proposed, not Approved/Frozen                         | ADS-011 header and footer | [ ]    |
|   4 | Date is present                                                 | ADS-011 header            | [ ]    |
|   5 | Author, sponsor, approver roles are present                     | ADS-011 header            | [ ]    |
|   6 | Predecessor specifications are listed                           | ADS-011 header            | [ ]    |
|   7 | The document explicitly says it does not implement the platform | ADS-011 §1, §2.2, footer  | [ ]    |
|   8 | The document does not claim ARB approval                        | ADS-011 §3.5, §17         | [ ]    |

**Identity verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 4. Governance Process

|   # | Check                                                               | Evidence                         | Result |
| --: | ------------------------------------------------------------------- | -------------------------------- | ------ |
|   9 | ADS is treated as an architecture change requiring ARB review       | ADS-011 §3.1                     | [ ]    |
|  10 | The approval path matches SPEC-GOVERNANCE-001                       | ADS-011 §3.5                     | [ ]    |
|  11 | Implementation is gated on an approved/frozen ADS                   | ADS-011 §3.5, DOCP-22            | [ ]    |
|  12 | ADS-010 is not silently modified                                    | Impact register header, §8       | [ ]    |
|  13 | ADS-010 amendment procedure is respected                            | Impact register §8               | [ ]    |
|  14 | Roadmap update is recorded separately and was applied on 2026-11-13 | Roadmap proposal header, §7      | [ ]    |
|  15 | No separate ADR is required, or the need is documented              | ADS-011 §3.6; this checklist §12 | [ ]    |
|  16 | Required artifacts for ARB review are identified                    | ADS-011 §17; submission set      | [ ]    |
|  17 | Validation tier for this governance task is Documentation           | ADS-011 §3.3                     | [ ]    |

**Governance verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 5. Documentation Versioning

|   # | Check                                                                                                                             | Evidence                         | Result |
| --: | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------ |
|  18 | The proposal acknowledges that most `docs/**` content is gitignored                                                               | ADS-011 §4.3                     | [ ]    |
|  19 | The proposal identifies that ignored files are not reliable CI inputs                                                             | ADS-011 §4.3, DOCP-19            | [ ]    |
|  20 | A path for versioning these artifacts is proposed or flagged as a decision                                                        | Open decisions OD-3              | [ ]    |
|  21 | The portal build is prohibited from depending on untracked docs                                                                   | ADS-011 §4.3, §16 freeze rule 10 | [ ]    |
|  22 | The submission set is actually available for review (tracked/staged/attached)                                                     | Repository state                 | [ ]    |
| 22a | The allowlist permits the six submission artifacts plus the official roadmap (ARB-3a)                                             | Submission package §6.3          | [ ]    |
| 22b | The allowlist keeps other architecture, governance, roadmap entries, and superpowers paths ignored; ancestor rules were validated | Submission package §6.3          | [ ]    |

**Versioning verdict:** PASS / FAIL / OBSERVATION  
**Blocking issue if any:**

> The allowlist was applied on 2026-11-13. The six artifacts are untracked and can be staged
> normally; they remain unversioned until committed. Do not mark this section PASS merely because
> “the files exist on disk.”

---

## 6. M12 and M11 Separation

|   # | Check                                                                                   | Evidence                            | Result |
| --: | --------------------------------------------------------------------------------------- | ----------------------------------- | ------ |
|  23 | M11 remains Open Source Readiness                                                       | ADS-011 §2.3; roadmap proposal §2   | [ ]    |
|  24 | M12 is additive and does not reopen M10/M11                                             | ADS-011 §2.3; roadmap proposal §2   | [ ]    |
|  25 | M12 dependency on ADS-011 is explicit                                                   | Roadmap proposal §4.1               | [ ]    |
| 25a | M12 follows M11; implementation waits for M11 exit criteria **and** known release state | Roadmap proposal §4.6; ADS-011 §2.3 | [ ]    |
|  26 | M12 does not assume npm publication                                                     | ADS-011 §8; roadmap proposal §3     | [ ]    |
|  27 | M12 does not claim M11 is complete                                                      | ADS-011 §8.1; roadmap proposal §3   | [ ]    |
|  28 | The roadmap remains unchanged until approval                                            | Roadmap proposal header, §9         | [ ]    |

**M12/M11 verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 7. ADS-010 Relationship

|   # | Check                                                                                          | Evidence                                       | Result |
| --: | ---------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------ |
|  29 | DOC-1 is preserved                                                                             | Impact register §4.6                           | [ ]    |
|  30 | DOC-2 is preserved                                                                             | Impact register §4.6                           | [ ]    |
|  31 | DOC-3 is explicitly addressed                                                                  | Impact register §4.6                           | [ ]    |
|  32 | The proposed DOC-3 amendment preserves Storybook as interactive API reference                  | Impact register §4.6                           | [ ]    |
|  33 | The proposed amendment preserves Storybook deployment at `/`                                   | Impact register §4.6                           | [ ]    |
|  34 | The proposed amendment does not remove or replace Storybook                                    | Impact register §4.6                           | [ ]    |
|  35 | PUB-1 private/public split is preserved                                                        | Impact register §4.2                           | [ ]    |
|  36 | VER/REL/VAL/PRE/COM/CI/ROA decisions are assessed                                              | Impact register §4                             | [ ]    |
|  37 | SPC-1 identifier conflict is identified                                                        | Impact register §4.10                          | [ ]    |
|  38 | The identifier conflict is marked as requiring resolution before freeze                        | ADS-011 §3.4; impact register §4.10            | [ ]    |
|  39 | The historical ADS-010 text is preserved                                                       | Impact register §8                             | [ ]    |
|  40 | The amendment record template is present                                                       | Impact register §8                             | [ ]    |
| 40a | The exact additive DOC-3a text distinguishes Storybook, Documentation Platform, and Playground | Impact register §4.6; submission package §6.2  | [ ]    |
| 40b | The historical retirement note for the prior ADS-011 is present                                | Impact register §4.10; submission package §6.1 | [ ]    |

**ADS-010 verdict:** PASS / FAIL / OBSERVATION  
**Selected DOC-3 form:** DOC-3a additive under A-1 (ARB-approved 2026-11-13) / replacement /
other:  
**Selected SPC-1 option:** A (retire/reuse, sponsor-selected) / B / C / other:  
**Notes:**

---

## 8. Architecture

|   # | Check                                                              | Evidence                 | Result |
| --: | ------------------------------------------------------------------ | ------------------------ | ------ |
|  41 | `apps/docs` is the proposed location                               | ADS-011 §5.2             | [ ]    |
|  42 | The app is private and not in the npm publish set                  | ADS-011 §5.2             | [ ]    |
|  43 | Next.js App Router with static export is specified                 | ADS-011 §5.2             | [ ]    |
|  44 | Base path is `/holiveira-design-system/docs`                       | ADS-011 §5.2, §7.4       | [ ]    |
|  45 | `trailingSlash` is specified                                       | ADS-011 §5.2, §7.4       | [ ]    |
|  46 | Public packages are consumed via `workspace:*`                     | ADS-011 §5.2–5.3         | [ ]    |
|  47 | `transpilePackages` is specified                                   | ADS-011 §5.2             | [ ]    |
|  48 | Private packages are excluded from imports and `transpilePackages` | ADS-011 §5.3, §6.7, §9.7 | [ ]    |
|  49 | No package source is copied or forked                              | ADS-011 §5.1, §5.3       | [ ]    |
|  50 | Storybook remains the interactive API reference                    | ADS-011 §5.5, DOCP-17    | [ ]    |
|  51 | Playground remains the integration demo                            | ADS-011 §5.5, DOCP-18    | [ ]    |
|  52 | Direct previews are specified; iframe is not primary               | ADS-011 §5.5, §5.10      | [ ]    |
|  53 | CSS strategy follows the verified theme-source + `@source` pattern | ADS-011 §5.12            | [ ]    |
|  54 | App-local Turbo output is defined                                  | ADS-011 §5.2             | [ ]    |
|  55 | No existing app configuration is changed by this ADS               | ADS-011 §2.2, §16        | [ ]    |

**Architecture verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 9. Catalog and Information Architecture

|   # | Check                                                                                                  | Evidence            | Result |
| --: | ------------------------------------------------------------------------------------------------------ | ------------------- | ------ |
|  56 | All 16 public packages are in scope                                                                    | ADS-011 §5.7        | [ ]    |
|  57 | The 4 private packages are explicitly excluded                                                         | ADS-011 §6.7        | [ ]    |
|  58 | The core 12 component pages are explicitly listed                                                      | ADS-011 §5.7        | [ ]    |
|  59 | The remaining public components have a documented path                                                 | ADS-011 §5.7        | [ ]    |
|  60 | The page contract has all required sections                                                            | ADS-011 §5.9        | [ ]    |
|  61 | The URL model is explicit and stable                                                                   | ADS-011 §5.8        | [ ]    |
|  62 | Navigation is registry-driven                                                                          | ADS-011 §5.6, §5.11 | [ ]    |
|  63 | Search is static and excludes private packages                                                         | ADS-011 §5.11, §9.4 | [ ]    |
|  64 | Guides cover installation, theming, tokens, styling, a11y, forms, charts, layouts, icons, architecture | ADS-011 §5.6, §5.7  | [ ]    |
|  65 | Versioning of docs pages is explicitly out of scope for v1                                             | ADS-011 §2.2        | [ ]    |

**Catalog verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 10. Source of Truth and Metadata

|   # | Check                                                                        | Evidence           | Result |
| --: | ---------------------------------------------------------------------------- | ------------------ | ------ |
|  66 | Source precedence is explicitly defined                                      | ADS-011 §6.1       | [ ]    |
|  67 | `package.json` is authoritative for identity/visibility/peers                | ADS-011 §6.1       | [ ]    |
|  68 | Public barrels are authoritative for exports                                 | ADS-011 §6.1       | [ ]    |
|  69 | TypeScript is authoritative for prop structure                               | ADS-011 §6.1       | [ ]    |
|  70 | CVA/implementation is authoritative for variants                             | ADS-011 §6.1       | [ ]    |
|  71 | Contracts are treated as API intent, with conflicts failing closed           | ADS-011 §6.1       | [ ]    |
|  72 | Storybook/Playground are examples, not API facts                             | ADS-011 §6.1       | [ ]    |
|  73 | Editorial content cannot override generated facts                            | ADS-011 §6.8, §16  | [ ]    |
|  74 | `private: false` is not treated as “published”                               | ADS-011 §6.1, §8   | [ ]    |
|  75 | Generated artifacts are deterministic                                        | ADS-011 §6.2, §9.6 | [ ]    |
|  76 | The generator does not use network or browser inference                      | ADS-011 §6.2       | [ ]    |
|  77 | Props separate component-specific, variant, and inherited native props       | ADS-011 §6.4       | [ ]    |
|  78 | Variants are extracted statically, not guessed from CSS                      | ADS-011 §6.5       | [ ]    |
|  79 | Missing descriptions are not fabricated                                      | ADS-011 §6.8       | [ ]    |
|  80 | `check:docs:metadata` is proposed as a read-only gate                        | ADS-011 §6.9       | [ ]    |
|  81 | The gate fails on private leakage, missing exports, missing pages, and drift | ADS-011 §6.9       | [ ]    |

**Metadata verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 11. Publication and Pre-Release

|   # | Check                                                           | Evidence           | Result |
| --: | --------------------------------------------------------------- | ------------------ | ------ |
|  82 | `/` = Storybook, `/playground/` = Playground, `/docs/` = portal | ADS-011 §7.1       | [ ]    |
|  83 | One Pages artifact is preserved                                 | ADS-011 §7.2       | [ ]    |
|  84 | Build order places copies after `build:storybook`               | ADS-011 §7.3       | [ ]    |
|  85 | Base-path asset validation is specified                         | ADS-011 §7.4       | [ ]    |
|  86 | Existing URLs are explicitly preserved                          | ADS-011 §7.2, §14  | [ ]    |
|  87 | No workflow change is made by this ADS                          | ADS-011 §7.6       | [ ]    |
|  88 | Current publication state is accurately described               | ADS-011 §8.1       | [ ]    |
|  89 | Pre-release banner and install-mode rules are defined           | ADS-011 §8.2       | [ ]    |
|  90 | `pnpm add` is not presented as currently functional             | ADS-011 §8.2       | [ ]    |
|  91 | Release state has a single owner/source                         | ADS-011 §8.3       | [ ]    |
|  92 | Release-state transition procedure is defined                   | ADS-011 §8.5       | [ ]    |
|  93 | The portal does not publish packages                            | ADS-011 §2.2, §8.5 | [ ]    |

**Publication verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 12. ADR and Decision Record

|   # | Check                                                                      | Evidence                   | Result |
| --: | -------------------------------------------------------------------------- | -------------------------- | ------ |
|  94 | The ADS records the architectural decisions (DOCP-1..22)                   | ADS-011 §10                | [ ]    |
|  95 | A separate ADR is not required for this ADS, or the requirement is stated  | ADS-011 §3.6; this section | [ ]    |
|  96 | If a separate ADR is required, it is identified before approval            | This checklist             | [ ]    |
|  97 | The decision record does not duplicate the ADS as a second source of truth | ADS-011 §3.6               | [ ]    |

**ADR verdict:** PASS / FAIL / OBSERVATION  
**Decision:** No separate ADR required (sponsor-selected) / ADR required before freeze / N/A  
**Evidence:** SPEC-GOVERNANCE-001 §12.2 does not mandate a per-ADS ADR; no tracked ADR file exists;
ADS-011 records DOCP-1..22; ADS-002..010 are frozen without separate ADR files.  
**Notes:**

---

## 13. Accessibility, Performance, Security, Quality

|   # | Check                                                              | Evidence                | Result |
| --: | ------------------------------------------------------------------ | ----------------------- | ------ |
|  98 | WCAG 2.2 AA is required                                            | ADS-011 §9.1            | [ ]    |
|  99 | Keyboard navigation and focus management are required              | ADS-011 §9.2            | [ ]    |
| 100 | Responsive behavior is specified                                   | ADS-011 §9.3            | [ ]    |
| 101 | Search accessibility is specified                                  | ADS-011 §9.4            | [ ]    |
| 102 | Performance targets are proposed and measurable                    | ADS-011 §9.5            | [ ]    |
| 103 | Metadata integrity is enforced                                     | ADS-011 §9.6            | [ ]    |
| 104 | Private package protection is enforced at generation and test time | ADS-011 §9.7            | [ ]    |
| 105 | Static export/GitHub Pages constraints are respected               | ADS-011 §9.8            | [ ]    |
| 106 | Security constraints are stated                                    | ADS-011 §9.9            | [ ]    |
| 107 | Content quality and “description pending” rules are stated         | ADS-011 §9.10           | [ ]    |
| 108 | Tests include unit, metadata, export, e2e, and a11y layers         | ADS-011 §5.14           | [ ]    |
| 109 | The root Vitest include limitation is acknowledged                 | ADS-011 §5.14; §12 R-15 | [ ]    |

**Quality verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 14. Risks and Mitigations

|   # | Check                                                    | Evidence               | Result |
| --: | -------------------------------------------------------- | ---------------------- | ------ |
| 110 | Governance/identifier risks are recorded                 | ADS-011 §12 R-1, R-2   | [ ]    |
| 111 | Documentation versioning risk is recorded                | ADS-011 §12 R-3        | [ ]    |
| 112 | Pages/build-order risk is recorded                       | ADS-011 §12 R-4, R-5   | [ ]    |
| 113 | Existing test regression risk is recorded                | ADS-011 §12 R-6        | [ ]    |
| 114 | Metadata/CVA/editorial drift risks are recorded          | ADS-011 §12 R-7..R-9   | [ ]    |
| 115 | Private package leakage is recorded                      | ADS-011 §12 R-10       | [ ]    |
| 116 | Pre-release misinformation is recorded                   | ADS-011 §12 R-11       | [ ]    |
| 117 | Storybook duplication risk is recorded                   | ADS-011 §12 R-12       | [ ]    |
| 118 | Accessibility/performance/maintenance risks are recorded | ADS-011 §12 R-13..R-20 | [ ]    |
| 119 | Each risk has a mitigation                               | ADS-011 §12            | [ ]    |

**Risk verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 15. Roadmap

|   # | Check                                                         | Evidence                    | Result |
| --: | ------------------------------------------------------------- | --------------------------- | ------ |
| 120 | M12 is additive and does not reuse M11                        | Roadmap proposal §2         | [ ]    |
| 121 | M11 remains Open Source Readiness                             | Roadmap proposal §2         | [ ]    |
| 122 | The M12 row was applied to the roadmap on 2026-11-13          | Roadmap proposal §4.2       | [ ]    |
| 123 | Dependencies are explicit                                     | Roadmap proposal §4.1       | [ ]    |
| 124 | Deliverables D12.1–D12.7 are defined                          | Roadmap proposal §5         | [ ]    |
| 125 | Acceptance criteria and validation exist for each deliverable | Roadmap proposal §5         | [ ]    |
| 126 | The roadmap remains unchanged until approval                  | Roadmap proposal §7, §9     | [ ]    |
| 127 | Total effort and success criteria changes are identified      | Roadmap proposal §4.2, §4.4 | [ ]    |

**Roadmap verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 16. Implementation Prohibition

|   # | Check                                                                                        | Evidence                                  | Result |
| --: | -------------------------------------------------------------------------------------------- | ----------------------------------------- | ------ |
| 128 | No `apps/docs` was created by this governance task                                           | Working tree                              | [ ]    |
| 129 | No dependency was installed                                                                  | Working tree / lockfile                   | [ ]    |
| 130 | No `package.json`, workspace, Turbo, or workflow file was changed                            | Working tree                              | [ ]    |
| 131 | Storybook/Playground were not changed                                                        | Working tree                              | [ ]    |
| 132 | No package/component/API was changed                                                         | Working tree                              | [ ]    |
| 133 | No generator, page, layout, or docs component was created                                    | Working tree                              | [ ]    |
| 134 | No commit, push, or merge was performed                                                      | Git state                                 | [ ]    |
| 135 | ADS-011 is not marked approved                                                               | ADS-011 header                            | [ ]    |
| 136 | ARB-6 limits authorization to M12.1 planning; no implementation or publication is authorized | ADS-011 §13, §17; submission package §6.6 | [ ]    |

**Implementation prohibition verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 17. Evidence Verification

The reviewer should independently verify at least the following:

| Evidence                                        | Verification method                                         | Result |
| ----------------------------------------------- | ----------------------------------------------------------- | ------ |
| Current branch is `docs/ads-011-arb-submission` | `git branch --show-current`                                 | [ ]    |
| Branch originates from `origin/main`            | `git merge-base --is-ancestor origin/main HEAD`             | [ ]    |
| Working tree contains only authorized docs      | `git status --porcelain`                                    | [ ]    |
| No package manifest changed                     | `git diff --name-only`                                      | [ ]    |
| No workflow changed                             | `git diff --name-only`                                      | [ ]    |
| No `apps/docs` exists                           | `test ! -d apps/docs`                                       | [ ]    |
| ADS-011 is Proposed                             | header check                                                | [ ]    |
| ADS-010 is unchanged                            | `git diff -- docs/architecture/ads-010-release.md`          | [ ]    |
| Roadmap is unchanged                            | `git diff -- docs/roadmap/engineering-execution-roadmap.md` | [ ]    |
| 16 public / 4 private packages                  | manifest scan                                               | [ ]    |
| `.gitignore` status of new docs                 | `git status --ignored`                                      | [ ]    |

**Evidence verdict:** PASS / FAIL / OBSERVATION  
**Notes:**

---

## 18. Decisions Before the ARB

The sponsor selected these recommendations for decision. The ARB must accept, modify, or reject
each:

1. **ARB-1 — Identifier:** retire the prior ADS-011 (Consumer Validation) with a historical note and
   reuse ADS-011 for Documentation Platform.
2. **ARB-2 — DOC-3:** adopt the additive Amendment A-1 (DOC-3a), preserving DOC-3 verbatim.
3. **ARB-3 — Versioning:** adopt the narrow `.gitignore` allowlist for the ADS-011/M12 artifacts.
4. **ARB-4 — Roadmap:** place M12 after M11 with the entry/exit criteria in the roadmap proposal.
5. **ARB-5 — ADR:** dispense with a separate ADR; ADS-011 is the decision record.
6. **ARB-6 — Implementation authority:** authorize only M12.1 planning; no implementation or
   publication is authorized.

Additional open questions (core set, release-state ownership, search dependency, visual regression,
closure vs npm publication, `/docs/` launch timing) remain in the open decisions register and do not
block the six-item submission unless the ARB makes them conditions.

Record answers verbatim in the verdict section.

---

## 19. Verdict

**Review date:** 2026-11-13

**ARB verdict:**

- [ ] Approved
- [x] Approved with Observations
- [ ] Rejected
- [ ] Deferred

**ARB-1 identifier decision:** A — retire prior ADS-011 and reuse

**ARB-2 DOC-3 decision:** additive DOC-3a (A-1); DOC-3 preserved verbatim

**ARB-3 versioning decision:** narrow allowlist: six submission artifacts + official roadmap
(ARB-3a)

**ARB-4 roadmap decision:** M12 after M11; applied 2026-11-13

**ARB-5 ADR decision:** no separate ADR

**ARB-6 implementation authority:** planning only; no implementation or publication

**Authorized next step:** M12.1 planning only after the freeze (2026-11-13) and an explicit
authorization; no implementation is authorized.

**Observations / conditions:**

1. Confirm M11's exit criteria and the explicit public-release state before M12 implementation.
   **Resolved 2026-11-13** (M11 DoD recorded; release state pre-release/unpublished).

**Required before freeze:**

1. None — resolved 2026-11-13.

**Freeze date:** 2026-11-13

**Reviewer / ARB representative:** Repository owner (session decision)

**Date:** 2026-11-13

> The verdict was recorded on 2026-11-13. This checklist records the evidence; the canonical records
> are the readiness package Appendix A and the ADS-010 amendment record.

---

## 20. Review Summary

| Area                       | PASS | FAIL | OBSERVATION | N/A |
| -------------------------- | ---: | ---: | ----------: | --: |
| Identity and status        |      |      |             |     |
| Governance process         |      |      |             |     |
| Documentation versioning   |      |      |             |     |
| M12/M11 separation         |      |      |             |     |
| ADS-010 relationship       |      |      |             |     |
| Architecture               |      |      |             |     |
| Catalog and IA             |      |      |             |     |
| Source of truth/metadata   |      |      |             |     |
| Publication/pre-release    |      |      |             |     |
| ADR                        |      |      |             |     |
| Quality                    |      |      |             |     |
| Risks                      |      |      |             |     |
| Roadmap                    |      |      |             |     |
| Implementation prohibition |      |      |             |     |
| Evidence                   |      |      |             |     |

**Overall:** PASS  
**ARB verdict (2026-11-13):** Approved with Observations.  
**Blocking findings:** none.  
**Non-blocking observations:** confirm M11's exit criteria and public-release state before
implementation.  
**Recommended next action:** request explicit authorization for M12.1 planning; no implementation.

---

**End of ARB review checklist.**
