import "server-only";

import { prisma } from "@/lib/prisma";
import type {
  AboutData,
  CaseResult,
  ContactData,
  EducationItem,
  Stat,
  Testimonial,
} from "./types";

// Server-side data access for the public site. These read the CMS content from
// Postgres (via Prisma) and map each row to the plain shapes the React views
// consume (lib/content/types.ts) — notably turning Prisma's `null` optionals
// into `undefined`. They replace the old Sanity GROQ fetches one-for-one.

// --- About (singleton) ------------------------------------------------------

export async function getAbout(): Promise<AboutData | null> {
  const a = await prisma.about.findUnique({ where: { id: "about" } });
  if (!a) return null;

  return {
    fullName: a.fullName,
    designationEn: a.designationEn,
    designationHi: a.designationHi ?? undefined,
    courtEn: a.courtEn,
    courtHi: a.courtHi ?? undefined,
    taglineEn: a.taglineEn ?? undefined,
    taglineHi: a.taglineHi ?? undefined,
    photoUrl: a.photoUrl ?? undefined,
    bioEn: a.bioEn,
    bioHi: a.bioHi,
    // `education` is stored as JSON; it always holds an EducationItem[].
    education: (a.education as unknown as EducationItem[]) ?? [],
    barEnrollmentNumber: a.barEnrollmentNumber ?? undefined,
    enrolledSinceYear: a.enrolledSinceYear ?? undefined,
    highlightsEn: a.highlightsEn,
    highlightsHi: a.highlightsHi,
    linkedinUrl: a.linkedinUrl ?? undefined,
    instagramUrl: a.instagramUrl ?? undefined,
  };
}

// --- Contact (singleton) ----------------------------------------------------

export async function getContact(): Promise<ContactData | null> {
  const c = await prisma.contact.findUnique({ where: { id: "contact" } });
  if (!c) return null;

  return {
    headingEn: c.headingEn ?? undefined,
    headingHi: c.headingHi ?? undefined,
    subheadingEn: c.subheadingEn ?? undefined,
    subheadingHi: c.subheadingHi ?? undefined,
    phone: c.phone ?? undefined,
    whatsapp: c.whatsapp ?? undefined,
    email: c.email ?? undefined,
    officeAddressEn: c.officeAddressEn ?? undefined,
    officeAddressHi: c.officeAddressHi ?? undefined,
    officeHoursEn: c.officeHoursEn ?? undefined,
    officeHoursHi: c.officeHoursHi ?? undefined,
    googleMapsEmbedUrl: c.googleMapsEmbedUrl ?? undefined,
  };
}

// --- Case results (collection) ----------------------------------------------

type CaseRow = Awaited<ReturnType<typeof prisma.caseResult.findFirst>>;

function toCase(c: NonNullable<CaseRow>): CaseResult {
  return {
    id: c.id,
    titleEn: c.titleEn,
    titleHi: c.titleHi ?? undefined,
    outcome: c.outcome,
    court: c.court,
    year: c.year,
    category: c.category ?? undefined,
    summaryEn: c.summaryEn,
    summaryHi: c.summaryHi ?? undefined,
    isHighlight: c.isHighlight,
  };
}

/** All case results, newest first — for the /case-results page. */
export async function getAllCases(): Promise<CaseResult[]> {
  const rows = await prisma.caseResult.findMany({ orderBy: { year: "desc" } });
  return rows.map(toCase);
}

/** Up to 3 highlighted case results, newest first — for the home page. */
export async function getHomeCases(): Promise<CaseResult[]> {
  const rows = await prisma.caseResult.findMany({
    where: { isHighlight: true },
    orderBy: { year: "desc" },
    take: 3,
  });
  return rows.map(toCase);
}

// --- Testimonials (collection) ----------------------------------------------

type TestimonialRow = Awaited<ReturnType<typeof prisma.testimonial.findFirst>>;

function toTestimonial(t: NonNullable<TestimonialRow>): Testimonial {
  return {
    id: t.id,
    clientName: t.clientName,
    clientRoleEn: t.clientRoleEn ?? undefined,
    clientRoleHi: t.clientRoleHi ?? undefined,
    quoteEn: t.quoteEn,
    quoteHi: t.quoteHi ?? undefined,
    rating: t.rating ?? undefined,
    caseType: t.caseType ?? undefined,
    isHighlight: t.isHighlight,
  };
}

/** All testimonials, newest first — for the /testimonials page. */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return rows.map(toTestimonial);
}

/** Up to 2 highlighted testimonials, newest first — for the home page. */
export async function getHomeTestimonials(): Promise<Testimonial[]> {
  const rows = await prisma.testimonial.findMany({
    where: { isHighlight: true },
    orderBy: { publishedAt: "desc" },
    take: 2,
  });
  return rows.map(toTestimonial);
}

// --- Stats (collection) -----------------------------------------------------

/** All stats in manual sort order — for the strip below the hero. */
export async function getStats(): Promise<Stat[]> {
  const rows = await prisma.stat.findMany({ orderBy: { sortOrder: "asc" } });
  return rows.map((s) => ({
    id: s.id,
    valueEn: s.valueEn,
    valueHi: s.valueHi ?? undefined,
    labelEn: s.labelEn,
    labelHi: s.labelHi ?? undefined,
  }));
}
