---
name: phone-heroes-on-home-about-and-send-a-call-follow-the-light-
title: Phone heroes on Home, About and Send a Call follow the light version: words over the photo with a dark fade
created: 2026-10-29T23:09:51.367Z
updated: 2026-10-29T23:09:51.367Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261029-5863c2
tags: phone, heroes, home, send, call, follow, light, version, src
---
# Phone heroes on Home, About and Send a Call follow the light version: words over the photo with a dark fade

## When to use
Requests like:
- "Phone heroes on Home, About and Send a Call follow the light version: words over the photo with a dark fade"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.test.tsx
- src/app/about/page.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/components/hero-carousel.tsx
- src/components/product-view.tsx

Acceptance criteria that passed:
- At 390 wide, the Home, About and Send a Call hero photos fill the first screen under the header and the words sit over the lower part of the photo on a dark fade, as in the light version
- Hero words on phones measure at least 4.5:1 against the fade where they sit
- Desktop heroes look as before
- Rejection path: no hero word sits below the photo on phones, and no page scrolls sideways at 390
- On phones each Home piece card reads name, then price, then colorway count, each on its own line, with no label wrapping

Gate runs: 9 (1 failed)

## Known failures
- release gate, clean tree failed 1 time(s): uncommitted changes:

## Notes
Release gate failed once on uncommitted mid-cycle work (expected). Lesson: bg-linear-to-t counts color stops from the bottom; to keep a fade solid behind text, use a length stop measured from the top (calc(100%-10rem)) and verify each text line offset in the browser, not percent guesses. Parse color() and oklab() computed values before computing contrast in scripts.
