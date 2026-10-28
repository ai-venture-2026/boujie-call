import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { formatPrice, socials, steps, tiers } from "@/lib/content";

const wrap = "mx-auto max-w-7xl px-6 md:px-12";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className={`${wrap} grid items-end gap-12 pt-12 pb-28 md:grid-cols-12 md:pt-20`}>
          <div className="md:col-span-7">
            <h1 className="text-6xl md:text-8xl">The gift that makes her feel like the moment.</h1>
            <p className="mt-8 font-serif text-2xl italic text-muted md:text-3xl">
              Luxury nightwear gift sets. Curated. Personalized. Unforgettable.
            </p>
            <div className="mt-12 flex flex-wrap items-center gap-8">
              <a href="#join" className="btn">
                Join the waitlist
              </a>
              <a href="#how" className="link">
                How it works
              </a>
            </div>
          </div>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[16px] bg-blush md:col-span-5">
            <figcaption className="absolute bottom-6 left-6 font-serif italic text-muted">Gift box photography to come</figcaption>
          </figure>
        </section>

        <section id="how" className={`${wrap} grid gap-12 border-t border-card-border py-28 md:grid-cols-12`}>
          <h2 className="self-start text-5xl md:sticky md:top-12 md:col-span-5 md:text-6xl">
            Someone places a call. She receives a moment.
          </h2>
          <div className="md:col-span-6 md:col-start-7">
            <ol aria-label="How it works">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-8 border-b border-card-border py-10 first:pt-0">
                  <span className="font-serif text-3xl text-muted">{i + 1}</span>
                  <div>
                    <h3 className="text-3xl">{step.title}</h3>
                    <p className="mt-3 max-w-md leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-12 font-serif text-2xl italic">
              Cute enough to open at brunch. Irresistible enough to wear that night.
            </p>
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

        <section id="join" className={`${wrap} py-32`}>
          <h2 className="max-w-3xl text-5xl md:text-7xl">Be first to receive a Boujie Call.</h2>
          <p className="mt-6 mb-10 text-muted">Join the list for early access.</p>
          <WaitlistForm />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
