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
            <div className="drift relative ml-auto w-[86%] md:col-start-6 md:col-end-13 md:row-start-1 md:w-full">
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
            <Marker n={2} className="absolute top-0 right-6 hidden md:block text-muted md:right-12" />
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

        <section id="boxes" className="text-blush">
          <div className="bg-[#2a1a24] pt-28 md:pt-40">
            <div className={`${wrap} relative`}>
              <Marker n={3} className="absolute top-0 right-6 hidden md:block text-muted-dark md:right-12" />
              <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] rise">
                Three tiers. One <em className="text-pink">vibe.</em>
              </h2>
              <p className="label mt-6 text-muted-dark rise">A first look. Contents and prices are confirmed at launch.</p>
            </div>
          </div>
          {tiers.map((tier, i) => (
            <div key={tier.name} className={["bg-[#2a1a24]", "bg-ribbon", "bg-ink"][i]}>
              <article className={`${wrap} grid items-center gap-10 py-20 md:grid-cols-12 md:gap-x-10 md:py-28`}>
                <div className={`drift ${i % 2 ? "md:col-start-7 md:col-end-13 md:row-start-1" : "md:col-start-1 md:col-end-7"} ${i === 1 ? "md:mt-24" : ""}`}>
                  <ImageSlot alt={tier.name} tone="night" className="unveil" />
                </div>
                <div className={`rise ${i % 2 ? "md:col-start-2 md:col-end-6 md:row-start-1" : "md:col-start-8 md:col-end-12"}`}>
                  <span aria-hidden="true" className="text-pink">
                    ✦
                  </span>
                  <h3 className="mt-4 text-[clamp(2.25rem,4vw,3.75rem)] leading-none">{tier.name}</h3>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-dark">{tier.contents}</p>
                  <p className="mt-8 font-serif text-xl italic">{formatPrice(tier.priceCents)}</p>
                </div>
              </article>
            </div>
          ))}
        </section>

        <section className="bg-ink py-28 text-blush md:py-40">
          <div className={`${wrap} relative grid gap-14 md:grid-cols-12`}>
            <Marker n={4} className="absolute top-0 right-6 hidden md:block text-muted-dark md:right-12" />
            <div className="md:col-span-7 rise">
              <h2 className="text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98]">
                Catch us before we <em className="text-pink">drop.</em>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-dark">Follow for behind-the-scenes, unboxings, and the launch date.</p>
            </div>
            <ul className="flex flex-col gap-6 self-end md:col-span-4 md:col-start-9 rise">
              {socials.map((s) => (
                <li key={s.label} className="label flex items-center gap-4 border-b-[0.5px] border-blush/25 pb-4 text-muted-dark">
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1">
                    {s.label === "Instagram" ? <><rect x="2" y="2" width="12" height="12" rx="3.5" /><circle cx="8" cy="8" r="2.75" /></> : <path d="M9.5 2v8.25a2.25 2.25 0 1 1-2.25-2.25M9.5 2c.3 1.8 1.6 3 3.5 3.1" />}
                  </svg>
                  {s.url ? (
                    <a href={s.url} className="text-blush hover:text-pink">
                      Follow on {s.label}
                    </a>
                  ) : (
                    `${s.label}, link to come`
                  )}
                </li>
              ))}
            </ul>
            <p className="font-serif text-2xl italic text-pink md:col-span-12 md:mt-10 md:text-3xl rise">The call is coming. Are you going to pick up?</p>
          </div>
        </section>

        <section id="waitlist" className="bg-ribbon py-32 text-blush md:py-44">
          <div className={`${wrap} max-w-4xl! text-center`}>
            <h2 className="text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.02] rise">
              Be first to receive a Boujie <em className="text-pink">Call.</em>
            </h2>
            <p className="label mt-6 mb-14 text-muted-dark rise">Join the waitlist for early access.</p>
            <WaitlistForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
