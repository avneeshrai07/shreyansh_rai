import { defineType, defineField } from "sanity";

// SINGLETON — only one "contact" document should ever exist.
export const contact = defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    // --- Intro text ---
    defineField({
      name: "headingEn",
      title: "Section Heading (English)",
      type: "string",
      description: 'E.g. "Get in Touch"',
    }),
    defineField({
      name: "headingHi",
      title: "Section Heading (Hindi)",
      type: "string",
    }),
    defineField({
      name: "subheadingEn",
      title: "Subheading (English)",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "subheadingHi",
      title: "Subheading (Hindi)",
      type: "text",
      rows: 2,
    }),

    // --- Contact Details ---
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      description: "Include country code. E.g. +91 9876543210",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp Number",
      type: "string",
      description: "If different from phone. Used for wa.me link.",
    }),
    defineField({ name: "email", title: "Email Address", type: "string" }),

    // --- Office ---
    defineField({
      name: "officeAddressEn",
      title: "Office Address (English)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "officeAddressHi",
      title: "Office Address (Hindi)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "officeHoursEn",
      title: "Office Hours (English)",
      type: "string",
      description: "E.g. Mon–Sat, 10:00 AM – 6:00 PM",
    }),
    defineField({
      name: "officeHoursHi",
      title: "Office Hours (Hindi)",
      type: "string",
    }),

    // --- Google Maps ---
    defineField({
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description:
        "Paste the embed URL from Google Maps > Share > Embed a map",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
