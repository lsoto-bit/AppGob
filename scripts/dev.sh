#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ -s "$NVM_DIR/nvm.sh" ]]; then
  unset npm_config_prefix
  # shellcheck source=/dev/null
  source "$NVM_DIR/nvm.sh"
  cd "$PROJECT_DIR"
  nvm use --silent 2>/dev/null || nvm use
fi

node "$SCRIPT_DIR/check-node-version.cjs"
cd "$PROJECT_DIR"
exec vite "$@"
