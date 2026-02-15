# Story 8.1: Define and enforce test pyramid responsibilities

Status: review

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As Flavius (developer),
I want a documented and enforced test pyramid with non-overlapping responsibilities,
so that each test level validates distinct risks without duplication or coverage gaps.

## Acceptance Criteria

1. Given the project test strategy documentation is updated, when test levels are defined, then component-unit, integration, e2e, and visual levels each have explicit scope, ownership, and out-of-scope rules.
2. Overlap examples and anti-overlap rules are included for each level.
3. Given a PR adds or updates tests, when the review checklist is executed, then each added test is mapped to one pyramid level with explicit rationale.
4. Duplicate assertions across multiple levels are disallowed unless explicitly justified.
5. FR34 is satisfied with measurable test-level accountability.

## Tasks / Subtasks

- [x] Create a canonical "test pyramid responsibilities" section in project docs (AC: 1, 2)
  - [x] Define each level with: scope, owner, out-of-scope, and expected artifact type.
  - [x] Cover exactly these levels: component-unit, integration, e2e, visual.
  - [x] Include one "good fit" and one "anti-pattern" example per level.

- [x] Add anti-overlap governance rules and exception protocol (AC: 2, 4)
  - [x] Define overlap policy: one primary level per assertion.
  - [x] Define exception format: reason, risk, expiration or review point.
  - [x] Add examples of acceptable overlap vs prohibited duplication.

- [x] Add PR-level enforcement guidance (AC: 3, 4)
  - [x] Add a checklist section for "test level mapping" for each new/changed test.
  - [x] Require rationale when overlap is intentional.
  - [x] Align wording with existing CI checks and branch-protection intent.

- [x] Link governance outputs to measurable quality signals (AC: 5)
  - [x] Map FR34 to explicit, auditable test-level responsibilities.
  - [x] Connect policy outcomes to NFR-T1 (flakiness) and NFR-T2 (feedback time).

## Dev Notes

### Epic and Story Context

- Epic 8 focus: governance and determinism for test strategy (FR34–FR38).
- Story 8.1 is foundational: it defines the rules required by 8.2–8.5.
- Scope is documentation + process guardrails; no product UI feature is expected here.

### Current Baseline (What already exists)

- Existing test conventions are documented in `app/test/patterns/test-conventions.md`.
- Existing pyramid overview is present in `docs/development-guide.md` but needs stronger role boundaries and anti-overlap enforcement language.
- Existing CI jobs already run Vitest and Playwright in `.github/workflows/pr-checks.yml`.

### Technical Requirements

- Keep the stack unchanged (React Router v7 SSR, TypeScript, Vitest, Playwright, Storybook, Chromatic).
- Do not add dependencies for this story.
- Keep wording vendor-neutral where possible (especially for visual checks), while acknowledging current implementation.
- All implementation artifacts remain in English.

### Architecture Compliance

- Align with architecture decision on test strategy modernization and governance:
  - deterministic visual execution,
  - explicit gate ownership,
  - required checks / branch-protection alignment,
  - measurable release-quality telemetry.
- Respect Decision 4 mirror test structure and naming conventions for examples.

### Implementation Guardrails for Dev Agent

- Do not redefine folder mappings that are already canonical in `app/test/patterns/test-conventions.md`; extend and clarify responsibilities only.
- Do not move or rename existing tests in this story.
- Avoid introducing requirements that conflict with current CI scripts (`pr-checks.yml`).
- Ensure every rule is reviewable from PR text/checklist evidence.

### Suggested Files to Update (Implementation Target)

- `docs/development-guide.md` (authoritative pyramid responsibilities + anti-overlap policy)
- `app/test/patterns/test-conventions.md` (cross-reference to responsibility matrix)
- Optional if created by team convention: a PR checklist/template location under `.github/` for mandatory mapping prompts

### Testing Requirements (for this story)

- This story validates governance content quality, not runtime behavior.
- Minimum verification before review:
  - all levels have explicit scope/owner/out-of-scope,
  - anti-overlap examples exist for all levels,
  - PR mapping rule is explicit and actionable,
  - FR34 traceability is explicit,
  - NFR-T1 / NFR-T2 linkage is documented.

### Dependencies / Sequencing

- This story should be completed before implementation-heavy stories in Epic 8:
  - 8.2 tool-agnostic visual checks,
  - 8.3 blocking merge gates,
  - 8.4 baseline governance,
  - 8.5 release stability reporting.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 8, Story 8.1, FR34, NFR-T1/T2/T3/T4)
- `_bmad-output/planning-artifacts/architecture.md` (test strategy modernization and governance, Decision 4)
- `app/test/patterns/test-conventions.md` (canonical test placement and responsibilities)
- `docs/development-guide.md` (current test pyramid baseline)
- `.github/workflows/pr-checks.yml` (current enforceable CI checks)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (story tracking)

## Story Completion Status

- Story context refreshed for Epic 8 prioritization.
- Story is in `review`.
- Context includes guardrails to prevent overlap drift and non-actionable policy wording.

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story target explicitly selected by user: `8-1`.
- Existing 8-1 artifact reviewed and upgraded with stronger implementation guardrails.
- Updated `docs/development-guide.md` with a canonical responsibility matrix and anti-overlap governance.
- Updated `app/test/patterns/test-conventions.md` with cross-reference and mandatory PR mapping rule.
- Validation note: `npm run test` failed in this environment because `vitest` is unavailable locally; `npx vitest run` also failed due missing project dependencies (`@tailwindcss/vite`).

### Completion Notes List

- Added clearer enforcement-oriented tasks and anti-overlap protocol.
- Added concrete baseline references to existing docs and CI workflow.
- Kept scope constrained to governance/documentation as intended by Story 8.1.
- Added canonical responsibility matrix with required fields per level: scope, owner, out-of-scope, expected artifact, good-fit, and anti-pattern examples.
- Added mandatory PR checklist for test-level mapping and intentional-overlap rationale tied to branch-protection checks.
- Added FR34 traceability table with explicit auditable signals and linkage to NFR-T1 (flakiness) and NFR-T2 (feedback time).

### File List

- docs/development-guide.md (updated)
- app/test/patterns/test-conventions.md (updated)
- \_bmad-output/implementation-artifacts/8-1-define-and-enforce-test-pyramid-responsibilities.md (updated)
- \_bmad-output/implementation-artifacts/sprint-status.yaml (updated)
