import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
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
        <section aria-labelledby="hero-title" className="relative mx-auto max-w-[96rem] px-6 pt-8 pb-24 md:px-12 md:pt-14 md:pb-36">
          <div className="grid md:grid-cols-12">
            <div className="relative ml-auto w-[86%] md:col-start-6 md:col-end-13 md:row-start-1 md:w-full">
              <Marker n={1} className="absolute top-0 -left-12 hidden text-muted md:block" />
              <ImageSlot alt="Boujie Call gift box" className="unveil md:min-h-[96vh]" />
            </div>
            <div className="relative z-10 -mt-24 md:col-start-1 md:col-end-10 md:row-start-1 md:mt-0 md:self-center">
              <p className="label text-muted rise">BOUJIE CALL ✦ LUXURY NIGHTWEAR GIFTS</p>
              <h1 id="hero-title" className="mt-6 text-[clamp(2.75rem,7.4vw,8.5rem)] md:max-w-[44rem] leading-[0.95] rise">
                The gift that makes her <em>feel</em> like the <em>moment.</em>
              </h1>
              <p className="mt-8 max-w-md font-serif text-2xl italic text-muted rise">
                Luxury nightwear gift sets. Curated. Personalized. Unforgettable.
              </p>
              <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:gap-10 rise">
                <a href="#waitlist" className="pill w-full sm:w-auto">
                  Join the waitlist
                </a>
                <a href="#how" className="link label">
                  How it works →
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="how" className="relative overflow-hidden bg-blush py-28 md:py-40">
          <div className={`${wrap} relative`}>
            <Marker n={2} className="absolute top-0 right-6 text-muted md:right-12" />
            <p aria-hidden="true" className="vertical absolute top-48 right-2 hidden font-serif text-8xl font-light tracking-[0.2em] text-card-border lg:block">
              PICK UP
            </p>
            <h2 className="max-w-3xl text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] rise">
              Someone places a call. She <em>receives</em> a moment.
            </h2>
            <ol aria-label="How it works" className="mt-20 grid gap-16 md:grid-cols-12 md:gap-x-10 lg:pr-24">
              {steps.map((step, i) => (
                <li key={step.title} className={["md:col-span-4", "md:col-span-4 md:mt-48", "md:col-span-3 md:col-start-10 md:mt-20"][i]}>
                  {i === 1 && <ImageSlot alt="A Boujie Call arriving" className="mb-10 unveil" />}
                  <span className="font-serif text-6xl font-light italic text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-3xl">{step.title}</h3>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-label="From brunch to after dark">
          <div className="py-28 md:py-44">
            <h2 className={`${wrap} text-[clamp(3rem,9vw,9.5rem)] leading-[0.92] rise`}>
              Cute enough to open at <em>brunch.</em>
            </h2>
          </div>
          <div className="bg-ink py-28 text-blush nightfall md:py-44">
            <h2 className={`${wrap} text-right text-[clamp(3rem,9vw,9.5rem)] leading-[0.92] rise`}>
              Irresistible enough to wear <em className="text-pink">that night.</em>
            </h2>
          </div>
        </section>

        <section id="boxes" className="bg-blush py-28">
          <div className={wrap}>
            <h2 className="text-5xl md:text-6xl">Three tiers. One vibe.</h2>
            <p className="mt-4 text-muted">A first look. Contents and prices are confirmed at launch.</p>
            <div className="mt-16 grid gap-6 md:grid-cols-3 md:items-start">
              {tiers.map((tier, i) => {
                const featured = i === 1;
                return (
                  <article
                    key={tier.name}
                    className={`rounded-[16px] border-[0.5px] p-10 ${featured ? "border-ink bg-ink text-blush md:py-14" : "border-card-border bg-card md:mt-12"}`}
                  >
                    <h3 className="text-3xl">{tier.name}</h3>
                    <p className={`mt-4 leading-relaxed ${featured ? "text-muted-dark" : "text-muted"}`}>{tier.contents}</p>
                    <p className="mt-10 font-serif text-xl">{formatPrice(tier.priceCents)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-ink py-28 text-blush">
          <div className={`${wrap} grid gap-12 md:grid-cols-2 md:items-end`}>
            <div>
              <h2 className="text-5xl md:text-7xl">Catch us before we drop.</h2>
              <p className="mt-6 max-w-md leading-relaxed text-muted-dark">
                Follow for behind-the-scenes, unboxings, and the launch date.
              </p>
            </div>
            <ul className="flex flex-wrap gap-4 md:justify-end">
              {socials.map((s) => (
                <li key={s.label}>
                  {s.url ? (
                    <a href={s.url} className="inline-block rounded-full border border-blush px-8 py-4 hover:bg-blush hover:text-ink">
                      Follow on {s.label}
                    </a>
                  ) : (
                    <span className="inline-block rounded-full border border-muted-dark/40 px-8 py-4 text-muted-dark">
                      {s.label}, link to come
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="font-serif text-2xl italic text-pink md:col-span-2">The call is coming. Are you going to pick up?</p>
          </div>
        </section>

        <section id="waitlist" className={`${wrap} py-32`}>
          <h2 className="max-w-3xl text-5xl md:text-7xl">Be first to receive a Boujie Call.</h2>
          <p className="mt-6 mb-10 text-muted">Join the waitlist for early access.</p>
          <WaitlistForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
