#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
bash scripts/publish.sh
printf '\nPress Return to close.\n'
read -r
