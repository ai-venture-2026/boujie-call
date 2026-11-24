---
name: swap-in-alex-s-11-soft-pink-photos-from-assets-pink-batch-fo
title: Swap in Alex's 11 soft pink photos from assets/pink-batch: four heroes, five gift strip, Home detail, Send a Call hero and the Home closing banner
created: 2026-11-03T17:09:14.563Z
updated: 2026-11-03T17:23:45.723Z
lastCycle: 20261103-11c010
runs: 2
completed: 2
abandoned: 0
gateFailures: 6
tags: swap, alex, 11, soft, pink, photos, assets/pink-batch, four, assets, public, src
---
# Swap in Alex's 11 soft pink photos from assets/pink-batch: four heroes, five gift strip, Home detail, Send a Call hero and the Home closing banner

## When to use
Requests like:
- "Swap in Alex's 11 soft pink photos from assets/pink-batch: four heroes, five gift strip, Home detail, Send a Call hero and the Home closing banner"
- "Swap in Alex's two soft pink About photos from assets/pink-batch: the About hero and the About story"

## Playbook
Files touched:
- CHANGELOG.md
- assets/pink-batch/README.md
- assets/shoot/pages/about-hero-blue-romper.png
- assets/shoot/pages/about-story-after-dark.png
- public/images/about/hero-blue-romper.webp
- public/images/about/story-after-dark.webp
- src/lib/images.test.ts

Acceptance criteria that passed:
- The pink check measures the sampled patch, not the whole photo: every one of the 28 patches fails on its beige original and passes on the pink one
- Both About photos have a pink background sample (hue 300 to 15 degrees) in public/images and assets/shoot
- Rejection: the same test fails on the current beige About photos, shown by the red run
- The drop folder README lists only details/brown-romper-lace.webp as waiting
- The About page renders with 0 broken images (image path test and build pass)

Gate runs: 9 (1 failed)

## Known failures
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- 2026-11-24 recast cycle: the same-path swap needs no code change; recolour scripts belong outside the scratchpad, it gets cleared.
- next start serves old photos from .next/cache/images after a same-path swap; clear that folder before screenshots. Vercel rebuilds its cache per deployment.
- A test that the drop folder is empty fails on .DS_Store and on the next drop; check the README waiting list instead.
- Alt text can name a wall colour; grep alts for colour words when backgrounds change.
- The style gate rejects one test asserting two outcomes; split before running the code gate.
- Same-path swaps need no component edits, but a photo that was cropped before (black slip 2275 wide) changes framing; check its focus points visually.
- unslopped pr titled the PR from the cycle goal and opened against main; retitle and retarget to develop.
- sharp stats() ignores a prior extract() and measures the whole image; extract to raw pixels first, then stats on the raw buffer.
- Pick pink sample points by scanning a grid against old and new versions; warm lifestyle rooms read near 15 degrees, so sample the window light or a clearly pink surface.
- Photos Alex drops are final; swap them in as given and do not ask whether they are pink enough.
