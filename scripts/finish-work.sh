#!/usr/bin/env bash
# finish-work.sh — Stage, commit, and push all changes.
# Usage: ./scripts/finish-work.sh "Your commit message"
#        npm run finish-work "Your commit message"
#
# For AI-generated commit messages + automatic changelog update,
# just tell Claude: "finish-work" inside your Claude Code session.

set -euo pipefail

COMMIT_MSG="${1:-}"

if [[ -z "$COMMIT_MSG" ]]; then
  echo "Usage: $0 \"commit message\""
  echo ""
  echo "Tip: Tell Claude 'finish-work' to get an AI-generated commit message"
  echo "     and automatic changelog update in one shot."
  exit 1
fi

echo "→ Staging all changes..."
git add .

if git diff --cached --quiet; then
  echo "Nothing to commit — working tree is clean."
  exit 0
fi

echo "→ Committing: $COMMIT_MSG"
git commit -m "$COMMIT_MSG"

BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "→ Pushing to origin/$BRANCH..."
git push --set-upstream origin "$BRANCH"

echo ""
echo "Done! To update the changelog, tell Claude: /changelog"
