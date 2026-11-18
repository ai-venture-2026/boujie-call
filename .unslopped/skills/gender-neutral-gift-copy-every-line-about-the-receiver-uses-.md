---
name: gender-neutral-gift-copy-every-line-about-the-receiver-uses-
title: Gender neutral gift copy: every line about the receiver uses they and their, and the gift flow says email instead of number and text
created: 2026-11-12T19:59:20.283Z
updated: 2026-11-12T19:59:20.283Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 4
lastCycle: 20261112-db1783
tags: gender, neutral, gift, copy, every, line, receiver, uses, src
---
# Gender neutral gift copy: every line about the receiver uses they and their, and the gift flow says email instead of number and text

## When to use
Requests like:
- "Gender neutral gift copy: every line about the receiver uses they and their, and the gift flow says email instead of number and text"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/about/page.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/app/send-a-call/start/page.tsx
- src/app/send-a-call/start/start.test.tsx
- src/app/shop/shop.test.tsx
- src/components/gift-button.test.tsx
- src/components/gift-button.tsx
- src/components/send-call-form.tsx
- src/lib/claim.ts
- src/lib/content.ts
- src/lib/products.ts
- src/lib/send-call.test.ts
- src/lib/send-call.ts

Acceptance criteria that passed:
- Home, Send a Call, the shop and The Slip Dress page contain no 'her' or 'she' (new guard test)
- The Home headline reads The gift that makes them feel like the moment.
- The gift pop-up is titled Choose their gift and asks for Their first name and Their email
- Send a Call says their first name and email, and that they get an email (rejection path: 'name and number' and 'a text' appear nowhere)
- Form errors read Enter their first name, Enter their email address, Write them a note
- The About headline and values are unchanged until the owner answers
- Full test suite and build pass

Gate runs: 12 (4 failed)

## Known failures
- code gate, style failed 4 time(s): 4 style problem(s) in the diff. write precisely and directly:

## Notes
A batch find and replace missed six lines because earlier pairs had already rewritten parts of them; a grep after the edit caught them. Code gate failed once on guard test names. The About brand lines went to the owner with drafts. Merged as PR #51 on 2026-11-13.
