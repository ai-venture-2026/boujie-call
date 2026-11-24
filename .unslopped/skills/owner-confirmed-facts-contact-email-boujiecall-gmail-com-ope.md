---
name: owner-confirmed-facts-contact-email-boujiecall-gmail-com-ope
title: Owner-confirmed facts: contact email BoujieCall@gmail.com opens the Help page, fabric 76% nylon 24% spandex on every piece, 30-day unclaimed gift answer
created: 2026-11-24T14:44:09.980Z
updated: 2026-11-24T14:44:09.980Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261124-96627b
tags: owner-confirmed, facts, contact, email, boujiecall, gmail.com, opens, help, src
---
# Owner-confirmed facts: contact email BoujieCall@gmail.com opens the Help page, fabric 76% nylon 24% spandex on every piece, 30-day unclaimed gift answer

## When to use
Requests like:
- "Owner-confirmed facts: contact email BoujieCall@gmail.com opens the Help page, fabric 76% nylon 24% spandex on every piece, 30-day unclaimed gift answer"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/content-accuracy.test.tsx
- src/app/help/help.test.tsx
- src/app/help/page.tsx
- src/app/seo.test.tsx
- src/lib/help.ts
- src/lib/products.ts

Acceptance criteria that passed:
- The Help page shows BoujieCall@gmail.com as a mailto link.
- The footer on every page links to Help.
- The Help page answers what happens to a gift that is never claimed, naming 30 days and a code for the sender.
- Help still hides questions without an answer (shipping, returns, sizing).
- The Slip Dress, The Boujie Set and The Romper pages each show Fabric: 76% nylon, 24% spandex.
- The full test suite and build pass.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Merged as PR #78 into develop on 2026-11-24; staging /help answers 200 with the email and the 30-day answer, product pages show the fabric, the footer links to Help.
- No gate failed. Setting data that unhides a page also changes the sitemap and any search description; grep metadata and sitemap tests whenever a hidden page goes live.
- Review major: page metadata written while a page was a shell described topics that stay hidden; reread a page's metadata when it goes live.
- Open with the owner: whether the pieces are a satin weave (gift copy says satin). Blocker logged: gifting stays off until the 30-day expiry and resend code exist.
