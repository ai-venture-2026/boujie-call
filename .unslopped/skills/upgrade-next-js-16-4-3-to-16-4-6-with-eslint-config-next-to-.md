---
name: upgrade-next-js-16-4-3-to-16-4-6-with-eslint-config-next-to-
title: Upgrade Next.js 16.4.3 to 16.4.6 with eslint-config-next to clear the security warning that fails the build
created: 2026-11-18T13:42:31.830Z
updated: 2026-11-18T13:42:31.830Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261118-50448d
tags: upgrade, next.js, 16.4.3, 16.4.6, eslint-config-next, clear, security, warning
---
# Upgrade Next.js 16.4.3 to 16.4.6 with eslint-config-next to clear the security warning that fails the build

## When to use
Requests like:
- "Upgrade Next.js 16.4.3 to 16.4.6 with eslint-config-next to clear the security warning that fails the build"

## Playbook
Files touched:
- CHANGELOG.md
- package-lock.json
- package.json

Acceptance criteria that passed:
- npm audit --omit=dev reports 0 vulnerabilities.
- npm ls next shows 16.4.6.
- npm run build exits 0 on the first run with no security warning.
- The full test suite passes.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- No gate failed. The patch release cleared the advisory and the intermittent build warning; the first build passed without a retry.
- The eslint 9 end-of-support upgrade stays in the debt log as its own cycle.
