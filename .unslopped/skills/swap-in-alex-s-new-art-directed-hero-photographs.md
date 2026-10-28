---
name: swap-in-alex-s-new-art-directed-hero-photographs
title: Swap in Alex's new art-directed hero photographs
created: 2026-10-28T20:08:40.237Z
updated: 2026-10-28T20:08:40.237Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-6fc635
tags: swap, alex, new, art-directed, hero, photographs, assets, public, src
---
# Swap in Alex's new art-directed hero photographs

## When to use
Requests like:
- "Swap in Alex's new art-directed hero photographs"

## Playbook
Files touched:
- CHANGELOG.md
- assets/upas1.png
- assets/uptam1.png
- assets/uptb1.png
- assets/upthis1.png
- public/images/hero/after-dark-slip.webp
- public/images/hero/black-slip-studio.webp
- public/images/hero/blue-romper-studio.webp
- public/images/hero/brown-romper-studio.webp
- public/images/hero/pink-slip-studio.webp
- public/images/hero/powder-blue-romper.webp
- public/images/hero/rose-slip.webp
- src/app/page.test.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- The hero shows the four new photographs in order: black slip dress, blue romper, pink slip dress, brown romper.
- Every hero image path points at a file that exists in public/.
- At 1440x900 and at 390px wide each model's face or garment sits inside the visible crop (screenshot check).
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Tapping slide controls below the photo scrolls the page on phones; screenshot phone crops after scrolling back to the top.
