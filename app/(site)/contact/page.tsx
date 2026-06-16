import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity/client";
import { CONTACT_QUERY, type ContactData } from "@/lib/sanity/queries";
import { dummyContact } from "@/lib/sanity/dummy";
import { ContactView } from "./ContactView";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Contact & Book a Consultation",
  description:
    "Book a legal consultation with Advocate Shreyansh Rai, Criminal Lawyer at the High Court Allahabad & Lucknow Bench. Contact for bail, NDPS, FIR quashing, and criminal trial matters in Lucknow, UP.",
  alternates: { canonical: "https://shreyanshrai.com/contact" },
  openGraph: { url: "https://shreyanshrai.com/contact" },
};

export default async function ContactPage() {
  const contact = await sanityFetch<ContactData>(CONTACT_QUERY, dummyContact);
  return <ContactView contact={contact ?? dummyContact} />;
}
