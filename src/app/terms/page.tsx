import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy-page";
import { getHelp } from "@/lib/help";

export const metadata: Metadata = { title: "Terms of Service | Boujie Call" };

export default function TermsPage() {
  const policy = getHelp().terms;
  if (!policy) notFound();
  return <PolicyPage title="Terms of Service" policy={policy} />;
}
