import type { Metadata } from "next";
import Image from "next/image";
import { ShopGrid } from "@/components/shop-grid";
import { GiftButton } from "@/components/gift-button";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { products } from "@/lib/products";
import { getCatalog, withLive } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "Shop | Boujie Call",
  description: "The Slip Dress, The Boujie Set and The Romper. Satin nightwear pieces in sizes S to XL.",
};

export const revalidate = 60;

export default async function Shop() {
  const live = withLive(products, await getCatalog());
  return (
    <>
      <SiteHeader />
      <main>
        <section data-nav="dark" className="grid bg-ribbon text-blush md:h-[60svh] md:min-h-[460px] md:grid-cols-[38fr_62fr]">
          <div className="relative h-[42svh] md:h-auto">
            <Image src="/images/products/studio/the-romper-mocha-front.webp" alt="The lace neckline of The Romper in Mocha" fill priority sizes="(min-width: 768px) 38vw, 100vw" style={{ objectPosition: "50% 22%" }} className="object-cover" />
          </div>
          <div className="flex flex-col items-center justify-center px-6 py-14 text-center">
            <h1 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-none tracking-[0.3em] uppercase">The collection</h1>
            <p className="mt-6 font-serif text-xl italic md:text-2xl">Treat yourself. Or let someone treat you.</p>
          </div>
        </section>
        <ShopGrid products={live} />
        <p className="-mt-6 pb-20 text-center md:-mt-10 md:pb-28">
          <GiftButton label="Sending it as a gift? Place a Call" className="cta" />
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
