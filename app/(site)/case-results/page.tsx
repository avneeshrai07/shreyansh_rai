import type { Metadata } from "next";
import { getAllCases } from "@/lib/content/db";
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
  const cases = await getAllCases();
  return <CaseResultsView cases={cases} />;
}
