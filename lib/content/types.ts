// Shared content types for the site + admin CMS.
//
// These mirror the Prisma models (prisma/schema.prisma) but are the plain
// shapes the React views consume. Kept here (not generated) so client
// components can import types without pulling in the Prisma client.

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
  photoUrl?: string;
  // Plain-text paragraphs (one string per paragraph). Replaces the previous
  // Sanity PortableText blocks so the bio is editable in a simple textarea.
  bioEn?: string[];
  bioHi?: string[];
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

export type CaseResult = {
  id: string;
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
  id: string;
  clientName: string;
  clientRoleEn?: string;
  clientRoleHi?: string;
  quoteEn: string;
  quoteHi?: string;
  rating?: number;
  caseType?: string;
  isHighlight?: boolean;
};
