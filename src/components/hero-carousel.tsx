"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { heroSlides } from "@/lib/content";
import { setHeroTone } from "@/lib/hero-tone";

const INTERVAL = 7000;

export function HeroCarousel({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const slide = heroSlides[index];
  const onDark = slide.text === "cream";
  const tone = onDark ? "md:text-cream" : "md:text-ink";
  const running = !paused && !hovered;

  useEffect(() => {
    setHeroTone(slide.text);
    return () => setHeroTone("ink");
  }, [slide.text]);

  useEffect(() => {
    if (!running || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), INTERVAL);
    return () => clearInterval(id);
  }, [running]);

  return (
    <section
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      className="relative -mt-[72px] md:-mt-20"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[80svh] overflow-hidden md:h-svh md:min-h-[640px]">
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
          className={`pointer-events-none absolute inset-y-0 left-0 hidden w-2/3 bg-linear-to-r to-transparent transition-colors duration-[1600ms] md:block ${onDark ? "from-ink/60 via-ink/25" : "from-cream/80 via-cream/35"}`}
        />
      </div>

      <div data-tone={slide.text} className={`transition-colors duration-[1600ms] md:pointer-events-none md:absolute md:inset-0 md:flex md:items-center ${tone}`}>
        <div className="mx-auto w-full max-w-7xl px-6 pt-10 pb-6 md:px-12 md:pt-20 md:pb-0">
          <div className="flex max-w-xl flex-col items-start md:pointer-events-auto">{children}</div>
        </div>
      </div>

      <div className={`mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 pb-10 transition-colors duration-[1600ms] md:absolute md:inset-x-0 md:bottom-0 md:px-12 md:pb-6 ${tone}`}>
        <Link href={`/shop/${slide.slug}`} className="label flex min-h-11 items-center text-[10px] hover:opacity-70">
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
              className="relative h-11 w-9"
            >
              <span aria-hidden="true" className="absolute inset-x-1 top-1/2 h-px bg-current opacity-30" />
              {i === index && (
                <span
                  key={`${index}-${running}`}
                  aria-hidden="true"
                  className={`absolute inset-x-1 top-1/2 h-px origin-left bg-current ${running ? "motion-safe:animate-[progress_7s_linear]" : ""}`}
                />
              )}
            </button>
          ))}
          <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)} className="ml-2 grid size-11 place-items-center hover:opacity-70">
            <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
              {paused ? <path d="M2 1l7 4-7 4z" /> : <path d="M2 1h2v8H2zM6 1h2v8H6z" />}
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
