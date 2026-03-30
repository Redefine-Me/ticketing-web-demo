#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WEB_PORT="3001"
MOBILE_BASE_PATH="${MOBILE_BASE_PATH:-/mobile}"

cleanup() {
  if [[ -n "${WEB_PID:-}" ]]; then
    kill "$WEB_PID" 2>/dev/null || true
  fi
  if [[ -n "${MAIN_PID:-}" ]]; then
    kill "$MAIN_PID" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

echo "[unified-dev] Starting mobile app (web/) on :${WEB_PORT} with base path ${MOBILE_BASE_PATH}"
(
  cd "${ROOT_DIR}/web"
  WEB_BASE_PATH="${MOBILE_BASE_PATH}" npm run dev
) &
WEB_PID=$!

echo "[unified-dev] Starting main app on :3000 with /mobile proxy"
(
  cd "${ROOT_DIR}"
  ENABLE_MOBILE_PROXY=true \
  MOBILE_APP_ORIGIN="http://localhost:${WEB_PORT}" \
  NEXT_PUBLIC_MOBILE_PREVIEW_PATH="${MOBILE_BASE_PATH}" \
  npm run dev:main -- --port 3000
) &
MAIN_PID=$!

wait -n "$WEB_PID" "$MAIN_PID"
