---
name: design-refinement-b-home-closing-points-to-the-shop-waitlist
title: Design refinement B: Home closing points to the shop, waitlist reframed for Send a Call, real tier prices
created: 2026-10-29T15:15:39.740Z
updated: 2026-10-29T15:15:39.740Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261029-c96f57
tags: design, refinement, home, closing, points, shop, waitlist, reframed, src
---
# Design refinement B: Home closing points to the shop, waitlist reframed for Send a Call, real tier prices

## When to use
Requests like:
- "Design refinement B: Home closing points to the shop, waitlist reframed for Send a Call, real tier prices"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.test.tsx
- src/app/about/page.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- Home has no email field and no section with id waitlist.
- Home's closing section shows "Be first to receive a Boujie Call." with a "Shop the collection" link to /shop carrying `cta-primary`.
- Send a Call and About closing sections both read "Be first when Send a Call opens."
- Send a Call lists The Mini Call $40.00, The Signature Call $55.00 and The Boujie Experience $75.00, and "Price to come" no longer appears there.
- Only The Signature Call carries a "Most popular" tag.
- The tier note reads "Contents confirmed at launch."
- Rejection: Home, Send a Call and About contain no exclamation points and none of the words cart, item, order or purchase.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Removing a section changes its id; grep the tests for the old selector before writing new ones, they cluster around one id.
- An absolutely placed tag keeps grid rows aligned on desktop; check row alignment visually after adding anything above a heading in one column only.
- Copy the brief keeps verbatim can still contradict the brief's intent (waitlist headline above a shop button); flag it to the human instead of rewriting it.
