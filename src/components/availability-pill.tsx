// Decorative: the card text and the size buttons already say the same thing to screen readers.
export function AvailabilityPill({ label }: { label: string | null }) {
  if (!label) return null;
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center">
      <span data-pill className="label rounded-full bg-ink px-4 py-2 text-blush shadow-sm">
        {label}
      </span>
    </span>
  );
}
