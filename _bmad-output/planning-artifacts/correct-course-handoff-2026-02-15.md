# Correct Course Handoff — Test Strategy Alignment

Date: 2026-02-15  
Prepared by: Winston (Architect)

## Context

Implementation Readiness identified a traceability break after PRD updates:
- PRD now defines FR34–FR38 and NFR-T1..NFR-T4 (Test Strategy Modernization).
- Epics and Architecture are still aligned to the previous 33-FR baseline.
- Readiness status is currently **NEEDS WORK**.

Reference report:
- `_bmad-output/planning-artifacts/implementation-readiness-report-2026-02-15.md`

## Problem Statement

The planning set is inconsistent:
1. PRD baseline: 38 FRs (including FR34–FR38).
2. Epics baseline: 33 FRs (FR34–FR38 missing from executable stories).
3. Architecture narrative still references 33 FRs and does not fully operationalize the test-strategy expansion.

This blocks reliable implementation sequencing and quality-gate governance.

## Correct Course Objective

Realign planning artifacts so that FR34–FR38 and NFR-T1..NFR-T4 are fully implementable, testable, and traceable across:
- PRD
- Architecture
- Epics & Stories
- Implementation Readiness

## Scope for Bob (SM) — What to Drive

### 1) Artifact Realignment Decision
Choose and document one explicit structure:
- Option A: Extend Epic 7 to include FR34–FR38, OR
- Option B: Create a dedicated new epic for Test Strategy Modernization.

Recommendation: Option B for cleaner ownership, scope visibility, and sprint planning clarity.

### 2) Epics/Stories Remediation
Ensure explicit story coverage for:
- FR34: Test pyramid with non-overlapping responsibilities.
- FR35: Tool-agnostic visual checks in CI.
- FR36: Blocking merge gates for test-strategy checks.
- FR37: Traceable visual baseline approval/update flow via PR.
- FR38: Release-level test stability reporting (flakiness, durations, false positives).

### 3) Architecture Remediation
Add/adjust architecture sections for:
- Deterministic visual rendering environment.
- Vendor decoupling strategy for visual regression.
- CI gate architecture (required checks, branch protections, failure semantics).
- Baseline governance model (ownership, approval path, auditability).
- Stability telemetry architecture (data sources, aggregation, release reporting).

### 4) Readiness Revalidation
Re-run Implementation Readiness after artifact updates.
Target outcome: **READY** with full FR coverage and explicit quality-governance path.

## Acceptance Criteria for Correct Course Output

1. Epics document maps all FR1–FR38 with no gaps.
2. FR34–FR38 each have executable stories with measurable acceptance criteria.
3. NFR-T1..NFR-T4 are mapped to specific stories and test signals.
4. Architecture and Epics reference the same baseline counts and terminology.
5. Readiness report confirms 100% FR coverage and no critical traceability defects.

## Risks if Not Corrected

- Implementation ambiguity and story churn.
- Inconsistent CI quality gates and baseline drift.
- Poor confidence in visual regression signal quality.
- Delayed sprint planning and unstable execution sequence.

## Suggested Command

- `/bmad-bmm-correct-course`

## Suggested Prompt for Bob

"Run Correct Course to resolve traceability defects introduced by PRD test-strategy expansion (FR34–FR38, NFR-T1..NFR-T4). Produce a corrected artifact plan and remediation sequence for Architecture + Epics + Readiness so the project returns to READY status."
