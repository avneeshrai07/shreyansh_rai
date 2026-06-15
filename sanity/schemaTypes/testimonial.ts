import { defineType, defineField } from "sanity";

// COLLECTION — many documents.
export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
      description:
        "Can be initials or first name only if client prefers privacy",
    }),
    defineField({
      name: "clientRoleEn",
      title: "Client Description (English)",
      type: "string",
      description: 'E.g. "Family of the Accused" or "Bail Matter Client"',
    }),
    defineField({
      name: "clientRoleHi",
      title: "Client Description (Hindi)",
      type: "string",
    }),
    defineField({
      name: "quoteEn",
      title: "Testimonial (English)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "quoteHi",
      title: "Testimonial (Hindi)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5)",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: "caseType",
      title: "Case Type",
      type: "string",
      description: 'E.g. "Bail Matter" or "NDPS Case"',
    }),
    defineField({
      name: "isHighlight",
      title: "Feature on Home Page?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Date Received",
      type: "date",
    }),
  ],
  preview: {
    select: { title: "clientName", subtitle: "quoteEn" },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Anonymous",
        subtitle: subtitle ? `${subtitle.slice(0, 60)}...` : undefined,
      };
    },
  },
});
