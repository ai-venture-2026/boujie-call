import Image from "next/image";
import type { ReactNode } from "react";

// Listings show the product on its own; the model photo fades in on hover or keyboard focus.
// Devices that cannot hover never display the model photo, so its lazy image is never fetched there.
export function CardPhoto({ ghost, model, sizes, className, children }: { ghost?: string; model?: string; sizes: string; className: string; children?: ReactNode }) {
  return (
    <div className={`${className} ${ghost ? "contact after:transition-opacity after:duration-500 group-hover:after:opacity-0 group-focus-visible:after:opacity-0 motion-reduce:after:transition-none" : ""}`}>
      {ghost ? (
        <Image src={ghost} alt="" fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
      ) : (
        <span className="label absolute right-4 bottom-4 text-muted">Image to come</span>
      )}
      {ghost && model && model !== ghost && <Image src={model} alt="" fill sizes={sizes} className="hidden object-cover opacity-0 transition-[opacity,transform] duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none [@media(hover:hover)]:block" />}
      {children}
    </div>
  );
}
