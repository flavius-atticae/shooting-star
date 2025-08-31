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

# Priority Labels (Direct mapping to project columns)
echo "Creating priority labels..."
gh label create "P0" --color "d73a49" --description "Critical priority (P0)" --force
gh label create "P1" --color "ff9500" --description "High priority (P1)" --force
gh label create "P2" --color "fbca04" --description "Medium priority (P2)" --force
gh label create "P3" --color "0e8a16" --description "Low priority (P3)" --force

# Size Labels (Direct mapping to project columns)
echo "Creating size labels..."
gh label create "XS" --color "0e8a16" --description "Extra small change (< 2 hours)" --force
gh label create "S" --color "1f76db" --description "Small change (half day)" --force
gh label create "M" --color "fbca04" --description "Medium change (1-2 days)" --force
gh label create "L" --color "ff9500" --description "Large change (3-5 days)" --force
gh label create "XL" --color "d73a49" --description "Extra large change (1+ weeks)" --force

# Status Labels (Direct mapping to project columns)
echo "Creating status labels..."
gh label create "Backlog" --color "6a737d" --description "Needs initial review and prioritization" --force
gh label create "À Faire" --color "1f76db" --description "Ready for development" --force
gh label create "En Cours" --color "0e8a16" --description "Currently being worked on" --force
gh label create "Review" --color "fbca04" --description "Waiting for code review" --force
gh label create "Testing" --color "ff9500" --description "Ready for testing" --force
gh label create "Done" --color "e91e63" --description "Implementation completed" --force
gh label create "Released" --color "6f42c1" --description "Released to production" --force

# Type Labels
echo "Creating type labels..."
gh label create "Bug" --color "D73A49" --description "Something isn't working" --force
gh label create "Feature" --color "A2EEEF" --description "New feature or request" --force
gh label create "Enhancement" --color "84B6EB" --description "Improvement to existing feature" --force
gh label create "Documentation" --color "0075CA" --description "Improvements or additions to documentation" --force
gh label create "Refactor" --color "FEF2C0" --description "Code refactoring" --force
gh label create "Test" --color "C2E0C6" --description "Adding or updating tests" --force

# Quality Labels
echo "Creating quality labels..."
gh label create "Code Quality" --color "8B4513" --description "Code quality issues (typecheck, build)" --force
gh label create "Performance" --color "FF6B6B" --description "Performance related" --force
gh label create "Security" --color "B60205" --description "Security related" --force
gh label create "Accessibility" --color "0052CC" --description "Accessibility related" --force



echo "✅ All labels created successfully!"
echo ""
echo "📋 Summary of created labels:"
echo ""
echo "🎯 Priority labels (P0-P3): Direct mapping to project Priority column"
echo "   • P0 (Red) - Critical priority"
echo "   • P1 (Orange) - High priority" 
echo "   • P2 (Yellow) - Medium priority"
echo "   • P3 (Green) - Low priority"
echo ""
echo "📏 Size labels (XS-XL): Direct mapping to project Size column"
echo "   • XS (Green) - Extra small change (< 2 hours)"
echo "   • S (Blue) - Small change (half day)"
echo "   • M (Yellow) - Medium change (1-2 days)"
echo "   • L (Orange) - Large change (3-5 days)"
echo "   • XL (Red) - Extra large change (1+ weeks)"
echo ""
echo "📊 Status labels: Direct mapping to project Status column"
echo "   • Backlog (Gray) - Needs initial review and prioritization"
echo "   • À Faire (Blue) - Ready for development"
echo "   • En Cours (Green) - Currently being worked on"
echo "   • Review (Yellow) - Waiting for code review"
echo "   • Testing (Orange) - Ready for testing"
echo "   • Done (Pink) - Implementation completed"
echo "   • Released (Purple) - Released to production"
echo ""
echo "🏷️ Other labels:"
echo "   • Type labels: Bug, Feature, Enhancement, Documentation, Refactor, Test"
echo "   • Quality labels: Code Quality, Performance, Security, Accessibility"
echo ""
echo "🔧 Next steps:"
echo "   1. ✅ Project columns are already configured: Backlog → À Faire → En Cours → Review → Testing → Done → Released"
echo "   2. ✅ Project automation workflows are set up and running"
echo "   3. Configure branch protection rules for your main branch (optional)"
echo "   4. Set up required status checks for pull requests (optional)"
echo ""
echo "🎨 All label colors are aligned with your GitHub Project column colors!"
echo "For workflow details, see .github/workflows/project-status-automation.yml"