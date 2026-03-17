#!/bin/bash
# block-dangerous-git.sh
# PreToolUse hook for Claude Code that blocks dangerous git commands.
# Adapted from DamienBattistella/skills/git-guardrails-claude-code
#
# Exit codes:
#   0 = command allowed
#   2 = command blocked (Claude Code treats this as a denial)

set -euo pipefail

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command')

# If jq failed or command is empty, allow (fail open)
if [ -z "$COMMAND" ] || [ "$COMMAND" = "null" ]; then
  exit 0
fi

DANGEROUS_PATTERNS=(
  "git push"
  "git reset --hard"
  "git clean -fd"
  "git clean -f"
  "git branch -D"
  "git checkout \."
  "git restore \."
  "push --force"
  "push --force-with-lease"
  "reset --hard"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qE "$pattern"; then
    echo "BLOCKED: '$COMMAND' matches dangerous pattern '$pattern'." >&2
    echo "You do not have authority to run this command. Ask the user to run it manually." >&2
    exit 2
  fi
done

exit 0
