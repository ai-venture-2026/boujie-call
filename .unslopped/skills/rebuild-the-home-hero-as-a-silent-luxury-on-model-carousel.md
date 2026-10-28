---
name: rebuild-the-home-hero-as-a-silent-luxury-on-model-carousel
title: Rebuild the Home hero as a silent luxury on-model carousel
created: 2026-10-28T17:32:23.942Z
updated: 2026-10-28T17:32:23.942Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-5951f8
tags: rebuild, home, hero, silent, luxury, on-model, carousel, assets, public, src
---
# Rebuild the Home hero as a silent luxury on-model carousel

## When to use
Requests like:
- "Rebuild the Home hero as a silent luxury on-model carousel"

## Playbook
Files touched:
- CHANGELOG.md
- assets/asianmodel.png
- assets/blackmodel.png
- assets/hispanicmodel.png
- assets/southasianmodel.png
- public/images/hero/after-dark-slip.webp
- public/images/hero/mocha-romper.webp
- public/images/hero/powder-blue-romper.webp
- public/images/hero/rose-slip.webp
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/hero-carousel.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- The hero shows four slides; only the first is visible on load and the counter reads "01 / 04".
- After 7 seconds the second slide becomes visible and the counter reads "02 / 04".
- Pressing Pause stops the advance: after 20 more seconds the counter still reads the same slide.
- Each slide's caption links to its piece, e.g. "The Slip Dress · After Dark" to /shop/the-slip-dress.
- With prefers-reduced-motion set, the slide does not advance on its own.
- The h1 still reads "The gift that makes her feel like the moment." and the hero has exactly one "Join the waitlist" link.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Measure text-area contrast on each photo before choosing type colour; two of four photos needed cream, not ink.
- Overlay text must share the page container (max-w-7xl) or it drifts off the logo column.
- 3:2 photos at 1696px tall crop to usable 4:5 phone images, so mobile-specific generations are optional.
