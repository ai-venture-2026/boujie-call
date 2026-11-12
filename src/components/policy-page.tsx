import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Policy } from "@/lib/help";

export function PolicyPage({ title, policy }: { title: string; policy: Policy }) {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-28 md:pt-24">
        <h1 className="text-[clamp(36px,4vw,56px)] leading-[1.05]">{title}</h1>
        <p className="label mt-4 text-muted">Last updated {policy.updated}</p>
        <div className="mt-12 grid gap-10">
          {policy.sections.map((section, i) => (
            <section key={section.heading ?? i}>
              {section.heading && <h2 className="font-serif text-[28px] leading-tight">{section.heading}</h2>}
              {section.body.map((p) => (
                <p key={p} className="mt-4 max-w-prose text-base leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
