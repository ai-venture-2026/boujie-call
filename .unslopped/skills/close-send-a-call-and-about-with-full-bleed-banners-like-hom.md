---
name: close-send-a-call-and-about-with-full-bleed-banners-like-hom
title: Close Send a Call and About with full-bleed banners like Home, each with its own photo
created: 2026-10-28T23:48:21.257Z
updated: 2026-10-28T23:48:21.257Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261028-790412
tags: close, send, call, full-bleed, banners, like, home, each, assets, public, src
---
# Close Send a Call and About with full-bleed banners like Home, each with its own photo

## When to use
Requests like:
- "Close Send a Call and About with full-bleed banners like Home, each with its own photo"

## Playbook
Files touched:
- CHANGELOG.md
- assets/aboutcta.png
- assets/sendacall.png
- public/images/close/mocha-romper-banner.webp
- public/images/close/rose-dress-banner.webp
- src/app/about/page.test.tsx
- src/app/about/page.tsx
- src/app/page.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/components/closing-banner.tsx
- src/components/closing-call.tsx

Acceptance criteria that passed:
- Home, Send a Call and About each close with a full-bleed banner showing a different photo
- Send a Call's close is ink with cream text, a pink accent and the waitlist form; About's is blush with ink text and Join the waitlist
- At 1440x900 each banner is shorter than the screen and its text sits left of the model
- Rejection: an invalid email in the Send a Call banner form is refused with no confirmation
- No horizontal overflow at 390px on the three pages

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- Measuring wall contrast before choosing text colours worked first time on both new banners.
