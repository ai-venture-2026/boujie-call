import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ImageSlot } from "@/components/image-slot";
import { Price } from "@/components/product-view";
import { OFFER, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop | Boujie Call",
  description: "The Slip Dress, The Boujie Set and The Romper. Satin nightwear pieces in sizes S to XL.",
};

export default function Shop() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pt-16 pb-28 md:px-12 md:pt-24">
        <h1 className="max-w-3xl text-5xl md:text-7xl">Treat yourself. Or let someone treat you.</h1>
        <p className="mt-6 text-muted">
          Every piece is a moment. Pick yours.{" "}
          <Link href="/send-a-call" className="link text-ink">
            Sending it as a gift? Place a Call
          </Link>
        </p>
        <p className="mt-3 text-sm">{OFFER}</p>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <li key={p.slug} className={i === 1 ? "lg:mt-16" : ""}>
              <Link href={`/shop/${p.slug}`} className="group block">
                <div aria-hidden="true" className="overflow-hidden rounded-[16px] bg-blush">
                  {p.colorways[0].images[0] ? (
                    <Image src={p.colorways[0].images[0]} alt="" width={900} height={1200} className="aspect-[3/4] w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.02]" />
                  ) : (
                    <ImageSlot alt={p.name} className="aspect-[3/4]!" />
                  )}
                </div>
                <h2 className="mt-5 text-3xl">{p.name}</h2>
                <Price product={p} className="mt-2" />
                <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                  {p.colorways.map((c) => (
                    <span key={c.name} aria-hidden="true" className="size-3.5 rounded-full border-[0.5px] border-card-border" style={{ background: c.swatch ?? c.hex }} />
                  ))}
                  <span className="ml-1">{p.colorways.length} colorways</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
