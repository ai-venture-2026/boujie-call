"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { heroSlides } from "@/lib/content";
import { productHref } from "@/lib/products";

const INTERVAL = 5000;

const onPageLoad = (done: () => void) => {
  window.addEventListener("load", done);
  return () => window.removeEventListener("load", done);
};

export function HeroCarousel({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[index];
  const running = !paused;
  // Hidden slides sit in the viewport, so lazy loading would fetch them with the first; wait for the page load, and only then start advancing.
  const loaded = useSyncExternalStore(onPageLoad, () => document.readyState === "complete", () => false);

  useEffect(() => {
    if (!running || !loaded || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % heroSlides.length), INTERVAL);
    return () => clearInterval(id);
  }, [running, loaded]);

  return (
    <section
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      data-nav="dark"
      className="relative flex flex-col bg-ribbon text-blush md:grid md:h-[calc(100svh-7rem)] md:min-h-[600px] md:grid-cols-[38fr_62fr]"
    >
      <div className="relative h-[calc(100svh-6.75rem)] min-h-[560px] overflow-hidden md:order-2 md:h-auto md:min-h-0">
        {heroSlides.map((s, i) => (
          <div
            key={s.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${heroSlides.length}`}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out motion-reduce:transition-none ${i === index ? "opacity-100" : "opacity-0"}`}
          >
            {(i === 0 || i === index || loaded) && (
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 62vw, 150vh"
                style={{ objectPosition: s.focus }}
                className={`object-cover transition-transform duration-[9000ms] ease-out motion-reduce:transition-none ${i === index ? "scale-100" : "scale-[1.04]"}`}
              />
            )}
          </div>
        ))}
      </div>

      <div data-hero-words className="flex flex-col justify-between px-6 pt-10 pb-4 max-md:absolute max-md:inset-x-0 max-md:bottom-0 max-md:z-20 max-md:bg-[linear-gradient(to_top,color-mix(in_srgb,var(--color-ribbon)_90%,transparent),color-mix(in_srgb,var(--color-ribbon)_75%,transparent)_calc(100%-10rem),transparent)] max-md:pt-40 md:order-1 md:bg-ribbon md:px-12 md:pt-12 md:pb-8 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
        <div className="flex flex-1 flex-col items-start justify-center">{children}</div>
        <div className="mt-6 flex items-center justify-between gap-4 md:mt-0">
          <Link href={productHref(slide.slug, slide.colorway)} className="label flex min-h-11 min-w-0 items-center text-blush/75 hover:text-blush md:whitespace-nowrap">
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
                <span aria-hidden="true" className="absolute inset-x-1 top-1/2 h-px bg-blush/30" />
                {i === index && (
                  <span
                    key={`${index}-${running}`}
                    aria-hidden="true"
                    className={`absolute inset-x-1 top-1/2 h-px origin-left bg-pink ${running ? "motion-safe:animate-[progress_5s_linear]" : ""}`}
                  />
                )}
              </button>
            ))}
            <button type="button" aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((p) => !p)} className="ml-1 grid size-11 place-items-center text-blush/75 hover:text-blush">
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
