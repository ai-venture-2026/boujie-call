---
name: mark-send-a-call-as-coming-soon-in-the-menu-footer-its-page-
title: Mark Send a Call as Coming soon in the menu, footer, its page and the gift pop-up while SEND_A_CALL_ENABLED is off
created: 2026-11-12T18:51:35.971Z
updated: 2026-11-12T18:51:35.971Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261112-8899cb
tags: mark, send, call, coming, soon, menu, footer, page, src
---
# Mark Send a Call as Coming soon in the menu, footer, its page and the gift pop-up while SEND_A_CALL_ENABLED is off

## When to use
Requests like:
- "Mark Send a Call as Coming soon in the menu, footer, its page and the gift pop-up while SEND_A_CALL_ENABLED is off"

## Playbook
Files touched:
- CHANGELOG.md
- next.config.ts
- src/app/page.test.tsx
- src/app/send-a-call/page.test.tsx
- src/app/send-a-call/page.tsx
- src/components/gift-button.test.tsx
- src/components/gift-button.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/components/soon.tsx
- src/lib/content.ts

Acceptance criteria that passed:
- With the switch off, the desktop menu, phone menu and footer show a Soon tag beside Send a Call
- With the switch off, the Send a Call eyebrow reads Send a Call, Coming soon
- With the switch off, the pop-up shows the Calls, pieces and colours, says Send a Call opens soon, and has no Next button
- With the switch on, no Soon tag or Coming soon text appears and Next leads to step 2 (rejection path)
- Full test suite and build pass; checked in a browser

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
The Soon tag first read 'Send a CallSoon' to screen readers (a leading space inside the span is dropped from the accessible name); moved the space outside the span. It also broke the shared label size rule until it used the label class. Merged as PR #45 on 2026-11-13.
