"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { heroSlides } from "@/lib/content";

const INTERVAL = 7000;

export function HeroCarousel({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[index];
  const tone = slide.text === "cream" ? "md:text-cream" : "md:text-ink";

  useEffect(() => {
    if (paused || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section aria-labelledby="hero-title" aria-roledescription="carousel" className="relative">
      <div className="relative h-[72svh] overflow-hidden md:h-[calc(100svh-5rem)] md:min-h-[600px]">
        {heroSlides.map((s, i) => (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${heroSlides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{ objectPosition: s.focus }}
              className={`object-cover transition-transform duration-[9000ms] ease-out motion-reduce:transition-none ${i === index ? "scale-100" : "scale-[1.04]"}`}
            />
          </div>
        ))}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 hidden w-3/5 bg-linear-to-r to-transparent transition-colors duration-[1600ms] md:block ${slide.text === "cream" ? "from-ink/40" : "from-cream/50"}`}
        />
      </div>

      <div className={`transition-colors duration-[1600ms] md:pointer-events-none md:absolute md:inset-0 md:flex md:items-center ${tone}`}>
        <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-6 md:px-12 md:py-0">
          <div className="flex max-w-md flex-col md:pointer-events-auto">{children}</div>
        </div>
      </div>

      <div className={`label mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pb-10 text-[10px] transition-colors duration-[1600ms] md:absolute md:inset-x-0 md:bottom-0 md:px-12 md:pb-8 ${tone}`}>
        <Link href={`/shop/${slide.slug}`} className="flex min-h-11 items-center hover:opacity-70">
          {slide.piece} · {slide.colorway}
        </Link>
        <div className="flex items-center gap-6">
          <span>{`${String(index + 1).padStart(2, "0")} / ${String(heroSlides.length).padStart(2, "0")}`}</span>
          <button type="button" onClick={() => setPaused((p) => !p)} className="min-h-11 hover:opacity-70">
            {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
    </section>
  );
}
