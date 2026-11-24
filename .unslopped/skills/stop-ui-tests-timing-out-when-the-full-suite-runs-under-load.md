---
name: stop-ui-tests-timing-out-when-the-full-suite-runs-under-load
title: Stop UI tests timing out when the full suite runs under load
created: 2026-11-24T12:11:07.222Z
updated: 2026-11-24T12:11:07.222Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261124-350b6f
tags: stop, ui, tests, timing, full, suite, runs, load, src
---
# Stop UI tests timing out when the full suite runs under load

## When to use
Requests like:
- "Stop UI tests timing out when the full suite runs under load"

## Playbook
Files touched:
- CHANGELOG.md
- src/lib/test-timeouts.test.ts
- vitest.config.ts
- vitest.setup.ts

Acceptance criteria that passed:
- vitest testTimeout is 20000 ms and Testing Library asyncUtilTimeout is 5000 ms, checked by a test.
- With three full suites running at once, each passes with 0 failures (was 9, 16 and 15).
- One full suite on an idle machine passes all tests.

Gate runs: 9 (1 failed)

## Known failures
- code gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
- Merged as PR #74 into develop; staging answers 200 after the merge.
- One gate failed: the style gate rejects a test name containing "and"; name each test by the single outcome it proves.
- Importing vitest.config.ts inside a jsdom test fails on fileURLToPath; read the active limit from the test context (task.timeout) instead.
- `unslopped commit` does not stage files; git add the cycle files first.
- Load check for future flakes: run three full suites at once with --reporter=json and count failures per run.
