"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { addToBag, BAG_OPENED } from "@/lib/bag";
import { formatPrice } from "@/lib/content";
import { availability, colorwaySlug, getOffer, getSizeChart, getSizeColumns, stockKey, type Colorway, type Product } from "@/lib/products";
import { GiftButton } from "./gift-button";
import { SizeGuide } from "./size-guide";
import { AvailabilityPill } from "./availability-pill";

const views = ["front", "back", "detail"];

function ToCome({ label }: { label?: string }) {
  return (
    <div role={label ? "img" : undefined} aria-label={label} className="absolute inset-0">
      <span className={`label absolute text-muted ${label ? "right-4 bottom-4" : "right-2 bottom-2 whitespace-nowrap text-[10px] tracking-[0.1em]"}`}>Image to come</span>
    </div>
  );
}

export function ProductView({ product, intro, details }: { product: Product; intro: ReactNode; details: ReactNode }) {
  const chart = getSizeChart(product.slug);
  const fromUrl = useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("colorway"),
    () => null,
  );
  const [picked, setChosen] = useState<Colorway | null>(null);
  const chosen = picked ?? product.colorways.find((c) => colorwaySlug(c.name) === fromUrl) ?? null;
  const [view, setView] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const mainAdd = useRef<HTMLButtonElement>(null);
  const colorways = useRef<HTMLFieldSetElement>(null);
  const sizes = useRef<HTMLFieldSetElement>(null);
  const [quickAdd, setQuickAdd] = useState(false);

  // The phone quick add bar shows once the main button has scrolled up out of view.
  useEffect(() => {
    if (!("IntersectionObserver" in window) || !mainAdd.current) return;
    // The tall bottom margin counts anything below the screen as in view, so a fast scroll past the button still flips the bar.
    const io = new IntersectionObserver(([e]) => setQuickAdd(!e.isIntersecting && e.boundingClientRect.top < 0), { rootMargin: "0px 0px 10000% 0px" });
    io.observe(mainAdd.current);
    return () => io.disconnect();
  }, []);

  // From md the other slides are hidden, so the track cannot hold the scroll position; restore it on the way back down.
  const md = useRef<MediaQueryList | null>(null);
  useEffect(() => {
    const query = window.matchMedia?.("(min-width: 48rem)");
    md.current = query ?? null;
    if (!query) return;
    const sync = () => {
      if (!query.matches && track.current) track.current.scrollLeft = view * track.current.clientWidth;
    };
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [view]);
  const shown = chosen ?? product.colorways[0];
  const slots = shown.gallery ?? views.map((v, i) => ({ src: shown.images[i] ?? "", view: v }));
  const [size, setSize] = useState<string | null>(null);
  const [missing, setMissing] = useState("");
  const [added, setAdded] = useState("");
  const [cleared, setCleared] = useState("");
  const left = (c: Colorway | null, s: string) => (c ? product.stock?.[stockKey(c.name, s)] : undefined);
  const soldOut = (s: string) => left(chosen, s) === 0;
  const count = size ? left(chosen, size) : undefined;

  function add(fromBar = false) {
    setAdded("");
    if (!chosen || !size) {
      setMissing(!chosen && !size ? "Choose a colorway and a size first." : !chosen ? "Choose a colorway first." : "Choose a size first.");
      // The bar unmounts once the selectors are back on screen, so focus moves to the first missing choice.
      const target = (chosen ? sizes : colorways).current;
      if (fromBar && target) {
        target.scrollIntoView({ behavior: window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        target.querySelector("input")?.focus({ preventScroll: true });
      }
      return;
    }
    setMissing("");
    addToBag({ slug: product.slug, colorway: chosen.name, size });
    window.dispatchEvent(new Event(BAG_OPENED));
    setAdded(`Added to your bag: ${product.name}, ${chosen.name}, ${size}.`);
  }

  return (
    <div className="grid gap-10 md:grid-cols-[min(max(16rem,calc((100svh-14rem)*0.75)),45%)_1fr] lg:grid-cols-[min(max(16rem,calc((100svh-14rem)*0.75)),calc(50%-2rem))_1fr] lg:gap-16">
      <div>
        {/* Phones swipe the track; from md only the active slide shows and the thumbnails pick it. */}
        <div
          ref={track}
          onScroll={(e) => {
            if (md.current?.matches) return;
            const { scrollLeft, clientWidth } = e.currentTarget;
            if (clientWidth > 0) setView(Math.min(slots.length - 1, Math.max(0, Math.round(scrollLeft / clientWidth))));
          }}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:overflow-visible"
        >
          {slots.map(({ src, view: v }, i) => (
            <div key={v} className={`relative aspect-[3/4] w-full shrink-0 snap-center overflow-hidden bg-stone ${shown.images.includes(src) ? "contact" : ""} ${i === view ? "" : "md:hidden"}`}>
              {src ? (
                <Image src={src} alt={`${product.name} in ${shown.name}, ${v}`} width={900} height={1200} sizes="(min-width: 768px) 34vw, 100vw" priority={i === 0} className="aspect-[3/4] w-full object-cover" />
              ) : (
                <ToCome label={`${product.name} in ${shown.name}, ${v}`} />
              )}
              <AvailabilityPill label={availability(product, shown.name)} />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-center md:hidden">
          {slots.map(({ view: v }, i) => (
            <button
              key={v}
              type="button"
              aria-label={`Photo ${i + 1} of ${slots.length}`}
              aria-current={i === view}
              onClick={() => {
                setView(i);
                if (track.current) track.current.scrollLeft = i * track.current.clientWidth;
              }}
              className="grid size-11 place-items-center"
            >
              <span data-dot className={`size-1.5 rounded-full ${i === view ? "bg-ink" : "bg-ink/20"}`} />
            </button>
          ))}
        </div>
        <div className={`mt-3 grid gap-3 max-md:hidden ${slots.length === 4 ? "grid-cols-4" : "grid-cols-3"}`}>
          {slots.map(({ src, view: v }, i) => (
            <button key={v} type="button" aria-label={`Show ${v}`} aria-pressed={i === view} onClick={() => setView(i)} className="relative aspect-square overflow-hidden bg-stone aria-pressed:ring-1 aria-pressed:ring-pink">
              {src ? <Image src={src} alt="" fill sizes="120px" className="object-cover" /> : <ToCome />}
            </button>
          ))}
        </div>
      </div>

      <div className="md:self-start">
        {intro}
        <fieldset ref={colorways} className="mt-7 scroll-mt-28 short:mt-5">
          <legend className="text-base">
            Colorway: <span className="text-muted">{chosen ? chosen.name : "choose one"}</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {product.colorways.map((c) => (
              <label key={c.name} className="grid size-11 cursor-pointer place-items-center rounded-full has-checked:ring-1 has-checked:ring-pink has-focus-visible:outline-2">
                <input type="radio" name="colorway" value={c.name} aria-label={c.name} className="sr-only" checked={chosen?.name === c.name} onChange={() => {
                    setChosen(c);
                    const gone = !!size && left(c, size) === 0;
                    if (gone) setSize(null);
                    setCleared(gone ? `${size} is sold out in ${c.name}. Choose another size.` : "");
                    setView(0);
                    if (track.current) track.current.scrollLeft = 0;
                  }} />
                <span aria-hidden="true" className="size-8 rounded-full border-[0.5px] border-ink/15" style={{ background: c.swatch ?? c.hex }} />
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset ref={sizes} className="mt-6 scroll-mt-28 short:mt-4">
          <legend className="float-left py-2.5 text-base">
            Size: <span className="text-muted">{size ?? "choose one"}</span>
          </legend>
          {chart && product.sizes.every((s) => chart[s]) && <SizeGuide sizes={product.sizes} columns={getSizeColumns(product.slug)} chart={chart} />}
          <div className="clear-both mt-3 flex flex-wrap gap-2 pt-px">
            {product.sizes.map((s) => (
              <label key={s} className={`grid h-11 min-w-14 md:min-w-12 md:pointer-fine:h-10 place-items-center rounded-full border-[0.5px] border-ink/25 px-4 text-base transition-colors has-checked:border-pink has-checked:bg-blush has-focus-visible:outline-2 ${soldOut(s) ? "cursor-not-allowed text-muted line-through" : "cursor-pointer hover:border-pink"}`}>
                <input type="radio" name="size" value={s} aria-label={soldOut(s) ? `${s}, sold out` : s} disabled={soldOut(s)} className="sr-only" checked={size === s} onChange={() => {
                  setSize(s);
                  setCleared("");
                }} />
                {s}
              </label>
            ))}
          </div>
          <p aria-live="polite" className="mt-3 text-[15px] text-muted empty:hidden">{cleared || (!!count && count <= 2 ? (count === 1 ? "Last one" : `${count} left`) : "")}</p>
        </fieldset>
        {product.comingSoon ? (
          <p className="label mt-7 short:mt-5">Coming soon</p>
        ) : (
          <div className="mt-7 flex flex-wrap gap-3 short:mt-5">
            <button ref={mainAdd} type="button" onClick={() => add()} className="cta cta-primary w-full sm:w-auto">
              Add to your bag
            </button>
            <GiftButton key={chosen?.name ?? ""} label="Send as a gift" className="cta w-full sm:w-auto" start={{ slug: product.slug, colorway: (chosen ?? product.colorways[0]).name }} />
          </div>
        )}
        {getOffer() && <p className="mt-3 text-base text-muted">{getOffer()}</p>}
        <p role="alert" className="mt-4 text-base">
          {missing}
        </p>
        <p role="status" className="text-base text-muted">
          {added}
        </p>
        {details}
      </div>
      {quickAdd && !product.comingSoon && (
        <div
          role="region"
          aria-label="Quick add"
          data-quick-add
          className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t-[0.5px] border-card-border bg-white/95 px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden"
        >
          <div className="min-w-0">
            <p className="truncate font-serif text-xl">{product.name}</p>
            <p className="text-[17px] font-medium text-muted">{formatPrice(product.priceCents)}</p>
            {chosen && <p className="truncate text-[15px] text-muted">{size ? `${chosen.name}, ${size}` : chosen.name}</p>}
          </div>
          <button type="button" onClick={() => add(true)} className="cta cta-primary shrink-0 px-6">
            Add to your bag
          </button>
        </div>
      )}
    </div>
  );
}

export function Price({ product, compact = false, className = "" }: { product: Product; compact?: boolean; className?: string }) {
  return (
    <p className={`flex items-baseline gap-3 ${className}`}>
      <span className={`font-sans font-medium ${compact ? "text-base" : "text-xl"}`}>{formatPrice(product.priceCents)}</span>
      {product.placeholderPrice && <span className="text-[13px] text-muted">Placeholder price</span>}
    </p>
  );
}
