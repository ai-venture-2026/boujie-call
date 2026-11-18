---
name: send-a-call-step-1-the-gift-email-the-private-claim-link-and
title: Send a Call step 1: the gift email, the private claim link and a swappable delivery step, email first through Resend
created: 2026-11-12T16:58:26.441Z
updated: 2026-11-12T16:58:26.441Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261112-4d20b1
tags: send, call, step, gift, email, private, claim, link, docs, src
---
# Send a Call step 1: the gift email, the private claim link and a swappable delivery step, email first through Resend

## When to use
Requests like:
- "Send a Call step 1: the gift email, the private claim link and a swappable delivery step, email first through Resend"

## Playbook
Files touched:
- CHANGELOG.md
- docs/decisions/0001-send-a-call-delivers-through-a-swappable-channel-and-saves-c.md
- src/lib/calls.test.ts
- src/lib/calls.ts
- src/lib/mail.test.ts
- src/lib/mail.ts

Acceptance criteria that passed:
- newClaim gives a 43 character base64url token and stores only its SHA-256 hash; two calls never share a token
- claimUrl points at SITE_URL/call/<token>
- The gift email names the sender and receiver, shows the note, and links the claim button to the claim URL
- HTML in a sender's note or name is escaped, never rendered (rejection path)
- sendEmail posts to Resend with the API key and MAIL_FROM, and reports a failed answer as not sent
- Without RESEND_API_KEY or MAIL_FROM nothing is sent and the result says not configured (rejection path)
- deliverCall uses the named channel and refuses an unknown channel without sending (rejection path)
- The in-memory store saves a Call and finds it by token hash
- Full test suite and build pass

Gate runs: 9 (1 failed)

## Known failures
- code gate, style failed 1 time(s): 2 style problem(s) in the diff. write precisely and directly:

## Notes
Code gate failed once on two test names that bundled outcomes; renamed. Email preview rendered once in Chromium and matched the brand. Resend not yet configured in Vercel, so nothing sends. Merged as PR #34 on 2026-11-13.
