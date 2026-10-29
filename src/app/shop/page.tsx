import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShopGrid } from "@/components/shop-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { OFFER } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop | Boujie Call",
  description: "The Slip Dress, The Boujie Set and The Romper. Satin nightwear pieces in sizes S to XL.",
};

export default function Shop() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="grid bg-stone md:h-[60svh] md:min-h-[460px] md:grid-cols-[38fr_62fr]">
          <div className="relative h-[42svh] md:h-auto">
            <Image src="/images/details/brown-romper-lace.webp" alt="A close-up of the brown lace neckline of The Romper in Mocha" fill priority sizes="(min-width: 768px) 38vw, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[0.3em] uppercase">The collection</h1>
            <p className="mt-6 font-serif text-xl italic md:text-2xl">Treat yourself. Or let someone treat you.</p>
            <p className="label mt-3 text-[10px]">{OFFER}</p>
          </div>
        </section>
        <ShopGrid />
        <p className="-mt-6 pb-20 text-center md:-mt-10 md:pb-28">
          <Link href="/send-a-call" className="link inline-flex min-h-11 items-center text-base text-muted">
            Sending it as a gift? Place a Call
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
