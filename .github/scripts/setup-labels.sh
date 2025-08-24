#!/bin/bash

# GitHub Project Automation - Label Setup Script
# This script creates all the necessary labels for project automation

set -e

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "Error: GitHub CLI (gh) is not installed or not in PATH"
    echo "Please install it from: https://cli.github.com/"
    exit 1
fi

# Check if user is authenticated
if ! gh auth status &> /dev/null; then
    echo "Error: Not authenticated with GitHub CLI"
    echo "Please run: gh auth login"
    exit 1
fi

echo "🏷️  Setting up labels for project automation..."

# Priority Labels
echo "Creating priority labels..."
gh label create "priority/low" --color "0E8A16" --description "Low priority issue" --force
gh label create "priority/medium" --color "FBCA04" --description "Medium priority issue" --force
gh label create "priority/high" --color "FF9500" --description "High priority issue" --force
gh label create "priority/critical" --color "B60205" --description "Critical priority issue" --force

# Type Labels
echo "Creating type labels..."
gh label create "type/bug" --color "D73A49" --description "Something isn't working" --force
gh label create "type/feature" --color "A2EEEF" --description "New feature or request" --force
gh label create "type/enhancement" --color "84B6EB" --description "Improvement to existing feature" --force
gh label create "type/documentation" --color "0075CA" --description "Improvements or additions to documentation" --force
gh label create "type/refactor" --color "FEF2C0" --description "Code refactoring" --force
gh label create "type/test" --color "C2E0C6" --description "Adding or updating tests" --force

# Status Labels
echo "Creating status labels..."
gh label create "status/triage" --color "EDEDED" --description "Needs initial review and prioritization" --force
gh label create "status/ready" --color "0E8A16" --description "Ready for development" --force
gh label create "status/in-development" --color "FBCA04" --description "Currently being worked on" --force
gh label create "status/needs-review" --color "FF9500" --description "Waiting for code review" --force
gh label create "status/ready-for-testing" --color "1D76DB" --description "Ready for testing" --force
gh label create "status/completed" --color "0E8A16" --description "Implementation completed" --force
gh label create "status/released" --color "5319E7" --description "Released to production" --force

# Quality Labels
echo "Creating quality labels..."
gh label create "quality/needs-tests" --color "F9D71C" --description "Needs test coverage" --force
gh label create "quality/needs-docs" --color "7057FF" --description "Needs documentation" --force
gh label create "quality/performance" --color "FF6B6B" --description "Performance related" --force
gh label create "quality/security" --color "B60205" --description "Security related" --force
gh label create "quality/accessibility" --color "0052CC" --description "Accessibility related" --force

# Workflow Labels
echo "Creating workflow labels..."
gh label create "needs-reproduction" --color "D93F0B" --description "Bug needs reproduction steps" --force
gh label create "needs-analysis" --color "F9D71C" --description "Needs further analysis" --force
gh label create "ready-for-testing" --color "1D76DB" --description "Ready for QA testing" --force
gh label create "needs-fixes" --color "FF6B6B" --description "Changes requested, needs fixes" --force
gh label create "good-first-issue" --color "7057FF" --description "Good for newcomers" --force
gh label create "help-wanted" --color "008672" --description "Extra attention is needed" --force

# Special Labels
echo "Creating special labels..."
gh label create "hotfix" --color "B60205" --description "Critical fix that bypasses normal flow" --force
gh label create "emergency" --color "B60205" --description "Emergency issue requiring immediate attention" --force
gh label create "breaking-change" --color "D93F0B" --description "Introduces breaking changes" --force
gh label create "dependencies" --color "0366D6" --description "Pull requests that update a dependency file" --force
gh label create "stale" --color "EDEDED" --description "No activity for extended period" --force
gh label create "pinned" --color "FF6B6B" --description "Should not be closed by automation" --force
gh label create "manual-control" --color "000000" --description "Skip automation for this item" --force
gh label create "automation-disabled" --color "000000" --description "Automation disabled for this item" --force

# Size Labels (for estimation)
echo "Creating size labels..."
gh label create "size/XS" --color "3CBF00" --description "Extra small change (1-2 hours)" --force
gh label create "size/S" --color "5D9801" --description "Small change (half day)" --force
gh label create "size/M" --color "7F7203" --description "Medium change (1-2 days)" --force
gh label create "size/L" --color "A14C05" --description "Large change (3-5 days)" --force
gh label create "size/XL" --color "C32607" --description "Extra large change (1+ week)" --force

echo "✅ All labels created successfully!"
echo ""
echo "📋 Summary of created labels:"
echo "   • Priority labels: low, medium, high, critical"
echo "   • Type labels: bug, feature, enhancement, documentation, refactor, test"
echo "   • Status labels: triage, ready, in-development, needs-review, ready-for-testing, completed, released"
echo "   • Quality labels: needs-tests, needs-docs, performance, security, accessibility"
echo "   • Workflow labels: needs-reproduction, needs-analysis, ready-for-testing, needs-fixes, etc."
echo "   • Special labels: hotfix, emergency, breaking-change, dependencies, stale, pinned"
echo "   • Size labels: XS, S, M, L, XL"
echo ""
echo "🔧 Next steps:"
echo "   1. Configure your GitHub Project board with the columns: Backlog, À Faire, En Cours, Review, Testing, Done, Released"
echo "   2. Set up the project automation workflows in your repository"
echo "   3. Configure branch protection rules for your main branch"
echo "   4. Set up required status checks for pull requests"
echo ""
echo "For more information, see the project automation configuration in .github/project-automation-config.yml"