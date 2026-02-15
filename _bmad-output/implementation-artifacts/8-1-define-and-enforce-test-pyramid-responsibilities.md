# Story 8.1: Define and enforce test pyramid responsibilities

Status: ready-for-dev

## Story

As Flavius (developer),
I want a documented and enforced test pyramid with non-overlapping responsibilities,
so that each test level validates distinct risks without duplication or coverage gaps.

## Acceptance Criteria

1. Given the project test strategy documentation is updated, when test levels are defined, then unit, integration, component, e2e, and visual levels each have explicit scope, ownership, and out-of-scope rules.
2. Overlap examples and anti-overlap rules are documented for each test level.
3. Given a PR adds or updates tests, when the review checklist is executed, then each added test is mapped to one pyramid level with explicit rationale.
4. Duplicate assertions across levels are disallowed unless explicitly justified in PR notes.
5. FR34 is satisfied with measurable test-level accountability and traceability to NFR-T1 and NFR-T2 signals.

## Tasks / Subtasks

- [ ] Create test pyramid strategy document section (AC: 1, 2)
  - [ ] Define scope, owner, and out-of-scope rules for unit tests.
  - [ ] Define scope, owner, and out-of-scope rules for integration tests.
  - [ ] Define scope, owner, and out-of-scope rules for component tests.
  - [ ] Define scope, owner, and out-of-scope rules for e2e tests.
  - [ ] Define scope, owner, and out-of-scope rules for visual regression tests.

- [ ] Add anti-overlap policy and examples (AC: 2, 4)
  - [ ] Document at least one valid and one invalid overlap scenario per level.
  - [ ] Add explicit exception process for intentional overlap with rationale.

- [ ] Add PR review checklist mapping rule (AC: 3, 4)
  - [ ] Introduce a mandatory checklist item requiring level classification for each new/changed test.
  - [ ] Define required justification format when overlap is intentionally accepted.

- [ ] Add traceability hooks to quality signals (AC: 5)
  - [ ] Link level ownership and classification to flakiness monitoring intent (NFR-T1).
  - [ ] Link review-cycle predictability intent to mandatory-check timing expectations (NFR-T2).

## Dev Notes

### Story foundation

- This story is the entry point of Epic 8 and defines governance rules before implementing new CI mechanics.
- Scope is documentation + governance enforcement design (no runtime product feature work).
- Keep wording vendor-neutral and outcome-focused.

### Technical requirements

- Maintain existing stack and workflows.
- Do not introduce new dependencies for this story.
- Keep all code/comments/docs in English for implementation artifacts.

### Architecture compliance

- Align with architecture section: "Test Strategy Modernization and Governance (FR34–FR38)".
- Ensure deterministic terminology across PRD, architecture, epics, and sprint tracking.

### File structure targets

- Primary update targets for implementation:
  - `_bmad-output/planning-artifacts/architecture.md` (test-governance section references)
  - `_bmad-output/planning-artifacts/epics.md` (story-level traceability confirmation)
  - `docs/development-guide.md` (test pyramid responsibilities)
  - `.github/pull_request_template.md` or equivalent PR checklist location (if present)

### Testing requirements

- Validation for this story is governance consistency, not runtime feature behavior.
- Required evidence before moving to review:
  - Updated documentation includes all five levels.
  - PR checklist includes mandatory level mapping.
  - Traceability to FR34, NFR-T1, NFR-T2 is explicit.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 8, Story 8.1)
- `_bmad-output/planning-artifacts/architecture.md` (Test Strategy Modernization)
- `_bmad-output/planning-artifacts/prd.md` (FR34, NFR-T1, NFR-T2)
- `_bmad-output/implementation-artifacts/sprint-status.yaml` (story state tracking)

## Story completion status

- Story context generated and marked `ready-for-dev`.
- Sprint tracking updated to start Epic 8 execution.

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Story 8.1 selected from Epic 8 backlog.
- Story scaffold created using existing implementation-artifact format.

### Completion Notes List

- Story artifact created.
- Acceptance criteria mapped to implementation tasks.
- Governance-first sequence preserved for Epic 8.

### File List

- _bmad-output/implementation-artifacts/8-1-define-and-enforce-test-pyramid-responsibilities.md (new)
