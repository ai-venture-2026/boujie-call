---
name: size-guides-for-the-slip-dress-and-the-romper-from-the-vendo
title: Size guides for The Slip Dress and The Romper from the vendor's garment measurements, in inches and cm
created: 2026-11-24T14:28:48.270Z
updated: 2026-11-24T14:28:48.270Z
runs: 1
completed: 1
abandoned: 0
gateFailures: 4
lastCycle: 20261124-76c193
tags: size, guides, slip, dress, romper, vendor, garment, measurements, src
---
# Size guides for The Slip Dress and The Romper from the vendor's garment measurements, in inches and cm

## When to use
Requests like:
- "Size guides for The Slip Dress and The Romper from the vendor's garment measurements, in inches and cm"

## Playbook
Files touched:
- CHANGELOG.md
- src/app/content-accuracy.test.tsx
- src/app/shop/shop.test.tsx
- src/components/product-view.tsx
- src/components/size-guide.tsx
- src/lib/products.ts

Acceptance criteria that passed:
- The Slip Dress guide heads its table Size, Bust, Waist, Hem, Length.
- The Slip Dress M row reads 29.1 / 74, 24.3 / 61.6, 34.3 / 87, 23.7 / 60.3.
- The Romper guide heads its table Size, Bust, Waist, Leg opening.
- The Romper XL row reads 27.2 / 69, 23.4 / 59.4, 19.0 / 48.2.
- The guide says the numbers are garment measurements in inches / cm and that the fabric stretches.
- The Boujie Set page shows no Size guide link.
- The opened guide on a phone width fits the screen without sideways scrolling, checked by screenshot.

Gate runs: 12 (4 failed)

## Known failures
- code gate, scope failed 2 time(s): 1 changed file(s) are not in the plan's "## Files to touch":
- code gate, style failed 2 time(s): 3 style problem(s) in the diff. write precisely and directly:
- release gate, style failed 2 time(s): 1 style problem(s) in the diff. write precisely and directly:

## Notes
- Merged as PR #77 into develop on 2026-11-24; staging shows Size guide on The Slip Dress and The Romper and none on The Boujie Set.
- Four gate failures: scope (nested parentheses in a Files to touch reason hide the path), style twice (test names with "and" or "but", and "note that" as filler), and a release style failure from a test added after review. Name every test by one outcome before running the gate.
- Review majors: the table overflowed at 320 px (measure the content box, not the dialog, at the smallest width), and the stretch line counts as a fabric claim; kept because Alex approved it in the preview and the vendor chart states the blend.
- Vendor charts give half widths (1/2) for bust, waist and hem; double them. Leg opening and lengths come whole. The vendor's name must stay off the site.
- Open: The Boujie Set chart (unreadable screenshot) and what the Romper's 37 to 41 cm front length measures.
