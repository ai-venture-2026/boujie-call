---
name: shop-filters-become-clickable-pills-colour-pills-with-a-swat
title: Shop filters become clickable pills: colour pills with a swatch dot and name, piece pills to match, on desktop and phones
created: 2026-11-12T17:29:57.911Z
updated: 2026-11-12T17:29:57.911Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-618603
tags: shop, filters, become, clickable, pills, colour, swatch, src
---
# Shop filters become clickable pills: colour pills with a swatch dot and name, piece pills to match, on desktop and phones

## When to use
Requests like:
- "Shop filters become clickable pills: colour pills with a swatch dot and name, piece pills to match, on desktop and phones"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/shop.test.tsx
- src/components/shop-grid.tsx

Acceptance criteria that passed:
- Every colour filter is a pill at desktop width (rounded, bordered), not plain text
- Each colour pill shows its colour dot; Bloom shows its print; All colors has no dot
- The piece filters are pills in the same style
- The chosen pill is marked pressed and fills blush with a pink border
- Button names stay the plain colour or piece name (rejection path: the dot adds nothing to the name)
- Filtering still shows only the chosen piece and colour
- Full test suite and build pass; the shop checked in a browser at desktop and phone width

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
No gate failures. Pills reuse the phone styling at every width plus a swatch dot from the colorway hex or print. Merged as PR #39 on 2026-11-13.
