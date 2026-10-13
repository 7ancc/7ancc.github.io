#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
expected_remote='https://github.com/7ancc/7ancc.github.io.git'
test "$(git remote get-url origin)" = "$expected_remote" || { echo 'Stop: unexpected origin.' >&2; exit 1; }
test "$(git branch --show-current)" = main || { echo 'Stop: publish from main.' >&2; exit 1; }
gh auth status --hostname github.com
npm ci
npm run check
npm audit --omit=dev
npm run build
git diff --check
git add app components lib public scripts docs tests .github .gitignore .gitattributes .nvmrc Publish.command README.md package.json package-lock.json next.config.ts postcss.config.mjs tsconfig.json
node scripts/check-public.mjs --staged
git diff --cached --check
if ! git diff --cached --quiet; then
  git commit -m "Update portfolio content and static build"
fi
git push origin main
echo 'Source pushed. GitHub Actions will deploy the static out directory.'
gh run list --repo 7ancc/7ancc.github.io --workflow deploy.yml --limit 1
