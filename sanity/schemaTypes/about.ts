import { defineType, defineField, defineArrayMember } from "sanity";

// SINGLETON — only one "about" document should ever exist.
export const about = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    // --- Personal Info ---
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({
      name: "designationEn",
      title: "Designation (English)",
      type: "string",
    }),
    defineField({
      name: "designationHi",
      title: "Designation (Hindi)",
      type: "string",
    }),
    defineField({
      name: "courtEn",
      title: "Court Name (English)",
      type: "string",
    }),
    defineField({
      name: "courtHi",
      title: "Court Name (Hindi)",
      type: "string",
    }),
    defineField({
      name: "taglineEn",
      title: "Tagline (English)",
      type: "string",
      description:
        'Short punchy tagline. E.g. "Fearless Advocacy. Relentless Justice."',
    }),
    defineField({
      name: "taglineHi",
      title: "Tagline (Hindi)",
      type: "string",
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
    }),

    // --- Bio (rich text) ---
    defineField({
      name: "bioEn",
      title: "Bio (English)",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description:
        "Rich text bio. Write 3–4 paragraphs covering background, philosophy, and approach.",
    }),
    defineField({
      name: "bioHi",
      title: "Bio (Hindi)",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
      description: "Hindi translation of the bio.",
    }),

    // --- Education ---
    defineField({
      name: "education",
      title: "Education",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            { name: "degreeEn", title: "Degree (English)", type: "string" },
            { name: "degreeHi", title: "Degree (Hindi)", type: "string" },
            {
              name: "institutionEn",
              title: "Institution (English)",
              type: "string",
            },
            {
              name: "institutionHi",
              title: "Institution (Hindi)",
              type: "string",
            },
            { name: "year", title: "Year / Duration", type: "string" },
          ],
        }),
      ],
    }),

    // --- Bar Enrollment ---
    defineField({
      name: "barEnrollmentNumber",
      title: "Bar Enrollment Number",
      type: "string",
    }),
    defineField({
      name: "enrolledSinceYear",
      title: "Enrolled Since (Year)",
      type: "string",
    }),

    // --- Experience Highlights ---
    defineField({
      name: "highlightsEn",
      title: "Experience Highlights (English)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      description:
        'Bullet-style highlights. E.g. "Defended 200+ criminal cases at High Court"',
    }),
    defineField({
      name: "highlightsHi",
      title: "Experience Highlights (Hindi)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),

    // --- Social ---
    defineField({ name: "linkedinUrl", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "instagramUrl", title: "Instagram URL", type: "url" }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
