"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { bagCount, useBag } from "@/lib/bag";
import { pages } from "@/lib/content";

export function Logo({ tone, className }: { tone: "ink" | "pink"; className: string }) {
  return <Image src={`/boujie-call-logo-${tone}.png`} alt="Boujie Call" width={960} height={342} className={`w-auto ${className}`} priority />;
}

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const drawer = useRef<HTMLDialogElement>(null);
  const close = () => drawer.current?.close();
  const current = (href: string) => (pathname === href ? "page" : undefined);
  const count = bagCount(useBag());

  return (
    <header className={`sticky top-0 z-40 border-b-[0.5px] border-card-border bg-cream/95 backdrop-blur-sm ${overlay ? "header-overlay" : ""}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-12">
        <Link href="/" aria-label="Boujie Call home">
          <Logo tone="ink" className="h-10 md:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="label flex gap-9">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} aria-current={current(p.href)} className="underline-offset-8 hover:text-muted aria-[current=page]:underline aria-[current=page]:decoration-pink">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/bag" aria-label={`Your bag, ${count} ${count === 1 ? "piece" : "pieces"}`} className="relative grid size-11 place-items-center">
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M5 8h14l-1 12H6L5 8zM9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
            {count > 0 && (
              <span aria-hidden="true" className="absolute top-0.5 right-0 grid size-5 place-items-center rounded-full bg-pink text-[11px] font-medium text-ink">
                {count}
              </span>
            )}
          </Link>

          <Link href="/#waitlist" className="link label hidden md:inline">
            Join the waitlist
          </Link>

          <button type="button" aria-label="Open menu" aria-haspopup="dialog" className="md:hidden" onClick={() => drawer.current?.showModal()}>
            <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" stroke="currentColor" strokeWidth="1.25">
              <path d="M4 10h20M4 18h20" />
            </svg>
          </button>
        </div>
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
          <Link href="/#waitlist" onClick={close} className="pill mt-auto w-full">
            Join the waitlist
          </Link>
        </div>
      </dialog>
    </header>
  );
}
