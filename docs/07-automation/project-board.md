# Project Board Automation

This document describes the GitHub Project board automation workflows implemented for the Shooting Star project.

## Overview

The project uses automated workflows to move issues through the development lifecycle, from initial creation to production release. This ensures consistent project management and reduces manual overhead.

## Project Board Structure

**Project**: Shooting Star Project (#5)  
**Columns**: Backlog → À Faire → En Cours → Review → Testing → Done → Released

## Implemented Workflows

### 1. Status Automation (`project-status.yml`)

Automatically moves issues through the project board based on GitHub events.

#### Flow Overview
```
New Issue → Backlog → En Cours → Review → Testing → Done → Released
```

#### Automation Rules

| Trigger | Action | Label Update |
|---------|---------|-------------|
| **Issue opened** | Move to Backlog | Add "Backlog" |
| **Issue assigned** | Move to En Cours | Add "En Cours", remove others |
| **PR opened** (with linked issues) | Move linked issues to Review | Add "Review", remove conflicting |
| **PR merged** (with linked issues) | Move linked issues to Testing | Add "Testing", remove conflicting |
| **PR closed without merge** | Revert linked issues to En Cours | Add "En Cours", remove "Review"/"Testing" |
| **Issue closed** | Move to Done | Add "Done", remove others |
| **Release published** | Move mentioned issues to Released | Add "Released", remove others |
| **Status label added manually** | Update project board | Sync label with board status |

#### Label Synchronization

The workflow maintains bidirectional synchronization between GitHub labels and project board status:
- Adding a status label updates the project board
- Board automation adds/removes labels automatically
- Only one status label per issue

**Status Labels**: `Backlog`, `À Faire`, `En Cours`, `Review`, `Testing`, `Done`, `Released`

### 2. Lifecycle Management (`project-lifecycle.yml`)

Manages temporal metadata for issues: start dates, end dates, and iterations.

#### Automation Rules

| Trigger | Action |
|---------|--------|
| **Issue assigned** | Set start date = today, assign to current iteration |
| **Issue closed** | Set end date = today |
| **Issue reopened** | Clear end date |

#### Fields Managed
- **Start Date**: When work begins (issue assignment)
- **End Date**: When work completes (issue closure)
- **Iteration**: Sprint/milestone assignment

### 3. Priority & Size Sync (`project-priority-size.yml`)

Synchronizes priority and size labels with project board fields.

#### Automation Rules

**Priority Labels**: `P0` (Critical), `P1` (High), `P2` (Medium), `P3` (Low)  
**Size Labels**: `XS`, `S`, `M`, `L`, `XL`

| Trigger | Action |
|---------|--------|
| **Priority label added** | Update Priority field in project board |
| **Size label added** | Update Size field in project board |
| **Label removed** | Clear corresponding field |

#### Bulk Synchronization (`project-priority-size-bulk.yml`)

Manual workflow to sync all existing issues' priority and size labels to the project board.

**Usage**: GitHub Actions → "Project Priority and Size Bulk Sync" → Run workflow
**Options**: Dry-run mode available for testing

## Quality Checks Integration

### PR Quality Checks (`pr-checks.yml`)

Automated quality gates that run on pull requests:

#### Code Quality
- ✅ **Type checking** (blocking)
- ✅ **Build verification** (blocking)

#### Security
- ✅ **NPM audit** (high vulnerabilities)
- ✅ **Sensitive files detection**

#### Performance
- 📊 **Bundle size reporting**
- 📈 **Build performance tracking**

#### Accessibility
- ♿ **axe-core accessibility testing**
- 🔍 **Automated violation detection**

#### Integration Ready
After all checks pass, the workflow:
- **All checks pass**: PR → Non-draft (ready for review)
- **Checks fail**: PR → Draft + specific quality labels (Code Quality, Security, Performance, Accessibility)

## Deployment Integration

### Fly.io Deployment (`deploy-fly.yml`)

Automated deployment pipeline that integrates with project automation:

#### Environments
- **Staging**: Auto-deploy on main branch push
- **Production**: Auto-deploy on release publication
- **Manual**: Deploy/rollback any environment on demand

#### Health Checks
Post-deployment health verification with automatic status reporting.

## Advanced Features

### Label Management

#### Status Labels
- **Backlog** (`#f75ad846`) - New issues awaiting triage
- **À Faire** (`#08afe404`) - Ready for development
- **En Cours** (`#47fc9ee4`) - Active development
- **Review** (`#4cc61d42`) - Code review in progress  
- **Testing** (`#d2573237`) - Quality assurance testing
- **Done** (`#98236657`) - Implementation complete
- **Released** (`#111ec098`) - Deployed to production

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


### Metrics & Reporting

The automation tracks development metrics:

#### Cycle Time Metrics
- **Lead Time**: Backlog → Released
- **Cycle Time**: À Faire → Done  
- **Review Time**: Time spent in Review
- **Testing Time**: Time spent in Testing

#### Deployment Metrics
- **Deployment Frequency**: How often we deploy
- **Failure Rate**: Deployment success rate
- **Recovery Time**: Time to fix failed deployments

## Workflow Files Reference

| File | Purpose | Triggers |
|------|---------|----------|
| `project-status.yml` | Status transitions & label sync | Issues, PRs, releases |
| `project-lifecycle.yml` | Dates & iterations management | Issue assignment/closure |
| `project-priority-size.yml` | Priority & size sync | Labels added/removed |
| `project-priority-size-bulk.yml` | Bulk sync (manual) | Workflow dispatch |
| `pr-checks.yml` | Quality gates for PRs | Pull requests |
| `deploy-fly.yml` | Deployment to Fly.io | Push, releases, manual |

## Configuration

### Project Board Settings
- **Project ID**: `PVT_kwHOA8KkFM4BBWOl`
- **Status Field ID**: `PVTSSF_lAHOA8KkFM4BBWOlzgz4SvM`

### Required Secrets
- `PROJECT_PAT` - GitHub Personal Access Token with project permissions
- `FLY_API_TOKEN` - Fly.io API token for deployments

### Required Variables
- `FLYIO_STAGING_APP_NAME` - Staging app name on Fly.io
- `FLYIO_PRODUCTION_APP_NAME` - Production app name on Fly.io
- `STAGING_HEALTH_URL` - Staging health check endpoint
- `PRODUCTION_HEALTH_URL` - Production health check endpoint

## Best Practices

### Issue Management
1. **Link PRs to issues** using `#123` in title/description
2. **Use descriptive titles** for automatic issue extraction
3. **Assign issues** to trigger workflow automation
4. **Add priority/size labels** for better project tracking

### Pull Request Workflow
1. **Create PR** from feature branch (triggers Review status)
2. **Wait for quality checks** before requesting review
3. **Get approval** to move to Testing phase
4. **Merge to main** to trigger deployment pipeline

### Release Process
1. **Create release** with issue mentions (`#123, #124`)
2. **Automatic deployment** to production
3. **Issues moved to Released** automatically
4. **Health checks** verify deployment success

## Troubleshooting

### Common Issues

#### Labels not syncing
- Check `PROJECT_PAT` permissions
- Verify project ID configuration
- Ensure issue is in the project board

#### Automation not triggering
- Check workflow file syntax
- Verify trigger conditions match events
- Review GitHub Actions logs

#### Deployment failures
- Verify `FLY_API_TOKEN` validity
- Check Fly.io app configuration
- Review build logs for errors

### Manual Interventions

#### Force Status Update
- **Manual label changes**: Add/remove status labels manually to sync with project board
- **Bulk synchronization**: Use the "Project Priority and Size Bulk Sync" workflow for mass updates
- **Issue state changes**: Close/reopen issues to trigger status transitions

#### Bypassing Automation
Currently, there are no automated bypass mechanisms. Manual intervention requires:
- Direct project board manipulation
- Manual label management
- Issue state changes (close/reopen)