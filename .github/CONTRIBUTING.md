# Contributing to Shooting Star

Thank you for contributing to the Shooting Star project! This guide outlines our development workflow and standards.

## 🚀 Quick Start

1. **Find or create an issue** before starting any work
2. **Create a branch** from the issue
3. **Make your changes** with proper commits
4. **Open a PR** linked to the issue
5. **Wait for review** before merging

## 📋 Issue Management

### Before Starting Work
- Check if an issue already exists
- If not, create one using our templates
- Wait for issue to be assigned to you
- Check priority (P0-P3) and size (XS-XL) labels

### Issue Templates
- **Feature Request**: New functionality
- **Bug Report**: Something broken
- **Technical Debt**: Refactoring/optimization

## 🌿 Git Workflow

### Branch Naming Convention
```bash
feature/issue-XXX-short-description  # New features
bugfix/issue-XXX-short-description   # Bug fixes
hotfix/issue-XXX-short-description   # Urgent fixes
```

### Creating a Branch
```bash
git checkout main
git pull origin main
git checkout -b feature/issue-123-booking-form
```

### Commit Messages
**ALWAYS reference the issue:**
```bash
git commit -m "[#123] Add form validation"
git commit -m "[#123] Fix mobile responsive layout"
git commit -m "[#123] Add unit tests for booking form"
```

### Commit Best Practices
- Make atomic commits (one logical change per commit)
- Write clear, descriptive messages
- Reference the issue in EVERY commit
- Use present tense ("Add feature" not "Added feature")

## 🔄 Pull Request Process

### PR Title Format
```
[Issue #123] Clear description of changes
```

### PR Description Template
```markdown
Related to #123
<!-- DO NOT use Closes/Fixes/Resolves - issues go to Testing, not Done -->

## Summary
Brief description of what was changed and why

## Changes Made
- List of specific changes
- Include technical details
- Mention any breaking changes

## Testing
- [ ] Unit tests pass
- [ ] Manual testing complete
- [ ] Cross-browser tested
- [ ] Mobile responsive verified

## Screenshots (if UI changes)
[Add screenshots here]
```

### PR Rules
1. **Link to issue**: Use `Related to #XXX` (NOT Closes)
2. **One PR per issue**: Don't mix multiple issues
3. **Complete testing**: All checks must pass
4. **Request review**: Don't merge your own PR
5. **Update from feedback**: Address all review comments
6. **Delete branch after merge**: Keep repo clean

## ✅ Code Standards

### TypeScript/React
- Use TypeScript strict mode
- Follow existing code patterns
- Use functional components with hooks
- Implement proper error handling
- Add JSDoc comments for complex functions

### CSS/Styling
- Use TailwindCSS utility classes
- Follow mobile-first approach
- Ensure accessibility (WCAG 2.1 AA)
- Test responsive design

### Testing
- Write unit tests for new features
- Maintain or improve code coverage
- Test edge cases
- Include integration tests where appropriate

## 🏷️ Label Guide

### Priority Labels
- **P0**: Critical/blocking issue
- **P1**: High priority (next sprint)
- **P2**: Medium priority (planned)
- **P3**: Low priority (nice to have)

### Size Labels
- **XS**: < 2 hours
- **S**: Half day
- **M**: 1-2 days
- **L**: 3-5 days
- **XL**: 1+ week

### Status Labels (Automated)
- **Backlog**: New issue
- **À Faire**: Ready to start
- **En Cours**: In development
- **Review**: PR in review
- **Testing**: QA validation
- **Done**: Complete
- **Released**: In production

## 🔍 Code Review Process

### For Reviewers
- Check code quality and standards
- Verify tests are included
- Test the changes locally
- Provide constructive feedback
- Approve when satisfied

### For Authors
- Respond to all comments
- Make requested changes
- Re-request review after updates
- Don't merge without approval

## 📊 Testing Workflow

After PR is merged, the issue moves to **Testing** status:

1. QA validates functionality
2. Verify acceptance criteria met
3. Test edge cases
4. Check cross-browser compatibility
5. Validate mobile responsiveness
6. If passed → manually close issue
7. If failed → reopen and comment

## 🚫 What NOT to Do

❌ Work directly on `main` branch
❌ Create PR without an issue
❌ Use `Closes/Fixes` in PR (use `Related to`)
❌ Merge your own PR
❌ Mix multiple issues in one PR
❌ Commit without issue reference
❌ Skip testing
❌ Leave branches after merge

## 📚 Resources

- [Tech Lead Workflow](../docs/agents/tech-lead-workflow.md)
- [Agent Coordination](../docs/workflows/agent-coordination.md)
- [Project Automation](../docs/workflows/project-automation.md)
- [Documentation Hub](../docs/README.md)

## 💬 Getting Help

- Check existing documentation
- Ask in issue comments
- Tag relevant team members
- Create a discussion for broader topics

---

**Remember**: Every contribution makes a difference. Follow these guidelines to ensure smooth collaboration!