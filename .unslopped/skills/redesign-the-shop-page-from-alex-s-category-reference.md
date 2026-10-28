---
name: redesign-the-shop-page-from-alex-s-category-reference
title: Redesign the Shop page from Alex's category reference
created: 2026-10-28T21:40:00.146Z
updated: 2026-10-28T21:40:00.146Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-208bc1
tags: redesign, shop, page, alex, category, reference, src
---
# Redesign the Shop page from Alex's category reference

## When to use
Requests like:
- "Redesign the Shop page from Alex's category reference"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/lib/products.ts

Acceptance criteria that passed:
- /shop shows the title "The collection", the offer line and one card for each of the 10 colorways.
- Choosing The Romper in the sidebar leaves only its 4 colorway cards.
- Choosing the colour After Dark leaves only After Dark cards.
- A piece and colour pair with no match shows a message and a reset button.
- A colorway card links to its product page with that colorway, and the product page opens with that colorway checked.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Perl edits that put a TypeScript union in the search pattern left fragments twice this project; edit unions with sed or a full-line rewrite.
- Sidebar labels must not wrap on phones; mark toggles whitespace-nowrap in a scrolling row.
