import Link from "next/link";
import { pages, socials } from "@/lib/content";
import { products } from "@/lib/products";
import { WaitlistForm } from "./waitlist-form";

const shop = [...products.map((p) => ({ href: `/shop/${p.slug}`, label: p.name })), { href: "/shop", label: "All pieces" }];

function Column({ title, name = title, links }: { title: string; name?: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={name}>
      <p className="label text-[10px] text-muted-dark">{title}</p>
      <ul className="mt-6 flex flex-col gap-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-pink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer data-nav="dark" className="overflow-hidden bg-ink text-blush">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pt-20 md:grid-cols-12 md:px-12 md:pt-24">
        <div className="md:col-span-5">
          <p className="label text-[10px] text-muted-dark">Newsletter</p>
          <p className="mt-6 font-serif text-3xl md:text-4xl">
            Be first when we <em className="text-pink">launch.</em>
          </p>
          <div className="mt-8">
            <WaitlistForm tone="dark" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7">
          <Column title="Shop" links={shop} />
          <Column title="Company" name="Footer" links={pages} />
          <div>
            <p className="label text-[10px] text-muted-dark">Socials</p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-muted-dark">
              {socials.map((s) => (
                <li key={s.label}>{s.url ? <a href={s.url} className="text-blush hover:text-pink">{s.label}</a> : s.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <p data-wordmark className="mx-auto max-w-7xl px-6 pt-16 text-center font-serif text-[clamp(3rem,13.4vw,11.5rem)] leading-none font-light tracking-[0.06em] whitespace-nowrap text-pink uppercase md:px-12 md:pt-20">
        Boujie Call
      </p>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 border-t-[0.5px] border-muted-dark/25 px-6 py-8 text-muted-dark sm:flex-row sm:items-center sm:justify-between md:px-12">
        <p className="label text-[10px]">© 2026 Boujie Call</p>
        <p className="font-serif text-lg text-pink italic">Are you going to pick up?</p>
        <p className="label text-[10px]">BoujieCall.com</p>
      </div>
    </footer>
  );
}
