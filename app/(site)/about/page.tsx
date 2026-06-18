import type { Metadata } from "next";
import { getAbout } from "@/lib/content/db";
import { AboutView } from "./AboutView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Shreyansh Rai",
  description:
    "Advocate Shreyansh Rai holds a BA.LLB (Hons.) and LLM in Criminal & Security Law. Practising at the High Court of Judicature at Allahabad & Lucknow Bench, specialising in criminal defence, bail, and NDPS matters.",
  alternates: { canonical: "https://shreyanshrai.com/about" },
  openGraph: { url: "https://shreyanshrai.com/about" },
};

export default async function AboutPage() {
  const about = await getAbout();
  return <AboutView about={about ?? {}} />;
}
