---
name: arrange-public-images-into-clearly-named-folders-brand-hero-
title: Arrange public images into clearly named folders: brand, hero, gift-strip, brunch-night, details, banners, about, send-a-call, products
created: 2026-11-03T15:53:45.849Z
updated: 2026-11-03T15:53:45.849Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 3
lastCycle: 20261103-6a160a
tags: arrange, public, images, clearly, named, folders, brand, hero, assets, src
---
# Arrange public images into clearly named folders: brand, hero, gift-strip, brunch-night, details, banners, about, send-a-call, products

## When to use
Requests like:
- "Arrange public images into clearly named folders: brand, hero, gift-strip, brunch-night, details, banners, about, send-a-call, products"

## Playbook
Files touched:
- CHANGELOG.md
- assets/pink-batch/README.md
- public/images/banners/blue-romper-banner.webp
- public/images/banners/mocha-romper-banner.webp
- public/images/banners/rose-dress-banner.webp
- public/images/brand/logo-ink.png
- public/images/brand/logo-pink.png
- public/images/brand/monogram-ink.png
- public/images/brunch-night/day-rose-slip.webp
- public/images/brunch-night/night-after-dark.webp
- public/images/gift-strip/card.webp
- public/images/gift-strip/mist.webp
- public/images/gift-strip/open-box.webp
- public/images/gift-strip/ribbon.webp
- public/images/gift-strip/unboxing.webp
- src/app/about/page.tsx
- src/app/page.tsx
- src/app/send-a-call/page.tsx
- src/components/site-footer.tsx
- src/components/site-header.tsx
- src/lib/images.test.ts

Acceptance criteria that passed:
- Listing public/images shows exactly nine folders: about, banners, brand, brunch-night, details, gift-strip, hero, products, send-a-call
- Listing public/ shows no image files at its root
- Every /images/ path written in src resolves to an existing file under public (images.test.ts passes)
- Rejection: images.test.ts fails when a path in src names a file that does not exist, shown by the red run before the move
- npm run build exits 0 and npm test passes
- Home, Shop, Send a Call and About return 200 locally and every img on them loads with naturalWidth above 0, header and footer logos included
- assets/pink-batch/README.md lists the 15 photos to replace and the 11 that stay (4 pink or black, 7 products), and the folder is outside public so nothing in it deploys

Gate runs: 11 (3 failed)

## Known failures
- code gate, scope failed 1 time(s): 13 changed file(s) are not in the plan's "## Files to touch":
- code gate, style failed 1 time(s): 1 style problem(s) in the diff. write precisely and directly:
- release gate, clean tree failed 2 time(s): uncommitted changes:

## Notes
- Live after PR #11: Home, Shop, Send a Call and About return 200 at 1440 and 390 wide with 0 broken images; brand logo masks load from /images/brand.
- unslopped commit only commits what is staged: the first commit held just the git mv renames. Stage source, tests and changelog before running it.
- unslopped pr opened against main; this repo merges features into develop first, so the PR was retargeted to develop.
- A review subagent checked out other branches and left the repo on develop; reviewers should read diffs with git diff only.
