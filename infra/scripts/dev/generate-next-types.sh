#!/usr/bin/env bash
# Generate next-env.d.ts and .next/types for both Next.js apps (not committed to git).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
cd "$ROOT"

echo "==> Generating Next.js types (frontend-main)..."
npx pnpm@9.15.0 --filter @i-customize-it/frontend-main exec next typegen

echo "==> Generating Next.js types (frontend-admin)..."
npx pnpm@9.15.0 --filter @i-customize-it/frontend-admin exec next typegen

echo "Next.js type generation complete."
