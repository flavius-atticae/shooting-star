# Story 1.2: Normalize file naming conventions

Status: done

## Story

As a developer or AI agent,
I want all files to follow the project's kebab-case and server-suffix conventions,
so that file naming is deterministic and unambiguous for agents implementing new features.

## Acceptance Criteria

1. Given `app/components/layout/hero/Hero.tsx` exists, when it is renamed to `app/components/layout/hero/hero.tsx`, then all imports referencing `Hero.tsx` are updated.
2. The hero barrel export in `app/components/layout/hero/index.ts` is updated to reference `./hero` consistently.
3. Given `app/lib/rate-limiter.ts` exists, when it is renamed to `app/lib/rate-limiter.server.ts`, then all imports referencing `~/lib/rate-limiter` are updated.
4. The rate limiter remains server-only and excluded from client bundle after the rename.
5. Existing tests and stories continue to pass for touched areas.

## Tasks / Subtasks

- [x] Rename hero component file and update references (AC: 1, 2)
  - [x] Rename `app/components/layout/hero/Hero.tsx` → `app/components/layout/hero/hero.tsx`.
  - [x] Update route imports currently using `~/components/layout/hero/Hero`:
    - [x] `app/routes/home.tsx`
    - [x] `app/routes/about.tsx`
    - [x] `app/routes/doula.tsx`
    - [x] `app/routes/yoga.tsx`
    - [x] `app/routes/feminin-sacre.tsx`
  - [x] Update hero local imports/exports:
    - [x] `app/components/layout/hero/index.ts`
    - [x] `app/components/layout/hero/hero.stories.tsx`

- [x] Rename rate limiter to server module and update references (AC: 3, 4)
  - [x] Rename `app/lib/rate-limiter.ts` → `app/lib/rate-limiter.server.ts`.
  - [x] Update imports in:
    - [x] `app/routes/contact.tsx`
    - [x] `app/lib/index.ts` (removed re-export to prevent client bundle leakage)
    - [x] `app/test/lib/contact-action.test.ts`
    - [x] `app/test/lib/rate-limiter.test.ts`
  - [x] Confirm no client-side module imports `rate-limiter.server` directly or transitively.

- [x] Validate no regressions and naming consistency (AC: 5)
  - [x] Run `npm run typecheck`.
  - [x] Validate touched areas according to current testing policy (typecheck/build/story checks; Vitest suite tracked in story 7-3).
  - [x] Run focused route/story checks for hero usage.

## Dev Notes

### Story foundation

- This story is the second story in Epic 1 and enforces deterministic file conventions identified as architecture anomalies.
- Scope is strictly naming normalization and import updates.
- Do not combine this story with unrelated refactors.

### Developer context section

- Target story selected from sprint order: `1-2-normalize-file-naming-conventions`.
- Existing anomaly files confirmed in codebase:
  - `app/components/layout/hero/Hero.tsx`
  - `app/lib/rate-limiter.ts`
- Current import references to update:
  - Hero path references appear in routes and hero local barrel/story files.
  - Rate limiter references appear in route action, library barrel, and tests.

### Technical requirements

- Keep stack unchanged: React Router v7 SSR + Vite + TypeScript.
- Apply kebab-case consistently for filenames.
- Preserve public symbol names (`Hero`, `HeroContent`, `isRateLimited`, `resetRateLimiter`) unless explicitly required otherwise.
- Keep behavior unchanged; this is a structural rename story.

### Architecture compliance

- Enforce naming rules from architecture patterns:
  - Component files in kebab-case.
  - Server-only modules must use `.server.ts` suffix.
- Ensure server-only isolation after rename:
  - No client component, hook, or browser utility imports `rate-limiter.server.ts`.
  - Contact flow remains routed through server `action` boundaries.

### Library/framework requirements

- No new dependency should be added.
- Follow React Router file conventions and Vite module resolution behavior.
- Use existing import alias (`~/`) conventions.

### File structure requirements

- Files expected to be renamed:
  - `app/components/layout/hero/Hero.tsx` → `app/components/layout/hero/hero.tsx`
  - `app/lib/rate-limiter.ts` → `app/lib/rate-limiter.server.ts`
- Files expected to be updated:
  - `app/components/layout/hero/index.ts`
  - `app/components/layout/hero/hero.stories.tsx`
  - `app/routes/home.tsx`
  - `app/routes/about.tsx`
  - `app/routes/doula.tsx`
  - `app/routes/yoga.tsx`
  - `app/routes/feminin-sacre.tsx`
  - `app/routes/contact.tsx`
  - `app/lib/index.ts`
  - `app/test/lib/contact-action.test.ts`
  - `app/test/lib/rate-limiter.test.ts`

### Testing requirements

- Minimum required validation before implementation completion:
  - `npm run typecheck` passes.
  - Follow current sprint testing policy (Vitest policy review tracked by Story 7-3).
  - Any affected stories/routes render without broken imports.
- Keep changes narrow; do not rewrite tests unless required by renamed paths.

### Previous story intelligence

- Story 1.1 introduced `app/lib/content.server.ts` + `app/lib/content.ts` abstraction and completed successfully.
- A prior typecheck issue was caused by optionality mismatch (`buttonHref`) and was resolved by aligning types.
- Keep this story focused on rename/import safety to avoid similar type drift.

### Git intelligence summary

- Recent commits on `main` are documentation/process heavy (`[#000] Add technical research analysis reports`, Story 1.1 finalization), with dependency updates (`zod`, `lucide-react`) already landed.
- No conflicting in-flight code branch assumptions should be made for this story; work from current `main` state.

### Latest tech information

- TypeScript `forceConsistentCasingInFileNames` guards cross-platform import casing issues; renaming `Hero.tsx` to `hero.tsx` must align all import paths exactly.
- React Router `.server` module convention keeps server-only files out of client bundles; renaming `rate-limiter.ts` to `rate-limiter.server.ts` aligns with this.
- Vite transpiles TypeScript but does not type-check; explicit `npm run typecheck` is mandatory to validate path/casing renames.

### Reinvention prevention checklist

- Do not rewrite the hero component internals; only rename file and references.
- Do not alter rate limiting logic/configuration; only move to server-suffixed file and adjust imports.
- Do not introduce new abstractions or dependencies.

### Project Structure Notes

- This story tightens deterministic naming for AI-agent reliability and protects server/client boundaries.
- Changes should be low risk if import graph is fully updated and typecheck/tests pass.

### References

- `_bmad-output/planning-artifacts/epics.md` (Epic 1, Story 1.2)
- `_bmad-output/planning-artifacts/architecture.md` (Known anomalies + naming/server-only patterns)
- `_bmad-output/planning-artifacts/prd.md` (FR29/FR30/FR33 contributor and agent consistency goals)
- `_bmad-output/planning-artifacts/ux-design-specification.md` (preserve current UX behavior while refactoring internals)
- `_bmad-output/implementation-artifacts/1-1-create-content-abstraction-layer.md` (prior story learnings)

## Story completion status

### Change Log

- [2026-02-15] Renamed `Hero.tsx` → `hero.tsx` and updated all 7 import references (5 routes, 1 barrel, 1 story file).
- [2026-02-15] Renamed `rate-limiter.ts` → `rate-limiter.server.ts`, updated 3 import references, removed re-export from `app/lib/index.ts` to enforce server-only isolation.
- [2026-02-15] Validated: typecheck ✅, production build ✅, client bundle isolation ✅, Codacy analysis on modified story file ✅.
- [2026-02-15] Code review fixes applied: AC5 evidence clarified per sprint policy; File List and completion notes aligned with actual modified files.

## Story completion status

- Story context generated with deterministic rename targets, explicit impacted files, and server-boundary guardrails.
- Sprint tracking status for this story: `done`.
- Completion note: rename/import normalization complete with review fixes applied.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.6

### Debug Log References

- Sprint status scan selected first backlog story in order: `1-2-normalize-file-naming-conventions`.
- Existing file and import references validated across routes, barrel exports, and tests.
- Architecture/UX/PRD context and previous story learnings incorporated.
- Hero.tsx renamed via two-step `git mv` (temp file) to handle case-insensitive filesystems.
- Rate-limiter re-export removed from `app/lib/index.ts` barrel to prevent server-only code leaking into client bundle.

### Completion Notes List

- `Hero.tsx` → `hero.tsx`: File renamed, all 5 route imports + barrel + story updated from `./Hero` / `~/components/layout/hero/Hero` to lowercase.
- `rate-limiter.ts` → `rate-limiter.server.ts`: File renamed, imports updated in `contact.tsx`, `contact-action.test.ts`, `rate-limiter.test.ts`. Re-export removed from `app/lib/index.ts` with comment explaining server-only isolation.
- `npm run typecheck` passes (0 errors).
- `npm run build` passes — production bundles generated without errors.
- Client bundle verified: no `rate-limiter`/`isRateLimited`/`resetRateLimiter` strings present.
- Codacy CLI analysis: no issues reported on the story artifact after review fixes.
- Unit tests not directly runnable due to known Storybook/Vitest integration constraint (tracked in story 7-3).

### Implementation Plan

1. Rename `Hero.tsx` → `hero.tsx` via `git mv` two-step for case-sensitivity safety.
2. Update all import paths (5 routes, 1 barrel, 1 story file) from `./Hero` → `./hero`.
3. Rename `rate-limiter.ts` → `rate-limiter.server.ts` via `git mv`.
4. Remove re-export from `app/lib/index.ts` (prevents client bundle contamination).
5. Update direct imports in `contact.tsx`, `contact-action.test.ts`, `rate-limiter.test.ts`.
6. Validate: typecheck, build, client bundle grep, Codacy analysis.

### File List

- app/components/layout/hero/hero.tsx (renamed from Hero.tsx)
- app/components/layout/hero/index.ts (modified)
- app/components/layout/hero/hero.stories.tsx (modified)
- app/routes/home.tsx (modified)
- app/routes/about.tsx (modified)
- app/routes/doula.tsx (modified)
- app/routes/yoga.tsx (modified)
- app/routes/feminin-sacre.tsx (modified)
- app/lib/rate-limiter.server.ts (renamed from rate-limiter.ts)
- app/lib/index.ts (modified)
- app/routes/contact.tsx (modified)
- app/test/lib/contact-action.test.ts (modified)
- app/test/lib/rate-limiter.test.ts (modified)
- .codacy/codacy.yaml (modified)
- \_bmad-output/implementation-artifacts/1-2-normalize-file-naming-conventions.md (modified)
- \_bmad-output/implementation-artifacts/sprint-status.yaml (modified)
