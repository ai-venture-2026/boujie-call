---
name: shop-shows-only-real-product-photos-drop-the-two-generated-f
title: Shop shows only real product photos: drop the two generated feature tiles from the grid and replace the generated lace header with a studio photo crop
created: 2026-11-11T01:06:21.414Z
updated: 2026-11-11T01:06:21.414Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261111-f97eb4
tags: shop, shows, real, product, photos, drop, two, generated, src
---
# Shop shows only real product photos: drop the two generated feature tiles from the grid and replace the generated lace header with a studio photo crop

## When to use
Requests like:
- "Shop shows only real product photos: drop the two generated feature tiles from the grid and replace the generated lace header with a studio photo crop"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/shop-grid.tsx

Acceptance criteria that passed:
- The shop page's main content renders no image from /images/hero/ or /images/details/ (the phone menu in the shared header keeps its photo, out of scope).
- The shop header photo is the Mocha Romper studio front photo with alt naming The Romper in Mocha, and the lace neckline is visible in the header at 1440 and 390 wide.
- The grid opens straight onto product cards: no data-featured block, every card links to its product page as before.
- Rejection: Send a Call still shows brown-romper-lace.webp; the change stays on the shop page.
- npm run build exits 0 and npm test passes; /shop returns 200 locally with every visible img loaded.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- The build gate's .next output was stale for local npm start; rebuild with npm run build before browser checks, and kill any earlier server on the port first (lsof -tiTCP:<port>), since a failed listen leaves the old build answering.
- A page test for "no generated photo" must scope to main: the shared header's phone menu carries a hero photo on every page.
