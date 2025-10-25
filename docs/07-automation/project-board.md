# Project Board Management

This document describes the manual project board management process for the Shooting Star project.

## Overview

The project uses a GitHub Project board for issue tracking and project management. Issue status transitions and project board updates are managed **manually** to maintain flexibility and reduce automation complexity.

## Project Board Structure

**Project**: Shooting Star Project (#5)
**Columns**: Backlog → À Faire → En Cours → Review → Testing → Done → Released

## Manual Workflow Process

### Issue Lifecycle

```
New Issue → Backlog → En Cours → Review → Testing → Done → Released
```

### Status Management

All status transitions are performed **manually** by the team:

| Event | Manual Action Required |
|-------|------------------------|
| **Issue created** | Add to project, set status to "Backlog" |
| **Ready to work** | Move to "À Faire", add priority/size labels |
| **Work started** | Assign to developer, move to "En Cours" |
| **PR opened** | Move linked issues to "Review" |
| **PR merged** | Move linked issues to "Testing" |
| **Testing complete** | QA moves to "Done" after validation |
| **Released** | Move to "Released" after production deployment |

### Label System

#### Status Labels
Manually apply one status label per issue to keep GitHub and Project board aligned:

- **Backlog** - New issues awaiting triage
- **À Faire** - Ready for development
- **En Cours** - Active development
- **Review** - Code review in progress
- **Testing** - Quality assurance testing
- **Done** - Implementation complete
- **Released** - Deployed to production

#### Priority Labels
- **P0** - Critical (immediate attention)
- **P1** - High (next sprint)
- **P2** - Medium (planned work)
- **P3** - Low (future consideration)

#### Size Labels
- **XS** - Trivial (< 1 hour)
- **S** - Small (< 4 hours)
- **M** - Medium (< 1 day)
- **L** - Large (2-3 days)
- **XL** - Extra Large (> 3 days)

## Deployment Integration

### Fly.io Deployment (`deploy-fly.yml`)

Automated deployment pipeline:

#### Environments
- **Staging**: Auto-deploy on main branch push
- **Production**: Auto-deploy on release publication
- **Manual**: Deploy/rollback any environment on demand

#### Health Checks
Post-deployment health verification with automatic status reporting.

### Storybook Deployment (`deploy-storybook.yml`)

Automated Storybook deployment to GitHub Pages:
- **Trigger**: Push to main or manual workflow dispatch
- **Target**: https://flavius-atticae.github.io/shooting-star/
- **Features**: Automated build and health checks

## Active Workflows

### Claude AI Integration

#### `claude-code-review.yml`
Automated PR code review by Claude AI:
- Triggers on PR open/sync
- Reviews code quality, bugs, performance, security
- Provides constructive feedback in PR comments

#### `claude.yml`
Interactive Claude assistant:
- Triggers on `@claude` mentions in issues/PRs/comments
- Provides development assistance
- Accesses CI results for context

## Configuration

### Project Board Settings
- **Project ID**: `PVT_kwHOA8KkFM4BBWOl`
- **Status Field ID**: `PVTSSF_lAHOA8KkFM4BBWOlzgz4SvM`

### Required Secrets
- `CLAUDE_CODE_OAUTH_TOKEN` - Claude AI integration
- `FLY_API_TOKEN` - Fly.io API token for deployments

### Required Variables
- `FLYIO_STAGING_APP_NAME` - Staging app name on Fly.io
- `FLYIO_PRODUCTION_APP_NAME` - Production app name on Fly.io
- `STAGING_HEALTH_URL` - Staging health check endpoint
- `PRODUCTION_HEALTH_URL` - Production health check endpoint

## Best Practices

### Issue Management
1. **Create issues** with clear titles and descriptions
2. **Add to project** immediately after creation
3. **Set priority and size** labels for better tracking
4. **Link PRs** to issues using `Related to #123` in PR description
5. **Update status** as work progresses through stages

### Pull Request Workflow
1. **Create PR** from feature branch
2. **Link to issue** using `Related to #123` (not Closes/Fixes)
3. **Move issue** to "Review" status manually
4. **Get approval** from team members
5. **Merge to main** to trigger staging deployment
6. **Move issue** to "Testing" status for QA validation

### Release Process
1. **Verify all issues** are in "Testing" or "Done" status
2. **Create release** with version tag
3. **Automatic deployment** to production
4. **Health checks** verify deployment success
5. **Move issues** to "Released" status manually

### Testing Protocol

After PR merge, QA Post Merge Tester validates:

1. **Functional Testing**: All acceptance criteria met
2. **Cross-Browser**: 8+ browsers tested
3. **Language Testing**: French and English verified
4. **Accessibility**: WCAG 2.1 AA compliance
5. **Performance**: Core Web Vitals targets met
6. **Security**: No vulnerabilities introduced

QA has authority to:
- ✅ Move issue to "Done" if all tests pass
- ❌ Revert to "En Cours" if quality standards not met

## Troubleshooting

### Common Issues

#### Project board not updating
- **Manual update required**: Drag issues to correct column
- **Label sync**: Ensure status label matches board column

#### Issues missing from project
- **Add manually**: Use "Add item" in project board
- **Verify permissions**: Check project access settings

#### Deployment failures
- **Verify Fly.io token**: Check `FLY_API_TOKEN` validity
- **Check app configuration**: Review Fly.io app settings
- **Review build logs**: Check GitHub Actions logs for errors

### Manual Interventions

#### Bulk Status Updates
For bulk operations on multiple issues:
1. Use GitHub's bulk select in project board
2. Apply labels in batch via issue list
3. Use GitHub CLI for scripted updates if needed

#### Emergency Procedures
- **Rollback deployment**: Use manual workflow dispatch with rollback option
- **Revert status**: Move issues back to previous column manually
- **Skip testing**: Only with team lead approval, document reason

## Team Responsibilities

### Developers
- Create issues with proper labels
- Update status when starting work
- Link PRs to issues
- Move issues through workflow stages

### QA Post Merge Tester
- Validate merged PRs in Testing
- Move to Done or revert to En Cours
- Final quality gate authority

### Project Manager
- Triage new issues (Backlog → À Faire)
- Monitor project health
- Coordinate releases

## Metrics & Reporting

Track these metrics manually via project board:

### Cycle Time Metrics
- **Lead Time**: Backlog → Released (track dates manually)
- **Cycle Time**: À Faire → Done
- **Review Time**: Time spent in Review
- **Testing Time**: Time spent in Testing

### Deployment Metrics
- **Deployment Frequency**: Track via GitHub releases
- **Failure Rate**: Monitor deployment logs
- **Recovery Time**: Track incident resolution

Use GitHub Project's built-in views and filters to generate reports.
