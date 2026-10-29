import Image from "next/image";
import Link from "next/link";
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
  { src: "/images/strip/ribbon.webp", box: "md:mt-28 md:aspect-[4/3] md:w-[20vw]" },
  { src: "/images/strip/open-box.webp", box: "md:aspect-[3/4] md:w-[18vw]" },
  { src: "/images/strip/card.webp", box: "md:mt-16 md:aspect-square md:w-[15vw]" },
  { src: "/images/strip/unboxing.webp", box: "md:mt-6 md:aspect-[4/5] md:w-[24vw]" },
  { src: "/images/strip/mist.webp", box: "max-md:col-span-2 max-md:aspect-[3/2] md:mt-32 md:aspect-[4/3] md:w-[20vw]" },
];

function PieceCard({ product }: { product: Product }) {
  const photo = product.colorways[0].images[0];
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-stone">
        {photo ? (
          <Image src={photo} alt="" fill sizes="(min-width: 640px) 30vw, 100vw" className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <span className="label absolute right-4 bottom-4 text-[10px] text-muted">Image to come</span>
        )}
      </div>
      <h3 className="mt-3 truncate text-lg md:mt-5 md:text-2xl">{product.name}</h3>
      <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
        <Price product={product} />
        <span className="label text-[10px] text-muted">{product.colorways.length} colorways</span>
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

        <section id="how" className="overflow-hidden bg-cream py-20 md:py-40">
          <h2 className={`${wrap} text-center text-[2rem] leading-[1.05] md:text-[clamp(2.25rem,5vw,4.75rem)] md:uppercase rise`}>
            Someone places a call.
            <br />
            She <em className="text-rose normal-case">receives</em> a moment.
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
                <h3 className="text-2xl">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="From brunch to after dark" className="relative grid md:h-[calc(100svh-5rem)] md:min-h-[600px] md:grid-cols-2">
          <div className="flex flex-col items-center bg-cream px-6 pt-12 pb-12 text-center md:justify-center md:bg-white md:px-6 md:pt-0 md:pb-24">
            <div className="relative aspect-[4/5] w-full max-w-[17rem] md:h-[min(50svh,28rem)] md:w-auto md:max-w-none">
              <Image src="/images/turn/day-rose-slip.webp" alt="A woman laughs over a coffee cup in The Slip Dress in Rose" fill sizes="(min-width: 768px) 23rem, 17rem" className="object-cover" />
            </div>
            <h2 className="mt-5 text-[2rem] leading-[1.04] md:text-[clamp(1.25rem,2.8vw,2.75rem)] rise">
              Cute enough to open at <em className="text-rose">brunch.</em>
            </h2>
            <Link href="/shop/the-slip-dress?colorway=rose" className="label mt-2 flex min-h-11 items-center text-[10px] md:mt-3 md:text-xs text-muted hover:text-ink">
              The Slip Dress · Rose
            </Link>
          </div>
          <div data-nav="dark" className="flex flex-col items-center bg-ink px-6 max-md:relative pt-12 pb-28 text-center text-blush md:justify-center md:px-6 md:pt-0 md:pb-24">
            <div className="relative aspect-[4/5] w-full max-w-[17rem] md:h-[min(50svh,28rem)] md:w-auto md:max-w-none">
              <Image src="/images/turn/night-after-dark.webp" alt="A woman looks back over her shoulder in The Slip Dress in After Dark" fill sizes="(min-width: 768px) 23rem, 17rem" className="object-cover" />
            </div>
            <h2 className="mt-5 text-[2rem] leading-[1.04] md:text-[clamp(1.25rem,2.8vw,2.75rem)] rise">
              Irresistible enough to wear <em className="text-pink">that night.</em>
            </h2>
            <Link href="/shop/the-slip-dress?colorway=after-dark" className="label mt-2 flex min-h-11 items-center text-[10px] md:mt-3 md:text-xs text-blush/80 hover:text-blush">
              The Slip Dress · After Dark
            </Link>
            <Link href="/shop" className="cta absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap md:bottom-14 cta-primary">
              Shop the collection
            </Link>
          </div>
        </section>

        <section aria-labelledby="pieces-title" className="bg-cream py-16 md:py-24">
          <div className={wrap}>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="rise">
                <h2 id="pieces-title" className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04]">
                  The <em className="text-rose">pieces</em>
                </h2>
                <p className="mt-4 max-w-sm text-base leading-relaxed text-muted">Satin and lace, made to be gifted. Sizes S to XL.</p>
              </div>
              <Link href="/shop" className="cta self-start md:self-auto">
                View all pieces
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
          photo="/images/close/blue-romper-banner.webp"
          alt="A woman in The Romper in Powder Blue sits on a stone block"
          focus="80% 0%"
          title={
            <>
              Be first to receive a Boujie <em className="text-rose-deep">Call.</em>
            </>
          }
          line="The pieces are here. Find the one that feels like her."
        >
          <Link href="/shop" className="cta cta-primary">
            Shop the collection
          </Link>
        </ClosingBanner>
      </main>
      <SiteFooter />
    </>
  );
}
