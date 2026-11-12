---
name: send-a-call-buttons-open-a-two-step-gift-pop-up-instead-of-s
title: Send a Call buttons open a two step gift pop-up instead of scrolling to a waitlist; the waitlist is removed from the Send a Call page
created: 2026-11-12T18:25:18.782Z
updated: 2026-11-12T18:25:18.782Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261112-aaeae7
tags: send, call, buttons, open, two, step, gift, pop-up, src
---
# Send a Call buttons open a two step gift pop-up instead of scrolling to a waitlist; the waitlist is removed from the Send a Call page

## When to use
Requests like:
- "Send a Call buttons open a two step gift pop-up instead of scrolling to a waitlist; the waitlist is removed from the Send a Call page"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.test.tsx
- src/app/about/page.tsx
- src/app/layout.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/components/gift-button.test.tsx
- src/components/gift-button.tsx

Acceptance criteria that passed:
- The Send a Call hero button reads Send a Call and opens the gift pop-up
- The Send a Call closing section has a Send a Call button that opens the pop-up, and no email field
- The About closing button reads Send a Call and opens the pop-up
- Step 1 offers the Calls, pieces and colours; Next moves to step 2; Back returns with choices kept
- Continue sends the choices, names, emails and note to startCall
- startCall's answer shows inside the pop-up (saved, or opens soon)
- Join the waitlist appears nowhere on Send a Call or About, and not in the site description (rejection path)
- The close button closes the pop-up without sending (rejection path)
- Two pop-ups on one page keep separate choices (their radio names differ)
- Full test suite and build pass; the pop-up checked in a browser at desktop and phone width

Gate runs: 11 (3 failed)

## Known failures
- code gate, style failed 3 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
Two GiftButtons on one page shared radio names, so their choices cleared each other; caught in a browser screenshot, fixed with useId names, guarded by a test proven to fail without the fix (a first test passed in jsdom despite the bug). networkidle never settled on the page because /api/prices waits on Shopify locally; use waitUntil load. Merged as PR #42 on 2026-11-13.
