---
name: correct-fallback-product-data-offer-line-and-copy-voice-per-
title: Correct fallback product data, offer line and copy voice per Alex's decisions
created: 2026-10-28T13:12:59.587Z
updated: 2026-10-28T13:12:59.587Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-3ad2e5
tags: correct, fallback, product, data, offer, line, copy, voice, src
---
# Correct fallback product data, offer line and copy voice per Alex's decisions

## When to use
Requests like:
- "Correct fallback product data, offer line and copy voice per Alex's decisions"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/layout.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/waitlist-form.tsx
- src/lib/bag.test.ts
- src/lib/content.ts
- src/lib/products.test.ts
- src/lib/products.ts

Acceptance criteria that passed:
- The Slip Dress offers Rose, After Dark and Bloom; The Boujie Set After Dark, Powder Blue and Rose; The Romper Powder Blue, Mocha, After Dark and Rose.
- Every piece is offered in S, M, L and XL only.
- Shop cards show $48.00 with no "Placeholder price" note.
- The shop and each product page show "Free shipping on 2 or more. Any 2 for $85."
- The Bloom swatch renders white with pastel dots (screenshot check).
- Home step titles read "Place the Call", "She gets the Call", "She picks up".
- The waitlist form button reads "Join the waitlist" and no visible text says "Join the list".
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Renaming catalog values breaks test strings that embed them in sentences; sweep with grep for the old names, not only quoted values.
- A print swatch scaled for a 28px dot looks busy on a full image frame; acceptable as a stand-in until photos.
