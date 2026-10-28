export function Marker({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span aria-hidden="true" className={`font-serif text-sm tracking-[0.3em] ${className}`}>
      ‹ {String(n).padStart(2, "0")} ›
    </span>
  );
}
