import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { ALL_CASES_QUERY, type CaseResult } from "@/lib/sanity/queries";
import { dummyCases } from "@/lib/sanity/dummy";
import { CaseResultsView } from "./CaseResultsView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Case Results & Track Record",
  description:
    "Track record of Advocate Shreyansh Rai — acquittals, bail orders, FIR quashing, NDPS defence, and successful criminal trials at the High Court Allahabad, Lucknow Bench, and Sessions Court.",
  alternates: { canonical: "https://shreyanshrai.com/case-results" },
  openGraph: { url: "https://shreyanshrai.com/case-results" },
};

export default async function CaseResultsPage() {
  const cases = await sanityFetch<CaseResult[]>(ALL_CASES_QUERY, dummyCases);
  return <CaseResultsView cases={cases?.length ? cases : dummyCases} />;
}
