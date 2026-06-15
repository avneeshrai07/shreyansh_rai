import type { Metadata } from "next";
import { PracticeAreasView } from "./PracticeAreasView";

export const metadata: Metadata = {
  title: "Criminal Law Practice Areas",
  description:
    "Shreyansh Rai handles bail, anticipatory bail, criminal trial defence, FIR quashing under Section 482 CrPC, NDPS cases, cybercrime defence, and criminal appeals at the High Court Allahabad & Lucknow Bench.",
  alternates: { canonical: "https://shreyanshrai.com/practice-areas" },
  openGraph: { url: "https://shreyanshrai.com/practice-areas" },
};

export default function PracticeAreasPage() {
  return <PracticeAreasView />;
}
