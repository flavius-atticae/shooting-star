# Sprint Change Proposal — Test Strategy Traceability Realignment

Date: 2026-02-15
Prepared by: Bob (Scrum Master)
Project: shooting-star
Mode: Incremental

## 1) Issue Summary

A traceability break was identified after PRD expansion to FR34–FR38 and NFR-T1..NFR-T4 (Test Strategy Modernization).

- PRD baseline: 38 FRs + 27 NFRs (including FR34–FR38 and NFR-T1..NFR-T4)
- Epics baseline before correction: 33 FRs (FR34–FR38 missing from executable stories)
- Architecture baseline before correction: 33 FRs / 23 NFRs
- Implementation Readiness status before correction: NEEDS WORK

Trigger context:

- Trigger story reference: 1.1
- Discovery source: implementation readiness + cross-artifact validation

Core problem statement:

- Planning artifacts were no longer synchronized after PRD updates, creating execution ambiguity for CI quality gates, visual baseline governance, and release stability reporting.

## 2) Impact Analysis

### Epic Impact

- Epic 7 remained partially valid (FR31–FR32) but under-scoped for the expanded test strategy.
- FR34–FR38 required explicit executable stories with measurable acceptance criteria.
- Decision taken: add a dedicated Epic 8 for Test Strategy Modernization and Governance.

### Story Impact

New stories required:

- 8.1 Define and enforce test pyramid responsibilities (FR34)
- 8.2 Implement tool-agnostic visual checks in CI (FR35)
- 8.3 Enforce blocking merge gates for test-strategy checks (FR36)
- 8.4 Govern visual baseline updates via traceable PR flow (FR37)
- 8.5 Publish release-level test stability reporting (FR38)

### Artifact Conflicts

- PRD: no conflict, already the source of truth.
- Epics: missing FR34–FR38 operationalization.
- Architecture: baseline counts and governance details incomplete for test modernization.
- Readiness: needed revalidation after artifacts update.

### Technical/Operational Impact

- CI governance needed stronger explicit semantics for required checks and failure behavior.
- Baseline management needed auditable PR ownership and approvals.
- Release quality reporting needed consistent telemetry and storage location.

## 3) Recommended Approach

Selected path: Hybrid with explicit structural remediation (Option B)

- Keep existing plan intact where valid.
- Introduce a dedicated Epic 8 for FR34–FR38.
- Align architecture baseline and governance sections to the PRD baseline.
- Revalidate readiness after changes.

Rationale:

- Lowest ambiguity for implementation planning.
- Stronger ownership and sequencing than extending Epic 7 only.
- Full FR/NFR traceability with measurable signals.

Effort and risk:

- Effort: Medium (planning artifact updates + governance specification)
- Risk: Low-Medium (documentation/governance changes, no production code refactor required)
- Timeline impact: Low (can be integrated in current planning cycle)

## 4) Detailed Change Proposals

### A) Epics & Stories

#### Change A1 — Add FR34–FR38 coverage

OLD:

- FR coverage map ended at FR33.

NEW:

- FR coverage map includes FR34–FR38 mapped to Epic 8.

Justification:

- Restores FR1–FR38 end-to-end coverage.

#### Change A2 — Add dedicated Epic 8

OLD:

- Epic 7 included quality and workflow concerns but did not fully cover FR34–FR38.

NEW:

- New Epic 8: Test Strategy Modernization and Governance.
- Includes Stories 8.1–8.5 with measurable acceptance criteria.

Justification:

- Clear ownership, predictable sequencing, and implementation-ready scope.

#### Change A3 — Add NFR-T1..NFR-T4 visibility

OLD:

- NFR-T quality constraints were not explicitly represented in Epics NFR inventory.

NEW:

- NFR-T1..NFR-T4 added under Test Platform Quality in epics requirements inventory.

Justification:

- Makes quality thresholds explicit and reviewable in execution planning.

### B) Architecture

#### Change B1 — Update baseline counts

OLD:

- 33 FRs across 8 categories; 23 NFRs across 4 categories.

NEW:

- 38 FRs across 9 categories; 27 NFRs across 5 categories.
- Added Test Strategy Modernization category (FR34–FR38).
- Added Test Platform Quality category (NFR-T1..NFR-T4).

Justification:

- Restores consistency with PRD baseline.

#### Change B2 — Add explicit test-strategy governance architecture

OLD:

- Governance details were implicit/partial.

NEW:

- Added section for deterministic visual rendering, vendor decoupling, blocking gates, baseline PR governance, and release telemetry.

Justification:

- Converts quality strategy into operational architecture.

### C) Execution Tracking

#### Change C1 — Update sprint status

OLD:

- Tracking ended at Epic 7.

NEW:

- Added Epic 8 and stories 8.1–8.5 as backlog entries.

Justification:

- Enables immediate execution routing in sprint tracking.

### D) Readiness Revalidation

#### Change D1 — Produce revalidation report

OLD:

- Previous readiness report remained NEEDS WORK.

NEW:

- New readiness revalidation report produced after artifact alignment.

Justification:

- Confirms closure of critical traceability gap.

## 5) Implementation Handoff

Scope classification: Moderate

Why Moderate:

- Changes alter planning/governance structure and backlog sequencing, but do not require fundamental product replan.

Handoff recipients and responsibilities:

- Scrum Master / Product Owner
  - Confirm Epic 8 prioritization and sprint sequencing.
  - Ensure backlog ordering and dependencies are explicit.

- Architect
  - Validate architecture governance wording for CI and baseline controls.
  - Confirm deterministic rendering and telemetry constraints.

- Development Team
  - Implement stories 8.1–8.5 incrementally.
  - Wire CI checks and reporting outputs to required thresholds.

- QA
  - Validate measurable signals for NFR-T1..NFR-T4.
  - Enforce baseline auditability and release-report completeness.

Success criteria for implementation:

- FR1–FR38 fully mapped in epics with no gaps.
- FR34–FR38 each mapped to executable stories and measurable acceptance criteria.
- NFR-T1..NFR-T4 mapped to specific stories and test signals.
- Architecture and epics use the same baseline counts and terminology.
- Revalidation readiness confirms READY with no critical traceability defects.

## Approval Record

- User approval checkpoints:
  - Sections 1–2: approved
  - Sections 3–4 path forward: approved
  - Edit proposals (epics/architecture/readiness/sprint-status): approved
- Final proposal status: Approved for implementation routing
- Explicit final approval:
  - Decision: yes
  - Date: 2026-02-15
  - Scope classification confirmed: Moderate
  - Routing confirmed: Product Owner / Scrum Master coordination, then Architect + Development + QA execution handoff
