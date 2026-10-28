---
name: keep-the-nav-links-and-shop-button-in-the-same-position-on-e
title: Keep the nav links and Shop button in the same position on every page as on Home
created: 2026-10-28T23:21:03.879Z
updated: 2026-10-28T23:21:03.879Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-3d7d62
tags: keep, nav, links, shop, button, same, position, every, public, src
---
# Keep the nav links and Shop button in the same position on every page as on Home

## When to use
Requests like:
- "Keep the nav links and Shop button in the same position on every page as on Home"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/about/hero-blue-romper.webp
- public/images/about/story-after-dark.webp
- public/images/send-a-call/hero-rose-slip.webp
- src/app/about/page.test.tsx
- src/app/about/page.tsx
- src/app/page.test.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/components/closing-call.tsx
- src/components/site-header.tsx

Acceptance criteria that passed:
- At 1440 and 1024 wide the nav links and Shop the collection button sit at the same x and y on Home, Shop, Send a Call, About, a product page and the bag page
- Send a Call closes on ink with the waitlist form beside the unboxing photo; About closes on blush with Join the waitlist beside the ribbon photo
- Rejection: an invalid email in the Send a Call closing form is refused with no confirmation
- The About hero shows the Powder Blue romper photo and Our story shows the After Dark portrait, with faces in frame on desktop and phone
- The Send a Call hero shows the pale pink slip photo with her face in frame on desktop and phone
- The links and button do not overlap the logo or the bag icon at 1024 wide

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Alex folds several page requests into one round mid-flight; each was recorded in the plan as it arrived and the diff stayed at 139 lines.
