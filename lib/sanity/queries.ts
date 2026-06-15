import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";

// ---------- GROQ Queries ----------

export const ABOUT_QUERY = `*[_type == "about"][0]`;

export const CONTACT_QUERY = `*[_type == "contact"][0]`;

export const ALL_CASES_QUERY = `
  *[_type == "caseResult"] | order(year desc) {
    _id, titleEn, titleHi, outcome, court, year,
    category, summaryEn, summaryHi, isHighlight
  }
`;

export const HOME_CASES_QUERY = `
  *[_type == "caseResult" && isHighlight == true] | order(year desc) [0...3] {
    _id, titleEn, titleHi, outcome, court, year, summaryEn, summaryHi
  }
`;

export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(publishedAt desc) {
    _id, clientName, clientRoleEn, clientRoleHi,
    quoteEn, quoteHi, rating, caseType, isHighlight
  }
`;

export const HOME_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && isHighlight == true] | order(publishedAt desc) [0...2] {
    _id, clientName, clientRoleEn, clientRoleHi,
    quoteEn, quoteHi, rating, caseType
  }
`;

// ---------- Result Types ----------

export type CaseResult = {
  _id: string;
  titleEn: string;
  titleHi?: string;
  outcome: string;
  court: string;
  year: number;
  category?: string;
  summaryEn: string;
  summaryHi?: string;
  isHighlight?: boolean;
};

export type Testimonial = {
  _id: string;
  clientName: string;
  clientRoleEn?: string;
  clientRoleHi?: string;
  quoteEn: string;
  quoteHi?: string;
  rating?: number;
  caseType?: string;
  isHighlight?: boolean;
};

export type EducationItem = {
  degreeEn?: string;
  degreeHi?: string;
  institutionEn?: string;
  institutionHi?: string;
  year?: string;
};

export type AboutData = {
  fullName?: string;
  designationEn?: string;
  designationHi?: string;
  courtEn?: string;
  courtHi?: string;
  taglineEn?: string;
  taglineHi?: string;
  photo?: SanityImageSource;
  bioEn?: PortableTextBlock[];
  bioHi?: PortableTextBlock[];
  education?: EducationItem[];
  barEnrollmentNumber?: string;
  enrolledSinceYear?: string;
  highlightsEn?: string[];
  highlightsHi?: string[];
  linkedinUrl?: string;
  instagramUrl?: string;
};

export type ContactData = {
  headingEn?: string;
  headingHi?: string;
  subheadingEn?: string;
  subheadingHi?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  officeAddressEn?: string;
  officeAddressHi?: string;
  officeHoursEn?: string;
  officeHoursHi?: string;
  googleMapsEmbedUrl?: string;
};
