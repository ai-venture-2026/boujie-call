"use client";

import Image from "next/image";
import { AvailabilityPill } from "./availability-pill";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useSyncExternalStore } from "react";
import { formatPrice } from "@/lib/content";
import { availability, colorwaySlug, type Product } from "@/lib/products";

// Filters are pills at every width so they read as buttons; colours carry their dot.
function Toggle({ on, onClick, swatch, children }: { on: boolean; onClick: () => void; swatch?: string; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className="label inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border-[0.5px] border-card-border px-4 text-left whitespace-nowrap text-muted transition-colors hover:border-pink hover:text-ink aria-pressed:border-pink aria-pressed:bg-blush aria-pressed:text-ink">
      {swatch && <span data-swatch aria-hidden="true" className="size-3.5 shrink-0 rounded-full border-[0.5px] border-ink/15" style={{ background: swatch }} />}
      {children}
    </button>
  );
}

// Filters live in the address (?piece=&colour=), so going back from a product restores them and a filtered view can be shared.
const FILTERS_CHANGED = "bc-filters";
const onFiltersChange = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  window.addEventListener(FILTERS_CHANGED, notify);
  return () => {
    window.removeEventListener("popstate", notify);
    window.removeEventListener(FILTERS_CHANGED, notify);
  };
};

function setFilter(key: "piece" | "colour", value: string | null) {
  const params = new URLSearchParams(window.location.search);
  if (value) params.set(key, value);
  else params.delete(key);
  const query = params.toString();
  window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
  window.dispatchEvent(new Event(FILTERS_CHANGED));
}

// routerSearch is the address as Next knows it, so router navigations (the header Shop link) clear the filters too; tests and the server fall back to the browser address.
export function ShopGrid({ products, routerSearch }: { products: Product[]; routerSearch?: string }) {
  const cards = products.flatMap((p) => p.colorways.map((c) => ({ product: p, colorway: c })));
  const colours = [...new Map(cards.map((c) => [c.colorway.name, c.colorway.swatch ?? c.colorway.hex])).entries()];
  const addressSearch = useSyncExternalStore(onFiltersChange, () => window.location.search, () => "");
  const search = routerSearch ?? addressSearch;
  const params = new URLSearchParams(search);
  const piece = products.some((p) => p.slug === params.get("piece")) ? params.get("piece") : null;
  const colour = colours.some(([name]) => name === params.get("colour")) ? params.get("colour") : null;
  const setPiece = (slug: string | null) => setFilter("piece", slug);
  const setColour = (name: string | null) => setFilter("colour", name);
  const shown = cards.filter((c) => (!piece || c.product.slug === piece) && (!colour || c.colorway.name === colour));
  const reset = () => {
    setPiece(null);
    setColour(null);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-19 md:grid-cols-[12rem_1fr] md:gap-x-16 md:gap-y-0 md:px-12 md:py-28">
      <div className="-mx-6 flex min-w-0 flex-col gap-3 md:sticky md:top-28 md:mx-0 md:gap-8 md:self-start">
      <nav aria-label="Pieces" className="flex shrink-0 gap-2 px-6 py-1.5 [scrollbar-width:none] max-md:overflow-x-auto md:flex-col md:items-start md:p-0">
        <Toggle on={!piece} onClick={() => setPiece(null)}>
          All pieces
        </Toggle>
        {products.map((p) => (
          <Toggle key={p.slug} on={piece === p.slug} onClick={() => setPiece(p.slug)}>
            {p.name}
          </Toggle>
        ))}
      </nav>
      <div role="group" aria-label="Color" className="flex shrink-0 items-center gap-2 px-6 py-1.5 [scrollbar-width:none] max-md:overflow-x-auto md:flex-col md:items-start md:border-t-[0.5px] md:border-card-border md:p-0 md:pt-8">
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

      <div role="region" aria-label="Collection" className="grid gap-16 md:gap-20">
        {products.map((p) => {
          const group = shown.filter((c) => c.product.slug === p.slug);
          if (group.length === 0) return null;
          return (
            <section key={p.slug}>
              <h2 className="label text-ink">{p.name}</h2>
              <ul aria-label={p.name} className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
                {group.map(({ product, colorway }) => {
                  const photo = colorway.gallery?.[0].src ?? colorway.images[0];
                  const status = availability(product, colorway.name);
                  return (
                    <li key={`${product.slug}-${colorway.name}`} className="max-lg:last:odd:col-span-2 max-lg:last:odd:w-[calc(50%-0.75rem)] max-lg:last:odd:justify-self-center">
                      <Link href={`/shop/${product.slug}?colorway=${colorwaySlug(colorway.name)}`} className="group block">
                        <div className={`relative aspect-[3/4] overflow-hidden bg-stone ${colorway.images.includes(photo) ? "contact" : ""}`}>
                          {photo ? (
                            <Image src={photo} alt="" fill sizes="(min-width: 1024px) 18vw, 45vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                          ) : (
                            <span className="label absolute right-4 bottom-4 text-muted">Image to come</span>
                          )}
                          <AvailabilityPill label={status} />
                        </div>
                        <span className="label mt-4 block truncate">{product.name}</span>
                        <span className="mt-1 block">
                          <span className="label block whitespace-nowrap text-muted">{colorway.name}</span>
                          <span className="mt-1 block text-[17px] font-medium md:text-[15px]">{product.comingSoon ? "Coming soon" : formatPrice(product.priceCents)}
                            {status === "Sold out" && <span className="sr-only">, sold out</span>}
                          </span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}

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

export function ShopGridLive({ products }: { products: Product[] }) {
  return <ShopGrid products={products} routerSearch={useSearchParams()?.toString()} />;
}
