---
name: bring-pink-and-dark-back-into-home-with-a-harmonious-colour-
title: Bring pink and dark back into Home with a harmonious colour rhythm
created: 2026-10-28T18:22:10.097Z
updated: 2026-10-28T18:22:10.097Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-a37be5
tags: bring, pink, dark, back, home, harmonious, colour, rhythm, src
---
# Bring pink and dark back into Home with a harmonious colour rhythm

## When to use
Requests like:
- "Bring pink and dark back into Home with a harmonious colour rhythm"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/hero-carousel.tsx
- src/components/image-slot.tsx
- src/components/site-header.tsx
- src/lib/hero-tone.ts

Acceptance criteria that passed:
- The steps section and the closing section render on blush; the tiers render on the warm white base; the night band renders on ink.
- The accent words receives, brunch, vibe and drop render in rose #b4486f.
- Hovering any .cta fills it pink with ink text (browser check).
- At 1440px wide the hero text panel renders white at 38% (about 547px) and the photo fills the other 62%.
- On desktop the Home header is transparent at the top and white once scrolled; the nav links and the Shop the collection button sit in its centre group.
- At 390px width nothing overflows horizontally.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 9 (1 failed)

## Known failures
- plan gate, criteria quality failed 1 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):

## Notes
- A 35% text column aligned to the logo was too narrow for the headline; 38% fit. Measure text width against the container before choosing a split.
- Browser checks running beside vitest caused two timeouts; run them one after the other.
