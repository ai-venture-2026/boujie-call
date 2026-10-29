import type { Metadata } from "next";
import Image from "next/image";
import { ClosingBanner } from "@/components/closing-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WaitlistForm } from "@/components/waitlist-form";
import { boxContents, callSteps, formatPrice, tiers } from "@/lib/content";

export const metadata: Metadata = {
  title: "Send a Call | Boujie Call",
  description: "Place your Boujie Call. The gift experience that lets you say everything without saying a word.",
};

const wrap = "mx-auto max-w-7xl px-6 md:px-12";

export default function SendACall() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative flex flex-col md:grid md:h-[calc(100svh-5rem)] md:min-h-[600px] md:grid-cols-[38fr_62fr]">
          <div className="relative h-[calc(100svh-4.75rem)] min-h-[560px] md:order-2 md:h-auto md:min-h-0">
            <Image src="/images/send-a-call/hero-rose-slip.webp" alt="A woman in a pale pink slip with lace trim leans on a taupe wall, arms raised" fill priority sizes="(min-width: 768px) 62vw, 100vw" style={{ objectPosition: "70% 25%" }} className="object-cover" />
          </div>
          <div className="flex flex-col items-start justify-center px-6 py-14 md:order-1 md:bg-white max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:z-10 max-md:bg-linear-to-t max-md:from-ink/90 max-md:via-ink/60 max-md:to-transparent max-md:pt-40 max-md:pb-10 max-md:text-cream md:px-12 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
            <p className="label">Send a Call</p>
            <h1 className="mt-6 text-[clamp(2.75rem,4vw,4.75rem)] leading-[1.02]">
              Place your Boujie <em className="text-rose max-md:text-pink">Call.</em>
            </h1>
            <p className="mt-6 max-w-sm text-base leading-relaxed md:text-lg">The gift experience that lets you say everything without saying a word.</p>
            <a href="#waitlist" className="cta mt-8 md:mt-10">
              Join the waitlist
            </a>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-40">
          <div className={wrap}>
            <h2 className="max-w-2xl text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] rise">
              Four steps. One <em className="text-rose">unforgettable</em> moment.
            </h2>
            <ol aria-label="How a Call works" className="mt-10 grid grid-cols-2 gap-x-4 border-t-[0.5px] border-rose/25 md:mt-16 md:grid-cols-4 md:gap-x-0 md:divide-x-[0.5px] md:divide-rose/25">
              {callSteps.map((step, i) => (
                <li key={step.title} className="border-b-[0.5px] border-rose/25 py-6 rise md:border-b-0 md:px-8 md:py-10 md:first:pl-0 md:last:pr-0">
                  <span className="label text-rose">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 text-2xl">{step.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{step.body}</p>
                </li>
              ))}
            </ol>
            <p className="mt-10 font-serif text-2xl italic rise md:mt-14">You only need her first name and number. We handle the rest, beautifully.</p>
          </div>
        </section>

        <section className="grid md:grid-cols-2">
          <div className="relative hidden md:block md:min-h-[60svh]">
            <Image src="/images/details/brown-romper-lace.webp" alt="A close-up of the brown lace neckline of The Romper in Mocha" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="bg-stone px-6 py-14 md:px-16 md:py-28">
            <h2 className="text-[clamp(2.25rem,3.8vw,3.75rem)] leading-[1.04] rise">
              Inside every Boujie <em className="text-rose">Call</em>
            </h2>
            <ul aria-label="Inside every Boujie Call" className="mt-12 border-t-[0.5px] border-ink/15">
              {boxContents.map((item) => (
                <li key={item.name} className="grid gap-1 border-b-[0.5px] border-ink/15 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 md:py-6">
                  <span className="font-serif text-xl">{item.name}</span>
                  <span className="text-base leading-relaxed text-muted">{item.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-40">
          <div className={wrap}>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] rise">
                Three tiers. One <em className="text-rose">vibe.</em>
              </h2>
              <p className="label max-w-xs text-muted md:text-right">A first look. Contents and prices are confirmed at launch.</p>
            </div>
            <div className="mt-10 grid border-t-[0.5px] border-rose/25 md:mt-16 md:grid-cols-3 md:divide-x-[0.5px] md:divide-rose/25">
              {tiers.map((tier) => (
                <article key={tier.name} className="border-b-[0.5px] border-rose/25 py-6 rise md:border-b-0 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
                  <h3 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05]">{tier.name}</h3>
                  <p className="mt-3 max-w-xs text-base leading-relaxed text-muted md:mt-5">{tier.contents}</p>
                  <p className="mt-4 font-serif text-lg text-rose italic md:mt-10">{formatPrice(tier.priceCents)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ClosingBanner
          id="waitlist"
          tone="ink"
          photo="/images/close/mocha-romper-banner.webp"
          alt="A woman in The Romper in Mocha smiles down at a black gift box tied in pink ribbon"
          focus="78% 20%"
          title={
            <>
              The call is coming. Are you going to <em className="text-pink">pick up?</em>
            </>
          }
          line="Be first when Send a Call opens."
        >
          <WaitlistForm tone="dark" />
        </ClosingBanner>
      </main>
      <SiteFooter />
    </>
  );
}
