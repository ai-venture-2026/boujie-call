import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HeroCarousel } from "@/components/hero-carousel";
import { WaitlistForm } from "@/components/waitlist-form";
import { steps } from "@/lib/content";
import { Price } from "@/components/product-view";
import { getProduct, products, type Product } from "@/lib/products";

const wrap = "mx-auto max-w-7xl px-6 md:px-12";
const romper = getProduct("the-romper");

const strip = [
  { src: "/images/strip/ribbon.webp", box: "mt-28 aspect-[4/3] w-[44vw] md:w-[20vw]" },
  { src: "/images/strip/open-box.webp", box: "aspect-[3/4] w-[36vw] md:w-[18vw]" },
  { src: "/images/strip/card.webp", box: "mt-16 aspect-square w-[30vw] md:w-[15vw]" },
  { src: "/images/strip/unboxing.webp", box: "mt-6 aspect-[4/5] w-[48vw] md:w-[24vw]" },
  { src: "/images/strip/mist.webp", box: "mt-32 aspect-[4/3] w-[44vw] md:w-[20vw]" },
];

function PieceCard({ product, large = false }: { product: Product; large?: boolean }) {
  const photo = product.colorways[0].images[0];
  return (
    <Link href={`/shop/${product.slug}`} className="group block rise">
      <div className={`relative overflow-hidden bg-stone ${large ? "aspect-[4/5]" : "aspect-[3/4]"}`}>
        {photo ? (
          <Image src={photo} alt="" fill sizes={large ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 768px) 22vw, 50vw"} className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]" />
        ) : (
          <span className="label absolute right-4 bottom-4 text-[10px] text-muted">Image to come</span>
        )}
      </div>
      <h3 className={`mt-5 ${large ? "text-3xl" : "text-2xl"}`}>{product.name}</h3>
      <div className="mt-2 flex items-baseline gap-4">
        <Price product={product} />
        <span className="label text-[10px] text-muted">{product.colorways.length} colorways</span>
      </div>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <HeroCarousel>
          <p className="label">LUXURY NIGHTWEAR GIFTS</p>
          <h1 id="hero-title" className="mt-6 text-[clamp(2.75rem,4vw,4.75rem)] leading-[1.02]">
            The gift that makes her <em>feel</em> like the <em>moment.</em>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed md:text-lg">Luxury nightwear gift sets. Curated. Personalized. Unforgettable.</p>
          <Link href="/shop" className="cta mt-10">
            Shop the collection
          </Link>
        </HeroCarousel>

        <section id="detail" className="grid md:h-[calc(100svh-5rem)] md:min-h-[600px] md:grid-cols-2">
          <div className="flex flex-col items-center justify-center bg-stone px-6 py-20 md:px-12 md:py-12">
            <div className="relative aspect-[3/4] w-full max-w-sm md:aspect-auto md:min-h-0 md:flex-1">
              <Image src="/images/products/the-romper-mocha.webp" alt="The Romper in Mocha" fill sizes="(min-width: 768px) 30vw, 80vw" className="object-contain mix-blend-multiply" />
            </div>
            <div className="mt-8 w-full max-w-sm rise">
              <p className="label">The Romper · Mocha</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{romper?.description}</p>
              <Link href="/shop/the-romper" className="cta mt-8">
                Discover the piece
              </Link>
            </div>
          </div>
          <div className="relative min-h-[70svh] md:min-h-0">
            <Image src="/images/details/brown-romper-hip.webp" alt="A close-up of the brown lace hem of The Romper in Mocha at the hip" fill sizes="(min-width: 768px) 50vw, 100vw" style={{ objectPosition: "42% 40%" }} className="object-cover" />
          </div>
        </section>

        <section id="how" className="overflow-hidden bg-cream py-28 md:py-40">
          <h2 className={`${wrap} text-center text-[clamp(2.25rem,5vw,4.75rem)] leading-[1.05] uppercase rise`}>
            Someone places a call.
            <br />
            She <em className="text-rose normal-case">receives</em> a moment.
          </h2>
          <div data-strip className="mt-20 flex items-start justify-center gap-4 md:gap-6">
            {strip.map((s) => (
              <div key={s.src} className={`relative shrink-0 overflow-hidden ${s.box}`}>
                <Image src={s.src} alt="" fill sizes="(min-width: 768px) 24vw, 48vw" className="object-cover" />
              </div>
            ))}
          </div>
          <ol aria-label="How it works" className={`${wrap} mt-24 grid gap-12 text-center md:grid-cols-3 md:gap-16`}>
            {steps.map((step) => (
              <li key={step.title} className="rise">
                <h3 className="text-2xl">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-base leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="From brunch to after dark" className="relative grid md:h-[calc(100svh-5rem)] md:min-h-[600px] md:grid-cols-2">
          <div className="flex flex-col items-center bg-white px-6 pt-16 pb-14 text-center md:justify-center md:pt-0 md:pb-24">
            <div className="relative aspect-[4/5] w-full max-w-[17rem] md:h-[min(50svh,28rem)] md:w-auto md:max-w-none">
              <Image src="/images/turn/day-rose-slip.webp" alt="A woman laughs over a coffee cup in The Slip Dress in Rose" fill sizes="(min-width: 768px) 23rem, 17rem" className="object-cover" />
            </div>
            <h2 className="mt-8 text-[clamp(2rem,2.8vw,2.75rem)] leading-[1.04] rise">
              Cute enough to open at <em className="text-rose">brunch.</em>
            </h2>
            <Link href="/shop/the-slip-dress?colorway=rose" className="label mt-3 flex min-h-11 items-center text-xs text-muted hover:text-ink">
              The Slip Dress · Rose
            </Link>
          </div>
          <div data-nav="dark" className="flex flex-col items-center bg-ink px-6 pt-16 pb-32 text-center text-cream md:justify-center md:pt-0 md:pb-24">
            <div className="relative aspect-[4/5] w-full max-w-[17rem] md:h-[min(50svh,28rem)] md:w-auto md:max-w-none">
              <Image src="/images/turn/night-after-dark.webp" alt="A woman looks back over her shoulder in The Slip Dress in After Dark" fill sizes="(min-width: 768px) 23rem, 17rem" className="object-cover" />
            </div>
            <h2 className="mt-8 text-[clamp(2rem,2.8vw,2.75rem)] leading-[1.04] rise">
              Irresistible enough to wear <em className="text-pink">that night.</em>
            </h2>
            <Link href="/shop/the-slip-dress?colorway=after-dark" className="label mt-3 flex min-h-11 items-center text-xs text-cream/80 hover:text-cream">
              The Slip Dress · After Dark
            </Link>
            <Link href="/shop" className="cta absolute bottom-12 left-1/2 -translate-x-1/2 border-pink bg-pink text-ink [--cta-fill:var(--color-cream)] md:bottom-14">
              Shop the collection
            </Link>
          </div>
        </section>

        <section aria-labelledby="pieces-title" className="bg-cream py-28 md:py-40">
          <div className={`${wrap} grid gap-x-8 gap-y-12 md:grid-cols-12`}>
            <h2 id="pieces-title" className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] rise md:col-span-6 md:col-start-7 md:row-start-1">
              The <em className="text-rose">pieces</em>
            </h2>
            <div className="md:col-span-6 md:col-start-1 md:row-span-3 md:row-start-1">
              <PieceCard product={products[0]} large />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:col-span-6 md:col-start-7 md:row-start-2">
              <PieceCard product={products[1]} />
              <PieceCard product={products[2]} />
            </div>
            <div className="md:col-span-6 md:col-start-7 md:row-start-3">
              <Link href="/shop" className="cta">
                View all pieces
              </Link>
            </div>
          </div>
        </section>

        <section id="waitlist" className="relative bg-blush">
          <div className="relative h-[52svh] md:absolute md:inset-0 md:h-auto">
            <Image src="/images/close/blue-romper-banner.webp" alt="A woman in The Romper in Powder Blue sits on a stone block" fill sizes="100vw" style={{ objectPosition: "80% 0%" }} className="object-cover" />
          </div>
          <div className={`${wrap} relative py-16 md:flex md:h-[64svh] md:max-h-[720px] md:min-h-[540px] md:items-center md:py-0`}>
            <div className="max-w-lg md:max-w-[min(30rem,42%)] rise">
              <h2 className="text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[1.02] text-ink">
                Be first to receive a Boujie <em>Call.</em>
              </h2>
              <p className="mt-5 font-serif text-xl text-ink/80 italic md:text-2xl">The call is coming. Are you going to pick up?</p>
              <p className="mt-6 mb-4 max-w-sm text-base leading-relaxed text-ink/75">Join the waitlist for early access and the launch date.</p>
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
