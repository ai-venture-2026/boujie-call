"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { addToBag, BAG_OPENED } from "@/lib/bag";
import { formatPrice } from "@/lib/content";
import { colorwaySlug, OFFER, type Colorway, type Product } from "@/lib/products";
import { SizeGuide } from "./size-guide";

const views = ["front", "back", "detail"];

function ToCome({ label }: { label?: string }) {
  return (
    <div role={label ? "img" : undefined} aria-label={label} className="absolute inset-0">
      <span className="label absolute right-4 bottom-4 text-[10px] text-muted">Image to come</span>
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
  const track = useRef<HTMLDivElement>(null);
  const shown = chosen ?? product.colorways[0];
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
        {/* Phones swipe the track; from md only the active slide shows and the thumbnails pick it. */}
        <div
          ref={track}
          onScroll={(e) => setView(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:overflow-visible"
        >
          {views.map((v, i) => (
            <div key={v} className={`relative aspect-[3/4] w-full shrink-0 snap-center overflow-hidden bg-stone ${i === view ? "" : "md:hidden"}`}>
              {shown.images[i] ? (
                <Image src={shown.images[i]} alt={`${product.name} in ${shown.name}, ${v}`} width={900} height={1200} priority={i === 0} className="aspect-[3/4] w-full object-cover mix-blend-multiply" />
              ) : (
                <ToCome label={`${product.name} in ${shown.name}, ${v}`} />
              )}
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="mt-4 flex justify-center gap-2 md:hidden">
          {views.map((v, i) => (
            <span key={v} data-dot className={`size-1.5 rounded-full ${i === view ? "bg-ink" : "bg-ink/20"}`} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 max-md:hidden">
          {views.map((v, i) => (
            <button key={v} type="button" aria-label={`Show ${v}`} aria-pressed={i === view} onClick={() => setView(i)} className="relative aspect-square overflow-hidden bg-stone aria-pressed:outline-1 aria-pressed:outline-pink">
              {shown.images[i] ? <Image src={shown.images[i]} alt="" fill sizes="120px" className="object-cover mix-blend-multiply" /> : <ToCome />}
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
              <label key={c.name} className="grid size-11 cursor-pointer place-items-center rounded-full has-checked:ring-1 has-checked:ring-pink has-focus-visible:outline-2">
                <input type="radio" name="colorway" value={c.name} aria-label={c.name} className="sr-only" checked={chosen?.name === c.name} onChange={() => {
                    setChosen(c);
                    setView(0);
                    if (track.current) track.current.scrollLeft = 0;
                  }} />
                <span aria-hidden="true" className="size-7 rounded-full border-[0.5px] border-ink/15" style={{ background: c.swatch ?? c.hex }} />
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="mt-8">
          <legend className="float-left text-sm">
            Size: <span className="text-muted">{size ?? "choose one"}</span>
          </legend>
          <SizeGuide sizes={product.sizes} />
          <div className="clear-both mt-4 flex flex-wrap gap-2 pt-px">
            {product.sizes.map((s) => (
              <label key={s} className="grid h-11 min-w-14 cursor-pointer place-items-center rounded-full border-[0.5px] border-ink/25 px-4 text-sm transition-colors hover:border-pink has-checked:border-pink has-checked:bg-blush has-focus-visible:outline-2">
                <input type="radio" name="size" value={s} className="sr-only" checked={size === s} onChange={() => setSize(s)} />
                {s}
              </label>
            ))}
          </div>
        </fieldset>
        <button type="button" onClick={add} className="cta cta-primary mt-10 w-full sm:w-auto">
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
