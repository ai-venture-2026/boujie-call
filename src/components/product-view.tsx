"use client";

import Image from "next/image";
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { addToBag, BAG_OPENED } from "@/lib/bag";
import { formatPrice } from "@/lib/content";
import { colorwaySlug, OFFER, type Colorway, type Product } from "@/lib/products";

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
      style={{ background: colorway.swatch ?? colorway.hex }}
      className={`flex items-end border-[0.5px] border-card-border p-5 font-serif italic ${isDark(colorway.hex) ? "text-muted-dark" : "text-muted"} ${className}`}
    >
      {colorway.name}, {view}
    </div>
  );
}

export function ProductView({ product, intro, details }: { product: Product; intro: ReactNode; details: ReactNode }) {
  const fromUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("colorway"),
    () => null,
  );
  const [picked, setChosen] = useState<Colorway | null>(null);
  const chosen = picked ?? product.colorways.find((c) => colorwaySlug(c.name) === fromUrl) ?? null;
  const [view, setView] = useState(0);
  const shown = chosen ?? product.colorways[0];
  const photo = shown.images[view];
  const [size, setSize] = useState<string | null>(null);
  const [missing, setMissing] = useState("");
  const [added, setAdded] = useState("");

  function add() {
    setAdded("");
    if (!chosen || !size) {
      setMissing(!chosen && !size ? "Choose a colorway and a size first." : !chosen ? "Choose a colorway first." : "Choose a size first.");
      return;
    }
    setMissing("");
    addToBag({ slug: product.slug, colorway: chosen.name, size });
    window.dispatchEvent(new Event(BAG_OPENED));
    setAdded(`Added to your bag: ${product.name}, ${chosen.name}, ${size}.`);
  }

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-16">
      <div>
        {photo ? (
          <div className="overflow-hidden bg-stone">
            <Image src={photo} alt={`${product.name} in ${shown.name}, ${views[view]}`} width={900} height={1200} priority className="aspect-[3/4] w-full object-cover mix-blend-multiply" />
          </div>
        ) : (
          <Frame product={product} colorway={shown} view={views[view]} className="aspect-[3/4]" />
        )}
        <div className="mt-3 grid grid-cols-3 gap-3">
          {views.map((v, i) => (
            <button key={v} type="button" aria-label={`Show ${v}`} aria-pressed={i === view} onClick={() => setView(i)} className="relative aspect-square overflow-hidden bg-stone aria-pressed:outline-1 aria-pressed:outline-ink" style={shown.images[i] ? undefined : { background: shown.swatch ?? shown.hex }}>
              {shown.images[i] && <Image src={shown.images[i]} alt="" fill sizes="120px" className="object-cover mix-blend-multiply" />}
            </button>
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
              <label key={c.name} className="grid size-11 cursor-pointer place-items-center has-checked:ring-1 has-checked:ring-ink has-focus-visible:outline-2">
                <input type="radio" name="colorway" value={c.name} aria-label={c.name} className="sr-only" checked={chosen?.name === c.name} onChange={() => setChosen(c)} />
                <span aria-hidden="true" className="size-7 border-[0.5px] border-ink/15" style={{ background: c.swatch ?? c.hex }} />
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="text-sm">
            Size: <span className="text-muted">{size ?? "choose one"}</span>
          </legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.map((s) => (
              <label key={s} className="grid h-11 min-w-14 cursor-pointer place-items-center border-[0.5px] border-ink/25 px-4 text-sm transition-colors hover:border-ink has-checked:border-ink has-checked:bg-ink has-checked:text-cream has-focus-visible:outline-2">
                <input type="radio" name="size" value={s} className="sr-only" checked={size === s} onChange={() => setSize(s)} />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="button" onClick={add} className="cta mt-10 w-full sm:w-auto">
          Add to your bag
        </button>
        <p className="mt-3 text-sm text-muted">{OFFER}</p>
        <p role="alert" className="mt-4 text-sm">
          {missing}
        </p>
        <p role="status" className="text-sm text-muted">
          {added}
        </p>
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
