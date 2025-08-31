# Agent Documentation

## 📍 Agent Instructions Location

The detailed instructions for each AI agent are maintained in the `.claude/agents/` directory:

```
.claude/agents/
├── technical-lead.md              # Tech Lead Agent instructions
├── perinatal-market-analyst.md    # Market Analyst Agent instructions  
├── ui-ux-designer.md              # UI/UX Designer Agent instructions
├── project-manager.md             # Project Manager Agent instructions
├── security-advisor.md            # Security Advisor Agent instructions
└── qa-post-merge-tester.md        # QA Tester Agent instructions
```

## Why This Structure?

- **Single Source of Truth**: Instructions are maintained in one place
- **AI-Optimized**: Claude and other AI agents load these directly
- **No Duplication**: Easier to maintain and keep updated
- **Version Controlled**: Changes tracked with the code

## For Human Readers

If you're a human developer wanting to understand agent workflows:

1. **View on GitHub**: Navigate to `.claude/agents/` in the repository
2. **Local Access**: Open files in `.claude/agents/` directory
3. **Quick Reference**: See agent roles summary below

## Agent Roles Summary

| Agent | Primary Focus | Key Responsibilities |
|-------|--------------|---------------------|
| **Tech Lead** | Implementation | Code quality, architecture, PR reviews |
| **Market Analyst** | User Research | Personas, market analysis, ROI |
| **UI/UX Designer** | Design | Mockups, accessibility, user experience |
| **Project Manager** | Coordination | Planning, priorities, delivery |
| **Security Advisor** | Security | Compliance, vulnerabilities, privacy |
| **QA Post Merge Tester** | Quality Assurance | Post-merge validation, testing, bug detection |

## Collaboration Flow

```
Market Research → Prioritization → Design → Implementation → Security Review → PR Merge → QA TESTING → Done → Release
                                                                                           ↑
                                                                                    Critical Gate
```

**Important**: The QA Post Merge Tester has veto power. If testing fails, issues return to En Cours for fixes.

For detailed workflows and templates, refer to the actual instruction files in `.claude/agents/`.

---

*Note: This directory serves as a pointer to the actual agent instructions. The source of truth is in `.claude/agents/`.*