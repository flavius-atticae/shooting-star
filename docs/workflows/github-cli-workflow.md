# GitHub CLI Workflow Guide

## Overview
Due to MCP Docker authentication issues, this guide provides alternative workflows using the GitHub CLI (`gh`) which is properly authenticated and functional.

## Authentication Status
The GitHub CLI is authenticated with token scope for:
- Repository operations
- Issue management
- Pull request management
- Workflow operations

## Common GitHub Issue Operations

### 1. Listing Issues

```bash
# List all open issues
gh issue list --repo flavius-atticae/shooting-star

# List issues with specific labels
gh issue list --label "priority/critical"

# List issues assigned to you
gh issue list --assignee @me

# Show issue details
gh issue view <issue-number>
```

### 2. Creating Issues

```bash
# Create a new issue interactively
gh issue create --repo flavius-atticae/shooting-star

# Create with specific details
gh issue create --title "Issue Title" \
  --body "Issue description" \
  --label "type/feature,priority/high" \
  --assignee flavius-atticae
```

### 3. Managing Issues

```bash
# Close an issue
gh issue close <issue-number>

# Reopen an issue
gh issue reopen <issue-number>

# Edit an issue
gh issue edit <issue-number> --title "New Title" --body "New description"

# Add labels
gh issue edit <issue-number> --add-label "priority/critical,needs-review"

# Remove labels
gh issue edit <issue-number> --remove-label "wontfix"

# Assign issue
gh issue edit <issue-number> --add-assignee flavius-atticae
```

### 4. Commenting on Issues

```bash
# Add a comment
gh issue comment <issue-number> --body "Your comment here"

# View comments
gh issue view <issue-number> --comments
```

## Pull Request Operations

### 1. Creating Pull Requests

```bash
# Create PR from current branch
gh pr create --title "PR Title" \
  --body "PR description" \
  --base main \
  --head feature-branch

# Create draft PR
gh pr create --draft
```

### 2. Managing Pull Requests

```bash
# List PRs
gh pr list

# View PR details
gh pr view <pr-number>

# Check PR status
gh pr status

# Merge PR
gh pr merge <pr-number> --merge  # or --squash, --rebase

# Close PR without merging
gh pr close <pr-number>
```

### 3. Code Reviews

```bash
# Request review
gh pr edit <pr-number> --add-reviewer username

# Approve PR
gh pr review <pr-number> --approve

# Request changes
gh pr review <pr-number> --request-changes --body "Changes needed..."

# Add review comment
gh pr review <pr-number> --comment --body "Review comment"
```

## Workflow Management

```bash
# List workflows
gh workflow list

# View workflow runs
gh run list --workflow=<workflow-name>

# View run details
gh run view <run-id>

# Rerun failed jobs
gh run rerun <run-id> --failed

# Download artifacts
gh run download <run-id>
```

## Advanced Operations

### Batch Operations

```bash
# Close multiple issues by label
gh issue list --label "wontfix" --json number --jq '.[].number' | \
  xargs -I {} gh issue close {}

# Add label to multiple issues
for issue in 27 28 29; do
  gh issue edit $issue --add-label "status/in-progress"
done
```

### JSON Output for Scripting

```bash
# Get issues as JSON
gh issue list --json number,title,labels,assignees

# Filter with jq
gh issue list --json number,title,labels | \
  jq '.[] | select(.labels[].name == "priority/critical")'
```

## Project-Specific Commands

### For Shooting Star Project

```bash
# View high-priority feature issues
gh issue list --label "priority/high,type/feature"

# List issues ready for development
gh issue list --label "status/ready" --assignee ""

# View security-related issues
gh issue list --label "agent:security-advisor"

# Create feature branch from issue
gh issue develop <issue-number> --checkout
```

## Troubleshooting MCP Docker

### Current Issue
MCP Docker GitHub integration fails with 401 authentication errors despite valid token.

### Temporary Workaround
Use GitHub CLI (`gh`) commands as shown above for all GitHub operations.

### Debugging Steps Attempted
1. Token validation: Token works with direct API calls
2. Secret configuration: Multiple secret names tested
3. Service restart: Claude Desktop restarted multiple times
4. MCP server status: Server is enabled and configured

### Potential Root Causes
1. **Token Format**: MCP Docker may expect a different token format or prefix
2. **Secret Path**: The integration might be looking for secrets in a different location
3. **Token Scope**: MCP Docker might require additional scopes not present in current token
4. **Configuration**: There may be additional configuration required beyond setting secrets

### Recommended Actions
1. Continue using GitHub CLI for immediate productivity
2. Monitor MCP Docker updates for authentication fixes
3. Consider alternative MCP GitHub servers if available
4. Report issue to MCP Docker maintainers with details

## Quick Reference Card

```bash
# Essential commands for daily use
gh issue list                          # List all issues
gh issue view <number>                 # View issue details
gh issue create                        # Create new issue
gh issue comment <number> -b "text"   # Add comment
gh pr create                           # Create PR
gh pr status                           # Check PR status
gh pr merge <number>                   # Merge PR
gh workflow list                       # List workflows
gh run list                            # View recent runs
```