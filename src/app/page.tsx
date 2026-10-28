import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { HeroCarousel } from "@/components/hero-carousel";
import { WaitlistForm } from "@/components/waitlist-form";
import { socials, steps } from "@/lib/content";
import { getProduct } from "@/lib/products";

const wrap = "mx-auto max-w-7xl px-6 md:px-12";
const romper = getProduct("the-romper");

const strip = [
  { src: "/images/details/pink-slip-hem.webp", focus: "50% 50%", box: "mt-28 aspect-[4/3] w-[44vw] md:w-[20vw]" },
  { src: "/images/hero/blue-romper-studio.webp", focus: "40% 60%", box: "aspect-[3/4] w-[36vw] md:w-[18vw]" },
  { src: "/images/details/black-slip-lace.webp", focus: "50% 50%", box: "mt-16 aspect-square w-[30vw] md:w-[15vw]" },
  { src: "/images/hero/pink-slip-studio.webp", focus: "50% 30%", box: "mt-6 aspect-[4/5] w-[48vw] md:w-[24vw]" },
  { src: "/images/hero/black-slip-studio.webp", focus: "48% 40%", box: "mt-32 aspect-[4/3] w-[44vw] md:w-[20vw]" },
];

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

        <section id="detail" className="grid md:min-h-[88svh] md:grid-cols-2">
          <div className="flex flex-col items-center justify-center bg-stone px-6 py-20 md:px-12">
            <div className="relative aspect-[3/4] w-full max-w-sm">
              <Image src="/images/products/the-romper-mocha.webp" alt="The Romper in Mocha" fill sizes="(min-width: 768px) 30vw, 80vw" className="object-contain mix-blend-multiply" />
            </div>
            <div className="mt-10 w-full max-w-sm rise">
              <p className="label">The Romper · Mocha</p>
              <p className="mt-4 text-base leading-relaxed text-muted">{romper?.description}</p>
              <Link href="/shop/the-romper" className="cta mt-8">
                Discover the piece
              </Link>
            </div>
          </div>
          <div className="relative min-h-[70svh] md:min-h-0">
            <Image src="/images/details/brown-romper-lace.webp" alt="A close-up of the brown lace neckline of The Romper in Mocha" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
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
                <Image src={s.src} alt="" fill sizes="(min-width: 768px) 24vw, 48vw" style={{ objectPosition: s.focus }} className="object-cover" />
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

        <section aria-label="From brunch to after dark">
          <div className="py-24 md:py-32">
            <h2 className={`${wrap} text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04] rise`}>
              Cute enough to open at <em className="text-rose">brunch.</em>
            </h2>
          </div>
          <div data-nav="dark" className="bg-ink py-24 text-blush md:py-32">
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

        <section id="waitlist" className="bg-blush py-28 md:py-40">
          <div className={`${wrap} grid gap-20 md:grid-cols-12 md:gap-x-16`}>
            <div className="md:col-span-7 rise">
              <h2 className="text-[clamp(2.25rem,4.4vw,4.25rem)] leading-[1.04]">
                Be first to receive a Boujie <em className="text-rose">Call.</em>
              </h2>
              <p className="label mt-6 mb-12 text-muted">Join the waitlist for early access.</p>
              <WaitlistForm />
            </div>
            <div className="md:col-span-4 md:col-start-9 md:self-end rise">
              <h2 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.1]">
                Catch us before we <em className="text-rose">drop.</em>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted">Follow for behind-the-scenes, unboxings, and the launch date.</p>
              <ul className="mt-8 flex flex-col gap-5">
                {socials.map((s) => (
                  <li key={s.label} className="label flex items-center gap-4 border-b-[0.5px] border-rose/25 pb-4 text-muted">
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
            <p className="font-serif text-2xl italic text-rose md:col-span-12 md:mt-6 md:text-3xl rise">
              The call is coming. Are you going to pick up?
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
