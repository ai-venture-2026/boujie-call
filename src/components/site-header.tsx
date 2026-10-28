"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BAG_OPENED, bagCount, useBag } from "@/lib/bag";
import { pages } from "@/lib/content";
import { MiniBag } from "./mini-bag";

export function Logo({ tone, className }: { tone: "ink" | "pink"; className: string }) {
  return <Image src={`/boujie-call-logo-${tone}.png`} alt="Boujie Call" width={960} height={342} className={`w-auto ${className}`} priority />;
}

const onScroll = (l: () => void) => {
  window.addEventListener("scroll", l, { passive: true });
  window.addEventListener("resize", l);
  return () => {
    window.removeEventListener("scroll", l);
    window.removeEventListener("resize", l);
  };
};

function useScrolled() {
  return useSyncExternalStore(onScroll, () => window.scrollY > 8, () => false);
}

// True when a section marked data-nav="dark" sits under the header.
function useOverDark() {
  return useSyncExternalStore(
    onScroll,
    () => (document.elementsFromPoint?.(window.innerWidth / 2, 40) ?? []).some((el) => !el.closest("header") && el.closest("[data-nav=dark]")),
    () => false,
  );
}

// overlay: Home hero, where the left 38% is a white panel and the rest is photo.
export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const drawer = useRef<HTMLDialogElement>(null);
  const close = () => drawer.current?.close();
  const current = (href: string) => (pathname === href ? "page" : undefined);
  const count = bagCount(useBag());
  const scrolled = useScrolled();
  const dark = useOverDark();
  const clear = overlay && !scrolled;
  const onPhoto = clear ? "md:text-cream" : "";
  const [bagOpen, setBagOpen] = useState(false);
  const bagButton = useRef<HTMLButtonElement>(null);
  const bagPanel = useRef<HTMLDivElement>(null);
  const hovering = useRef(false);
  const autoClose = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeLater = () => {
    clearTimeout(autoClose.current);
    autoClose.current = setTimeout(() => {
      if (hovering.current) return;
      autoClose.current = undefined;
      setBagOpen(false);
    }, 3000);
  };

  useEffect(() => {
    const onAdded = () => {
      setBagOpen(true);
      closeLater();
    };
    window.addEventListener(BAG_OPENED, onAdded);
    return () => {
      window.removeEventListener(BAG_OPENED, onAdded);
      clearTimeout(autoClose.current);
    };
  }, []);

  useEffect(() => {
    if (!bagOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setBagOpen(false);
      bagButton.current?.focus();
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!bagButton.current?.contains(target) && !bagPanel.current?.contains(target)) setBagOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [bagOpen]);

  const glass = dark ? "border-cream/10 bg-ink/55 text-cream backdrop-blur-md" : "border-ink/10 bg-white/70 text-ink backdrop-blur-md";

  return (
    <header className={`sticky top-0 z-40 border-b-[0.5px] transition-colors duration-500 ${clear ? "border-ink/10 bg-white text-ink md:border-transparent md:bg-transparent" : glass}`}>
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-12">
        <Link href="/" aria-label="Boujie Call home">
          <Logo tone={dark && !clear ? "pink" : "ink"} className="h-10 md:h-12" />
        </Link>

        <div className={`hidden items-center gap-10 md:flex md:fixed md:top-0 md:right-28 md:left-[38%] md:h-20 md:justify-center ${onPhoto} transition-colors duration-500`}>
          <nav aria-label="Main">
            <ul className="label flex gap-9">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} aria-current={current(p.href)} className="underline-offset-8 hover:opacity-60 aria-[current=page]:underline aria-[current=page]:decoration-pink">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/shop" className="cta min-h-10 px-6">
            Shop the collection
          </Link>
        </div>

        <div className={`flex items-center gap-5 transition-colors duration-500 ${onPhoto}`}>
          <button
            ref={bagButton}
            type="button"
            aria-label={`Your bag, ${count} ${count === 1 ? "piece" : "pieces"}`}
            aria-expanded={bagOpen}
            aria-controls="mini-bag"
            onClick={() => {
              clearTimeout(autoClose.current);
              autoClose.current = undefined;
              setBagOpen(!bagOpen);
            }}
            className="relative grid size-11 place-items-center"
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span aria-hidden="true" className="absolute top-0.5 right-0 grid size-5 place-items-center rounded-full bg-pink text-[11px] font-medium text-ink">
                {count}
              </span>
            )}
          </button>

          <button type="button" aria-label="Open menu" aria-haspopup="dialog" className="md:hidden" onClick={() => drawer.current?.showModal()}>
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" stroke="currentColor" strokeWidth="1.25">
              <path d="M4 10h20M4 18h20" />
            </svg>
          </button>
        </div>
        {bagOpen && (
          <div ref={bagPanel} className="contents">
            <MiniBag
              id="mini-bag"
              onNavigate={() => setBagOpen(false)}
              onHover={(over) => {
                hovering.current = over;
                if (!over && autoClose.current) closeLater();
              }}
            />
          </div>
        )}
      </div>

      <dialog
        ref={drawer}
        aria-label="Menu"
        className="drawer ml-auto h-dvh max-h-none w-[85vw] max-w-sm bg-ink p-8 text-blush"
        onClick={(e) => e.target === drawer.current && close()}
      >
        <div className="flex h-full flex-col">
          <button type="button" aria-label="Close menu" className="self-end text-blush" onClick={close}>
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" stroke="currentColor" strokeWidth="1.25">
              <path d="M7 7l14 14M21 7L7 21" />
            </svg>
          </button>
          <nav aria-label="Menu" className="mt-12">
            <ul className="flex flex-col gap-6 font-serif text-4xl">
              {pages.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} aria-current={current(p.href)} onClick={close} className="hover:text-pink aria-[current=page]:text-pink">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/shop" onClick={close} className="cta mt-auto w-full border-blush text-blush hover:text-ink">
            Shop the collection
          </Link>
        </div>
      </dialog>
    </header>
  );
}
