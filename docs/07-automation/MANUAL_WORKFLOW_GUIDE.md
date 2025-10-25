# Manual Workflow Guide

This guide provides step-by-step instructions for manually managing the Shooting Star project workflow through GitHub Project board and labels.

## Quick Start

The project board automation has been simplified to **manual management** for maximum flexibility. This guide shows you exactly what to do at each stage.

## Daily Workflow

### 🆕 When Creating a New Issue

1. **Create the issue** in GitHub with a clear title and description
2. **Add to project**: Click "Projects" in the right sidebar → Select "Shooting Star Project"
3. **Set initial status**: The issue will appear in the project - drag it to "Backlog"
4. **Add labels**:
   - Priority: `P0`, `P1`, `P2`, or `P3`
   - Size: `XS`, `S`, `M`, `L`, or `XL`
   - Status: `Backlog`

### 🎯 When Ready to Work on an Issue

1. **Move to À Faire**: Drag issue from Backlog → À Faire in project board
2. **Update labels**:
   - Remove `Backlog` label
   - Add `À Faire` label
3. **Assign priority** if not already set

### 💻 When Starting Development

1. **Assign to yourself**: Click "Assignees" in issue sidebar
2. **Create feature branch**:
   ```bash
   git checkout -b feature/issue-XXX-description
   ```
3. **Move to En Cours**: Drag issue from À Faire → En Cours
4. **Update labels**:
   - Remove `À Faire` label
   - Add `En Cours` label

### 🔀 When Creating a Pull Request

1. **Create PR** with branch naming: `feature/issue-XXX-description`
2. **Link to issue** in PR description:
   ```markdown
   Related to #XXX

   ## Summary
   [Your changes]
   ```
   **Important**: Use `Related to` NOT `Closes` or `Fixes`

3. **Move issue to Review**:
   - Go to the linked issue
   - Drag from En Cours → Review in project board
   - Update label: Remove `En Cours`, add `Review`

### ✅ When PR is Approved and Merged

1. **Merge the PR** to main branch
2. **Move issue to Testing**:
   - Drag from Review → Testing in project board
   - Update label: Remove `Review`, add `Testing`
3. **Notify QA**: Add comment `@qa-tester Ready for testing`

### 🧪 Quality Assurance Testing

**For QA Post Merge Tester only:**

After a PR is merged and issue is in Testing:

1. **Run all tests** per the [Testing Protocol](#testing-protocol)
2. **If all tests pass**:
   - Move issue to "Done" in project board
   - Update label: Remove `Testing`, add `Done`
   - Close the issue with comment: "✅ All tests passed"

3. **If tests fail**:
   - Move issue back to "En Cours" in project board
   - Update label: Remove `Testing`, add `En Cours`
   - Add comment explaining what failed
   - Re-assign to original developer

### 🚀 When Creating a Release

1. **Verify** all issues in "Done" are ready for production
2. **Create GitHub release** with:
   - Version tag (e.g., `v1.0.0`)
   - Release notes listing completed issues
3. **After production deployment succeeds**:
   - Move all released issues to "Released" column
   - Update labels: Remove `Done`, add `Released`
4. **Add release comment** to each issue:
   ```markdown
   Released in version v1.0.0
   ```

## Testing Protocol

QA Post Merge Tester must validate the following before moving to Done:

### 1. Functional Testing
- [ ] All acceptance criteria from issue are met
- [ ] Feature works as described
- [ ] No regression in existing features

### 2. Cross-Browser Testing
Test in minimum 8 browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (iOS)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Firefox (Android)

### 3. Language Testing
- [ ] French version works completely
- [ ] English version works completely
- [ ] All text properly translated
- [ ] Date/currency formats correct

### 4. Accessibility Testing (WCAG 2.1 AA)
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Touch targets ≥ 44x44px (pregnancy-safe)
- [ ] Reduced motion respected

### 5. Performance Testing
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] Lighthouse score > 90

### 6. Security Testing
- [ ] No new vulnerabilities introduced
- [ ] Health data properly encrypted (if applicable)
- [ ] PIPEDA/Quebec Law 25 compliance maintained

## Label Management Cheat Sheet

### Status Labels (Use only ONE at a time)
```
Backlog    → Issue created, awaiting triage
À Faire    → Ready to be worked on
En Cours   → Active development
Review     → Code review in progress
Testing    → Quality assurance
Done       → Complete, validated
Released   → Deployed to production
```

### Priority Labels
```
P0 → Critical    (fix immediately)
P1 → High        (next sprint)
P2 → Medium      (planned)
P3 → Low         (backlog)
```

### Size Labels
```
XS → < 1 hour
S  → < 4 hours
M  → < 1 day
L  → 2-3 days
XL → > 3 days
```

## Common Scenarios

### Scenario: PR Closed Without Merge

If a PR is closed without merging (abandoned, superseded, etc.):

1. Move issue back to "En Cours"
2. Update label: Remove `Review`, add `En Cours`
3. Add comment explaining why PR was closed
4. Re-assign to developer if needed

### Scenario: Issue Reopened

If a Done issue needs to be reopened:

1. Reopen the issue in GitHub
2. Move to "En Cours" in project board
3. Update label: Remove `Done`, add `En Cours`
4. Add comment explaining why reopened
5. Assign to developer

### Scenario: Urgent Hotfix

For P0 critical issues:

1. Create issue with `P0` label
2. Skip Backlog/À Faire - go directly to "En Cours"
3. Follow normal PR → Review → Testing flow
4. Expedite QA testing
5. Deploy to production immediately after Done

### Scenario: Bulk Status Update

To update multiple issues at once:

1. Go to project board
2. Select multiple issues (hold Shift)
3. Drag all to new column together
4. Update labels individually via issue list:
   - Go to repository Issues tab
   - Use filters to select issues
   - Bulk apply/remove labels

## Team Responsibilities

### Developers
- ✅ Create issues with proper labels
- ✅ Move issues through statuses as work progresses
- ✅ Link PRs to issues
- ✅ Update labels when status changes
- ✅ Respond to QA feedback

### QA Post Merge Tester
- ✅ Test all issues in Testing status
- ✅ Move to Done OR revert to En Cours
- ✅ Final authority on quality
- ✅ Can reject any issue that doesn't meet standards

### Project Manager
- ✅ Triage new issues (Backlog → À Faire)
- ✅ Set priorities
- ✅ Monitor project health
- ✅ Coordinate releases
- ✅ Manage milestones

## Tips for Efficiency

### Use GitHub Project Views

Create custom views in the project board:
- **My Issues**: Filter by assignee
- **By Priority**: Group by priority label
- **This Sprint**: Filter by milestone
- **Testing Queue**: Show only Testing status

### Use Saved Filters

In the Issues tab, save frequently used filters:
- `is:open label:P0` - Critical issues
- `is:open label:"En Cours" assignee:@me` - My active work
- `is:open label:Testing` - QA queue

### Keyboard Shortcuts

- `g` then `p` - Go to Projects
- `g` then `i` - Go to Issues
- `l` - Open labels menu
- `a` - Assign yourself

## Troubleshooting

### Issue not appearing in project

**Solution**:
1. Open the issue
2. Click "Projects" in right sidebar
3. Add to "Shooting Star Project"

### Labels out of sync with project column

**Solution**:
1. Check which column issue is in
2. Manually update label to match
3. Keep only ONE status label per issue

### Can't drag issue in project board

**Solution**:
1. Refresh the page
2. Check your permissions
3. Try using the "..." menu → "Move to" option

## Questions?

- **Workflow questions**: See [project-board.md](project-board.md)
- **Technical issues**: Ask in team chat
- **Process improvements**: Create an issue with label `process-improvement`

---

**Remember**: Manual workflow gives you flexibility. The key is **consistency** - always update both the project board column AND the status label together.