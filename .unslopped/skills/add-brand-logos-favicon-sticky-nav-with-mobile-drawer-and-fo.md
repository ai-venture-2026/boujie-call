---
name: add-brand-logos-favicon-sticky-nav-with-mobile-drawer-and-fo
title: Add brand logos, favicon, sticky nav with mobile drawer, and footer
created: 2026-10-28T09:13:56.084Z
updated: 2026-10-28T09:13:56.084Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261028-63606d
tags: add, brand, logos, favicon, sticky, nav, mobile, drawer, assets, public, src
---
# Add brand logos, favicon, sticky nav with mobile drawer, and footer

## When to use
Requests like:
- "Add brand logos, favicon, sticky nav with mobile drawer, and footer"

## Playbook
Files touched:
- CHANGELOG.md
- assets/Pink And Black Elegant Beauty Logo - 2 (1).png
- assets/Pink And Black Elegant Beauty Logo - 2.png
- public/boujie-call-logo-ink.png
- public/boujie-call-logo-pink.png
- src/app/globals.css
- src/app/icon.png
- src/app/page.test.tsx
- src/app/page.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/lib/content.ts
- vitest.setup.ts

Acceptance criteria that passed:
- The main nav lists Home, Shop, Send a Call and About in that order.
- "Join the waitlist" in the header links to /#waitlist and the Home signup section has id waitlist.
- Tapping "Open menu" opens the drawer dialog; tapping "Close menu" closes it.
- Choosing a link in the drawer closes the drawer.
- Header and footer show the logo image with alt text "Boujie Call", ink on the cream header, pink on the ink footer.
- The footer lists links to Home, Shop, Send a Call and About.
- On a 390px wide screen the hero headline renders at 48px and the desktop links are hidden (screenshot check).
- `npm run build` and `npm run lint` exit 0.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- Server components cannot import plain data from a "use client" module; shared data lives in src/lib/content.ts. jsdom tests missed it, the build caught it.
- jsdom lacks dialog showModal; vitest.setup.ts stands in.
- PNGs count as 0 diff lines (null bytes), so source assets cost nothing against the limit.
