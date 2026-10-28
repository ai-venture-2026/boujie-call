---
name: de-slop-pass-remove-orphan-markers-decorative-tier-glyphs-re
title: De-slop pass: remove orphan markers, decorative tier glyphs, redundant label, unify buttons
created: 2026-10-28T17:45:17.825Z
updated: 2026-10-28T17:45:17.825Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-f7b9c6
tags: de-slop, pass, remove, orphan, markers, decorative, tier, glyphs, src
---
# De-slop pass: remove orphan markers, decorative tier glyphs, redundant label, unify buttons

## When to use
Requests like:
- "De-slop pass: remove orphan markers, decorative tier glyphs, redundant label, unify buttons"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/not-found.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/seo.test.tsx
- src/app/shop/shop.test.tsx
- src/components/marker.tsx
- src/components/product-view.tsx
- src/components/site-header.tsx

Acceptance criteria that passed:
- Home renders no section marker such as "‹ 03 ›".
- No tier spread contains a ✦ glyph.
- The steps section shows no eyebrow paragraph above its headline.
- The 404 page, the mobile drawer and the product page render no element with the old .btn class; their actions use .pill.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 9 (1 failed)

## Known failures
- plan gate, criteria quality failed 1 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):

## Notes
- Glyph tests must strip placeholder images first; the ImageSlot ✦ is intended.
- The criteria checker flags any quoted "How it works"; describe the section instead.
