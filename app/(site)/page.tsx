import {
  getContact,
  getHomeCases,
  getHomeTestimonials,
  getStats,
} from "@/lib/content/db";
import { site } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { StatsStrip } from "@/components/sections/StatsStrip";
import { HomePracticeSnippet } from "@/components/sections/HomePracticeSnippet";
import { HomeCasesSnippet } from "@/components/sections/HomeCasesSnippet";
import { HomeTestimonialsSnippet } from "@/components/sections/HomeTestimonialsSnippet";
import { HomeCTA } from "@/components/sections/HomeCTA";

export const revalidate = 3600;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.baseUrl}/#person`,
  name: "Shreyansh Rai",
  jobTitle: "Criminal Law Advocate",
  description:
    "Advocate at the High Court of Judicature at Allahabad & Lucknow Bench. BA.LLB (Hons.) | LLM in Criminal & Security Law.",
  url: site.baseUrl,
  image: `${site.baseUrl}/og-image.png`,
  sameAs: [site.instagram, site.linkedin],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "LLM in Criminal & Security Law",
  },
  knowsAbout: [
    "Criminal Law",
    "Bail Law India",
    "NDPS Act",
    "Criminal Procedure Code",
    "Allahabad High Court Practice",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
};

const legalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "LegalService",
  "@id": `${site.baseUrl}/#legalservice`,
  name: "Shreyansh Rai — Criminal Law Advocate",
  url: site.baseUrl,
  logo: `${site.baseUrl}/og-image.png`,
  description:
    "Criminal law advocacy services at the High Court of Judicature at Allahabad & Lucknow Bench. Specialising in bail, NDPS defence, FIR quashing, criminal appeals, and cybercrime defence.",
  founder: { "@id": `${site.baseUrl}/#person` },
  areaServed: [
    { "@type": "City", name: "Lucknow" },
    { "@type": "City", name: "Allahabad" },
    { "@type": "State", name: "Uttar Pradesh" },
  ],
  serviceType: [
    "Bail Matters",
    "Anticipatory Bail",
    "Criminal Trial Defence",
    "FIR Quashing",
    "NDPS Cases",
    "Cybercrime Defence",
    "Criminal Appeals",
    "Section 482 CrPC",
  ],
  priceRange: "₹₹",
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Lucknow",
    addressRegion: "Uttar Pradesh",
    postalCode: "226001",
    addressCountry: "IN",
  },
  openingHours: "Mo-Sa 10:00-18:00",
};

export default async function Home() {
  const [cases, testimonials, stats, contact] = await Promise.all([
    getHomeCases(),
    getHomeTestimonials(),
    getStats(),
    getContact(),
  ]);

  // Publish the CMS phone in structured data (falls back to the site constant).
  const legalServiceSchemaWithContact = {
    ...legalServiceSchema,
    telephone: contact?.phone || site.phone,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(legalServiceSchemaWithContact).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <main id="main-content">
        {/* SEO H1 — visually hidden; the visual headline in Hero is a <p> (S1). */}
        <h1 className="sr-only">
          Shreyansh Rai — Criminal Law Advocate | High Court Allahabad &amp;
          Lucknow
        </h1>

        <Hero />
        <StatsStrip stats={stats} />
        <HomePracticeSnippet />
        <HomeCasesSnippet cases={cases} />
        <HomeTestimonialsSnippet testimonials={testimonials} />
        <HomeCTA />
      </main>
    </>
  );
}
