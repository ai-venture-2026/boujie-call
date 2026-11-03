import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ClosingBanner } from "@/components/closing-banner";
import { HeroCarousel } from "@/components/hero-carousel";
import { steps } from "@/lib/content";
import { Price } from "@/components/product-view";
import { getProduct, type Product } from "@/lib/products";

const wrap = "mx-auto max-w-7xl px-6 md:px-12";
const romper = getProduct("the-romper");

const strip = [
  { src: "/images/gift-strip/ribbon.webp", box: "md:mt-28 md:aspect-[4/3] md:w-[20vw]" },
  { src: "/images/gift-strip/open-box.webp", box: "md:aspect-[3/4] md:w-[18vw]" },
  { src: "/images/gift-strip/card.webp", box: "md:mt-16 md:aspect-square md:w-[15vw]" },
  { src: "/images/gift-strip/unboxing.webp", box: "md:mt-6 md:aspect-[4/5] md:w-[24vw]" },
  { src: "/images/gift-strip/mist.webp", box: "max-md:col-span-2 max-md:aspect-[3/2] md:mt-32 md:aspect-[4/3] md:w-[20vw]" },
];

function PieceCard({ product }: { product: Product }) {
  const photo = product.colorways[0].images[0];
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className={`relative aspect-[4/5] overflow-hidden border-[0.5px] border-card-border bg-stone ${photo ? "contact" : ""}`}>
        {photo ? (
          <Image src={photo} alt="" fill sizes="(min-width: 1280px) 400px, (min-width: 640px) 30vw, 50vw" className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <span className="label absolute right-4 bottom-4 text-muted">Image to come</span>
        )}
      </div>
      <h3 className="mt-3 truncate text-xl font-medium md:mt-5 md:text-[26px]">{product.name}</h3>
      <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-4">
        <Price product={product} compact />
        <span className="label text-muted">{product.colorways.length} colorways</span>
      </div>
    </Link>
  );
}

// One half of the brunch and night pair; the whole panel opens the Slip Dress in its colorway.
function Panel({ colorway, name, photo, alt, ground, line, dark = false, children }: { colorway: string; name: string; photo: string; alt: string; ground: string; line: string; dark?: boolean; children: ReactNode }) {
  return (
    <Link
      href={`/shop/the-slip-dress?colorway=${colorway}`}
      aria-labelledby={`panel-${colorway}-title panel-${colorway}-shop`}
      data-nav={dark ? "dark" : undefined}
      className={`group flex flex-col border-[0.5px] focus-visible:outline-ink ${ground}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image src={photo} alt={alt} fill sizes="(min-width: 1280px) 584px, (min-width: 768px) 45vw, 100vw" style={{ objectPosition: "50% 0%" }} className="object-cover transition-transform duration-400 ease-out motion-safe:group-hover:scale-[1.02]" />
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-8 text-center md:px-4 md:py-10 lg:px-10">
        <h2 id={`panel-${colorway}-title`} className="max-w-[10em] text-[34px] leading-[1.04] font-medium md:text-[clamp(1.375rem,calc(2.8vw+2px),2.875rem)] rise">{children}</h2>
        <span className={`label mt-2 flex min-h-11 items-center md:mt-3 ${line}`}>
          <span id={`panel-${colorway}-shop`} className="underline decoration-pink decoration-1 underline-offset-6 transition-colors md:decoration-transparent md:group-hover:decoration-pink">
            Shop the Slip Dress in {name} <span aria-hidden="true">→</span>
          </span>
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroCarousel>
          <p className="label">LUXURY NIGHTWEAR GIFTS</p>
          <h1 id="hero-title" className="mt-4 text-[clamp(2.75rem,4vw,4.75rem)] leading-[1.02] max-md:text-[2.4rem] md:mt-6">
            The gift that makes her <em className="text-pink">feel</em> like the <em className="text-pink">moment.</em>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed md:text-lg">Luxury nightwear gift sets. Curated. Personalized. Unforgettable.</p>
          <Link href="/shop" className="cta cta-primary mt-10">
            Shop the collection
          </Link>
        </HeroCarousel>

        <section id="detail" className="grid md:h-[calc(100svh-5rem)] md:min-h-[600px] md:grid-cols-2">
          <div className="flex flex-col items-center justify-center bg-stone px-6 py-12 max-md:order-2 md:px-12">
            <div className="relative hidden aspect-[3/4] w-full max-w-sm md:block md:aspect-auto md:min-h-0 md:flex-1">
              <Image src="/images/products/the-romper-mocha.webp" alt="The Romper in Mocha" fill sizes="(min-width: 768px) 30vw, 80vw" className="object-contain mix-blend-multiply" />
            </div>
            <div className="w-full max-w-sm rise md:mt-8">
              <p className="label">The Romper · Mocha</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{romper?.description}</p>
              <Link href="/shop/the-romper" className="cta mt-8">
                Discover the piece
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/5] max-md:order-1 md:aspect-auto">
            <Image src="/images/details/brown-romper-hip.webp" alt="A close-up of the brown lace hem of The Romper in Mocha at the hip" fill sizes="(min-width: 768px) 50vw, 190vw" style={{ objectPosition: "42% 40%" }} className="object-cover" />
          </div>
        </section>

        <section id="how" data-nav="dark" className="overflow-hidden bg-ribbon py-18 text-blush md:py-section">
          <h2 className={`${wrap} text-center text-[2rem] leading-[1.05] md:text-[clamp(2.25rem,5vw,4.75rem)] md:uppercase rise`}>
            Someone places a call.
            <br />
            She <em className="text-pink normal-case">receives</em> a moment.
          </h2>
          <div data-strip className="mt-14 grid grid-cols-2 gap-3 px-6 md:mt-20 md:flex md:items-start md:justify-center md:gap-6 md:px-0">
            {strip.map((s) => (
              <div key={s.src} className={`relative aspect-[4/5] shrink-0 overflow-hidden ${s.box}`}>
                <Image src={s.src} alt="" fill sizes="(min-width: 768px) 24vw, 90vw" className="object-cover" />
              </div>
            ))}
          </div>
          <ol aria-label="How it works" className={`${wrap} mt-16 grid gap-10 md:mt-24 text-center md:grid-cols-3 md:gap-16`}>
            {steps.map((step) => (
              <li key={step.title} className="rise">
                <h3 className="text-[26px] font-medium">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-blush/80">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="From brunch to after dark" className="mx-auto grid max-w-7xl gap-3 px-6 py-18 md:grid-cols-2 md:gap-4 md:px-12 md:py-section">
          <Panel colorway="rose" name="Rose" photo="/images/brunch-night/day-rose-slip.webp" alt="A woman laughs over a coffee cup in The Slip Dress in Rose" ground="border-card-border bg-cream" line="text-muted">
            Cute enough to open at <em className="text-rose">brunch.</em>
          </Panel>
          <Panel colorway="after-dark" name="After Dark" photo="/images/brunch-night/night-after-dark.webp" alt="A woman looks back over her shoulder in The Slip Dress in After Dark" ground="border-ribbon bg-ribbon text-blush" line="text-blush/80" dark>
            Irresistible enough to wear <em className="text-pink">that night.</em>
          </Panel>
        </section>

        <section aria-labelledby="pieces-title" className="bg-cream pb-18 md:pb-section">
          <div className={wrap}>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="rise">
                <h2 id="pieces-title" className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04]">
                  The <em className="text-rose">pieces</em>
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">Satin and lace, made to be gifted. Sizes S to XL.</p>
              </div>
              <Link href="/shop" className="link label inline-flex min-h-11 items-center self-start text-ink md:self-auto">
                <span>
                  View all pieces <span aria-hidden="true">→</span>
                </span>
              </Link>
            </div>
            <ul aria-label="Pieces" className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-x-6 md:mt-12 md:gap-y-12">
              {["the-slip-dress", "the-romper", "the-boujie-set"].map((slug) => {
                const product = getProduct(slug);
                return product && (
                  <li key={slug} className="rise max-sm:last:odd:col-span-2 max-sm:last:odd:w-[calc(50%-0.375rem)] max-sm:last:odd:justify-self-center">
                    <PieceCard product={product} />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <ClosingBanner
          id="closing"
          tone="light"
          photo="/images/banners/blue-romper-banner.webp"
          alt="A woman in The Romper in Powder Blue sits on a stone block"
          focus="80% 0%"
          title={
            <>
              Be first to receive a Boujie <em className="text-rose-deep">Call.</em>
            </>
          }
          line="The pieces are here. Find the one that feels like her."
        >
          <Link href="/shop" className="cta">
            Shop the collection
          </Link>
        </ClosingBanner>
      </main>
      <SiteFooter />
    </>
  );
}
