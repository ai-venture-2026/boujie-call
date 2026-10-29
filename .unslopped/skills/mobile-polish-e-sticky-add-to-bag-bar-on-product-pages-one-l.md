---
name: mobile-polish-e-sticky-add-to-bag-bar-on-product-pages-one-l
title: Mobile polish E: sticky add-to-bag bar on product pages, one-line card names with centered last card, 44px tap targets and 16px readable text on phones
created: 2026-10-29T16:04:12.311Z
updated: 2026-10-29T16:04:12.311Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 0
lastCycle: 20261029-b9e136
tags: mobile, polish, sticky, add-to-bag, bar, product, pages, one-line, src
---
# Mobile polish E: sticky add-to-bag bar on product pages, one-line card names with centered last card, 44px tap targets and 16px readable text on phones

## When to use
Requests like:
- "Mobile polish E: sticky add-to-bag bar on product pages, one-line card names with centered last card, 44px tap targets and 16px readable text on phones"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/globals.css
- src/app/layout.tsx
- src/app/page.test.tsx
- src/app/page.tsx
- src/app/shop/[slug]/page.tsx
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/shop-grid.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/components/size-guide.tsx

Acceptance criteria that passed:
- On a product page at 390px, scrolling the main Add to your bag button off screen shows a bottom bar with the piece name, price and a pink Add to your bag pill; scrolling back hides it.
- Rejection: tapping the bar's button with no colorway or size chosen scrolls the selectors into view and shows "Choose a colorway and a size first."
- With both chosen, the bar's button adds the piece to the bag.
- The bar's bottom padding includes the safe area inset.
- At 390px, Home and Shop card names each sit on one line, and a single last card is centered at card width.
- At 375px no page scrolls sideways.
- At 375px every audited tap target measures at least 44px tall and every audited readable text at least 16px.
- Screen readers meet the footer monogram before the link columns.

Gate runs: 8 (0 failed)

## Known failures
- none recorded

## Notes
- IntersectionObserver only fires on state changes; a fast jump from below the viewport to above it skips the observer. A tall bottom rootMargin makes "below" count as visible so the jump still flips the state. Jest mocks cannot catch this; test the real scroll in a browser.
- A bar that unmounts after its own action must move focus first, or keyboard and screen reader users land on body.
- viewport-fit cover affects every page; side insets belong on inner wrappers, not body, or full bleed sections show strips in landscape.
- Run a measured audit (scrollWidth, element heights, computed font sizes) at 375px before planning a tap target or text size pass; it turned a vague check into five concrete fixes.
