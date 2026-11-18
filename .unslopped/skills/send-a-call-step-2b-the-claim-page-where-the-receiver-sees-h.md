---
name: send-a-call-step-2b-the-claim-page-where-the-receiver-sees-h
title: Send a Call step 2b: the claim page where the receiver sees her gift and note, picks her size and enters her US address
created: 2026-11-12T17:14:30.746Z
updated: 2026-11-12T17:14:30.746Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 4
lastCycle: 20261112-1e5ed3
tags: send, call, step, 2b, claim, page, receiver, sees, src
---
# Send a Call step 2b: the claim page where the receiver sees her gift and note, picks her size and enters her US address

## When to use
Requests like:
- "Send a Call step 2b: the claim page where the receiver sees her gift and note, picks her size and enters her US address"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/call/[token]/page.tsx
- src/app/call/call.test.tsx
- src/components/claim-form.tsx
- src/lib/call-view.test.ts
- src/lib/call-view.ts
- src/lib/calls.ts
- src/lib/claim.ts
- src/lib/us-states.ts

Acceptance criteria that passed:
- An open link shows "Mia sent you The Romper in Rose", the note and the Rose photo, with no price
- A size Shopify reports sold out is disabled and labelled sold out
- Claim my gift sends the chosen size and the address to claimCall
- A successful claim replaces the form with a confirmation naming the city and state
- An error from claimCall shows in an alert and keeps the form
- A claimed link shows that it was claimed and no form; an expired link says it expired (rejection path)
- An unknown or malformed link returns not found (rejection path)
- Without a connected store the page says claiming opens soon
- The page is marked noindex and never puts the receiver's email in the HTML
- Full test suite and build pass; the page checked in a browser at desktop and phone width

Gate runs: 12 (4 failed)

## Known failures
- code gate, style failed 4 time(s): 3 style problem(s) in the diff. write precisely and directly:

## Notes
Code gate failed twice on bundled test names. Form tests first failed because required fields block submit in jsdom; tests now fill the form. US_STATES moved to its own file to keep server code out of the client bundle. next dev rewrote AGENTS.md again (known debt); restored before commit. Preview checked with a temporary memory store, reverted. Merged as PR #36 on 2026-11-13.
