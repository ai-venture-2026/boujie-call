---
name: phone-heroes-on-home-about-and-send-a-call-follow-the-light-
title: Phone heroes on Home, About and Send a Call follow the light version: words over the photo with a dark fade
created: 2026-10-29T23:09:51.367Z
updated: 2026-11-18T20:33:34.333Z
lastCycle: 20261118-8648b7
runs: 2
completed: 2
abandoned: 0
gateFailures: 6
tags: phone, heroes, home, send, call, follow, light, version, src
---
# Phone heroes on Home, About and Send a Call follow the light version: words over the photo with a dark fade

## When to use
Requests like:
- "Phone heroes on Home, About and Send a Call follow the light version: words over the photo with a dark fade"
- "Phone speed: the first photo on Home, About and Send a Call appears sooner on a slow phone"

## Playbook
Files touched:
- CHANGELOG.md
- public/images/brand/logo-ink.png
- src/app/page.test.tsx
- src/components/hero-carousel.tsx
- src/components/site-header.tsx
- src/lib/images.test.ts

Acceptance criteria that passed:
- The hero carousel, About hero and Send a Call hero keep phone sizes 150vh, so photos stay as sharp as drawn.
- The menu logo uses the header's logo-ink.png mask instead of a separate image, and logo-ink.png is 480 px wide with the same aspect ratio.
- Before the window load event, Home renders only the first hero slide's image plus any slide picked; after it, all slides render.
- The hero does not advance before the window load event.
- Measured on local production builds of develop and this branch with the same Playwright settings, median LCP on About is lower on this branch.

Gate runs: 13 (5 failed)

## Known failures
- release gate, clean tree failed 1 time(s): uncommitted changes:
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:
- code gate, lint failed 4 time(s): /Users/alexjoyflorentino/Documents/GitHub/boujie-call/src/components/hero-carousel.tsx
- release gate, commits failed 1 time(s): no commits since cycle start
- release gate, criteria verified failed 1 time(s): 4 acceptance criterion(s) not ticked [x] in the plan. verify each one, then tick it:

## Notes
Release gate failed once on uncommitted mid-cycle work (expected). Lesson: bg-linear-to-t counts color stops from the bottom; to keep a fade solid behind text, use a length stop measured from the top (calc(100%-10rem)) and verify each text line offset in the browser, not percent guesses. Parse color() and oklab() computed values before computing contrast in scripts.
- Local A/B, production builds, same throttling, median LCP. With the 100vh sizes (rejected): Home 1482 to 1015, About 4455 to 2869, Send a Call 1970 to 1424 ms; almost all the gain came from smaller hero photos. Final change (sharp 150vh kept): Home 1482 to 1437 (noise), About 4455 to 3994, Send a Call 1970 to 1999 (noise).
- Staging, warm cache: Home 3103, About 5167 ms; about twice local, from real network round trips and the Vercel preview feedback script that production does not load.
- Remaining levers, each a human decision: re-export the About hero lighter (452 KB source against 45 to 125 KB for the others), and font preloading (a visible fallback flash). Measure production with PageSpeed Insights field data after launch.
- I told Alex 100vh stayed twice as sharp without doing the crop arithmetic; for object-cover photos, size hints must follow the drawn width, not the box.
