---
name: send-a-call-step-2a-claim-logic-on-the-server-checking-the-l
title: Send a Call step 2a: claim logic on the server, checking the link, size and US address, saving the claim once and emailing the owner
created: 2026-11-12T17:07:13.185Z
updated: 2026-11-12T17:07:13.185Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 7
lastCycle: 20261112-bc8f4a
tags: send, call, step, 2a, claim, logic, server, checking, src
---
# Send a Call step 2a: claim logic on the server, checking the link, size and US address, saving the claim once and emailing the owner

## When to use
Requests like:
- "Send a Call step 2a: claim logic on the server, checking the link, size and US address, saving the claim once and emailing the owner"

## Playbook
Files touched:
- CHANGELOG.md
- src/lib/call-store.ts
- src/lib/calls.test.ts
- src/lib/calls.ts
- src/lib/claim.test.ts
- src/lib/claim.ts

Acceptance criteria that passed:
- A valid claim saves the size and address and returns ok
- The owner gets one email naming the receiver, piece, colour, size and address
- A second claim of the same link is refused and changes nothing (rejection path)
- An unknown or malformed token gets one generic message without a store lookup for malformed ones (rejection path)
- An expired Call is refused (rejection path)
- A size the piece does not offer, or one Shopify reports sold out, is refused (rejection path)
- A missing street, a state outside the US list or a bad ZIP is refused with a message naming the field (rejection path)
- Without a connected store the action answers that claiming opens soon
- A failed owner email still keeps the claim
- Claiming stays closed without OWNER_EMAIL, and a claim is marked notified only after the owner email is sent
- Unknown stock (Shopify down or size missing) refuses the claim
- Two claims at the same moment: exactly one wins and one owner email goes out
- Over-long fields are refused, not cut; hostile form shapes are refused; an unreadable expiry counts as expired
- Full test suite and build pass

Gate runs: 16 (7 failed)

## Known failures
- code gate, style failed 4 time(s): 1 style problem(s) in the diff. write precisely and directly:
- code gate, lint failed 4 time(s): src/lib/claim.test.ts:33:56 - error TS2345: Argument of type 'Mock<Procedure | Constructable>' is not assignable to parameter of type '(emai
- release gate, clean tree failed 3 time(s): uncommitted changes:
- release gate, commits failed 3 time(s): no commits since cycle start
- release gate, criteria verified failed 3 time(s): 14 acceptance criterion(s) not ticked [x] in the plan. verify each one, then tick it:

## Notes
An independent review before commit found three major gaps (claims lost when the owner email failed, unknown stock allowed claims, no race test); all fixed with tests before the commit. Code gate failed once on a mock type and a bundled test name. Lesson: review public server actions before the first commit. Merged as PR #35 on 2026-11-13.
