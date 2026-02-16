## Context

Related to #<issue-number>

Describe the problem or feature this PR addresses.

## Main changes

- 

## Accessibility impact (WCAG 2.1 AA)

- 

## Performance impact

- 

## Compliance impact (GDPR / PIPEDA / Law 25)

- 

## Test-level mapping (FR34)

- [ ] Every functional test file changed in this PR maps to exactly one primary level (`component-unit`, `integration`, `e2e`, `visual`)
- [ ] Each mapping has a one-line rationale tied to the level's primary risk
- [ ] Any intentional overlap follows the exception protocol in `docs/development-guide.md`
- [ ] No prohibited duplication is introduced

## Storybook governance (required when applicable)

Complete this section if the PR changes `*.stories.*` files, `.storybook/*`, or visual baselines.

- [ ] Change stays within core Storybook scope (header, CTA, footer, contact, event-card/list, homepage smoke), or rationale is documented below
- [ ] Expected snapshot delta is stated (added/removed/unchanged)
- [ ] `npm run test:stories` executed and passing locally
- [ ] Chromatic baseline impact is described (if any)

### Storybook rationale (if scope expands)

- Why scope expansion is required:
- Why existing stories are insufficient:
- Risk if not covered:

## Validation evidence

- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run test:e2e` (when applicable)
- [ ] `npm run test:stories` (when applicable)
