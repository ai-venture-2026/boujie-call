import Image from "next/image";
import type { ReactNode } from "react";

// Listings show the product on its own; the model photo fades in on hover or keyboard focus.
// Hover only applies on devices that hover, so phones keep the product photo.
export function CardPhoto({ ghost, model, sizes, className, children }: { ghost?: string; model?: string; sizes: string; className: string; children?: ReactNode }) {
  return (
    <div className={`${className} ${ghost ? "contact after:transition-opacity after:duration-500 group-hover:after:opacity-0 group-focus-visible:after:opacity-0" : ""}`}>
      {ghost ? (
        <Image src={ghost} alt="" fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
      ) : (
        <span className="label absolute right-4 bottom-4 text-muted">Image to come</span>
      )}
      {ghost && model && <Image src={model} alt="" fill sizes={sizes} className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />}
      {children}
    </div>
  );
}
