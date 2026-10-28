"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { heroSlides } from "@/lib/content";

const INTERVAL = 5000;

export function HeroCarousel({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[index];
  const running = !paused;

  useEffect(() => {
    if (!running || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), INTERVAL);
    return () => clearInterval(id);
  }, [running]);

  return (
    <section
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      className="flex flex-col md:-mt-20 md:grid md:h-svh md:min-h-[680px] md:grid-cols-[38fr_62fr]"
    >
      <div className="relative h-[70svh] overflow-hidden md:order-2 md:h-auto">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-40 bg-linear-to-b from-ink/50 to-transparent md:block" />
        {heroSlides.map((s, i) => (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${heroSlides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 768px) 62vw, 100vw"
              style={{ objectPosition: s.focus }}
              className={`object-cover transition-transform duration-[9000ms] ease-out motion-reduce:transition-none ${i === index ? "scale-100" : "scale-[1.04]"}`}
            />
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between bg-white px-6 pt-12 pb-8 md:order-1 md:px-12 md:pt-20 md:pb-8 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
        <div className="flex flex-1 flex-col items-start justify-center">{children}</div>
        <div className="mt-12 flex items-center justify-between gap-4 md:mt-0">
          <Link href={`/shop/${slide.slug}`} className="label flex min-h-11 min-w-0 items-center text-[10px] text-muted hover:text-ink md:whitespace-nowrap">
            {slide.piece} · {slide.colorway}
          </Link>
          <div className="flex items-center gap-1">
            {heroSlides.map((s, i) => (
              <button
                key={s.src}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === index}
                onClick={() => {
                  setIndex(i);
                  setPaused(true);
                }}
                className="relative h-11 w-6"
              >
                <span aria-hidden="true" className="absolute inset-x-1 top-1/2 h-px bg-ink/20" />
                {i === index && (
                  <span
                    key={`${index}-${running}`}
                    aria-hidden="true"
                    className={`absolute inset-x-1 top-1/2 h-px origin-left bg-rose ${running ? "motion-safe:animate-[progress_5s_linear]" : ""}`}
                  />
                )}
              </button>
            ))}
            <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)} className="ml-1 grid size-11 place-items-center text-muted hover:text-ink">
              <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                {paused ? <path d="M2 1l7 4-7 4z" /> : <path d="M2 1h2v8H2zM6 1h2v8H6z" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
