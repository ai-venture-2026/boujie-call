"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { pages } from "@/lib/content";

export function Logo({ tone, className }: { tone: "ink" | "pink"; className: string }) {
  return <Image src={`/boujie-call-logo-${tone}.png`} alt="Boujie Call" width={960} height={342} className={`w-auto ${className}`} priority />;
}

export function SiteHeader() {
  const pathname = usePathname();
  const drawer = useRef<HTMLDialogElement>(null);
  const close = () => drawer.current?.close();
  const current = (href: string) => (pathname === href ? "page" : undefined);

  return (
    <header className="sticky top-0 z-40 border-b-[0.5px] border-card-border bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 md:px-12">
        <Link href="/" aria-label="Boujie Call home">
          <Logo tone="ink" className="h-10 md:h-12" />
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-10 text-sm">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} aria-current={current(p.href)} className="underline-offset-8 hover:text-muted aria-[current=page]:underline aria-[current=page]:decoration-pink">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/#waitlist" className="btn hidden px-6 py-3 text-sm md:inline-flex">
          Join the waitlist
        </Link>

        <button type="button" aria-label="Open menu" aria-haspopup="dialog" className="md:hidden" onClick={() => drawer.current?.showModal()}>
          <svg aria-hidden="true" width="28" height="28" viewBox="0 0 28 28" stroke="currentColor" strokeWidth="1.25">
            <path d="M4 10h20M4 18h20" />
          </svg>
        </button>
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
          <Link href="/#waitlist" onClick={close} className="btn mt-auto w-full">
            Join the waitlist
          </Link>
        </div>
      </dialog>
    </header>
  );
}
