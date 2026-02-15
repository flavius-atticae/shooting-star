# Story 1.3: Establish test conventions documentation

Status: done

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a new contributor (human or AI),
I want clear test organization conventions with mirror directory structure,
so that given any source file path, the corresponding test file path is deterministic and I can start contributing in ≤ 60 minutes.

## Acceptance Criteria

1. Given a new source file is created at `app/components/ui/scroll-reveal.tsx`, when a developer or agent needs to write a test, then the test is placed at `app/test/components/ui/scroll-reveal.test.tsx` following the documented mirror structure.
2. The test conventions document at `app/test/patterns/test-conventions.md` is updated with the complete mapping rules from Architecture Decision 4.
3. The naming convention (kebab-case + `.test.ts(x)`) is documented with examples.

## Tasks / Subtasks

- [x] Audit current test structure and naming usage (AC: 2, 3)
  - [x] Inventory existing test paths under `app/test/components`, `app/test/lib`, `app/test/integration`, and `app/test/e2e`.
  - [x] Identify any naming/path patterns that conflict with Architecture Decision 4 mirror-structure rules.
- [x] Create or update conventions document (AC: 2, 3)
  - [x] Create `app/test/patterns/test-conventions.md` with deterministic source→test path mapping rules.
  - [x] Document kebab-case test naming with `.test.ts` / `.test.tsx` examples.
  - [x] Include explicit examples for components, lib utilities, route integration tests, and Playwright e2e specs.
- [x] Validate mirror-path mapping with Story 1.3 scenario (AC: 1)
  - [x] Add explicit mapping example: `app/components/ui/scroll-reveal.tsx` → `app/test/components/ui/scroll-reveal.test.tsx`.
  - [x] Verify all documented mappings align with current repository structure and import aliases.
- [x] Verify documentation quality and contributor readiness (AC: 2, 3)
  - [x] Ensure instructions are actionable for both human and AI contributors.
  - [x] Confirm a new contributor can determine target test file paths without additional clarification.

### Review Follow-ups (AI)

- [x] [AI-Review] (HIGH) Align `rate-limiter` mapping with server-only naming (`app/lib/rate-limiter.server.ts`) in conventions examples and inventory [app/test/patterns/test-conventions.md:33]
- [x] [AI-Review] (HIGH) Implement real `healthCardNumber` validation or remove the unsupported assertion path in e2e helper/spec usage [app/test/e2e/helpers/pregnancy-safe.ts:218]
- [x] [AI-Review] (MEDIUM) Replace external `axe-core` CDN injection with local dependency usage for deterministic CI [app/test/e2e/helpers/pregnancy-safe.ts:149]
- [x] [AI-Review] (MEDIUM) Replace unsupported axe rule keys (`motion-sensitive`, `focus-order`, `touch-target`) with valid rules/tags or documented checks [app/test/e2e/helpers/pregnancy-safe.ts:161]
- [x] [AI-Review] (MEDIUM) Strengthen placeholder e2e assertions with feature-level checks instead of structure-only visibility assertions [app/test/e2e/specs/persona-journeys.spec.ts:33]

## Dev Notes

- Story selected from sprint tracking order: `1-3-establish-test-conventions-documentation`.
- This story is documentation-first and must not introduce functional behavior changes to routes or UI components.
- Primary implementation artifact is `app/test/patterns/test-conventions.md` (currently missing), which must become the source of truth for deterministic test placement.
- Scope is constrained to conventions and contributor guidance, but validation must reference the real repository structure under `app/test/`.
- Architecture Decision 4 is the governing rule: mirror source structure in tests, use deterministic naming, and keep test-level responsibilities explicit.
- Cross-story continuity:
  - Story 1.1 established deterministic content access conventions for contributors/agents.
  - Story 1.2 normalized naming conventions (`kebab-case`, `.server.ts`) and reinforced import/path consistency.
- Success signal for this story: a new contributor can infer test file destination from source path without additional clarification.

### Project Structure Notes

- The target test structure aligns to existing folders:
  - `app/test/components/` for component-level unit tests
  - `app/test/lib/` for utility and server-safe unit tests
  - `app/test/integration/` for route/integration coverage
  - `app/test/e2e/` for Playwright end-to-end specs
- Story documentation must explicitly explain mapping expectations between `app/components/*`, `app/lib/*`, `app/routes/*` and corresponding test locations.
- The conventions document should treat kebab-case test filenames (`*.test.ts` / `*.test.tsx`) as mandatory for new tests.
- If exceptions are needed, they must be documented with rationale to preserve agent determinism.

### Technical Requirements

- Do not change runtime application behavior; this story only formalizes test placement and naming conventions.
- Author the conventions in English (code/documentation language rule), while preserving repository terminology and folder names exactly.
- Ensure deterministic source→test mapping rules for at least these source zones:
  - `app/components/**`
  - `app/lib/**`
  - `app/routes/**`
  - `app/hooks/**` (if applicable by existing patterns)
- Use naming rules aligned with architecture and prior stories:
  - Test files in kebab-case
  - Suffix `.test.ts` for non-TSX tests
  - Suffix `.test.tsx` for React/component tests
- Include explicit handling guidance for server-only modules (`*.server.ts`) to avoid accidental client-oriented test placement assumptions.
- Keep conventions practical for both humans and AI agents: concise rules, concrete examples, minimal interpretation required.

### Architecture Compliance

- Conventions must align with Architecture Decision 4 (test mirror structure) as documented in planning artifacts.
- Test responsibility boundaries must remain explicit and non-overlapping:
  - unit/component concerns under `app/test/components` and `app/test/lib`
  - route behavior and composition under `app/test/integration`
  - end-user journeys under `app/test/e2e`
- Naming and placement rules must be compatible with existing architecture patterns:
  - kebab-case filenames
  - deterministic folder mirroring from source to test tree
  - no ambiguous fallback locations for new tests
- Documentation must reinforce existing boundary constraints introduced in previous stories:
  - server-only concerns remain clearly identified
  - conventions should not encourage importing server modules into browser-oriented test contexts.

### Library / Framework Requirements

- Keep implementation within the current repository toolchain; do not introduce new dependencies for this story.
- Conventions must reflect the active testing stack in `package.json`:
  - `vitest` for unit/component/integration test execution
  - `@testing-library/react` and `@testing-library/user-event` for component behavior patterns
  - `playwright` for end-to-end test specs under `app/test/e2e`
  - Storybook/Chromatic context acknowledged for visual workflows without redefining their ownership in this story
- Mapping rules in the conventions doc must remain compatible with existing npm scripts:
  - `npm run test`
  - `npm run test:e2e`
  - `npm run test:all`
- Ensure conventions avoid framework-mixing ambiguity (for example, no Cypress/Jest path conventions).
- Keep React Router v7 SSR context explicit where route tests are documented (integration tests validate route behavior, not browser-wide user journeys).

### File Structure Requirements

- Story output artifact to create/update:
  - `app/test/patterns/test-conventions.md`
- The conventions document must define canonical mirror mappings from source to test tree, including:
  - `app/components/<path>/<name>.tsx` → `app/test/components/<path>/<name>.test.tsx`
  - `app/lib/<path>/<name>.ts` → `app/test/lib/<path>/<name>.test.ts`
  - `app/lib/<path>/<name>.server.ts` → `app/test/lib/<path>/<name>.test.ts`
  - `app/routes/<route>.tsx` → `app/test/integration/<route>-route.test.tsx` (or existing route-test naming pattern when already established)
  - e2e journeys remain under `app/test/e2e/**/*.spec.ts`
- The story must include explicit example mappings for nested paths (not only top-level files).
- Conventions must prohibit placing new tests outside `app/test/**` unless a documented exception is approved.
- If legacy test files diverge from the convention, documentation should classify them as legacy and define the expected path for all new files.

### Testing Requirements

- This story is documentation-focused; testing validates clarity, consistency, and conformance to architecture conventions.
- Minimum validation checklist for completion:
  - Confirm `app/test/patterns/test-conventions.md` exists and is readable in one pass.
  - Verify every mapping rule is deterministic (one source path pattern → one expected test path pattern).
  - Verify AC1 example is explicitly documented:
    - `app/components/ui/scroll-reveal.tsx` → `app/test/components/ui/scroll-reveal.test.tsx`
  - Verify naming guidance includes both `.test.ts` and `.test.tsx` with concrete examples.
  - Verify test-level boundaries (unit/component/integration/e2e) are stated without overlap ambiguity.
- Repository-level verification commands for implementer handoff:
  - `npm run typecheck`
  - `npm run test`
  - `npm run test:e2e` (when story scope includes e2e changes; otherwise document as not required)
- Definition of done for this story:
  - Conventions document committed and linked in story context
  - Acceptance criteria traceable to explicit sections/examples in the conventions doc
  - No contradictory guidance with Architecture Decision 4 or existing `app/test` structure

### Previous Story Intelligence

- Source story reviewed: `1-2-normalize-file-naming-conventions`.
- Reusable lessons from Story 1.2:
  - Deterministic naming and path consistency reduce agent ambiguity and rework.
  - Changes touching conventions should stay narrow and avoid unrelated refactors.
  - Validation evidence should be explicit and tied to acceptance criteria, not generic statements.
  - Server/client boundary guidance must be explicit in docs to prevent accidental misuse by contributors.
- Story 1.3 implications:
  - Document naming/path conventions with exact examples instead of abstract rules only.
  - Include clear treatment for `.server.ts` sources in test mapping guidance.
  - Keep deliverable focused on conventions artifact (`app/test/patterns/test-conventions.md`) and traceable AC coverage.

### Git Intelligence Summary

- Recent commit patterns indicate sprint artifacts and status tracking updates are handled together with story creation (`sprint-status.yaml` updated in each story kickoff).
- Story 1.2 commit confirms repository-level enforcement of naming determinism (kebab-case + `.server.ts`) and test path updates in `app/test/lib`.
- No recent commits indicate conflicting testing framework migration; conventions should align with current Vitest + Playwright stack.
- Practical guidance for this story:
  - keep scope narrow to conventions documentation
  - avoid changing test runtime behavior
  - ensure explicit mapping examples to prevent interpretation drift by future agents

### Latest Tech Information

- Current repository testing stack (from `package.json`) is already modern and suitable for this story context:
  - `vitest` `^4.0.14`
  - `@vitest/browser` `^4.0.14`
  - `@testing-library/react` `^16.3.0`
  - `@playwright/test` `^1.56.1`
  - `storybook` `^10.1.10`
- No dependency upgrades are required to complete Story 1.3; this is a conventions/documentation implementation.
- Conventions should reference stable responsibilities rather than tool internals to remain durable across minor version changes.

### Project Context Reference

- A dedicated `project-context.md` file was not detected during workflow execution; planning artifacts were used as source of truth.
- Primary context documents used:
  - `_bmad-output/planning-artifacts/epics.md`
  - `_bmad-output/planning-artifacts/architecture.md`
  - `_bmad-output/planning-artifacts/prd.md`
  - `_bmad-output/planning-artifacts/ux-design-specification.md`
  - `_bmad-output/implementation-artifacts/1-2-normalize-file-naming-conventions.md`

### Story Completion Status

- Story context generation completed for `1-3-establish-test-conventions-documentation`.
- Output story file is ready for developer implementation handoff.
- Sprint status must reflect this story as `ready-for-dev`.
- Completion note: Ultimate context engine analysis completed - comprehensive developer guide created.

### References

- [Source: _bmad-output/planning-artifacts/epics.md#Story 1.3: Establish test conventions documentation]
- [Source: _bmad-output/planning-artifacts/architecture.md#Decision 4: Test Organization — Mirror Structure]
- [Source: _bmad-output/planning-artifacts/prd.md#FR29-FR33 and FR34-FR38]
- [Source: _bmad-output/planning-artifacts/ux-design-specification.md#Responsive Design & Accessibility]
- [Source: _bmad-output/implementation-artifacts/1-2-normalize-file-naming-conventions.md#Previous Story Intelligence]
- [Source: package.json#scripts and devDependencies]

## Dev Agent Record

### Agent Model Used

GPT-5.3-Codex

### Debug Log References

- Sprint story selection from status order: `1-3-establish-test-conventions-documentation`.
- Epic/architecture/PRD/UX artifacts loaded and analyzed for Story 1.3 constraints.
- Previous story (`1-2`) context and recent git history incorporated into guardrails.
- Template checkpoints completed in sequence under YOLO continuation.

### Completion Notes List

- Story scaffold created at `_bmad-output/implementation-artifacts/1-3-establish-test-conventions-documentation.md`.
- Acceptance criteria translated into actionable implementation tasks and deterministic mapping requirements.
- Developer context expanded with architecture compliance, framework constraints, file-structure rules, testing requirements, previous-story intelligence, git intelligence, and latest tech context.
- Ready-for-dev handoff prepared; sprint status update pending/completed in this workflow step.
- Created `app/test/patterns/test-conventions.md` with deterministic mirror mappings for components, lib, routes, hooks, and e2e.
- Verified AC1 explicit mapping: `app/components/ui/scroll-reveal.tsx` → `app/test/components/ui/scroll-reveal.test.tsx`.
- Validation executed: `npm run test` (pass), targeted Playwright specs (pass), `npm run test:e2e` (122/122 pass).
- Stabilized Playwright performance helper against transient navigation context resets.
- Closed all AI code-review follow-ups (High/Medium) with targeted fixes in test conventions and e2e helpers/specs.

### File List

- \_bmad-output/implementation-artifacts/1-3-establish-test-conventions-documentation.md
- \_bmad-output/implementation-artifacts/sprint-status.yaml
- app/test/patterns/test-conventions.md
- app/test/e2e/helpers/pregnancy-safe.ts
- app/test/e2e/specs/comprehensive-scenarios.spec.ts
- app/test/e2e/specs/persona-journeys.spec.ts
- app/test/e2e/specs/security.spec.ts

### Change Log

- 2026-02-15: Finalized Story 1.3 conventions documentation and completed validation gates; set status to `review`.
- 2026-02-15: Code review follow-ups captured under `Review Follow-ups (AI)`; story status moved to `in-progress`.
- 2026-02-15: Applied and validated AI review fixes; set status to `done`.
