---
name: swap-in-the-10-recast-shop-photos-no-plus-size-models-on-the
title: Swap in the 10 recast shop photos (no plus-size models) on the site pink
created: 2026-11-24T13:53:42.732Z
updated: 2026-11-24T13:53:42.732Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261124-703aa2
tags: swap, 10, recast, shop, photos, plus-size, models, site, public
---
# Swap in the 10 recast shop photos (no plus-size models) on the site pink

## When to use
Requests like:
- "Swap in the 10 recast shop photos (no plus-size models) on the site pink"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/products/studio/the-boujie-set-rose-back.webp
- public/images/products/studio/the-boujie-set-rose-front.webp
- public/images/products/studio/the-romper-after-dark-back.webp
- public/images/products/studio/the-romper-after-dark-front.webp
- public/images/products/studio/the-romper-powder-blue-back.webp
- public/images/products/studio/the-romper-powder-blue-front.webp
- public/images/products/studio/the-slip-dress-bloom-back.webp
- public/images/products/studio/the-slip-dress-bloom-front.webp
- public/images/products/studio/the-slip-dress-rose-back.webp
- public/images/products/studio/the-slip-dress-rose-front.webp

Acceptance criteria that passed:
- The 10 studio files listed above are the recast photos at 900x1200, and no other file under public/images changes.
- The existing photo test passes: every studio photo's top corners sit within 2 of #F8D7E3.
- A 3x zoom of hair, arm and hem edges on every new photo shows no light rim or stair steps against the pink.
- The shop and the five product pages show the new photos in a production build, checked by screenshot.
- The full test suite and build pass.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Merged as PR #75 into develop on 2026-11-24; staging serves the new Slip Dress Rose front byte for byte, /shop answers 200.
- Recolour method (rebuilt; the 2026-11-13 scripts were lost with an old scratchpad): Swift VNGeneratePersonSegmentationRequest (accurate) for the mask; background estimate = masked blur (sigma 48) of pixels with mask under 8, eroded 9 px. Open background is set to flat #F8D7E3 (no floor shadows, the other studio photos have none). Band pixels (mask 3 to 229) blend straight between the pixel and flat pink, with alpha from hue distance to the backdrop (chroma times 600, brightness only past 30), so shaded gaps between arm and body or thighs go pink and nothing overshoots. Mask 230 and up keeps the soft-edge formula. Dark hair strands above 55% height survive as model.
- Mistakes worth not repeating: sharp erode and blur on 1-channel raw input return 3 channels (use extractChannel(0)); sharp does not take 16-bit raw input from a Uint16Array; corrections against an estimated background overshoot near darker floor.
- The review agent found 4 majors my own 3x crops missed (floor shadows, gaps); measure gap regions by number, not only by eye.
- Prompts: the curvy body took five rounds. Change one body part at a time from the closest result; see design-direction memory.
