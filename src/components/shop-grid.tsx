"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatPrice } from "@/lib/content";
import { colorwaySlug, type Product } from "@/lib/products";

// Filters are pills at every width so they read as buttons; colours carry their dot.
function Toggle({ on, onClick, swatch, children }: { on: boolean; onClick: () => void; swatch?: string; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className="label inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-[0.5px] border-card-border px-4 text-left whitespace-nowrap text-muted transition-colors hover:border-pink hover:text-ink aria-pressed:border-pink aria-pressed:bg-blush aria-pressed:text-ink">
      {swatch && <span data-swatch aria-hidden="true" className="size-3.5 shrink-0 rounded-full border-[0.5px] border-ink/15" style={{ background: swatch }} />}
      {children}
    </button>
  );
}

export function ShopGrid({ products }: { products: Product[] }) {
  const cards = products.flatMap((p) => p.colorways.map((c) => ({ product: p, colorway: c })));
  const colours = [...new Map(cards.map((c) => [c.colorway.name, c.colorway.swatch ?? c.colorway.hex])).entries()];
  const [piece, setPiece] = useState<string | null>(null);
  const [colour, setColour] = useState<string | null>(null);
  const shown = cards.filter((c) => (!piece || c.product.slug === piece) && (!colour || c.colorway.name === colour));
  const reset = () => {
    setPiece(null);
    setColour(null);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-19 md:grid-cols-[12rem_1fr] md:gap-x-16 md:gap-y-0 md:px-12 md:py-28">
      <div className="-mx-6 flex gap-2 px-6 [scrollbar-width:none] max-md:overflow-x-auto max-md:py-1.5 md:contents">
      <nav aria-label="Pieces" className="flex shrink-0 gap-2 md:row-span-2 md:flex-col md:items-start">
        <Toggle on={!piece} onClick={() => setPiece(null)}>
          All pieces
        </Toggle>
        {products.map((p) => (
          <Toggle key={p.slug} on={piece === p.slug} onClick={() => setPiece(p.slug)}>
            {p.name}
          </Toggle>
        ))}
      </nav>
      <div role="group" aria-label="Color" className="flex shrink-0 items-center gap-2 md:col-start-2 md:flex-wrap md:border-b-[0.5px] md:border-card-border md:pb-5">
        <Toggle on={!colour} onClick={() => setColour(null)}>
          All colors
        </Toggle>
        {colours.map(([name, swatch]) => (
          <Toggle key={name} on={colour === name} onClick={() => setColour(name)} swatch={swatch}>
            {name}
          </Toggle>
        ))}
      </div>
      </div>

      <div className="md:col-start-2">
        <ul aria-label="Collection" className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
          {shown.map(({ product, colorway }) => {
            const photo = colorway.card ?? colorway.gallery?.[0].src ?? colorway.images[0];
            return (
              <li key={`${product.slug}-${colorway.name}`} className="max-md:last:odd:col-span-2 max-md:last:odd:w-[calc(50%-0.75rem)] max-md:last:odd:justify-self-center">
                <Link href={`/shop/${product.slug}?colorway=${colorwaySlug(colorway.name)}`} className="group block">
                  <div className={`relative aspect-[3/4] overflow-hidden bg-stone ${colorway.images.includes(photo) ? "contact" : ""}`}>
                    {photo ? (
                      <Image src={photo} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                    ) : (
                      <span className="label absolute right-4 bottom-4 text-muted">Image to come</span>
                    )}
                  </div>
                  <span className="label mt-4 block truncate">{product.name}</span>
                  <span className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4">
                    <span className="label whitespace-nowrap text-muted">{colorway.name}</span>
                    <span className="text-[17px] font-medium md:text-[15px]">{product.comingSoon ? "Coming soon" : formatPrice(product.priceCents)}</span>
                  </span>
                </Link>
              </li>
            );
          })}
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
