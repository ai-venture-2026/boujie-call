---
name: redo-the-pink-background-photos-with-soft-blended-edges-so-o
title: Redo the pink background photos with soft, blended edges so outlines are no longer pixelated
created: 2026-11-12T17:51:46.708Z
updated: 2026-11-12T17:51:46.708Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-c339d6
tags: redo, pink, background, photos, soft, blended, edges, outlines, public
---
# Redo the pink background photos with soft, blended edges so outlines are no longer pixelated

## When to use
Requests like:
- "Redo the pink background photos with soft, blended edges so outlines are no longer pixelated"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/products/studio/the-boujie-set-after-dark-back.webp
- public/images/products/studio/the-boujie-set-after-dark-card.webp
- public/images/products/studio/the-boujie-set-after-dark-front.webp
- public/images/products/studio/the-boujie-set-powder-blue-card.webp
- public/images/products/studio/the-boujie-set-powder-blue-front.webp
- public/images/products/studio/the-boujie-set-powder-blue-side.webp
- public/images/products/studio/the-boujie-set-rose-back.webp
- public/images/products/studio/the-boujie-set-rose-card.webp
- public/images/products/studio/the-boujie-set-rose-front.webp
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
- public/images/products/the-boujie-set-after-dark.webp
- public/images/products/the-boujie-set-powder-blue.webp
- public/images/products/the-boujie-set-rose.webp

Acceptance criteria that passed:
- All 27 photos are replaced from the originals with the soft edge method
- Every studio photo's top corners and every cutout's border stay within 2 of #F8D7E3 (existing photo test)
- Zoomed before and after crops show no stair-stepping or light rim on the arm, dress and hair edges
- Full test suite and build pass; the shop and a product page checked in the browser

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Old method hardened the Vision mask and pasted over pink, causing stair steps and a rim. New method keeps the soft mask and shifts each pixel toward pink by (1 - alpha) times (pink - local background). Two automatic edge metrics failed to separate old from new, so none was added; verified by 3x zoom comparison and a 2x screenshot. Script kept in the scratchpad as refine.cjs. Merged as PR #41 on 2026-11-13.
