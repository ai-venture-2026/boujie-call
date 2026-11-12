import type { Metadata } from "next";
import Image from "next/image";
import { GiftButton } from "@/components/gift-button";
import { ClosingBanner } from "@/components/closing-banner";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About | Boujie Call",
  description: "Every girl deserves a Boujie Call. The story behind the luxury nightwear gift built for the moments worth celebrating.",
};

const wrap = "mx-auto max-w-7xl px-6 md:px-12";

const pillars = [
  { title: "Luxe without pretense", body: "High-end feel. Real-woman price." },
  { title: "Made for the moment", body: "Every box is curated to create a memory." },
  { title: "For her, by her", body: "Built by a woman who believes every girl deserves to feel boujie." },
];

export default function About() {
  return (
    <>
      <SiteHeader />
      <main>
        <section data-nav="dark" className="relative flex flex-col bg-ribbon text-blush md:grid md:h-[calc(100svh-7rem)] md:min-h-[600px] md:grid-cols-[38fr_62fr]">
          <div className="relative h-[calc(100svh-6.75rem)] min-h-[560px] md:order-2 md:h-auto md:min-h-0">
            <Image src="/images/about/hero-blue-romper.webp" alt="A woman in The Romper in Powder Blue relaxes in a floral armchair with a book" fill priority sizes="(min-width: 768px) 62vw, 150vh" style={{ objectPosition: "66% 35%" }} className="object-cover" />
          </div>
          <div className="flex flex-col items-start justify-center px-6 py-14 md:order-1 max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:z-10 max-md:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-ribbon)_90%,transparent),color-mix(in_srgb,var(--color-ribbon)_75%,transparent)_calc(100%-10rem),transparent)] max-md:pt-40 max-md:pb-10 md:px-12 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
            <p className="label text-blush/75 max-md:text-blush">About</p>
            <h1 className="mt-6 text-[clamp(2.75rem,4vw,4.75rem)] leading-[1.02]">
              Every girl deserves a Boujie <em className="text-pink">Call.</em>
            </h1>
            <p className="mt-6 max-w-sm font-serif text-xl text-blush italic md:text-2xl">We built this for the moments worth celebrating, and the ones you create yourself.</p>
          </div>
        </section>

        <section className="grid bg-cream md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-19 md:px-16 md:py-38">
            <p className="label text-rose">Our story</p>
            <h2 className="mt-6 text-[clamp(2.25rem,3.8vw,3.75rem)] leading-[1.04] rise">
              It started with a <em className="text-rose">feeling.</em>
            </h2>
            <div className="mt-10 max-w-md space-y-6 text-base leading-relaxed text-muted md:text-lg">
              <p>
                A Boujie Call isn&apos;t just a gift. It&apos;s a feeling. That moment when a beautifully wrapped box arrives and you already know: someone was thinking about you. We created
                Boujie Call so that feeling could be sent to anyone, anywhere, anytime.
              </p>
              <p>Whether it&apos;s from your person, your best friend, or yourself, a Boujie Call says: you deserve softness, luxury, and a moment that&apos;s completely yours.</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[60svh]">
            <Image src="/images/about/story-after-dark.webp" alt="A woman in black sits on a wooden floor by a sunlit window, looking out" fill sizes="(min-width: 768px) 50vw, 190vw" style={{ objectPosition: "72% 40%" }} className="object-cover" />
          </div>
        </section>

        <section className="bg-blush py-19 md:py-section-lg">
          <ul aria-label="What we stand for" className={`${wrap} grid border-t-[0.5px] border-card-border md:grid-cols-3 md:divide-x-[0.5px] md:divide-card-border`}>
            {pillars.map((p) => (
              <li key={p.title} className="border-b-[0.5px] border-card-border py-10 rise md:border-b-0 md:px-10 md:py-14 md:first:pl-0 md:last:pr-0">
                <h2 className="text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.05]">{p.title}</h2>
                <p className="mt-5 max-w-xs text-base leading-relaxed text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section data-nav="dark" className="bg-ribbon py-19 text-blush md:py-section-lg">
          <figure className={`${wrap} max-w-4xl text-center`}>
            <blockquote className="font-serif text-[clamp(1.75rem,3.2vw,3rem)] leading-[1.2] italic rise">
              &ldquo;I wanted to send something that felt truly special, not just flowers, not just a gift card. Something she would actually remember.&rdquo;
            </blockquote>
            <figcaption className="label mt-10 text-pink">Founder, Boujie Call</figcaption>
          </figure>
        </section>

        <ClosingBanner
          tone="light"
          photo="/images/banners/rose-dress-banner.webp"
          alt="A woman in a rose satin dress rests her hand on a gift box beside her"
          focus="76% 20%"
          title={
            <>
              Ready to place your first Boujie <em className="text-rose-deep">Call?</em>
            </>
          }
          line="Choose their gift and write your note. We handle the rest."
        >
          <GiftButton label="Send a Call" />
        </ClosingBanner>
      </main>
      <SiteFooter />
    </>
  );
}
