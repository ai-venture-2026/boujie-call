---
name: home-drop-the-shop-button-under-the-diptych-view-all-pieces-
title: Home: drop the Shop button under the diptych, View all pieces as a quiet text link, no duplicate CTAs within one screen
created: 2026-10-29T22:06:22.582Z
updated: 2026-10-29T22:06:22.582Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 2
lastCycle: 20261029-777b84
tags: home, drop, shop, button, diptych, view, pieces, quiet, src
---
# Home: drop the Shop button under the diptych, View all pieces as a quiet text link, no duplicate CTAs within one screen

## When to use
Requests like:
- "Home: drop the Shop button under the diptych, View all pieces as a quiet text link, no duplicate CTAs within one screen"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx

Acceptance criteria that passed:
- The brunch and night section holds no Shop the collection button, and the pieces heading sits 120px below the panels on desktop and 72px on phones
- View all pieces reads as small uppercase ink text with a thin Boujie Pink underline and an arrow, keeps the accessible name "View all pieces", and is at least 44px tall
- On desktop View all pieces is right-aligned and vertically centered on the heading block; on phones it sits below the subtitle, left-aligned
- Rejection path: no two Home calls to action with the same destination sit within one screen height of each other, header excluded

Gate runs: 10 (2 failed)

## Known failures
- release gate, clean tree failed 1 time(s): uncommitted changes:
- monitor gate, monitor notes failed 1 time(s): 1 gate run(s) failed this cycle. write what happened and what to do next time under "## Monitor" in the plan

## Notes
Release gate failed once because the review record file was uncommitted; commit .unslopped/reviews right after recording a review, before running the release gate.
