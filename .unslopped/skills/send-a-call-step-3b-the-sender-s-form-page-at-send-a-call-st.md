---
name: send-a-call-step-3b-the-sender-s-form-page-at-send-a-call-st
title: Send a Call step 3b: the sender's form page at /send-a-call/start, shown only while SEND_A_CALL_ENABLED is on
created: 2026-11-12T17:26:33.993Z
updated: 2026-11-12T17:26:33.993Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-f0eeb3
tags: send, call, step, 3b, sender, form, page, send-a-call/start, src
---
# Send a Call step 3b: the sender's form page at /send-a-call/start, shown only while SEND_A_CALL_ENABLED is on

## When to use
Requests like:
- "Send a Call step 3b: the sender's form page at /send-a-call/start, shown only while SEND_A_CALL_ENABLED is on"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/app/send-a-call/start/page.tsx
- src/app/send-a-call/start/start.test.tsx
- src/components/send-call-form.tsx

Acceptance criteria that passed:
- With the switch on, the page lists the three Calls with price and contents
- Only pieces Shopify sells are offered, and the colours follow the chosen piece
- Continue sends the chosen Call, piece, colour, names, emails and note to startCall
- A saved Call shows a confirmation; a refused one shows its message in an alert
- The note shows how many of 300 characters are used
- With the switch off, /send-a-call/start is not found and the hero says Join the waitlist (rejection path)
- With the switch on, the hero button reads Send a Call and links to /send-a-call/start
- Full test suite and build pass; the form checked in a browser at desktop and phone width

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
Form tests failed once: the note counter sat inside its label, so the label text included the count; moved out with aria-describedby. Hero test first matched the nav link; scoped to the hero. Merged as PR #38 on 2026-11-13.
