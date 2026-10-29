# Debt log

Known deviations we are deliberately not fixing in the change where they were found.
One line each, logged on the spot instead of opening a work item. Sweep the cleanup
items in one batch at a quiet moment; accepted items stay, with the reason, so nobody
re-litigates them.

Categories: cleanup (mechanical, safe to batch), pattern (a wrong shape new code would
copy; fix it before it spreads), soon (costs someone time while it exists), accepted
(evaluated and staying as is).
- [soon] Privacy and Terms pages are missing; the footer leaves them out until they exist, and they are needed before the waitlist collects emails (src/components/site-footer.tsx) :: logged 2026-10-28, cycle 20261028-478322
- [soon] Product gallery view and scroll drift apart when the window crosses md; sync on a matchMedia change (src/components/product-view.tsx) :: logged 2026-10-29, cycle 20261029-a10368
- [soon] Size guide dialog renders inside the Size fieldset; move it outside so its table is not announced with the radio group (src/components/size-guide.tsx) :: logged 2026-10-29, cycle 20261029-a10368
- [cleanup] Size guide closes when a text selection drag ends on the backdrop; close only when pointerdown and click both hit the dialog (src/components/size-guide.tsx) :: logged 2026-10-29, cycle 20261029-a10368
- [soon] next dev re-adds a Next.js agent block with em dashes to AGENTS.md on every start; decide whether to commit it or turn it off (AGENTS.md) :: logged 2026-10-29, cycle 20261029-abd860
- [soon] Quick add bar on phones does not show the chosen colorway and size; add a short line so people can confirm before tapping (src/components/product-view.tsx) :: logged 2026-10-29, cycle 20261029-b9e136
- [cleanup] A lone last Shop card left aligns at 768px to 1023px where the grid is still two columns (src/components/shop-grid.tsx) :: logged 2026-10-29, cycle 20261029-b9e136
- [soon] Landscape on notched iPhones: body side inset padding leaves cream strips beside full bleed sections and offsets the centered nav; move the inset onto inner wrappers (src/app/globals.css) :: logged 2026-10-29, cycle 20261029-b9e136
- [cleanup] Desktop nav left-[38%] measures from the max-w-7xl container since it moved from fixed to absolute; it no longer lines up with the hero photo column above 80rem (src/components/site-header.tsx) :: logged 2026-10-29, cycle 20261029-46cf8d
- [soon] Home detail Romper packshot (object-contain) has no contact shadow; a fixed oval would miss the hem, so add it once the new pink photos set the garment position (src/app/page.tsx) :: logged 2026-10-29, cycle 20261029-a55071
- [cleanup] Hairlines in shop filters, bag, size guide, product quick add bar and menu still use border-ink/10 or /15; move them to border-card-border (src/components/bag-view.tsx) :: logged 2026-10-29, cycle 20261029-a55071
- [soon] Selected desktop thumbnail aria-pressed:outline-1 outline-pink overrides the 2px focus ring, leaving a 1px ring at about 1.7:1 (src/components/product-view.tsx) :: logged 2026-10-29, cycle 20261029-a55071
