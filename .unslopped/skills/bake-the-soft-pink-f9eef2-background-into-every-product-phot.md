---
name: bake-the-soft-pink-f9eef2-background-into-every-product-phot
title: Bake the soft pink #F9EEF2 background into every product photo in public/images/products
created: 2026-11-03T16:28:55.212Z
updated: 2026-11-03T16:28:55.212Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261103-9fd3c7
tags: bake, soft, pink, f9eef2, background, every, product, photo, public, src
---
# Bake the soft pink #F9EEF2 background into every product photo in public/images/products

## When to use
Requests like:
- "Bake the soft pink #F9EEF2 background into every product photo in public/images/products"

## Playbook
Files touched:
- CHANGELOG.md
- package-lock.json
- package.json
- public/images/products/the-romper-after-dark.webp
- public/images/products/the-romper-mocha.webp
- public/images/products/the-romper-powder-blue.webp
- public/images/products/the-romper-rose.webp
- public/images/products/the-slip-dress-after-dark.webp
- public/images/products/the-slip-dress-bloom.webp
- public/images/products/the-slip-dress-rose.webp
- src/app/bag/bag.test.tsx
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/shop.test.tsx
- src/components/bag-view.tsx
- src/components/mini-bag.test.tsx
- src/components/mini-bag.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/lib/product-photos.test.ts

Acceptance criteria that passed:
- The soft contact shadow still shows under product photos now that they are opaque
- All 7 product photos have a #F9EEF2 background (corner pixels within 2 levels per channel)
- Shop grid, product page, bag, mini bag and home product photos render without mix-blend-multiply, so the card stays #F9EEF2
- Rejection: a product photo with a white or off-white background fails the photo test

Gate runs: 13 (5 failed)

## Known failures
- code gate, scope failed 2 time(s): 6 changed file(s) are not in the plan's "## Files to touch":
- release gate, clean tree failed 1 time(s): uncommitted changes:
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy
- monitor gate, monitor notes failed 1 time(s): 4 gate run(s) failed this cycle. write what happened and what to do next time under "## Monitor" in the plan

## Notes
- Multiply blends hide what they cover: removing mix-blend-multiply also hid the .contact::after shadow at z-index -1. When photos become opaque, raise any pseudo element that sat behind them.
- Generated product photos drift 1 to 3 levels across the background and carry faint green compression noise at the edges. Normalise by the corner median, snap min channel 240 to 250 to white, then multiply; garment highlights stay below 232.
- Test every border pixel, not corners; the corner check missed a 3 level strip on the Rose slip dress hem.
- unslopped pr opened against main with base null; retargeted to develop by hand.
