---
name: send-a-call-buttons-open-a-two-step-gift-pop-up-instead-of-s
title: Send a Call buttons open a two step gift pop-up instead of scrolling to a waitlist; the waitlist is removed from the Send a Call page
created: 2026-11-12T18:25:18.782Z
updated: 2026-11-18T13:31:35.526Z
lastCycle: 20261118-a5d382
runs: 2
completed: 2
abandoned: 0
gateFailures: 9
tags: send, call, buttons, open, two, step, gift, pop-up, src
---
# Send a Call buttons open a two step gift pop-up instead of scrolling to a waitlist; the waitlist is removed from the Send a Call page

## When to use
Requests like:
- "Send a Call buttons open a two step gift pop-up instead of scrolling to a waitlist; the waitlist is removed from the Send a Call page"
- "General Send a Call buttons open the gift pop-up with nothing chosen; Send as a gift keeps its piece and colour"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/send-a-call/start/start.test.tsx
- src/components/gift-button.test.tsx
- src/components/gift-button.tsx
- src/components/send-call-form.tsx

Acceptance criteria that passed:
- A general Send a Call button opens the pop-up with no Call, piece or colour selected.
- Next stays disabled, with "Choose a Call, a piece and a colour." beside it, until all three are chosen.
- Send as a gift on a product page opens with that piece and colour selected and no Call.
- Choosing another piece clears the colour.
- The full form at /send-a-call/start opens with nothing chosen and will not submit until a Call, piece and colour are chosen.

Gate runs: 14 (6 failed)

## Known failures
- code gate, style failed 3 time(s): 1 style problem(s) in the diff. write precisely and directly:
- code gate, style failed 5 time(s): 3 style problem(s) in the diff. write precisely and directly:
- build gate, build failed 1 time(s): > Build error occurred

## Notes
Two GiftButtons on one page shared radio names, so their choices cleared each other; caught in a browser screenshot, fixed with useId names, guarded by a test proven to fail without the fix (a first test passed in jsdom despite the bug). networkidle never settled on the page because /api/prices waits on Shopify locally; use waitUntil load. Merged as PR #42 on 2026-11-13.
- Code gate failed first on the style gate and on missing test changes; the build gate failed once on the intermittent Next.js 16.4.3 security warning and passed on retry. The 16.4.6 upgrade is logged as debt.
- A label promising a choice must not show before the choices exist: Alex caught "Colour: choose one" with no swatches under it. Hide a dependent row until its parent choice is made.
- A guard on "ready" must check the value is still valid, not only that it is set: the review found a stale or unsellable piece could enable Next.
- Closing and reopening the pop-up keeps the choices; Alex may prefer a reset, still open.
- Start every choice empty unless the caller passes one; show a dependent row (colour) only after its parent (piece) is chosen.
- Check "ready" against valid values (piece for sale, colour of that piece), not only non-empty ones; keep Next aria-disabled with a described hint.
- The build gate can fail once on the Next.js 16.4.3 security warning; retry before debugging.
