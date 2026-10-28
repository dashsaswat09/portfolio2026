#!/bin/zsh
cd "$(dirname "$0")"
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
if ! command -v npm >/dev/null 2>&1; then
  echo "Node.js isn't installed. Get it from https://nodejs.org (LTS), then double-click this file again."
  read -k1
  exit 1
fi
[ -d node_modules ] || npm install
npm run dev -- --open
