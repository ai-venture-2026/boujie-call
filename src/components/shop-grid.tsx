"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/content";
import { colorwaySlug, products } from "@/lib/products";

const cards = products.flatMap((p) => p.colorways.map((c) => ({ product: p, colorway: c })));
const colours = [...new Set(cards.map((c) => c.colorway.name))];

const featured = [
  { slug: "the-slip-dress", name: "The Slip Dress", colorway: "After Dark", src: "/images/hero/black-slip-studio.webp", focus: "48% 40%" },
  { slug: "the-romper", name: "The Romper", colorway: "Powder Blue", src: "/images/hero/blue-romper-studio.webp", focus: "40% 60%" },
];

// Below md the toggles are pill chips in one sideways row; from md they are plain text filters.
function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className="label min-h-11 shrink-0 text-left whitespace-nowrap text-muted transition-colors hover:text-ink aria-pressed:text-ink max-md:rounded-full max-md:border-[0.5px] max-md:border-card-border max-md:px-4 max-md:aria-pressed:border-pink max-md:aria-pressed:bg-blush">
      {children}
    </button>
  );
}

export function ShopGrid() {
  const [piece, setPiece] = useState<string | null>(null);
  const [colour, setColour] = useState<string | null>(null);
  const shown = cards.filter((c) => (!piece || c.product.slug === piece) && (!colour || c.colorway.name === colour));
  const reset = () => {
    setPiece(null);
    setColour(null);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-[12rem_1fr] md:gap-x-16 md:gap-y-0 md:px-12 md:py-24">
      <div className="-mx-6 flex gap-2 px-6 [scrollbar-width:none] max-md:overflow-x-auto max-md:py-1.5 md:contents">
      <nav aria-label="Pieces" className="flex shrink-0 gap-2 md:row-span-2 md:flex-col md:gap-1">
        <Toggle on={!piece} onClick={() => setPiece(null)}>
          All pieces
        </Toggle>
        {products.map((p) => (
          <Toggle key={p.slug} on={piece === p.slug} onClick={() => setPiece(p.slug)}>
            {p.name}
          </Toggle>
        ))}
      </nav>
      <div role="group" aria-label="Color" className="flex shrink-0 items-center gap-2 md:col-start-2 md:flex-wrap md:gap-x-5 md:border-b-[0.5px] md:border-ink/10 md:pb-4">
        <Toggle on={!colour} onClick={() => setColour(null)}>
          All colors
        </Toggle>
        {colours.map((name) => (
          <Toggle key={name} on={colour === name} onClick={() => setColour(name)}>
            {name}
          </Toggle>
        ))}
      </div>
      </div>

      <div className="md:col-start-2">

        {!piece && !colour && (
          <div data-featured className="mt-10 hidden gap-6 sm:grid sm:grid-cols-2">
            {featured.map((f) => (
              <Link key={f.src} href={`/shop/${f.slug}?colorway=${colorwaySlug(f.colorway)}`} className="group relative block aspect-[4/5] overflow-hidden">
                <Image src={f.src} alt={`${f.name} in ${f.colorway}`} fill sizes="(min-width: 768px) 35vw, 100vw" style={{ objectPosition: f.focus }} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                <span className="absolute right-5 bottom-5 left-5 flex items-end justify-between bg-white/90 p-5 sm:left-auto sm:w-56">
                  <span>
                    <span className="label block text-[10px]">{f.name}</span>
                    <span className="label block text-[10px] text-muted">{f.colorway}</span>
                  </span>
                  <span className="font-serif text-xl">{formatPrice(products.find((p) => p.slug === f.slug)?.priceCents ?? null)}</span>
                </span>
              </Link>
            ))}
          </div>
        )}

        <ul aria-label="Collection" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {shown.map(({ product, colorway }) => (
            <li key={`${product.slug}-${colorway.name}`}>
              <Link href={`/shop/${product.slug}?colorway=${colorwaySlug(colorway.name)}`} className="group block">
                <div className="relative aspect-[3/4] overflow-hidden bg-stone">
                  {colorway.images[0] ? (
                    <Image src={colorway.images[0]} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-[1.03]" />
                  ) : (
                    <span className="label absolute right-4 bottom-4 text-[10px] text-muted">Image to come</span>
                  )}
                </div>
                <span className="label mt-4 block text-[10px]">{product.name}</span>
                <span className="mt-1 flex items-baseline justify-between gap-4">
                  <span className="label text-[10px] text-muted">{colorway.name}</span>
                  <span className="text-sm">{formatPrice(product.priceCents)}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {shown.length === 0 && (
          <div className="mt-6 flex flex-col items-start gap-6">
            <p className="text-muted">No pieces in that color yet.</p>
            <button type="button" onClick={reset} className="cta">
              Show all pieces
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
