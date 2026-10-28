---
name: home-sections-round-2-brunch-to-after-dark-photo-pair-and-th
title: Home sections round 2: brunch to after dark photo pair and the pieces grid
created: 2026-10-28T21:22:54.199Z
updated: 2026-10-28T21:22:54.199Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-ea9514
tags: home, sections, round, brunch, dark, photo, pair, pieces, src
---
# Home sections round 2: brunch to after dark photo pair and the pieces grid

## When to use
Requests like:
- "Home sections round 2: brunch to after dark photo pair and the pieces grid"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/page.tsx

Acceptance criteria that passed:
- The brunch to after dark section shows two photos side by side on desktop with the brunch line on the day photo and the night line on the ink half.
- The night half holds one "Shop the collection" button linking to /shop and stays marked data-nav="dark".
- The pieces section shows The Slip Dress, The Boujie Set and The Romper, each linking to its product page, plus one "View all pieces" button to /shop.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Text overlaid on photos must move below them on phones; full-height photo halves leave no safe text area at 390px.
- DOM order should follow reading order (heading, items, then view all); use grid placement for the visual order.
