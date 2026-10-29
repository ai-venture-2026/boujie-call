"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BAG_OPENED, bagCount, useBag } from "@/lib/bag";
import { pages, socials } from "@/lib/content";
import { OFFER } from "@/lib/products";
import { MiniBag } from "./mini-bag";

export function Logo({ tone, className }: { tone: "ink" | "pink"; className: string }) {
  return <Image src={`/boujie-call-logo-${tone}.png`} alt="Boujie Call" width={960} height={342} className={`w-auto ${className}`} priority />;
}

export function SiteHeader() {
  const pathname = usePathname();
  const drawer = useRef<HTMLDialogElement>(null);
  const close = () => drawer.current?.close();
  const current = (href: string) => (pathname === href ? "page" : undefined);
  const count = bagCount(useBag());
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

  return (
    <header data-nav="dark" className="sticky top-0 z-40 border-b-[0.5px] border-blush/10 bg-ink text-blush">
      <p className="label bg-pink px-6 py-2 text-center text-[10px] text-ink">{OFFER}</p>
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-12">
        <Link href="/" aria-label="Boujie Call home" className="flex min-h-11 items-center">
          <Logo tone="pink" className="h-10 md:h-12" />
        </Link>

        <div className="hidden items-center gap-10 md:absolute md:inset-y-0 md:right-28 md:left-[38%] md:flex md:justify-center">
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
          <Link href="/shop" className="cta cta-primary min-h-10 px-6">
            Shop the collection
          </Link>
        </div>

        <div className="flex items-center gap-5">
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

          <button type="button" aria-label="Open menu" aria-haspopup="dialog" className="grid size-11 place-items-center md:hidden" onClick={() => drawer.current?.showModal()}>
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
        className="drawer m-0 h-dvh max-h-none w-full max-w-none bg-cream p-0 text-ink"
        onClick={(e) => e.target === drawer.current && close()}
      >
        <div className="flex h-full flex-col overflow-y-auto">
          <div className="flex items-center justify-between border-b-[0.5px] border-ink/10 px-6 py-4">
            <Link href="/" aria-label="Boujie Call home" onClick={close}>
              <Logo tone="ink" className="h-10" />
            </Link>
            <button type="button" aria-label="Close menu" className="grid size-11 place-items-center" onClick={close}>
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 28 28" stroke="currentColor" strokeWidth="1.25">
                <path d="M7 7l14 14M21 7L7 21" />
              </svg>
            </button>
          </div>
          <nav aria-label="Menu" className="px-6">
            <ul>
              {pages.map((p) => (
                <li key={p.href} className="border-b-[0.5px] border-ink/10">
                  <Link href={p.href} aria-current={current(p.href)} onClick={close} className="flex min-h-16 items-center justify-between font-serif text-3xl aria-[current=page]:text-rose aria-[current=page]:italic">
                    {p.label}
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M3 9h12M10 4l5 5-5 5" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Link href="/shop" onClick={close} className="relative mx-6 mt-8 block aspect-[16/10] shrink-0 overflow-hidden">
            <Image src="/images/hero/black-slip-studio.webp" alt="" fill sizes="100vw" style={{ objectPosition: "48% 30%" }} className="object-cover" />
            <span className="label absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/70 to-transparent px-4 pt-12 pb-4 text-cream">The collection</span>
          </Link>
          <div className="mt-auto px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <p className="label text-[10px] text-muted">{OFFER}</p>
            <Link href="/shop" onClick={close} className="cta cta-primary mt-4 w-full">
              Shop the collection
            </Link>
            <ul className="label mt-5 flex gap-6 text-[10px] text-muted">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} className="text-ink">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </header>
  );
}
