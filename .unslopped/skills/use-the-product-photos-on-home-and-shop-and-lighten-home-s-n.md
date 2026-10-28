---
name: use-the-product-photos-on-home-and-shop-and-lighten-home-s-n
title: Use the product photos on Home and Shop, and lighten Home's night half to match Alex's references
created: 2026-10-28T14:48:09.640Z
updated: 2026-10-28T14:48:09.640Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-4d6450
tags: use, product, photos, home, shop, lighten, night, assets, public, src
---
# Use the product photos on Home and Shop, and lighten Home's night half to match Alex's references

## When to use
Requests like:
- "Use the product photos on Home and Shop, and lighten Home's night half to match Alex's references"

## Playbook
Files touched:
- CHANGELOG.md
- assets/blackromper.webp
- assets/blueromper.webp
- assets/patternedslip.webp
- assets/pinkromper.webp
- assets/pinkslip.webp
- assets/theromper.webp
- assets/theslipdress.webp
- public/images/products/the-romper-after-dark.webp
- public/images/products/the-romper-mocha.webp
- public/images/products/the-romper-powder-blue.webp
- public/images/products/the-romper-rose.webp
- public/images/products/the-slip-dress-after-dark.webp
- public/images/products/the-slip-dress-bloom.webp
- public/images/products/the-slip-dress-rose.webp
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/image-slot.tsx
- src/components/product-view.tsx
- src/components/waitlist-form.tsx
- src/lib/products.test.ts
- src/lib/products.ts

Acceptance criteria that passed:
- Every photo path in src/lib/products.ts points at a file that exists in public/.
- Choosing Rose on The Slip Dress shows the photo with alt "The Slip Dress in Rose, front".
- The Boujie Set still renders placeholders and no photo.
- The Home hero shows the photo of The Slip Dress in Rose.
- Home tiers, socials and waitlist render on light grounds; the turn's second half is the only ink section in main.
- Tier spreads still show "IMAGE TO COME" placeholders.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- mix-blend-mode multiply removes white studio backgrounds on light grounds only; on ink, frame the photo on cream.
- Perl replacements with \| in the replacement text leave literal backslashes; edit TypeScript unions with sed or ed.
- A solid dark colorway frame reads as a heavy block on a light grid; shop cards use the neutral placeholder.
