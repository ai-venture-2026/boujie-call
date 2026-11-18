---
name: shop-page-on-phones-each-piece-s-colours-scroll-sideways-in-
title: Shop page on phones: each piece's colours scroll sideways in one row, about 1.5 cards visible, instead of the 2-then-1 grid
created: 2026-11-18T14:49:40.558Z
updated: 2026-11-18T14:49:40.558Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 4
lastCycle: 20261118-996caf
tags: shop, page, phones, each, piece, colours, scroll, sideways, src
---
# Shop page on phones: each piece's colours scroll sideways in one row, about 1.5 cards visible, instead of the 2-then-1 grid

## When to use
Requests like:
- "Shop page on phones: each piece's colours scroll sideways in one row, about 1.5 cards visible, instead of the 2-then-1 grid"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/shop.test.tsx
- src/components/shop-grid.tsx

Acceptance criteria that passed:
- At 390px wide every piece's cards sit in one row (same top edge) and the row scrolls sideways (scrollWidth greater than its width).
- At 390px a card is about 60% of the screen width (68% of the row inside its side padding), so part of the next card shows.
- At 768px the Romper list is still a 2-column grid with the odd last card centred, and at 1280px it is 4 across.
- Every card link stays reachable with Tab, and the full test suite passes.

Gate runs: 12 (4 failed)

## Known failures
- code gate, scope failed 4 time(s): 1 changed file(s) are not in the plan's "## Files to touch":
- code gate, style failed 4 time(s): 3 style problem(s) in the diff. write precisely and directly:

## Notes
- A sideways scroll row inside a grid item widens the page unless the grid item and its parents take min-w-0; measure document scrollWidth at phone width, not only the row.
- Chrome does not scroll a half-visible focused element inside a scroll container; scrollIntoView on :focus-visible fixes keyboard focus without moving the row on taps.
- Stubbing Element.prototype.matches in jsdom breaks Testing Library queries; delegate to the original for every selector except the one under test.
- unslopped pr regenerates the PR text from the plan, so correct the plan, not the proposal file.
