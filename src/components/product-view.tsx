"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { formatPrice } from "@/lib/content";
import type { Colorway, Product } from "@/lib/products";

const views = ["front", "back", "detail"];

function isDark(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return r * 0.299 + g * 0.587 + b * 0.114 < 128;
}

export function Frame({ product, colorway, view, className = "" }: { product: Product; colorway: Colorway; view: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`${product.name} in ${colorway.name}, ${view}`}
      style={{ backgroundColor: colorway.hex }}
      className={`flex items-end rounded-[16px] border-[0.5px] border-card-border p-5 font-serif italic ${isDark(colorway.hex) ? "text-muted-dark" : "text-muted"} ${className}`}
    >
      {colorway.name}, {view}
    </div>
  );
}

export function ProductView({ product, intro, details }: { product: Product; intro: ReactNode; details: ReactNode }) {
  const [chosen, setChosen] = useState<Colorway | null>(null);
  const [view, setView] = useState(0);
  const shown = chosen ?? product.colorways[0];
  const photo = shown.images[view];

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        {photo ? (
          <Image src={photo} alt={`${product.name} in ${shown.name}, ${views[view]}`} width={900} height={1200} className="aspect-[3/4] w-full rounded-[16px] object-cover" />
        ) : (
          <Frame product={product} colorway={shown} view={views[view]} className="aspect-[3/4]" />
        )}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {views.map((v, i) => (
            <button key={v} type="button" aria-label={`Show ${v}`} aria-pressed={i === view} onClick={() => setView(i)} className="aspect-square rounded-[12px] border-[0.5px] border-card-border aria-pressed:outline-1 aria-pressed:outline-ink" style={{ backgroundColor: shown.hex }} />
          ))}
        </div>
      </div>

      <div>
        {intro}
        <fieldset className="mt-10">
          <legend className="text-sm">
            Colorway: <span className="text-muted">{chosen ? chosen.name : "choose one"}</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.colorways.map((c) => (
              <label key={c.name} className="grid size-11 cursor-pointer place-items-center rounded-full has-checked:ring-1 has-checked:ring-ink has-focus-visible:outline-2">
                <input type="radio" name="colorway" value={c.name} aria-label={c.name} className="sr-only" checked={chosen?.name === c.name} onChange={() => setChosen(c)} />
                <span aria-hidden="true" className="size-7 rounded-full border-[0.5px] border-card-border" style={{ backgroundColor: c.hex }} />
              </label>
            ))}
          </div>
        </fieldset>
        {details}
      </div>
    </div>
  );
}

export function Price({ product, className = "" }: { product: Product; className?: string }) {
  return (
    <p className={`flex items-baseline gap-3 ${className}`}>
      <span className="font-serif text-2xl">{formatPrice(product.priceCents)}</span>
      {product.placeholderPrice && <span className="text-xs text-muted">Placeholder price</span>}
    </p>
  );
}
