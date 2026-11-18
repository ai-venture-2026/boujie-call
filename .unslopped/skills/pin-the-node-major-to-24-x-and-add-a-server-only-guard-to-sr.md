---
name: pin-the-node-major-to-24-x-and-add-a-server-only-guard-to-sr
title: Pin the Node major to 24.x and add a server-only guard to src/lib/shopify.ts
created: 2026-11-18T14:06:49.065Z
updated: 2026-11-18T14:06:49.065Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 4
lastCycle: 20261118-af0597
tags: pin, node, major, 24.x, add, server-only, guard, src/lib/shopify.ts, src
---
# Pin the Node major to 24.x and add a server-only guard to src/lib/shopify.ts

## When to use
Requests like:
- "Pin the Node major to 24.x and add a server-only guard to src/lib/shopify.ts"

## Playbook
Files touched:
- CHANGELOG.md
- package-lock.json
- package.json
- src/lib/shopify.test.ts
- src/lib/shopify.ts
- vitest.config.ts

Acceptance criteria that passed:
- package.json engines.node reads 24.x.
- src/lib/shopify.ts starts with import "server-only".
- A client component that imports src/lib/shopify.ts makes npm run build fail.
- npm run build exits 0 and the full test suite passes.

Gate runs: 12 (4 failed)

## Known failures
- code gate, lint failed 3 time(s): .next/types/validator.ts:245:39 - error TS2307: Cannot find module '../../src/app/zz-guard-check/page.js' or its corresponding type declarat
- test gate, test failed 1 time(s): ❯ src/app/send-a-call/start/start.test.tsx (13 tests | 1 failed) 1765ms

## Notes
- A probe build that adds then deletes a page leaves stale .next/types, which fails lint; delete .next/types and rebuild after such a probe.
- start.test.tsx 'shows a refused field as an alert' failed once under full-suite load: the always-rendered empty alert races startCall. Logged as debt.
- Vercel's preview build accepted engines.node 24.x.
