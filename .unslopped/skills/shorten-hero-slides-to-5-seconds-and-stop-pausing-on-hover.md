---
name: shorten-hero-slides-to-5-seconds-and-stop-pausing-on-hover
title: Shorten hero slides to 5 seconds and stop pausing on hover
created: 2026-10-28T19:56:25.147Z
updated: 2026-10-28T19:56:25.147Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-05ff5a
tags: shorten, hero, slides, seconds, stop, pausing, hover, src
---
# Shorten hero slides to 5 seconds and stop pausing on hover

## When to use
Requests like:
- "Shorten hero slides to 5 seconds and stop pausing on hover"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/components/hero-carousel.tsx

Acceptance criteria that passed:
- After 5 seconds the second slide is current.
- With the mouse over the hero, the slide still advances after 5 seconds.
- Pressing "Pause slideshow" keeps the current slide for 20 seconds.
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Hover pause on a full-width hero froze the slideshow for anyone reading the text; keep the explicit pause control only.
