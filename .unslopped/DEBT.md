# Debt log

Known deviations we are deliberately not fixing in the change where they were found.
One line each, logged on the spot instead of opening a work item. Sweep the cleanup
items in one batch at a quiet moment; accepted items stay, with the reason, so nobody
re-litigates them.

Categories: cleanup (mechanical, safe to batch), pattern (a wrong shape new code would
copy; fix it before it spreads), soon (costs someone time while it exists), accepted
(evaluated and staying as is).
- [soon] Privacy and Terms pages are missing; the footer leaves them out until they exist, and they are needed before the waitlist collects emails (src/components/site-footer.tsx) :: logged 2026-10-28, cycle 20261028-478322
