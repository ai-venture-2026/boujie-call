import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PolicyPage } from "@/components/policy-page";
import { getHelp } from "@/lib/help";

export const metadata: Metadata = { title: "Privacy Policy | Boujie Call" };

export default function PrivacyPage() {
  const policy = getHelp().privacy;
  if (!policy) notFound();
  return <PolicyPage title="Privacy Policy" policy={policy} />;
}
