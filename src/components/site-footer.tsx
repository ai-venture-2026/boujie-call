import Link from "next/link";
import { pages, socials } from "@/lib/content";
import { products } from "@/lib/products";

const shop = [...products.map((p) => ({ href: `/shop/${p.slug}`, label: p.name })), { href: "/shop", label: "All pieces" }];

function Column({ title, name = title, links }: { title: string; name?: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={name}>
      <p className="label text-blush/75">{title}</p>
      <ul className="mt-4 flex flex-col gap-2 text-[15px] max-md:gap-0">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-pink max-md:flex max-md:min-h-11 max-md:items-center max-md:text-base">
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
    <footer data-nav="dark" className="bg-ribbon text-blush">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-6 pt-14 pb-8 md:flex-row md:items-end md:justify-between md:px-12 md:pt-16 md:pb-10">
        <div className="flex flex-col items-start gap-5">
          <span role="img" aria-label="Boujie Call" className="block aspect-[439/430] h-24 bg-pink [mask:url(/boujie-call-monogram-ink.png)_center/contain_no-repeat] md:h-36" />
          <p className="font-serif text-xl italic">Luxury nightwear gifts.</p>
          <ul className="flex flex-col gap-1 text-[15px] text-blush/75 max-md:hidden">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} className="hover:text-pink">
                  {s.label} {s.handle}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:gap-14">
            <Column title="Shop" links={shop} />
            <Column title="Company" name="Footer" links={pages} />
            <div>
              <p className="label text-blush/75">Socials</p>
              <ul className="mt-4 flex flex-col gap-2 text-[15px] max-md:gap-0">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} className="hover:text-pink max-md:flex max-md:min-h-11 max-md:items-center max-md:text-base">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="label text-blush/75">© 2026 Boujie Call</p>
        </div>
      </div>
    </footer>
  );
}
