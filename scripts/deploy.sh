#!/bin/bash

# Quick deployment script for GitHub
# This script helps you deploy your site to GitHub in one command

set -e  # Exit on error

echo "🚀 GitHub Deployment Helper"
echo "============================"
echo ""

# Check if git remote already exists
if git remote get-url origin &> /dev/null; then
    echo "✓ Git remote 'origin' already configured"
    REMOTE_URL=$(git remote get-url origin)
    echo "  Remote: $REMOTE_URL"
    echo ""
else
    echo "⚠️  No git remote found. Let's set it up!"
    echo ""
    echo "First, create a repository on GitHub:"
    echo "  1. Go to https://github.com/new"
    echo "  2. Name it: YOUR-USERNAME.github.io (e.g., rajchampaneriyar.github.io)"
    echo "  3. Make it Public"
    echo "  4. DO NOT initialize with README"
    echo ""
    read -p "Enter your GitHub repository URL (e.g., https://github.com/username/repo.git): " REPO_URL
    
    if [ -z "$REPO_URL" ]; then
        echo "❌ No URL provided. Exiting."
        exit 1
    fi
    
    echo ""
    echo "Adding remote..."
    git remote add origin "$REPO_URL"
    echo "✓ Remote added successfully"
    echo ""
fi

# Check current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "Current branch: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  You're not on the 'main' branch"
    read -p "Switch to main branch? (y/n): " SWITCH
    if [ "$SWITCH" = "y" ]; then
        git checkout -B main
        echo "✓ Switched to main branch"
    fi
fi

echo ""
echo "📋 Current status:"
git status --short
echo ""

# Check if there are changes to commit
if [[ -n $(git status --porcelain) ]]; then
    echo "⚠️  You have uncommitted changes"
    read -p "Commit all changes? (y/n): " COMMIT
    
    if [ "$COMMIT" = "y" ]; then
        read -p "Enter commit message: " MESSAGE
        if [ -z "$MESSAGE" ]; then
            MESSAGE="Update site content"
        fi
        
        echo ""
        echo "Committing changes..."
        git add .
        git commit -m "$MESSAGE"
        echo "✓ Changes committed"
    else
        echo "Skipping commit. Make sure to commit before pushing!"
        exit 0
    fi
fi

echo ""
read -p "🚀 Ready to push to GitHub? (y/n): " PUSH

if [ "$PUSH" = "y" ]; then
    echo ""
    echo "Pushing to GitHub..."
    
    # Check if this is first push
    if git rev-parse --verify origin/$CURRENT_BRANCH &> /dev/null; then
        git push
    else
        echo "First push detected, using -u flag..."
        git push -u origin $CURRENT_BRANCH
    fi
    
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📝 Next steps:"
    echo "  1. Go to your repository on GitHub"
    echo "  2. Click Settings → Pages"
    echo "  3. Under 'Build and deployment', select 'GitHub Actions'"
    echo "  4. Wait 1-2 minutes for deployment"
    echo "  5. Visit your site at: https://YOUR-USERNAME.github.io"
    echo ""
    echo "For detailed instructions, see DEPLOYMENT.md"
else
    echo "Push cancelled. Run this script again when ready."
fi
