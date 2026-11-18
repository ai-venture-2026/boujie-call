---
name: mark-send-a-call-as-coming-soon-in-the-menu-footer-its-page-
title: Mark Send a Call as Coming soon in the menu, footer, its page and the gift pop-up while SEND_A_CALL_ENABLED is off
created: 2026-11-12T18:51:35.971Z
updated: 2026-11-12T19:28:43.705Z
lastCycle: 20261112-612cc1
runs: 2
completed: 2
abandoned: 0
gateFailures: 0
tags: mark, send, call, coming, soon, menu, footer, page, src
---
# Mark Send a Call as Coming soon in the menu, footer, its page and the gift pop-up while SEND_A_CALL_ENABLED is off

## When to use
Requests like:
- "Mark Send a Call as Coming soon in the menu, footer, its page and the gift pop-up while SEND_A_CALL_ENABLED is off"
- "Remove the Soon pill from the menu and footer; Coming soon stays on the Send a Call page and in the gift pop-up"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/page.test.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/components/soon.tsx

Acceptance criteria that passed:
- With Send a Call closed, the main menu link is named exactly Send a Call
- With Send a Call closed, the footer link is named exactly Send a Call
- The Send a Call page eyebrow still reads Send a Call, Coming soon (rejection path: the page keeps its status)
- Full test suite and build pass

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
The Soon tag first read 'Send a CallSoon' to screen readers (a leading space inside the span is dropped from the accessible name); moved the space outside the span. It also broke the shared label size rule until it used the label class. Merged as PR #45 on 2026-11-13.
No gate failures. Alex rejected the Soon pill as broken looking UI; rule saved: no tags inside menu or footer links. Merged as PR #49 on 2026-11-13.
