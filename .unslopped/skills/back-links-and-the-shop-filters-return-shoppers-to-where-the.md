---
name: back-links-and-the-shop-filters-return-shoppers-to-where-the
title: Back links and the shop filters return shoppers to where they were instead of the top of the page
created: 2026-11-18T03:42:25.039Z
updated: 2026-11-18T03:42:25.039Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 5
lastCycle: 20261118-6baf0d
tags: back, links, shop, filters, return, shoppers, they, instead, src
---
# Back links and the shop filters return shoppers to where they were instead of the top of the page

## When to use
Requests like:
- "Back links and the shop filters return shoppers to where they were instead of the top of the page"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/back-navigation.test.tsx
- src/app/error.tsx
- src/app/not-found.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/page.tsx
- src/components/back-link.tsx
- src/components/shop-grid.tsx
- src/components/site-header.tsx
- src/lib/nav-memory.ts
- vitest.setup.ts

Acceptance criteria that passed:
- Back to the shop, opened from the shop, returns to the same scroll position on desktop and phone (measured in a browser).
- Back to the shop, opened from a shared product link, still opens the shop.
- A shop filter shows in the address, and going back from a product restores that filter and position.
- Opening /shop?piece=the-romper shows only The Romper cards.
- Browser back still restores position on the shop, Home and Send a Call.
- On a fresh visit (new tab, reload, or returning from another site), Back to the shop opens /shop.

Gate runs: 13 (5 failed)

## Known failures
- plan gate, criteria quality failed 2 time(s): 1 criterion(s) are descriptions, not verifiable outcomes. state what can be observed (status code, value, visible effect):
- build gate, build failed 1 time(s): > Build error occurred
- release gate, style failed 2 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
- Merged as PR #60 into develop on 2026-11-18.
- Review found 3 major issues: sessionStorage outlived leaving the site and was copied into new tabs, so Back could leave the site or do nothing; router navigations did not refresh address-held filters. Lesson: "previous page" belongs in the running app's memory, and address state must follow Next's useSearchParams, not only popstate.
- The style gate rejects "just" in the changelog; test names are not checked.
- The build stopped twice on the Next.js security warning before passing; the upgrade is queued.
