---
name: sharp-photos-on-phones-size-hints-that-match-how-large-cropp
title: Sharp photos on phones: size hints that match how large cropped photos are drawn
created: 2026-10-29T00:32:27.855Z
updated: 2026-10-29T00:32:27.855Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261029-a100e4
tags: sharp, photos, phones, size, hints, match, large, cropped, public, src
---
# Sharp photos on phones: size hints that match how large cropped photos are drawn

## When to use
Requests like:
- "Sharp photos on phones: size hints that match how large cropped photos are drawn"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/about/story-after-dark.webp
- public/images/close/blue-romper-banner.webp
- public/images/close/mocha-romper-banner.webp
- public/images/close/rose-dress-banner.webp
- public/images/details/brown-romper-hip.webp
- public/images/send-a-call/hero-rose-slip.webp
- src/app/about/page.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.tsx
- src/components/closing-banner.tsx
- src/components/hero-carousel.tsx

Acceptance criteria that passed:
- At 390x844 and 3x density every hero, banner and section two photo downloads a file at least as wide as its source or 90% of its drawn device width
- Desktop at 1440 wide downloads the same file widths as before
- The About hero's remaining stretch is reported to Alex with the fix

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Measure image stretch on a 3x phone (file width from the ?w= param against drawn device width) before blaming the source; object-cover in tall frames needs sizes above 100vw.
- Check exported web copies against source width; next/image never upscales past the file.
