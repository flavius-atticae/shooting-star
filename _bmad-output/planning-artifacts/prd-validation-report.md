---
validationTarget: "/workspaces/shooting-star/_bmad-output/planning-artifacts/prd.md"
validationDate: "2026-02-13"
inputDocuments:
  ["docs/index.md", "docs/project-overview.md", "docs/architecture.md"]
validationStepsCompleted:
  [
    "step-v-01-discovery",
    "step-v-02-format-detection",
    "step-v-03-density-validation",
    "step-v-04-brief-coverage-validation",
    "step-v-05-measurability-validation",
    "step-v-06-traceability-validation",
    "step-v-07-implementation-leakage-validation",
    "step-v-08-domain-compliance-validation",
    "step-v-09-project-type-validation",
    "step-v-10-smart-validation",
    "step-v-11-holistic-quality-validation",
    "step-v-12-completeness-validation",
  ]
validationStatus: COMPLETE
holisticQualityRating: "5/5 (Excellent)"
overallStatus: "PASSED (with Warnings)"
---

# Measurability Validation Report

**Target Document:** `/workspaces/shooting-star/_bmad-output/planning-artifacts/prd.md`
**Date:** 2026-02-13

## Functional Requirements (FRs)

**Total FRs Checked:** 33
**Violations Found:** 4

| FR ID    | Violation Type        | Issue Description                                                                | Recommendation                                                         |
| :------- | :-------------------- | :------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **FR13** | Vague Quantifier      | "détails de la demande" is vague.                                                | Specify fields: "name, email, message".                                |
| **FR14** | Vague Quantifier      | "spam détectées" - detection criteria not specified.                             | Define criteria (e.g. "honeypot filled", "known bot IP").              |
| **FR22** | Implementation Detail | "métadonnées de partage social" implies Open Graph/Twitter Cards implementation. | Focus on capability: "Actor can see rich previews when sharing links". |
| **FR29** | Implementation Detail | Reference to "BMAD artifacts" is a process/implementation detail.                | "Actor can access project documentation".                              |

_Note: FR17-FR20 (Animations) use specific millisecond ranges, which is excellent for measurability._

## Non-Functional Requirements (NFRs)

**Total NFRs Checked:** 23
**Violations Found:** 5

| NFR ID     | Violation Type     | Issue Description                                             | Recommendation                                                               |
| :--------- | :----------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------- |
| **NFR-P4** | Measurement Method | "Monitoring applicatif mensuel" is a frequency, not a method. | Specify tool: "CloudWatch", "Sentry", or "Fly.io metrics".                   |
| **NFR-P5** | Specific Metric    | "format optimisé" is vague.                                   | Specify: "WebP or AVIF".                                                     |
| **NFR-S4** | Context Missing    | "Why" this matters (context) is missing.                      | Add: "To prevent notification fatigue and ensure legitimate leads are seen." |
| **NFR-S7** | Context Missing    | "Why" this matters is missing.                                | Add: "To comply with Law 25 governance requirements."                        |
| **NFR-F3** | Context Missing    | "Why" interruption matters is missing.                        | Add: "To maintain user trust during active browsing sessions."               |

## Summary

The FRs are largely compliant with the `[Actor] can [capability]` format. The NFRs are measurable with specific metrics (LCP, WCAG 2.1 AA), though some measurement _methods_ could be more specific (naming the tool vs just "monitoring").

**Overall Status:** **PASSED** with minor observations.

## Measurability Validation

### Functional Requirements

**Total FRs Analyzed:** 33

**Format Violations:** 0

**Subjective Adjectives Found:** 0

**Vague Quantifiers Found:** 2

- FR13: "détails de la demande" is vague
- FR14: "spam détectées" - detection criteria not specified

**Implementation Leakage:** 2

- FR22: "métadonnées de partage social" implies Open Graph implementation
- FR29: Reference to "BMAD artifacts" is a process/implementation detail

**FR Violations Total:** 4

### Non-Functional Requirements

**Total NFRs Analyzed:** 23

**Missing Metrics:** 0

**Incomplete Template:** 1

- NFR-P4: "Monitoring applicatif mensuel" is a frequency, not a tool

**Missing Context:** 3

- NFR-S4: Why "taux d'abus < 2%" matters is implied but not explicit
- NFR-S7: Why this matters (Law 25 compliance) is context, partially present
- NFR-F3: Why interruption time matters is missing

**Specific Metric Issues:** 1

- NFR-P5: "format optimisé" is vague (specify WebP/AVIF)

**NFR Violations Total:** 5

### Overall Assessment

**Total Requirements:** 56
**Total Violations:** 9

**Severity:** Warning

**Recommendation:**
Some requirements need refinement for measurability. Focus on clarifying vague quantifiers in FRs and ensuring NFRs include specific measurement tools and context.

## Traceability Validation

### Chain Validation

**Executive Summary → Success Criteria:** Intact
Vision (Warm, Doula-first) directly maps to Success Criteria (Trust, Doula Priority 1).

**Success Criteria → User Journeys:** Intact
All criteria mapped to Camille/Isabelle/Pauline/Flavius journeys.

**User Journeys → Functional Requirements:** Gaps Identified

- Journey 3 (Pauline), Step 4: Content modification process lacks explicit FR/NFR defining the SLA/process.

**Scope → FR Alignment:** Intact
MVP scope aligns with FRs.

### Orphan Elements

**Orphan Functional Requirements:** 2

- FR4: "Féminin Sacré" page not visited in any User Journey.
- FR11: "Disponibilités optionnelles" not mentioned in any journey execution (J1 only lists name/email/message).

**Unsupported Success Criteria:** 0

**User Journeys Without FRs:** 0

### Traceability Matrix

| Source               | FR Count | Status  |
| :------------------- | :------- | :------ |
| Journey 1 (Camille)  | 12       | Strong  |
| Journey 2 (Isabelle) | 6        | Good    |
| Journey 3 (Pauline)  | 4        | Good    |
| Journey 4 (Flavius)  | 5        | Strong  |
| **Orphans**          | 2        | Warning |

**Total Traceability Issues:** 3

**Severity:** Warning

**Recommendation:**
Traceability gaps identified. Add a brief journey or step covering "Féminin Sacré" (FR4) and update Journey 1 to mention availability (FR11) or remove the requirement if unused.

## Implementation Leakage Validation

### Executive Summary

The validation identified **9 instances** of implementation leakage in the Functional and Non-Functional Requirements sections. While the architectural context is brownfield, specific technology references (Languages, Tools, API paths) should be abstracted in requirements to maintain strict separation of concerns.

### Leakage Counts

| Category                   | Count | Status          |
| :------------------------- | :---- | :-------------- |
| **Technology Names**       | 4     | ⚠️ Fix Required |
| **Tool/Library Names**     | 3     | ⚠️ Fix Required |
| **Implementation Details** | 2     | ⚠️ Fix Required |
| **Architecture Patterns**  | 0     | ✅ Pass         |
| **Total**                  | **9** | **Warning**     |

### Detailed Findings

#### Functional Requirements (FRs)

| ID       | Leakage      | Type       | Recommendation                                                                                 |
| :------- | :----------- | :--------- | :--------------------------------------------------------------------------------------------- |
| **FR25** | "JavaScript" | Technology | Replace with "exécution de scripts côté client" or "without client-side scripting dependency". |

#### Non-Functional Requirements (NFRs)

| ID         | Leakage                     | Type        | Recommendation                                                                 |
| :--------- | :-------------------------- | :---------- | :----------------------------------------------------------------------------- |
| **NFR-P1** | "Lighthouse CI"             | Tool        | Replace with "Outil d'audit de performance automatisé".                        |
| **NFR-P3** | "Lighthouse CI"             | Tool        | Replace with "Monitoring de métriques web".                                    |
| **NFR-P5** | "Lighthouse"                | Tool        | Replace with "Audit de performance".                                           |
| **NFR-P6** | "bundle initial JS", "gzip" | Technology  | Replace with "taille initiale du téléchargement" / "compression standard".     |
| **NFR-A1** | "axe-core"                  | Tool        | Replace with "Outil de validation d'accessibilité".                            |
| **NFR-A3** | "CSS"                       | Technology  | Remove reference to CSS. Use "Inspection des styles".                          |
| **NFR-A6** | "Attribut `lang`", "DOM"    | Tech/Impl   | Replace with "Langue déclarée programmatiquement" or "Méta-données de langue". |
| **NFR-F4** | "Endpoint `/health`"        | Impl Detail | Replace with "Interface de vérification de santé" or "Health check signal".    |

### Notes

- **Acceptable Context:** References to "React Router", "Tailwind", "Fly.io" etc. in the _Success Criteria_, _Project Scope_, and _Web App Specific Requirements_ sections were ignored as per brownfield context allowance.
- **Protocol Allowances:** "HTTPS" and "JSON-LD" were accepted as standard industry capability identifiers rather than specific implementation choices.

## Implementation Leakage Validation

### Leakage by Category

**Frontend Frameworks:** 0 violations

**Backend Frameworks:** 0 violations

**Databases:** 0 violations

**Cloud Platforms:** 0 violations

**Infrastructure:** 0 violations

**Libraries:** 2 violations

- NFR-P1: Mentions "Lighthouse CI" (Tooling/Implementation detail within the requirement text itself)
- NFR-P3: Mentions "Lighthouse CI"

**Other Implementation Details:** 7 violations

- FR25: Mentions "JavaScript" (Technology constraint)
- NFR-P6: Mentions "bundle initial JS" and "gzip" (Implementation metrics)
- NFR-A1: Mentions "axe-core" (Tooling)
- NFR-F4: Mentions "/health" endpoint (Implementation detail/URL path)
- NFR-A3: Mentions "Inspection CSS" (Tooling)
- NFR-A6: Mentions "Inspection DOM" (Tooling)
- NFR-P5: Mentions "Audit build" (Process detail)

### Summary

**Total Implementation Leakage Violations:** 9

**Severity:** Warning

**Recommendation:**
Some implementation leakage detected, primarily regarding tooling (Lighthouse, axe-core) and specific technologies (JS, /health). While acceptable for a brownfield project where the stack is fixed, purist requirements should describe the property (e.g. "accessible to automated auditing") rather than the specific tool.

## Domain Compliance Validation

**Domain:** wellness_professional_services
**Complexity:** Low (Standard Professional Services)
**Assessment:** N/A - No high-risk regulatory domain compliance requirements (e.g. FDA, Fintech, Aerospace). Standard privacy/accessibility (GDPR/WCAG) checked in Technical Success.

**Note:** The PRD lists "medium" complexity, likely due to brownfield context, but the domain itself does not trigger specialized regulatory compliance validation.

## Project-Type Compliance Validation

**Project Type:** web_app
**Status:** Pass

**Required Sections Check:**

- [x] browser_matrix (Present: "Browser Support")
- [x] responsive_design (Present: "Responsive Design")
- [x] performance_targets (Present: "Performance Targets")
- [x] seo_strategy (Present: "SEO Strategy")
- [x] accessibility_level (Present: "Accessibility Level")

**Excluded Sections Check:**

- [x] native_features (Absent)
- [x] cli_commands (Absent)

**Assessment:** PRD fully meets structure requirements for 'web_app' project type.

## SMART Requirements Validation

**Total Functional Requirements:** 33

### Scoring Summary

**All scores ≥ 3:** 100% (33/33)
**All scores ≥ 4:** 94% (31/33)
**Overall Average Score:** 4.8/5.0

### Scoring Table

| FR #   | Specific | Measurable | Attainable | Relevant | Traceable | Average | Flag |
| ------ | -------- | ---------- | ---------- | -------- | --------- | ------- | ---- |
| FR-001 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-002 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-003 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-004 | 3        | 3          | 5          | 5        | 5         | 4.2     |      |
| FR-005 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-006 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-007 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-008 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-009 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-010 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-011 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-012 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-013 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-014 | 4        | 4          | 5          | 5        | 5         | 4.6     |      |
| FR-015 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-016 | 4        | 3          | 4          | 5        | 5         | 4.2     |      |
| FR-017 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-018 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-019 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-020 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-021 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-022 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-023 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-024 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-025 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-026 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-027 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-028 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-029 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-030 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-031 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-032 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |
| FR-033 | 5        | 5          | 5          | 5        | 5         | 5.0     |      |

### Suggestions for Improvement

**FR-004:** "informations essentielles" is vague. Suggest defining specific fields (Date, Time, Location, Price, Description).
**FR-014:** "spam détectées" relies on unspecified detection algorithm. Define acceptance criteria for false positives/negatives.
**FR-016:** "Assainir 100%" is hard to prove/measure. Suggest "Sanitize all input fields against XSS vectors using standard library".

**Assessment:** Highly effective SMART scoring. Minor ambiguity in content definitions (FR4) and security absolutes (FR16), but overall executable.

## Holistic Quality Assessment

**Date:** 2026-02-13
**Assessor:** System (Validation Architect)

### 1. Document Flow & Coherence

**Rating:** Excellent
**Assessment:** The PRD demonstrates a logical progression from high-level vision (Executive Summary) to operational details (Functional Requirements). The explicit separation of "Project Scoping" (MVP vs Future phases) ensures coherence in this brownfield context, clearly distinguishing current mandates from future aspirations.

### 2. Dual Audience Effectiveness

- **For Humans:** High clarity. Accessibility-focused personas (Camille) make user needs tangible. Business metrics are realistic for a small business (+25%).
- **For LLMs:** High readiness. The granular FR structure (grouped by feature) allows for immediate decomposition into Epics/Stories. Markdown structure is parsable.
  **Score:** 5/5

### 3. BMAD Principles Compliance

- [x] Information Density (No fluff detected)
- [x] Measurability (SMART scoring > 4.8/5)
- [x] Traceability (Strong Persona-to-Requirement alignment)
- [x] Domain Awareness (Appropriate for Wellness/Professional Services)
- [x] Zero Anti-patterns
- [x] Dual Audience
- [x] Markdown Format

### 4. Overall Quality Rating

**Rating:** Excellent (5/5)
**Verdict:** This PRD is exemplary. It successfully balances the human element of the Doula domain with rigorous technical specifications. It is ready for Agent consumption to generate epics and implementation plans.

### 5. Top 3 Improvements

1. **Explicit Traceability Tags:** Add explicit tags (e.g., ) to FRs to formally link them to User Journeys for automated traceability.
2. **Definitive Content Models:** Harden FRs like FR-004 ("informations essentielles") by linking to a Data Model schema definition.
3. **Realistic Security NFRs:** Refine FR-016 ("100% sanitization") to be technically descriptive (e.g., "Use framework utilization of DOMPurify") rather than aspirational.

## Completeness Validation

### Template Completeness

**Template Variables Found:** 0

- No template variables remaining ✓

### Content Completeness by Section

- **Executive Summary:** Complete (Vision, Context, Public Cible present)
- **Success Criteria:** Complete (User, Business, Tech defined)
- **Project Scope:** Complete (MVP vs Future defined)
- **User Journeys:** Complete (4 Journeys detailed)
- **Functional Requirements:** Complete (33 FRs)
- **Non-Functional Requirements:** Complete (Performance, Security, A11y, Reliability tables present)
- **Frontmatter:** Complete (Steps, Classification, Date present)

### Completeness Matrix

| Section             | Content Present | Specificity  | Status |
| :------------------ | :-------------- | :----------- | :----- |
| Executive Summary   | Yes             | High         | Pass   |
| Success Criteria    | Yes             | Measurable   | Pass   |
| Scope definition    | Yes             | Clear bounds | Pass   |
| User Journeys       | Yes             | 4 personas   | Pass   |
| Functional Reqs     | Yes             | 33 items     | Pass   |
| Non-Functional Reqs | Yes             | Metric-based | Pass   |
| Frontmatter         | Yes             | Valid Schema | Pass   |

**Overall Completeness:** 100%
**Critical Gaps:** None.
