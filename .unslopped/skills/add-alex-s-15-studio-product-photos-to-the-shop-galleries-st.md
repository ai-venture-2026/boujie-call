---
name: add-alex-s-15-studio-product-photos-to-the-shop-galleries-st
title: Add Alex's 15 studio product photos to the shop galleries: studio photo first, front then back, pink cutout last
created: 2026-11-11T00:34:05.362Z
updated: 2026-11-11T00:34:05.362Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261111-3ee44c
tags: add, alex, 15, studio, product, photos, shop, galleries, public, src
---
# Add Alex's 15 studio product photos to the shop galleries: studio photo first, front then back, pink cutout last

## When to use
Requests like:
- "Add Alex's 15 studio product photos to the shop galleries: studio photo first, front then back, pink cutout last"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/details/brown-romper-hip.webp
- public/images/hero/black-slip-studio.webp
- public/images/hero/pink-slip-studio.webp
- public/images/products/studio/the-romper-after-dark-back.webp
- public/images/products/studio/the-romper-after-dark-front.webp
- public/images/products/studio/the-romper-mocha-back.webp
- public/images/products/studio/the-romper-mocha-front.webp
- public/images/products/studio/the-romper-powder-blue-back.webp
- public/images/products/studio/the-romper-powder-blue-front.webp
- public/images/products/studio/the-romper-rose-back.webp
- public/images/products/studio/the-romper-rose-front.webp
- public/images/products/studio/the-romper-rose-side.webp
- public/images/products/studio/the-slip-dress-after-dark-back.webp
- public/images/products/studio/the-slip-dress-after-dark-front.webp
- public/images/products/studio/the-slip-dress-bloom-back.webp
- public/images/products/studio/the-slip-dress-bloom-front.webp
- public/images/products/studio/the-slip-dress-rose-back.webp
- public/images/products/studio/the-slip-dress-rose-front.webp
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/lib/product-photos.test.ts
- src/lib/products.test.ts
- src/lib/products.ts

Acceptance criteria that passed:
- The Slip Dress in Rose opens on its studio front photo with alt "The Slip Dress in Rose, front", and its gallery shows 3 photos: front, back, on its own.
- The Romper in Rose shows 4 photos, "Photo 4 of 4" on the dots and 4 thumbnails.
- The shop grid card for The Slip Dress shows a /images/products/studio/ photo; Home's product cards still show /images/products/ cutouts outside studio.
- The contact shadow sits on the cutout slide only, not on the studio photos.
- Every studio photo's top corners are within 2 of #F8D7E3, and every gallery path exists in public.
- Rejection: The Boujie Set, which has no photos, still shows three "Image to come" frames and no studio photo.
- Hero black slip and pink slip background averages measure within 4 of 234,200,205, as heroes 2 and 4 do. (Changed from top corners: heroes 2 and 4 carry a studio vignette, so their own corners sit 7 to 14 off.)
- Home section 2 photo background averages within 4 of 232,184,202, deeper than the #F8D7E3 panel beside it so the two halves stay apart; garment and model unchanged.
- npm run build exits 0 and npm test passes; Shop and a product page return 200 locally with every img loaded.

Gate runs: 9 (1 failed)

## Known failures
- code gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
- Background swaps: macOS Vision VNGenerateForegroundInstanceMaskRequest (swiftc script in the scratchpad) gives a clean subject mask. Read the mask PNG with sharp extractChannel(0): a plain raw() returns 3 channels and shifts every pixel. Tighten the mask about 2px (blur 2, then remap 170..255) or a light rim stays around faces and hair.
- A flood fill background swap tinted light garments; do not use it.
- Show background colour options in place on the real page (Playwright route swap of the image) before choosing; a photo next to a same-colour panel needs a deeper tone than the panel.
- Run no formatter on the repo; prettier rewrapped whole files and bloated the diff to 456 lines.
- unslopped pr opens against main while pullRequest.base is null; retarget to develop with gh pr edit after it opens.
