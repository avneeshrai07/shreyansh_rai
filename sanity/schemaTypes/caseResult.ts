import { defineType, defineField } from "sanity";

// COLLECTION — many documents.
export const caseResult = defineType({
  name: "caseResult",
  title: "Case Results",
  type: "document",
  fields: [
    defineField({
      name: "titleEn",
      title: "Case Title (English)",
      type: "string",
      description:
        'Do NOT use client names. E.g. "Bail Granted in NDPS Act Case — High Court Lucknow"',
    }),
    defineField({
      name: "titleHi",
      title: "Case Title (Hindi)",
      type: "string",
    }),
    defineField({
      name: "outcome",
      title: "Outcome",
      type: "string",
      options: {
        list: [
          { title: "Acquittal", value: "Acquittal" },
          { title: "Bail Granted", value: "Bail Granted" },
          { title: "Charges Dropped", value: "Charges Dropped" },
          { title: "Case Won", value: "Case Won" },
          { title: "Sentence Reduced", value: "Sentence Reduced" },
          { title: "Stay Granted", value: "Stay Granted" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "court",
      title: "Court",
      type: "string",
      options: {
        list: [
          { title: "High Court — Allahabad", value: "High Court — Allahabad" },
          {
            title: "High Court — Lucknow Bench",
            value: "High Court — Lucknow Bench",
          },
          { title: "Sessions Court", value: "Sessions Court" },
          { title: "District Court", value: "District Court" },
          { title: "Supreme Court", value: "Supreme Court" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({ name: "year", title: "Year", type: "number" }),
    defineField({
      name: "category",
      title: "Case Category",
      type: "string",
      options: {
        list: [
          { title: "NDPS / Narcotics", value: "NDPS" },
          { title: "Murder / IPC 302", value: "Murder" },
          { title: "Bail Matter", value: "Bail" },
          { title: "Fraud / Cheating", value: "Fraud" },
          { title: "Cybercrime", value: "Cybercrime" },
          { title: "Sexual Offence", value: "Sexual Offence" },
          { title: "Assault / IPC 307", value: "Assault" },
          { title: "Other Criminal", value: "Other" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "summaryEn",
      title: "Case Summary (English)",
      type: "text",
      rows: 4,
      description:
        "Brief factual summary, no client names. 2–4 sentences max.",
    }),
    defineField({
      name: "summaryHi",
      title: "Case Summary (Hindi)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "isHighlight",
      title: "Feature on Home Page?",
      type: "boolean",
      description:
        "If true, this case appears in the preview strip on the home page (max 3).",
      initialValue: false,
    }),
    defineField({ name: "publishedAt", title: "Date", type: "date" }),
  ],
  orderings: [
    {
      title: "Year, Newest First",
      name: "yearDesc",
      by: [{ field: "year", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "titleEn", subtitle: "outcome" },
    prepare({ title, subtitle }) {
      return { title: title ?? "Untitled case", subtitle };
    },
  },
});
