import Link from "next/link";
import { pages, socials } from "@/lib/content";
import { Logo } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-blush">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-24 pb-12 md:grid-cols-12 md:px-12">
        <div className="md:col-span-6">
          <Logo tone="pink" className="h-14" />
          <p className="mt-6 font-serif text-2xl italic text-pink">Are you going to pick up?</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="label flex flex-col gap-4">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-pink">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <ul className="label flex flex-col gap-4 text-muted-dark md:col-span-3">
          {socials.map((s) => (
            <li key={s.label}>
              {s.url ? (
                <a href={s.url} className="text-blush hover:text-pink">
                  {s.label}
                </a>
              ) : (
                `${s.label}, link to come`
              )}
            </li>
          ))}
        </ul>
        <p className="label border-t-[0.5px] border-muted-dark/30 pt-8 text-[10px] text-muted-dark md:col-span-12">
          © 2026 Boujie Call. BoujieCall.com
        </p>
      </div>
    </footer>
  );
}
