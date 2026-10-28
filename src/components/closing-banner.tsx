import Image from "next/image";
import type { ReactNode } from "react";

// Shared page close: a full-bleed photo with the model on the right and the words on the empty wall to her left.
export function ClosingBanner({
  id,
  tone,
  photo,
  alt,
  focus,
  title,
  line,
  body,
  children,
}: {
  id?: string;
  tone: "light" | "ink";
  photo: string;
  alt: string;
  focus: string;
  title: ReactNode;
  line: string;
  body?: string;
  children: ReactNode;
}) {
  const ink = tone === "ink";
  return (
    <section id={id} data-nav={ink ? "dark" : undefined} className={`relative ${ink ? "bg-ink text-cream" : "bg-blush text-ink"}`}>
      <div className="relative h-[52svh] md:absolute md:inset-0 md:h-auto">
        <Image src={photo} alt={alt} fill sizes="100vw" style={{ objectPosition: focus }} className="object-cover" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 py-16 md:flex md:h-[64svh] md:max-h-[720px] md:min-h-[540px] md:items-center md:px-12 md:py-0">
        <div className="max-w-lg md:max-w-[min(30rem,42%)] rise">
          <h2 className="text-[clamp(2.5rem,4.4vw,4.5rem)] leading-[1.02]">{title}</h2>
          <p className={`mt-5 font-serif text-xl italic md:text-2xl ${ink ? "text-cream/80" : "text-ink/80"}`}>{line}</p>
          {body && <p className={`mt-6 max-w-sm text-base leading-relaxed ${ink ? "text-cream/75" : "text-ink/75"}`}>{body}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </section>
  );
}
