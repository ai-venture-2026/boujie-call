---
name: redesign-home-as-fashion-editorial-round-a-header-hero-how-i
title: Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn
created: 2026-10-28T14:30:29.806Z
updated: 2026-10-28T14:30:29.806Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-7d3cb2
tags: redesign, home, fashion, editorial, round, header, hero, works, src
---
# Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn

## When to use
Requests like:
- "Redesign Home as fashion editorial, round A: header, hero, how it works, day to night turn"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/image-slot.tsx
- src/components/marker.tsx
- src/components/site-header.tsx

Acceptance criteria that passed:
- Home still has exactly one h1 reading "The gift that makes her feel like the moment."
- The hero shows the label "BOUJIE CALL ✦ LUXURY NIGHTWEAR GIFTS" and exactly one pill link, "Join the waitlist".
- The three steps render in order with numerals 01, 02 and 03.
- The turn shows "Cute enough to open at brunch." and "Irresistible enough to wear that night." as two headings, the second on the ink background.
- Image positions without a photo render a labelled placeholder captioned "IMAGE TO COME".
- With prefers-reduced-motion set, no element on Home has a running animation (browser check).
- At 390px width nothing overflows horizontally and the hero headline renders at 48px or less.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- A ch-based max width narrowed the headline instead of widening it; set an explicit width to force the overlap.
- Placeholder captions at the bottom of an image collide with overlapping headlines on phones; captions sit top right.
- Alex already runs a dev server on port 3000; check the port before starting another.
