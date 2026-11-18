---
name: send-a-call-part-b-the-shop-gift-button-and-a-send-as-a-gift
title: Send a Call part B: the shop gift button and a Send as a gift button on product pages open the gift pop-up; remove the unused waitlist form
created: 2026-11-12T18:30:40.410Z
updated: 2026-11-12T18:30:40.410Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261112-8d1b91
tags: send, call, part, shop, gift, button, src
---
# Send a Call part B: the shop gift button and a Send as a gift button on product pages open the gift pop-up; remove the unused waitlist form

## When to use
Requests like:
- "Send a Call part B: the shop gift button and a Send as a gift button on product pages open the gift pop-up; remove the unused waitlist form"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/app/shop/page.tsx
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/waitlist-form.tsx

Acceptance criteria that passed:
- The shop gift button opens the pop-up instead of linking away
- A product page has a Send as a gift button that opens the pop-up on that piece
- The pop-up starts on the colour chosen on the page
- A Coming soon piece shows no Send as a gift button (rejection path)
- WaitlistForm no longer exists and nothing imports it
- Full test suite and build pass; checked in a browser

Gate runs: 13 (5 failed)

## Known failures
- code gate, tests kept failed 3 time(s): tests were removed:
- monitor gate, monitor notes failed 2 time(s): 3 gate run(s) failed this cycle. write what happened and what to do next time under "## Monitor" in the plan

## Notes
Code gate refused the removed WaitlistForm tests until the plan explained them under Removed tests. The short screen gap moved from the Add to your bag button to its wrapper; its test followed. Merged as PR #43 on 2026-11-13. Next time: write Removed tests before deleting a component's tests.
