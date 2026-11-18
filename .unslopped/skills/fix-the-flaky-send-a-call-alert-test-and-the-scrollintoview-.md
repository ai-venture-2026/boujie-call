---
name: fix-the-flaky-send-a-call-alert-test-and-the-scrollintoview-
title: Fix the flaky Send a Call alert test and the scrollIntoView stub that leaks between shop tests
created: 2026-11-18T14:57:45.832Z
updated: 2026-11-18T14:57:45.832Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261118-439ffc
tags: fix, flaky, send, call, alert, test, scrollintoview, stub, src
---
# Fix the flaky Send a Call alert test and the scrollIntoView stub that leaks between shop tests

## When to use
Requests like:
- "Fix the flaky Send a Call alert test and the scrollIntoView stub that leaks between shop tests"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/call/call.test.tsx
- src/app/send-a-call/start/start.test.tsx
- src/app/shop/shop.test.tsx

Acceptance criteria that passed:
- start.test.tsx and call.test.tsx pass 20 runs in a row with startCall and claimCall delayed by 50ms.
- After the quick-add bar tests, Element.prototype has no scrollIntoView left from them.
- The full test suite passes.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- No gate failed. Delaying the mocked server action by 50ms turns a timing race into a failure on every run, which is the red run for a flaky test.
- An isolation test placed after a later cleanup proves nothing; put it directly after the block that leaks.
