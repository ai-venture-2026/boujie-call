import Image from "next/image";
import type { ReactNode } from "react";

// Shared page close: headline and action on the left, a framed photo on the right.
export function ClosingCall({ id, tone, photo, alt, title, line, children }: { id?: string; tone: "ink" | "blush"; photo: string; alt: string; title: ReactNode; line: string; children: ReactNode }) {
  const ink = tone === "ink";
  return (
    <section id={id} data-nav={ink ? "dark" : undefined} className={ink ? "bg-ink text-cream" : "bg-blush text-ink"}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-12 md:py-24">
        <div className="rise">
          <h2 className="text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[1.02]">{title}</h2>
          <p className={`mt-5 font-serif text-xl italic md:text-2xl ${ink ? "text-cream/80" : "text-ink/80"}`}>{line}</p>
          <div className="mt-10">{children}</div>
        </div>
        <div className="relative aspect-[4/5] w-full max-w-md justify-self-center md:justify-self-end">
          <Image src={photo} alt={alt} fill sizes="(min-width: 768px) 28rem, 90vw" className="object-cover" />
        </div>
      </div>
    </section>
  );
}
