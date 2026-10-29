import Image from "next/image";
import Link from "next/link";
import { pages, socials } from "@/lib/content";
import { products } from "@/lib/products";

const shop = [...products.map((p) => ({ href: `/shop/${p.slug}`, label: p.name })), { href: "/shop", label: "All pieces" }];

function Column({ title, name = title, links }: { title: string; name?: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={name}>
      <p className="label text-[10px] text-muted">{title}</p>
      <ul className="mt-4 flex flex-col gap-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-ink/80 transition-colors hover:text-rose">
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
    <footer className="bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pt-12 pb-8 md:flex-row-reverse md:items-end md:justify-between md:px-12 md:pt-14 md:pb-10">
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-14">
            <Column title="Shop" links={shop} />
            <Column title="Company" name="Footer" links={pages} />
            <div>
              <p className="label text-[10px] text-muted">Socials</p>
              <ul className="mt-4 flex flex-col gap-2 text-sm">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} className="text-ink/80 hover:text-rose">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="label text-[10px] text-muted">© 2026 Boujie Call</p>
        </div>
        <div className="flex flex-col items-start gap-5">
          <Image src="/boujie-call-monogram-ink.png" alt="Boujie Call" width={439} height={430} className="h-24 w-auto md:h-36" />
          <p className="font-serif text-xl italic">Luxury nightwear gifts.</p>
          <ul className="flex flex-col gap-1 text-sm text-muted">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} className="hover:text-rose">
                  {s.label} {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
