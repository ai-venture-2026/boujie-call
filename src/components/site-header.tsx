import Link from "next/link";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-serif italic ${className}`}>
      Boujie Call<span aria-hidden="true" className="ml-1 text-pink not-italic">✦</span>
    </span>
  );
}

const sections = [
  { href: "#how", label: "How it works" },
  { href: "#boxes", label: "The boxes" },
  { href: "#join", label: "Join the list" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-7xl flex-wrap items-baseline justify-between gap-4 px-6 py-8 md:px-12">
      <Link href="/" aria-label="Boujie Call home">
        <Wordmark className="text-3xl" />
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-6 text-sm md:gap-10">
          {sections.map((s) => (
            <li key={s.href}>
              <a href={s.href} className="hover:text-muted">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
