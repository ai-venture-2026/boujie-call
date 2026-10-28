import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HeroCarousel } from "@/components/hero-carousel";
import { ImageSlot } from "@/components/image-slot";
import { WaitlistForm } from "@/components/waitlist-form";
import { formatPrice, socials, steps, tiers } from "@/lib/content";

const wrap = "mx-auto max-w-7xl px-6 md:px-12";

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <HeroCarousel>
          <p className="label">LUXURY NIGHTWEAR GIFTS</p>
          <h1 id="hero-title" className="mt-6 max-w-[14ch] text-[clamp(2.75rem,5.2vw,5.75rem)] leading-[1.02]">
            The gift that makes her <em>feel</em> like the <em>moment.</em>
          </h1>
          <p className="mt-6 max-w-sm text-base leading-relaxed md:text-lg">Luxury nightwear gift sets. Curated. Personalized. Unforgettable.</p>
          <Link href="/shop" className="cta mt-10">
            Shop the collection
          </Link>
        </HeroCarousel>

        <section id="how" className="bg-cream py-28 md:py-40">
          <div className={`${wrap} grid gap-14 md:grid-cols-12 md:items-center md:gap-x-16`}>
            <div className="md:col-span-5">
              <ImageSlot alt="Hands untying the ribbon on a Boujie Call gift box" className="unveil" />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <h2 className="mt-6 max-w-md text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.06] rise">
                Someone places a call. She <em>receives</em> a moment.
              </h2>
              <ol aria-label="How it works" className="mt-14 border-t-[0.5px] border-ink/15">
                {steps.map((step) => (
                  <li key={step.title} className="border-b-[0.5px] border-ink/15 py-7 rise">
                    <h3 className="text-2xl">{step.title}</h3>
                    <p className="mt-2 max-w-md text-base leading-relaxed text-muted">{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-label="From brunch to after dark">
          <div className="py-24 md:py-32">
            <h2 className={`${wrap} text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] rise`}>
              Cute enough to open at <em>brunch.</em>
            </h2>
          </div>
          <div className="bg-ink py-24 text-blush md:py-32">
            <div className={`${wrap} grid items-center gap-12 md:grid-cols-12 md:gap-x-16`}>
              <div className="relative aspect-[4/5] overflow-hidden md:col-span-5">
                <Image
                  src="/images/hero/mocha-romper.webp"
                  alt="A woman in The Romper in Mocha leans on a dresser in evening light"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  style={{ objectPosition: "64% 40%" }}
                  className="object-cover unveil"
                />
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <h2 className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] rise">
                  Irresistible enough to wear <em className="text-pink">that night.</em>
                </h2>
                <Link href="/shop/the-romper" className="label mt-10 inline-flex min-h-11 items-center text-xs text-muted-dark hover:text-blush">
                  The Romper · Mocha
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="boxes" className="bg-cream py-28 md:py-40">
          <div className={wrap}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] rise">
                Three tiers. One <em>vibe.</em>
              </h2>
              <p className="label max-w-xs text-muted rise md:text-right">A first look. Contents and prices are confirmed at launch.</p>
            </div>
            <div className="mt-16 grid border-t-[0.5px] border-ink/15 md:grid-cols-3 md:divide-x-[0.5px] md:divide-ink/15">
              {tiers.map((tier) => (
                <article key={tier.name} className="border-b-[0.5px] border-ink/15 py-10 rise md:border-b-0 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
                  <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05]">{tier.name}</h3>
                  <p className="mt-5 max-w-xs text-base leading-relaxed text-muted">{tier.contents}</p>
                  <p className="mt-10 font-serif text-lg italic">{formatPrice(tier.priceCents)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="waitlist" className="bg-cream py-28 md:py-40">
          <div className={`${wrap} grid gap-20 md:grid-cols-12 md:gap-x-16`}>
            <div className="md:col-span-7 rise">
              <h2 className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04]">
                Be first to receive a Boujie <em>Call.</em>
              </h2>
              <p className="label mt-6 mb-12 text-muted">Join the waitlist for early access.</p>
              <WaitlistForm />
            </div>
            <div className="md:col-span-4 md:col-start-9 md:self-end rise">
              <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1]">
                Catch us before we <em>drop.</em>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">Follow for behind-the-scenes, unboxings, and the launch date.</p>
              <ul className="mt-8 flex flex-col gap-5">
                {socials.map((s) => (
                  <li key={s.label} className="label flex items-center gap-4 border-b-[0.5px] border-ink/15 pb-4 text-muted">
                    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                      {s.label === "Instagram" ? <><rect x="2" y="2" width="12" height="12" rx="3.5" /><circle cx="8" cy="8" r="2.75" /></> : <path d="M9.5 2v8.25a2.25 2.25 0 1 1-2.25-2.25M9.5 2c.3 1.8 1.6 3 3.5 3.1" />}
                    </svg>
                    {s.url ? (
                      <a href={s.url} className="text-ink hover:text-muted">
                        Follow on {s.label}
                      </a>
                    ) : (
                      `${s.label}, link to come`
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <p className="font-serif text-2xl italic md:col-span-12 md:mt-6 md:text-3xl rise">
              The call is coming. Are you going to pick up?
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
