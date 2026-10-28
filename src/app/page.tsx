import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HeroCarousel } from "@/components/hero-carousel";
import { ImageSlot } from "@/components/image-slot";
import { Marker } from "@/components/marker";
import { WaitlistForm } from "@/components/waitlist-form";
import { formatPrice, socials, steps, tiers } from "@/lib/content";

const wrap = "mx-auto max-w-7xl px-6 md:px-12";

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <main>
        <HeroCarousel>
          <p className="label">BOUJIE CALL ✦ LUXURY NIGHTWEAR GIFTS</p>
          <h1 id="hero-title" className="mt-6 max-w-[15ch] text-[clamp(2.25rem,3.6vw,3.75rem)] leading-[1.04]">
            The gift that makes her <em>feel</em> like the <em>moment.</em>
          </h1>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">Luxury nightwear gift sets. Curated. Personalized. Unforgettable.</p>
          <a href="#waitlist" className="label group mt-10 inline-flex min-h-11 items-center gap-4 self-start">
            Join the waitlist
            <span aria-hidden="true" className="h-px w-14 bg-current transition-all duration-500 group-hover:w-24" />
          </a>
        </HeroCarousel>

        <section id="how" className="bg-cream py-28 md:py-40">
          <div className={`${wrap} grid gap-14 md:grid-cols-12 md:items-center md:gap-x-16`}>
            <div className="md:col-span-5">
              <ImageSlot alt="Hands untying the ribbon on a Boujie Call gift box" className="unveil" />
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <p className="label text-muted rise">How it works</p>
              <h2 className="mt-6 max-w-md text-[clamp(2rem,3.2vw,3.25rem)] leading-[1.06] rise">
                Someone places a call. She <em>receives</em> a moment.
              </h2>
              <ol aria-label="How it works" className="mt-14 border-t-[0.5px] border-ink/15">
                {steps.map((step, i) => (
                  <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-x-6 border-b-[0.5px] border-ink/15 py-7 rise">
                    <span className="label pt-2 text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-2xl">{step.title}</h3>
                      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section aria-label="From brunch to after dark">
          <div className="py-28 md:py-44">
            <h2 className={`${wrap} text-[clamp(3rem,9vw,9.5rem)] leading-[0.92] rise`}>
              Cute enough to open at <em>brunch.</em>
            </h2>
          </div>
          <div className="bg-ink py-28 text-blush nightfall md:py-44">
            <div className={`${wrap} grid items-end gap-12 md:grid-cols-12`}>
              <ImageSlot src="/images/products/the-romper-after-dark.webp" alt="The Romper in After Dark" ground="cream" className="drift w-3/4 max-w-sm md:col-span-4 md:w-full" />
              <h2 className="text-right text-[clamp(3rem,9vw,9.5rem)] leading-[0.92] rise md:col-span-8">
                Irresistible enough to wear <em className="text-pink">that night.</em>
              </h2>
            </div>
          </div>
        </section>

        <section id="boxes">
          <div className="pt-28 md:pt-40">
            <div className={`${wrap} relative`}>
              <Marker n={3} className="absolute top-0 right-6 hidden md:block text-muted md:right-12" />
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] rise">
                Three tiers. One <em>vibe.</em>
              </h2>
              <p className="label mt-6 text-muted rise">A first look. Contents and prices are confirmed at launch.</p>
            </div>
          </div>
          {tiers.map((tier, i) => (
            <div key={tier.name} className={["bg-cream", "bg-card", "bg-blush"][i]}>
              <article className={`${wrap} grid items-center gap-10 py-20 md:grid-cols-12 md:gap-x-10 md:py-28`}>
                <div className={`drift ${i % 2 ? "md:col-start-7 md:col-end-13 md:row-start-1" : "md:col-start-1 md:col-end-7"} ${i === 1 ? "md:mt-24" : ""}`}>
                  <ImageSlot alt={tier.name} className="unveil" />
                </div>
                <div className={`rise ${i % 2 ? "md:col-start-2 md:col-end-6 md:row-start-1" : "md:col-start-8 md:col-end-12"}`}>
                  <span aria-hidden="true" className="text-pink">
                    ✦
                  </span>
                  <h3 className="mt-4 text-[clamp(2.25rem,4vw,3.75rem)] leading-none">{tier.name}</h3>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">{tier.contents}</p>
                  <p className="mt-8 font-serif text-xl italic">{formatPrice(tier.priceCents)}</p>
                </div>
              </article>
            </div>
          ))}
        </section>

        <section className="bg-blush py-28 md:py-40">
          <div className={`${wrap} relative grid gap-14 md:grid-cols-12`}>
            <Marker n={4} className="absolute top-0 right-6 hidden md:block text-muted md:right-12" />
            <div className="md:col-span-7 rise">
              <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98]">
                Catch us before we <em>drop.</em>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">Follow for behind-the-scenes, unboxings, and the launch date.</p>
            </div>
            <ul className="flex flex-col gap-6 self-end md:col-span-4 md:col-start-9 rise">
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
            <p className="font-serif text-2xl italic md:col-span-12 md:mt-10 md:text-3xl rise">The call is coming. Are you going to pick up?</p>
          </div>
        </section>

        <section id="waitlist" className="bg-cream py-32 md:py-44">
          <div className={`${wrap} max-w-4xl! text-center`}>
            <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02] rise">
              Be first to receive a Boujie <em>Call.</em>
            </h2>
            <p className="label mt-6 mb-14 text-muted rise">Join the waitlist for early access.</p>
            <WaitlistForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
