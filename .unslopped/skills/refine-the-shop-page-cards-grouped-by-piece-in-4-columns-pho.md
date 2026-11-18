---
name: refine-the-shop-page-cards-grouped-by-piece-in-4-columns-pho
title: Refine the shop page: cards grouped by piece in 4 columns, phone filters on two rows, prices on their own line, gift link as a pill button, offer line once, sticky filters
created: 2026-11-12T17:44:49.384Z
updated: 2026-11-12T17:44:49.384Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261112-e2db1e
tags: refine, shop, page, cards, grouped, piece, columns, phone, src
---
# Refine the shop page: cards grouped by piece in 4 columns, phone filters on two rows, prices on their own line, gift link as a pill button, offer line once, sticky filters

## When to use
Requests like:
- "Refine the shop page: cards grouped by piece in 4 columns, phone filters on two rows, prices on their own line, gift link as a pill button, offer line once, sticky filters"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/shop-grid.tsx

Acceptance criteria that passed:
- Cards sit under a heading per piece: The Slip Dress, The Boujie Set, The Romper, in that order
- Desktop shows 4 cards per row
- A colour filter hides a piece's heading when none of its colours match (rejection path)
- On phones the pieces and the colours are two separate rows
- Each card shows the price (or Coming soon) on its own line under the colour
- The gift link is a pill button to /send-a-call
- The hero no longer repeats the offer line (the top banner keeps it)
- The filter column is sticky on desktop
- Phones never scroll sideways (page width equals the screen at 390px)
- Full test suite and build pass; desktop and phone screenshots checked

Gate runs: 11 (3 failed)

## Known failures
- code gate, style failed 3 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
Code gate failed once on a bundled test name. A full page phone screenshot measured 817px wide: the filter wrapper, a grid item, grew to its content; min-w-0 fixed it (390px) and a test guards it. Lesson: check document scrollWidth at phone width after any filter or row layout change. Merged as PR #40 on 2026-11-13.
