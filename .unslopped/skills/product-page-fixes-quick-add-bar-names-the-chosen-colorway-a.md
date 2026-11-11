---
name: product-page-fixes-quick-add-bar-names-the-chosen-colorway-a
title: Product page fixes: quick add bar names the chosen colorway and size, size guide sits outside the size fieldset, selected thumbnail keeps a visible focus ring, sold out size reset is announced
created: 2026-11-11T01:29:22.836Z
updated: 2026-11-11T01:29:22.836Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261111-533080
tags: product, page, fixes, quick, add, bar, names, chosen, src
---
# Product page fixes: quick add bar names the chosen colorway and size, size guide sits outside the size fieldset, selected thumbnail keeps a visible focus ring, sold out size reset is announced

## When to use
Requests like:
- "Product page fixes: quick add bar names the chosen colorway and size, size guide sits outside the size fieldset, selected thumbnail keeps a visible focus ring, sold out size reset is announced"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/size-guide.tsx

Acceptance criteria that passed:
- With Rose and M chosen, the quick add bar shows "Rose, M".
- Rejection: with nothing chosen, the quick add bar shows no colorway or size text.
- The size guide dialog is not inside the Size fieldset.
- The selected thumbnail uses ring-pink and no outline-1 class.
- Choosing a colorway where the picked size is sold out shows "S is sold out in Rose. Choose another size." in the polite live note.
- npm run build exits 0 and npm test passes.

Gate runs: 11 (3 failed)

## Known failures
- code gate, style failed 3 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
- A colorway change must reset the sold out note in both directions, or a stale note survives the next change; the plan missed it and a test now covers it.
- createPortal into document.body via useSyncExternalStore (null on the server) moves a dialog out of a fieldset without touching layout.
