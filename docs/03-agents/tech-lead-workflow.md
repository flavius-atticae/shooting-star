# Tech Lead Agent - Issue to PR Workflow

## 🚀 MANDATORY Workflow for Every Issue

### 1️⃣ When Starting Work on an Issue

```bash
# ALWAYS create a branch from the issue
git checkout main
git pull origin main
git checkout -b feature/issue-123-short-description

# Branch naming convention (STRICT):
# - feature/issue-XXX-description (for features)
# - bugfix/issue-XXX-description (for bugs)
# - hotfix/issue-XXX-description (for urgent fixes)
```

### 2️⃣ Comment on the Issue

Post this comment immediately after creating the branch:

```markdown
## 🚀 Starting Implementation

- **Branch created**: `feature/issue-123-short-description`
- **Estimated completion**: [Date/Time]
- **Technical approach**: [Brief description]

Will update progress regularly.
```

### 3️⃣ During Development

**Commit messages MUST reference the issue**:
```bash
git commit -m "[#123] Add form validation"
git commit -m "[#123] Update styles for mobile"
git commit -m "[#123] Add unit tests"
```

**Regular updates on the issue** (daily minimum):
```markdown
## 📊 Progress Update - [Date]

**Completed**:
- ✅ [Task completed]

**In Progress**:
- 🔄 [Current task]

**Blockers**:
- ⚠️ [Any issues]
```

### 4️⃣ Creating the Pull Request

**PR Title Format**:
```
[Issue #123] Clear description of what was done
```

**PR Description MUST include**:
```markdown
Related to #123
<!-- DO NOT use "Closes" - we want the issue to go to Testing, not Done -->
<!-- The automation will move the issue to Testing when PR is merged -->
```

### 5️⃣ PR Best Practices

1. **ALWAYS link to issue**: Use `Related to #123` in description
2. **Never use auto-close keywords**: Don't use Closes/Fixes/Resolves
3. **Never merge your own PR**: Wait for review
4. **Keep PRs focused**: One issue = One PR
5. **Update if requested**: Address review comments promptly
6. **Delete branch after merge**: Keep repo clean

## 🔴 Common Mistakes to Avoid

❌ **DON'T**: Use `Closes/Fixes/Resolves` in PR (issue should go to Testing, not Done)
❌ **DON'T**: Create PR without linking to issue
❌ **DON'T**: Work directly on main branch
❌ **DON'T**: Mix multiple issues in one PR
❌ **DON'T**: Use generic branch names like `feature/update`
❌ **DON'T**: Forget to reference issue in commits

## ✅ Correct Examples

### Good PR Title:
```
[Issue #45] Add booking form with email validation
```

### Good PR Description:
```markdown
Related to #45

## Summary
Implemented the booking form as specified in the issue with:
- Email validation
- Date picker for appointments
- Mobile-responsive design

## Testing
- ✅ Unit tests added
- ✅ Tested on mobile devices
- ✅ Cross-browser tested

Note: Issue will move to Testing phase after merge for QA validation.
```

### Good Branch Name:
```
feature/issue-45-booking-form
```

## 🤖 Automation Benefits

When you follow this workflow:
1. **Issue moves to Testing** when PR merges (not closed)
2. **Project board updates** automatically
3. **Labels sync** between issue and PR
4. **Status tracking** is automatic
5. **Traceability** is maintained
6. **QA can validate** in Testing phase before closing

## 📋 Quick Reference

| Action | Command/Format |
|--------|---------------|
| Branch name | `feature/issue-XXX-description` |
| Commit message | `[#XXX] Description` |
| PR title | `[Issue #XXX] Description` |
| PR link | `Related to #XXX` (NOT Closes) |

## 🔄 GitHub CLI Shortcuts

```bash
# Create PR linked to issue
gh pr create --title "[Issue #123] Feature description" --body "Related to #123

[Rest of PR description]"

# View issue and its linked PRs
gh issue view 123 --comments

# Check PR status
gh pr status
```

## 📊 Workflow Diagram

```
Issue Created (Backlog)
    ↓
Issue Assigned → Create Branch → Status: En Cours
    ↓
Development → Regular commits with [#XXX]
    ↓
Create PR with "Related to #XXX" → Status: Review
    ↓
Code Review → Address feedback
    ↓
PR Merged → Status: Testing (Issue stays OPEN)
    ↓
QA Testing → Manual validation
    ↓
Testing Passed → Manually close issue → Status: Done
    ↓
Release → Status: Released
```

## ⚠️ Important Notes

1. **Issues stay OPEN through Testing**: Only close manually after QA validation
2. **One issue = One branch = One PR**: Maintain clear traceability
3. **Delete branches after merge**: Keep repository clean
4. **Update issue regularly**: Maintain communication with team

Remember: EVERY issue MUST have a corresponding branch and PR. No exceptions!