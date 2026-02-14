---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: []
workflowType: "research"
lastStep: 5
research_type: "technical"
research_topic: "Test strategy pyramid for shooting-star with visual regression without Chromatic"
research_goals: "1) Redefine the full testing pyramid for the project, 2) Replace Chromatic while keeping visual snapshot testing, 3) Deliver an in-depth technical analysis with actionable migration options"
user_name: "Flavius"
date: "2026-02-14"
web_research_enabled: true
source_verification: true
---

# Research Report: technical

**Date:** 2026-02-14
**Author:** Flavius
**Research Type:** technical

---

## Research Overview

[Research overview and methodology will be appended here]

---

## Technical Research Scope Confirmation

**Research Topic:** Test strategy pyramid for shooting-star with visual regression without Chromatic
**Research Goals:** 1) Redefine the full testing pyramid for the project, 2) Replace Chromatic while keeping visual snapshot testing, 3) Deliver an in-depth technical analysis with actionable migration options

**Technical Research Scope:**

- Architecture Analysis - design patterns, frameworks, system architecture
- Implementation Approaches - development methodologies, coding patterns
- Technology Stack - languages, frameworks, tools, platforms
- Integration Patterns - APIs, protocols, interoperability
- Performance Considerations - scalability, optimization, patterns

**Research Methodology:**

- Current web data with rigorous source verification
- Multi-source validation for critical technical claims
- Confidence level framework for uncertain information
- Comprehensive technical coverage with architecture-specific insights

**Scope Confirmed:** 2026-02-14

## Technology Stack Analysis

### Programming Languages

For this repository context (TypeScript + React Router SSR + Vite), TypeScript remains the dominant language for balancing refactor safety and velocity in UI-heavy systems. The critical current shift is not language replacement, but improving test signal quality at each layer using tools that execute in real browsers where needed. This aligns with modern guidance emphasizing behavior-first assertions and realistic browser execution for UI confidence.
_Popular Languages: TypeScript and JavaScript remain the de facto implementation stack for React/Vite applications and test tooling ecosystems._
_Emerging Languages: No practical replacement trend is compelling for this codebase; migration risk outweighs expected testing gains._
_Language Evolution: Emphasis is moving from syntax-level differences to stronger typing + browser-realistic test execution and CI governance._
_Performance Characteristics: TypeScript adds compile-time checks and maintainability, while runtime speed/cost optimization depends primarily on test layering and execution strategy._
_Source: https://vitest.dev/guide/ , https://testing-library.com/docs/react-testing-library/intro/ , https://vitest.dev/guide/browser/component-testing_

### Development Frameworks and Libraries

The strongest replacement path for Chromatic-centric visual testing is a hybrid framework model: (1) Storybook + Vitest addon for component behavior, interaction, and coverage alignment; (2) Playwright visual assertions for deterministic screenshot diffs in CI; (3) optional visual review SaaS (e.g., Argos) when PR review UX and baseline lifecycle automation are priorities. This supports a pyramid with broad, fast component checks and a narrower visual/E2E top.
_Major Frameworks: Vitest (including Browser Mode), Playwright, Storybook testing integrations, React Testing Library patterns._
_Micro-frameworks: jest-image-snapshot and Storybook test-runner hook-based snapshots remain viable targeted options, but are generally secondary to Vitest Browser Mode + Playwright-first flows in Vite projects._
_Evolution Trends: Storybook ecosystem explicitly promotes Vitest integration for Vite projects; Playwright visual tooling and CI guidance continue to mature around deterministic baselines._
_Ecosystem Maturity: Playwright/Vitest/Storybook are actively maintained with current docs and CI recipes; Argos offers direct Storybook and Playwright SDKs for managed visual review pipelines._
_Source: https://storybook.js.org/docs/writing-tests , https://playwright.dev/docs/test-snapshots , https://playwright.dev/docs/ci , https://vitest.dev/guide/browser/visual-regression-testing , https://argos-ci.com/docs/quickstart/storybook , https://argos-ci.com/docs/quickstart/playwright , https://github.com/storybookjs/test-runner_

### Database and Storage Technologies

In this testing strategy domain, “storage” is primarily snapshot, artifact, and baseline persistence rather than application databases. The key architecture decision is where visual baselines live and how they are versioned: Git-tracked screenshot baselines (optionally Git LFS at scale), or remote baseline stores managed by external services. For your constraints (quota pressure on Chromatic), a controlled in-repo baseline + CI artifact model is the lowest lock-in path.
_Relational Databases: Not central for visual baseline workflow design in this scope._
_NoSQL Databases: Not central unless adopting custom metadata services for diff history._
_In-Memory Databases: Not relevant to visual baseline persistence strategy._
_Data Warehousing: Optional only for large-scale analytics over test flakiness and change patterns._
_Source: https://vitest.dev/guide/browser/visual-regression-testing , https://playwright.dev/docs/test-snapshots , https://argos-ci.com/docs/baseline-build , https://github.com/reg-viz/reg-suit_

### Development Tools and Platforms

A practical toolchain for this repo should separate concerns by speed and confidence level: Vitest for unit/integration and component behavior in Browser Mode where fidelity matters; Playwright for high-value end-to-end journeys and visual checkpoints; Storybook stories as reusable test cases; CI orchestration with stable browser/runtime containers to reduce screenshot drift. This removes dependency on Chromatic quotas while preserving visual coverage.
_IDE and Editors: VS Code ecosystem aligns well with Vitest and Playwright workflows._
_Version Control: Git remains the source of truth for test code and optional baseline images (with review discipline)._
_Build Systems: Vite-powered pipelines support fast feedback loops and test project partitioning._
_Testing Frameworks: Vitest + Testing Library for behavior-focused tests; Playwright for E2E and screenshot assertions; Storybook testing integrations for component-centric confidence._
_Source: https://vitest.dev/guide/ , https://vitest.dev/guide/projects , https://vitest.dev/guide/browser/component-testing , https://playwright.dev/docs/ci , https://storybook.js.org/docs/writing-tests_

### Cloud Infrastructure and Deployment

For visual stability, infrastructure consistency is more important than raw compute scale. Official guidance from Playwright and Vitest converges on deterministic environments (containerized Linux + pinned browser/runtime) to avoid false positives from font/rendering drift. If you need richer review UX and baseline governance beyond artifacts, managed platforms like Argos/Percy are optional overlays, not mandatory core dependencies.
_Major Cloud Providers: Not prescriptive for this scope; CI consistency and artifact retention policies matter more than provider brand._
_Container Technologies: Containerized execution is strongly recommended for stable screenshots and reproducible CI runs._
_Serverless Platforms: Generally secondary for test execution due to browser/runtime constraints and deterministic environment needs._
_CDN and Edge Computing: Mostly relevant to deployed E2E target environments, not baseline generation itself._
_Source: https://playwright.dev/docs/ci , https://playwright.dev/docs/docker , https://vitest.dev/guide/browser/visual-regression-testing , https://argos-ci.com/docs/getting-started , https://percy.io/_

### Technology Adoption Trends

The dominant trend is moving visual testing from proprietary hosted-only lanes toward composable pipelines: open test runner + deterministic CI + optional review service. For your case, this supports a staged migration off Chromatic: keep Storybook for state coverage, centralize functional confidence in Vitest/Playwright, and decide separately whether visual review remains self-managed (artifacts + PR checks) or service-assisted (Argos/Percy).
_Migration Patterns: Teams increasingly split visual detection from visual review, enabling vendor substitution with minimal disruption._
_Emerging Technologies: Vitest Browser Mode visual APIs and Storybook Vitest integration are increasingly central in Vite ecosystems._
_Legacy Technology: Purely broad E2E-heavy pyramids without strong component/integration layers continue to show maintenance and flakiness costs._
_Community Trends: Emphasis on behavior-focused testing, deterministic environments, and minimal duplication across pyramid layers._
_Source: https://vitest.dev/guide/browser/visual-regression-testing , https://storybook.js.org/docs/writing-tests , https://playwright.dev/docs/test-snapshots , https://martinfowler.com/articles/practical-test-pyramid.html , https://github.com/storybookjs/test-runner_

## Integration Patterns Analysis

### API Design Patterns

For this testing strategy migration, the most effective API pattern is not a business API redesign but a tooling-integration contract: unify test outputs from Vitest and Playwright into CI-consumable artifacts and annotations, then layer optional visual-review APIs/services on top. Practically, this means standardizing on machine-readable reporters (JSON/JUnit/GitHub annotations), reusable Storybook story contracts, and explicit snapshot lifecycle commands. This reduces vendor lock-in and allows a progressive replacement of Chromatic without losing review rigor.
_RESTful APIs: CI platforms and test services expose mostly REST-oriented integration endpoints and artifact workflows; keeping results in standard formats eases interop._
_GraphQL APIs: Useful for advanced PR/status querying in some platforms, but not required for the core migration path._
_RPC and gRPC: Not a primary integration need in this repo’s test toolchain; file/report interfaces are more relevant._
_Webhook Patterns: CI event hooks (push/PR/deployment_status) are the practical trigger model for visual and E2E workflows._
_Source: https://playwright.dev/docs/test-reporters , https://vitest.dev/guide/reporters , https://storybook.js.org/docs/writing-tests/in-ci , https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions_

### Communication Protocols

HTTP(S)-based orchestration dominates this stack: CI jobs launch runners, reporters emit files, and services consume uploads over HTTPS. Real-time protocols are secondary for execution but can appear in dashboards and preview environments. The key decision is reliability and determinism rather than protocol novelty: stable runner image, stable browser stack, predictable output channels.
_HTTP/HTTPS Protocols: Core for CI runners, artifact upload/download, status checks, and optional SaaS visual review._
_WebSocket Protocols: Occasionally used by dev servers/UIs, but not the backbone of regression pipeline transport._
_Message Queue Protocols: Typically unnecessary for this repo scale; CI job orchestration already provides sequencing._
_grpc and Protocol Buffers: Not required for baseline migration; useful mainly in large distributed test platforms._
_Source: https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions , https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts , https://playwright.dev/docs/ci_

### Data Formats and Standards

The winning format strategy is mixed: PNG (or equivalent image assets) for visual baselines/diffs, plus JUnit/JSON for test telemetry and gating. This gives both human review and machine-enforceable quality gates. For this migration, keep snapshot file conventions explicit and automate update flows (`--update-snapshots`) only in controlled review branches.
_JSON and XML: JSON and JUnit XML are first-class outputs for Vitest/Playwright integration into CI and PR checks._
_Protobuf and MessagePack: Not required in the default migration path._
_CSV and Flat Files: Useful only for ad hoc analytics exports, not primary execution._
_Custom Data Formats: Snapshot path templates and naming conventions form a lightweight custom standard for baseline governance._
_Source: https://vitest.dev/guide/reporters , https://playwright.dev/docs/test-reporters , https://playwright.dev/docs/test-snapshots_

### System Interoperability Approaches

Interoperability should be designed around portable test assets: stories, specs, and reporter outputs that can be consumed by multiple tools. Storybook’s portable stories are the strongest leverage point—same story scenarios can feed unit-like tests and browser-driven tests, reducing duplication and drift. CI then acts as the interoperability bus via jobs, artifacts, and required checks.
_Point-to-Point Integration: Direct Vitest↔Playwright↔Storybook couplings are possible but become brittle without CI-mediated contracts._
_API Gateway Patterns: In this context, CI orchestration serves as a logical gateway for reports, artifacts, and status publication._
_Service Mesh: Overkill for this repository’s testing pipeline._
_Enterprise Service Bus: Legacy analogy only; modern CI/artifact pipelines replace the need in this scope._
_Source: https://storybook.js.org/docs/writing-tests/integrations/stories-in-unit-tests , https://storybook.js.org/docs/writing-tests/integrations/stories-in-end-to-end-tests , https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts_

### Microservices Integration Patterns

Applied to testing, microservice-style patterns map to modular test projects and staged dependencies (setup → component/integration → E2E/visual). Playwright projects/dependencies and Vitest projects provide a concrete way to isolate concerns, parallelize safely, and enforce run order for setup-sensitive flows. This supports an evolvable pyramid with clear ownership boundaries.
_API Gateway Pattern: Treat a consolidated CI workflow/report dashboard as the external “entrypoint” for quality state._
_Service Discovery: Represented by project selection filters (`--project`) and CI matrix scheduling rather than runtime registry._
_Circuit Breaker Pattern: Implemented practically via fail-fast, retry policies, and scoped reruns in CI._
_Saga Pattern: Analogous to multi-job pipelines with artifacts passed between jobs and explicit rollback/retry decisions._
_Source: https://playwright.dev/docs/test-projects , https://vitest.dev/guide/projects , https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions , https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts_

### Event-Driven Integration

This migration should be event-driven at the pipeline layer: pull request and deployment events trigger targeted suites, while artifact and status events drive feedback loops. Storybook CI guidance also highlights event-triggered workflows (e.g., deployment status + Storybook URL propagation), which can significantly improve debugging fidelity for failing component-level tests.
_Publish-Subscribe Patterns: PR/push events publish changes; test jobs and checks subscribe and react._
_Event Sourcing: Not fully adopted, but historical run artifacts/check history provide a partial event log for regressions._
_Message Broker Patterns: CI platform queueing plays the broker role for most teams at this scale._
_CQRS Patterns: Separation of execution (commands) and reporting dashboards/checks (queries) is a practical fit._
_Source: https://storybook.js.org/docs/writing-tests/in-ci , https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions , https://playwright.dev/docs/test-reporters_

### Integration Security Patterns

Security for this test integration stack is primarily CI secret hygiene and least-privilege token design, plus controlled artifact exposure. For replacing Chromatic with alternatives, keep service tokens scoped to only required operations and avoid leaking traces/screenshots that may contain sensitive data. Pin action versions and harden workflow permissions to reduce supply-chain and privilege risks.
_OAuth 2.0 and JWT: Common in external test service auth models; apply principle of minimum scope where supported._
_API Key Management: Store service keys in CI secrets, rotate regularly, and avoid echoing in logs._
_Mutual TLS: Usually unnecessary for default SaaS integration, but relevant for self-hosted/internal gateways._
_Data Encryption: Rely on HTTPS transit; review artifact retention and access controls for screenshots/traces._
_Source: https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions , https://docs.github.com/actions/security-guides/automatic-token-authentication , https://argos-ci.com/docs/playwright_

## Architectural Patterns and Design

### System Architecture Patterns

For this migration, the best-fit architecture is a layered quality system rather than a single “visual platform”: (1) fast unit/integration at the base with Vitest, (2) browser-realistic component and interaction verification via Storybook-integrated tests, and (3) a narrow top of Playwright E2E and visual checks for critical user journeys. This preserves test pyramid economics while replacing Chromatic dependency with composable tools. Architecturally, this is a modular monolith testing model with clear boundaries between fast feedback and high-confidence checks.
_Source: https://martinfowler.com/articles/practical-test-pyramid.html , https://vitest.dev/guide/ , https://storybook.js.org/docs/writing-tests , https://playwright.dev/docs/test-projects_

### Design Principles and Best Practices

The core design principle is “single responsibility per test layer”: avoid duplicating assertions across layers, and push assertions downward whenever equivalent confidence can be achieved at lower cost. Use contract-like boundaries between tooling through stable report formats (JUnit/JSON), explicit project naming, and deterministic snapshot conventions. This keeps architecture maintainable, minimizes test suite erosion, and allows service substitution (e.g., visual review provider) without reworking core tests.
_Source: https://martinfowler.com/articles/practical-test-pyramid.html , https://vitest.dev/guide/reporters , https://playwright.dev/docs/test-reporters_

### Scalability and Performance Patterns

Scalability should be achieved through controlled parallelism and project partitioning: CI workers tuned for stability, matrix/sharding for larger suites, and fail-fast policies for quick feedback. Use cache-aware build architecture (Docker layer ordering, cache mounts, external cache in CI) to reduce runtime and cost. For reliability under external dependency instability, pair retries with circuit-breaker/bulkhead thinking at integration boundaries so a failing external dependency does not stall the whole pipeline.
_Source: https://playwright.dev/docs/ci , https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions , https://docs.docker.com/build/cache/optimize/ , https://learn.microsoft.com/en-us/azure/architecture/patterns/retry , https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker , https://learn.microsoft.com/en-us/azure/architecture/patterns/bulkhead_

### Integration and Communication Patterns

Adopt event-driven CI orchestration: PR/push events trigger selective suites, deployment-status events can trigger environment-aware E2E, and artifact handoff links build/test/report stages. This forms a resilient communication architecture where each job publishes machine-readable outputs and downstream jobs consume them via explicit dependencies. Keep interoperability centered on Storybook stories and standardized reports so integration remains tool-agnostic.
_Source: https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions , https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts , https://storybook.js.org/docs/writing-tests/in-ci , https://playwright.dev/docs/ci_

### Security Architecture Patterns

Security architecture for the pipeline should enforce least privilege by default: scoped tokens, minimal workflow permissions, protected branch controls, and strict secret hygiene (no secrets in repo, images, logs, or shell history). Treat third-party actions and package dependencies as supply-chain attack surfaces: pin versions, validate integrity, and enforce lockfiles. Add observability and alerting around pipeline events to detect misuse and preserve auditability.
_Source: https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html , https://owasp.org/Top10/2025/ , https://docs.github.com/actions/security-guides/automatic-token-authentication , https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions_

### Data Architecture Patterns

In this domain, data architecture centers on test evidence lifecycle: snapshots, traces, videos, and structured result files. Use immutable artifact naming per run, retention policies by evidence type, and deterministic baseline versioning rules. Separate “ephemeral diagnostics” (short retention) from “decision artifacts” (longer retention for audits and regressions). This improves governance and keeps storage/cost under control while preserving debuggability.
_Source: https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts , https://playwright.dev/docs/test-snapshots , https://playwright.dev/docs/test-reporters , https://vitest.dev/guide/reporters_

### Deployment and Operations Architecture

Operations architecture should optimize for dev/prod parity and reproducibility: containerized CI runners, pinned browser/runtime versions, and consistent environment configuration via env vars. Separate build/release/run concerns in pipelines so test execution is repeatable across branches and environments. For visual baselines, keep update pathways explicit (reviewed PR flow), never implicit on every run. This architecture reduces flakiness and supports safe continuous delivery.
_Source: https://12factor.net/ , https://12factor.net/config , https://12factor.net/dev-prod-parity , https://playwright.dev/docs/ci , https://playwright.dev/docs/docker_

## Implementation Approaches and Technology Adoption

### Migration and Adoption Strategies

The most robust migration from Chromatic dependency to a quota-resilient model is an incremental “strangler” transition: keep existing Storybook coverage while progressively shifting confidence gates to Vitest + Playwright, then decide whether visual review remains self-managed or service-assisted. This avoids a high-risk big-bang switch and allows measurable parity checkpoints (failure rate, flake rate, review turnaround, and CI cost) at each stage.

Recommended sequence:

- Phase 1: Stabilize baseline test taxonomy (unit/integration/component/E2E/visual) and freeze overlap.
- Phase 2: Introduce deterministic Playwright visual baselines in CI for critical journeys.
- Phase 3: Align Storybook-driven component checks with Vitest Browser Mode and story reuse.
- Phase 4: Decommission Chromatic-only gates after target confidence metrics are met for consecutive sprints.

_Source: https://martinfowler.com/bliki/StranglerFigApplication.html , https://trunkbaseddevelopment.com/ , https://playwright.dev/docs/test-snapshots , https://storybook.js.org/docs/writing-tests_

### Development Workflow Implications

Adoption should reinforce trunk-oriented, short-lived branch workflows with explicit CI gating and fast feedback loops. In practice: run broad fast checks on every PR, reserve expensive visual/E2E suites for targeted paths and merge-critical scenarios, and use concurrency controls to avoid redundant spend on superseded commits. This keeps developer cycle time acceptable while preserving release confidence.

Workflow controls to standardize:

- Path- and branch-aware CI triggers to reduce unnecessary runs.
- Concurrency groups with cancel-in-progress for PR churn.
- Minimal `GITHUB_TOKEN` permissions per workflow/job.
- Version-pinned actions and reusable workflows for consistency.

_Source: https://docs.github.com/actions/using-workflows/workflow-syntax-for-github-actions , https://trunkbaseddevelopment.com/ , https://learn.microsoft.com/en-us/devops/what-is-devops_

### Operational Excellence Considerations

Operational excellence for this test platform depends on deterministic execution, observability, and incident-ready operating procedures. Treat the pipeline as a production system: define service levels for CI reliability (queue time, pass stability, rerun frequency), instrument failures, and run postmortem reviews for recurring flake patterns.

Key operating patterns:

- Deterministic runner/browser environments for reproducible snapshots.
- Centralized telemetry and actionable alerts for test infrastructure failures.
- Incident and postmortem workflows for repeated regression noise.
- Artifact integrity and provenance controls for trust in generated evidence.

_Source: https://sre.google/sre-book/table-of-contents/ , https://sre.google/workbook/table-of-contents/ , https://opentelemetry.io/docs/ , https://slsa.dev/_

### Team Organization and Skill Requirements

The migration requires clear cross-functional ownership rather than a test-only silo: application engineers own base and component quality, while a smaller platform/testing capability governs CI standards, visual baseline policy, and tooling reliability. Teams should upskill in browser-accurate testing, CI security, and artifact governance.

Minimum capability model:

- Engineering: writes behavior-first tests and owns flaky-test remediation in domain code.
- Platform/Test Enablement: maintains CI templates, visual baseline policy, and runner determinism.
- Security/Operations partnership: enforces token/secrets hygiene and monitors pipeline risk.

_Source: https://learn.microsoft.com/en-us/devops/what-is-devops , https://sre.google/workbook/table-of-contents/ , https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html_

### Cost and Risk Mitigation

Cost control should be engineered directly into the pipeline architecture: prefer Linux runners where feasible, aggressively tune artifact retention, and avoid duplicate visual workloads across tool layers. Risk mitigation should focus on CI/CD attack-surface reduction, dependency integrity, and supply-chain verifiability.

Priority controls:

- Minutes/storage governance (runner choice, retention-days, selective upload).
- Scheduled cleanup and threshold alerts for artifact/cache growth.
- Secrets lifecycle discipline, least privilege, and branch protection.
- Lockfile enforcement, dependency integrity validation, and provenance roadmap.

_Source: https://docs.github.com/en/billing/concepts/product-billing/github-actions , https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts , https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html , https://slsa.dev/_

## Technical Research Recommendations

### Recommended Adoption Path (Priority Order)

1. **Establish a layered test contract** (unit/integration/component/E2E/visual) and remove assertion duplication across layers.
2. **Adopt Playwright visual checks for critical user journeys** in deterministic CI containers.
3. **Align Storybook stories with Vitest Browser Mode tests** to maximize scenario reuse and reduce maintenance drift.
4. **Apply CI cost controls** (path filters, concurrency cancellation, artifact retention policy).
5. **Harden CI security posture** (least-privilege permissions, action pinning, secret hygiene, provenance progression).

### Confidence and Trade-off Notes

- **High confidence**: Deterministic CI + layered testing + controlled artifact governance significantly improves signal quality and migration safety.
- **Medium confidence**: Exact cost gains depend on current workflow run volume, runner types, and retention behavior.
- **Key trade-off**: Self-managed visual review lowers vendor lock-in but requires stronger internal governance for baseline lifecycle and triage discipline.

### Suggested Initial Success Metrics

- PR median feedback time for mandatory checks.
- Visual regression false-positive rate per sprint.
- Flaky-test rerun ratio.
- CI minutes/storage spend trend (month-over-month).
- Mean time to resolve test-platform incidents.

_Source: https://martinfowler.com/articles/practical-test-pyramid.html , https://playwright.dev/docs/ci , https://docs.github.com/en/billing/concepts/product-billing/github-actions , https://docs.github.com/actions/using-workflows/storing-workflow-data-as-artifacts , https://cheatsheetseries.owasp.org/cheatsheets/CI_CD_Security_Cheat_Sheet.html_

<!-- Content will be appended sequentially through research workflow steps -->
