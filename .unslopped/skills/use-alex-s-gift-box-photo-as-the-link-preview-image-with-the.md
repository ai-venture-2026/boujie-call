---
name: use-alex-s-gift-box-photo-as-the-link-preview-image-with-the
title: Use Alex's gift box photo as the link preview image with the logo
created: 2026-10-29T00:22:19.231Z
updated: 2026-10-29T00:22:19.231Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 1
lastCycle: 20261029-c43d33
tags: use, alex, gift, box, photo, link, preview, image, assets, src
---
# Use Alex's gift box photo as the link preview image with the logo

## When to use
Requests like:
- "Use Alex's gift box photo as the link preview image with the logo"

## Playbook
Files touched:
- CHANGELOG.md
- assets/brand/og-image-source.png
- src/app/opengraph-image.alt.txt
- src/app/opengraph-image.png
- src/app/seo.test.tsx

Acceptance criteria that passed:
- src/app/opengraph-image.png is 1200x630 and shows the gift box photo with the ink logo top-left
- The rendered home page head carries og:image and og:image:alt pointing at the new image

Gate runs: 9 (1 failed)

## Known failures
- deploy gate, approval failed 1 time(s): a human must run: unslopped approve deploy

## Notes
- printf without a trailing newline for alt text files; Next copies the newline into og:image:alt.
