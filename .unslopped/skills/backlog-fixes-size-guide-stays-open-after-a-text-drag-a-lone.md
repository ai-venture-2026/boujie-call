---
name: backlog-fixes-size-guide-stays-open-after-a-text-drag-a-lone
title: Backlog fixes: size guide stays open after a text drag, a lone last shop card centres on tablets, hairlines use the card border colour, the gallery reuses one screen size check
created: 2026-11-12T19:19:50.567Z
updated: 2026-11-12T19:19:50.567Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 4
lastCycle: 20261112-0bf3dc
tags: backlog, fixes, size, guide, stays, open, text, drag, src
---
# Backlog fixes: size guide stays open after a text drag, a lone last shop card centres on tablets, hairlines use the card border colour, the gallery reuses one screen size check

## When to use
Requests like:
- "Backlog fixes: size guide stays open after a text drag, a lone last shop card centres on tablets, hairlines use the card border colour, the gallery reuses one screen size check"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/bag/bag.test.tsx
- src/app/shop/shop.test.tsx
- src/components/bag-view.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/components/site-header.tsx
- src/components/size-guide.tsx

Acceptance criteria that passed:
- A drag that starts inside the size guide and ends on the backdrop leaves it open
- A press and release on the backdrop still closes it (rejection path)
- A lone last shop card carries the centring classes up to lg
- The bag list dividers use border-card-border
- Ten gallery scroll events build the screen size query once
- Full test suite and build pass

Gate runs: 12 (4 failed)

## Known failures
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
Code gate failed once on a test name. Four debt entries cleared by hand from DEBT.md in the same commit. Merged as PR #48 on 2026-11-13.
