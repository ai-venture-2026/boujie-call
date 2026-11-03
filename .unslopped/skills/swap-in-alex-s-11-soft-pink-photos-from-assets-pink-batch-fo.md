---
name: swap-in-alex-s-11-soft-pink-photos-from-assets-pink-batch-fo
title: Swap in Alex's 11 soft pink photos from assets/pink-batch: four heroes, five gift strip, Home detail, Send a Call hero and the Home closing banner
created: 2026-11-03T17:09:14.563Z
updated: 2026-11-03T17:09:14.563Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261103-1bd081
tags: swap, alex, 11, soft, pink, photos, assets/pink-batch, four, assets, public, src
---
# Swap in Alex's 11 soft pink photos from assets/pink-batch: four heroes, five gift strip, Home detail, Send a Call hero and the Home closing banner

## When to use
Requests like:
- "Swap in Alex's 11 soft pink photos from assets/pink-batch: four heroes, five gift strip, Home detail, Send a Call hero and the Home closing banner"

## Playbook
Files touched:
- CHANGELOG.md
- assets/pink-batch/README.md
- assets/shoot/banners/home-banner-blue-romper.png
- assets/shoot/hero/hero-1-black-slip.png
- assets/shoot/hero/hero-2-blue-romper.png
- assets/shoot/hero/hero-3-pink-slip.png
- assets/shoot/hero/hero-4-brown-romper.png
- assets/shoot/home/section-2-mocha-romper.png
- assets/shoot/home/strip-a-ribbon.png
- assets/shoot/home/strip-b-open-box.png
- assets/shoot/home/strip-c-card.png
- assets/shoot/home/strip-d-unboxing.png
- assets/shoot/home/strip-e-mist.png
- assets/shoot/pages/send-a-call-hero-rose-slip.png
- public/images/banners/blue-romper-banner.webp
- public/images/details/brown-romper-hip.webp
- public/images/gift-strip/card.webp
- public/images/gift-strip/mist.webp
- public/images/gift-strip/open-box.webp
- public/images/gift-strip/ribbon.webp
- public/images/gift-strip/unboxing.webp
- public/images/hero/black-slip-studio.webp
- public/images/hero/blue-romper-studio.webp
- public/images/hero/brown-romper-studio.webp
- public/images/hero/pink-slip-studio.webp
- public/images/send-a-call/hero-rose-slip.webp
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/lib/images.test.ts

Acceptance criteria that passed:
- The Send a Call hero alt text describes the pink wall, not a taupe one
- All 12 swapped photos have a pink background sample (hue 300 to 15 degrees) in public/images and assets/shoot
- Rejection: the same test fails on the current beige photos, shown by the red run
- assets/pink-batch holds only README.md, which lists the 3 photos still waiting and no swapped photo
- Home, Shop and Send a Call render with 0 broken images (image path test and build pass)

Gate runs: 13 (5 failed)

## Known failures
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- next start serves old photos from .next/cache/images after a same-path swap; clear that folder before screenshots. Vercel rebuilds its cache per deployment.
- A test that the drop folder is empty fails on .DS_Store and on the next drop; check the README waiting list instead.
- Alt text can name a wall colour; grep alts for colour words when backgrounds change.
- The style gate rejects one test asserting two outcomes; split before running the code gate.
- Same-path swaps need no component edits, but a photo that was cropped before (black slip 2275 wide) changes framing; check its focus points visually.
- unslopped pr titled the PR from the cycle goal and opened against main; retitle and retarget to develop.
