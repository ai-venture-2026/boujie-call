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
