---
name: send-a-call-step-3a-server-action-that-checks-the-sender-s-g
title: Send a Call step 3a: server action that checks the sender's gift details and saves the Call as waiting for payment, behind a switch
created: 2026-11-12T17:20:08.608Z
updated: 2026-11-12T17:20:08.608Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-d40268
tags: send, call, step, 3a, server, action, checks, sender, src
---
# Send a Call step 3a: server action that checks the sender's gift details and saves the Call as waiting for payment, behind a switch

## When to use
Requests like:
- "Send a Call step 3a: server action that checks the sender's gift details and saves the Call as waiting for payment, behind a switch"

## Playbook
Files touched:
- CHANGELOG.md
- src/lib/call-view.test.ts
- src/lib/call-view.ts
- src/lib/calls.test.ts
- src/lib/calls.ts
- src/lib/claim.test.ts
- src/lib/claim.ts
- src/lib/send-call.test.ts
- src/lib/send-call.ts
- src/lib/text-input.ts

Acceptance criteria that passed:
- A valid gift is saved as pending with no token yet, and no email is sent
- The answer never contains the claim token
- With SEND_A_CALL_ENABLED off, the answer is "Send a Call opens soon." and nothing is saved (rejection path)
- An unknown tier, piece or colour is refused (rejection path)
- A piece Shopify does not sell is refused (rejection path)
- A name with a line break, a malformed email, an empty or 301 character note is refused with a message naming the field (rejection path)
- Claim tests still pass with the shared input helper
- Full test suite and build pass

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Found mid-cycle that minting the token at form time loses the link (only the hash is stored); the token is now minted at payment and memoryStore keys by id. A scripted edit dropped TOKEN_SHAPE once; the full suite caught it. Merged as PR #37 on 2026-11-13.
