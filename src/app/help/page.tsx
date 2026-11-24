import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getHelp } from "@/lib/help";

export const metadata: Metadata = { title: "Help | Boujie Call", description: "How Send a Call works, what happens to an unclaimed gift, and how to reach us." };

export default function HelpPage() {
  const { contactEmail, topics } = getHelp();
  if (!contactEmail) notFound();
  const answered = topics.filter((t) => t.a);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-28 md:pt-24">
        <p className="label text-rose-deep">Help</p>
        <h1 className="mt-4 text-[clamp(36px,4vw,56px)] leading-[1.05]">How can we help?</h1>
        <p className="mt-6 text-base leading-relaxed">
          Write to us any time at{" "}
          <a href={`mailto:${contactEmail}`} className="link">
            {contactEmail}
          </a>
          .
        </p>
        <dl className="mt-14 border-t-[0.5px] border-card-border">
          {answered.map((t) => (
            <div key={t.q} className="border-b-[0.5px] border-card-border py-6">
              <dt className="font-serif text-[24px] leading-tight">{t.q}</dt>
              <dd className="mt-3 max-w-prose text-base leading-relaxed text-muted">{t.a}</dd>
            </div>
          ))}
        </dl>
      </main>
      <SiteFooter />
    </>
  );
}
