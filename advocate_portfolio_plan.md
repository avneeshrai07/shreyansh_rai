# Advocate Shreyansh Rai — Portfolio Website
## Complete Implementation Plan for Claude Code

---

## 0. THE BRIEF IN ONE PARAGRAPH

Build a **mobile-first, bilingual (English + Hindi), SEO-optimised portfolio website** for
**Shreyansh Rai**, a Criminal Law Advocate practising at the High Court of Judicature at
Allahabad & Lucknow Bench. Stack: **Next.js 14 (App Router) + TypeScript + Tailwind CSS**.
Content for four pages (About, Contact, Case Results, Testimonials) is managed through an
embedded **Sanity CMS Studio** at `/studio`. The visual direction is **clean & minimal** —
white/slate backgrounds, amber-gold accent, Playfair Display headings, Inter body text. Mobile
layout takes full priority over desktop layout in every design decision.

---

## 1. TECH STACK

| Layer | Choice | Version / Notes |
|---|---|---|
| Framework | Next.js | 14.x, App Router only — no Pages Router |
| Language | TypeScript | Strict mode on |
| Styling | Tailwind CSS | v3, no other CSS-in-JS |
| CMS | Sanity.io | v3, embedded studio at `/studio` |
| Sanity Next.js bridge | next-sanity | latest |
| Image handling (Sanity) | @sanity/image-url | latest |
| Fonts | next/font/google | Playfair Display + Inter |
| Icons | lucide-react | latest |
| Deployment target | Vercel | (affects image config) |

**Do NOT install:** framer-motion, radix-ui, shadcn, react-query, axios, or any component library.
Keep dependencies minimal.

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette (extend in tailwind.config.ts)

```ts
colors: {
  brand: {
    gold:       '#92400e', // amber-800 — primary accent (CTAs, borders, highlights)
    'gold-light': '#d97706', // amber-600 — hover states
    'gold-faint': '#fef3c7', // amber-50  — subtle tinted backgrounds
  },
  surface: {
    base:  '#ffffff',
    soft:  '#f8fafc', // slate-50 — page backgrounds
    muted: '#f1f5f9', // slate-100 — card backgrounds
  },
  text: {
    primary:   '#0f172a', // slate-900
    secondary: '#475569', // slate-600
    muted:     '#94a3b8', // slate-400
  }
}
```

### 2.2 Typography (in tailwind.config.ts)

```ts
fontFamily: {
  serif: ['var(--font-playfair)', 'Georgia', 'serif'],   // headings
  sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'], // body, UI
}
```

In `app/layout.tsx` load both via `next/font/google`:

```ts
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
```

Apply both variables to the `<html>` tag: `className={`${playfair.variable} ${inter.variable}`}`

### 2.3 Type Scale (use these Tailwind classes consistently)

| Role | Mobile | Desktop | Font |
|---|---|---|---|
| Hero headline | `text-4xl` | `text-6xl` | serif, font-bold |
| Page h1 | `text-3xl` | `text-5xl` | serif, font-bold |
| Section h2 | `text-2xl` | `text-3xl` | serif, font-semibold |
| Card h3 | `text-lg` | `text-xl` | serif, font-medium |
| Body text | `text-base` | `text-base` | sans, font-normal |
| Small / caption | `text-sm` | `text-sm` | sans, text-text-secondary |
| Label / badge | `text-xs` | `text-xs` | sans, uppercase, tracking-wider |

### 2.4 Spacing & Layout Rules

- Page horizontal padding: `px-4` mobile → `px-6` md → `px-8` lg
- Max content width: `max-w-5xl mx-auto` (never wider than 1024px for readability)
- Section vertical padding: `py-16` mobile → `py-24` desktop
- All grids start `grid-cols-1` on mobile, expand at `md:` or `lg:`
- Card border radius: `rounded-lg` (8px) — never sharp corners, never pill shapes
- Minimum tap target: `min-h-[44px] min-w-[44px]` on all interactive elements

### 2.5 Signature Design Element

The signature visual element of this site is a **3px vertical amber-gold left border
(`border-l-4 border-brand-gold`)** that appears on: the hero headline, section headings on
About page, quote blocks in testimonials. This thin gold bar is the one recurring brand mark
throughout the site. It should NOT be overused — only on the most important textual moments
per page.

### 2.6 Buttons

```
Primary CTA:   bg-brand-gold text-white px-6 py-3 rounded-lg font-sans font-medium
               hover:bg-brand-gold-light transition-colors min-h-[44px]

Ghost CTA:     border border-brand-gold text-brand-gold px-6 py-3 rounded-lg
               hover:bg-brand-gold-faint transition-colors min-h-[44px]

Text link:     text-brand-gold underline-offset-4 hover:underline font-sans
```

---

## 3. FOLDER STRUCTURE (COMPLETE)

```
advocate-portfolio/
├── app/
│   ├── layout.tsx                        ← Root layout: fonts, metadata, Navbar, Footer
│   ├── page.tsx                          ← Home page (static)
│   ├── about/
│   │   └── page.tsx                      ← About page (fetches from Sanity)
│   ├── practice-areas/
│   │   └── page.tsx                      ← Practice Areas (static)
│   ├── case-results/
│   │   └── page.tsx                      ← Case Results (fetches from Sanity)
│   ├── testimonials/
│   │   └── page.tsx                      ← Testimonials (fetches from Sanity)
│   ├── contact/
│   │   └── page.tsx                      ← Contact page (fetches from Sanity)
│   ├── studio/
│   │   └── [[...tool]]/
│   │       └── page.tsx                  ← Embedded Sanity Studio
│   ├── sitemap.ts                        ← Auto XML sitemap
│   └── robots.ts                         ← robots.txt rules
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx                    ← Sticky, mobile hamburger, EN|हिं toggle
│   │   └── Footer.tsx                    ← Links, court info, social icons
│   ├── sections/
│   │   ├── Hero.tsx                      ← Home hero (see Section 6 for full spec)
│   │   ├── StatsStrip.tsx                ← 3 key numbers below hero
│   │   ├── HomePracticeSnippet.tsx       ← Practice areas preview on home
│   │   ├── HomeCasesSnippet.tsx          ← Latest 3 cases preview on home
│   │   ├── HomeTestimonialsSnippet.tsx   ← Latest 2 testimonials on home
│   │   ├── HomeCTA.tsx                   ← Final CTA band before footer
│   │   ├── CaseCard.tsx                  ← Reusable case result card
│   │   └── TestimonialCard.tsx           ← Reusable testimonial card
│   └── ui/
│       ├── LanguageToggle.tsx            ← EN / हिं switch button
│       ├── SectionHeader.tsx             ← Reusable section label + h2
│       ├── CredentialBadge.tsx           ← Pill badge for qualifications
│       └── PageHero.tsx                  ← Reusable inner-page hero banner (not home)
│
├── context/
│   └── LanguageContext.tsx               ← Global EN/HI state + hook
│
├── lib/
│   ├── content/
│   │   ├── en.ts                         ← All English static strings
│   │   ├── hi.ts                         ← All Hindi static strings
│   │   └── index.ts                      ← Exports useContent() hook
│   └── sanity/
│       ├── client.ts                     ← Sanity client config
│       └── queries.ts                    ← All GROQ queries
│
├── sanity/
│   ├── schemaTypes/
│   │   ├── index.ts                      ← Exports all schemas
│   │   ├── about.ts                      ← About page schema
│   │   ├── contact.ts                    ← Contact page schema
│   │   ├── caseResult.ts                 ← Case Result document schema
│   │   └── testimonial.ts               ← Testimonial document schema
│   └── sanity.config.ts                  ← Sanity Studio config
│
├── public/
│   └── og-image.png                      ← Open Graph fallback image (1200×630)
│
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── sanity.cli.ts
```

---

## 4. DEPENDENCIES (package.json)

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "next-sanity": "^9.0.0",
    "@sanity/image-url": "^1.0.0",
    "sanity": "^3.0.0",
    "lucide-react": "^0.400.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3",
    "autoprefixer": "^10",
    "postcss": "^8"
  }
}
```

---

## 5. SANITY CMS SETUP

### 5.1 Environment Variables (.env.local)

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
```

### 5.2 next.config.ts — allow Sanity image CDN

```ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}
```

### 5.3 Sanity Client (lib/sanity/client.ts)

```ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})
```

### 5.4 Studio Page (app/studio/[[...tool]]/page.tsx)

```ts
'use client'
import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

Add to `next.config.ts`: the `/studio` route must NOT be server-rendered — it's client only.

---

## 6. SANITY SCHEMAS (4 schemas total)

### 6.1 about.ts — SINGLETON document

```ts
// This is a SINGLETON — only one "about" document ever exists.
// In Sanity Studio, use a "Desk Structure" config to show it as a single item,
// not a list.

export const about = {
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    // --- Personal Info ---
    { name: 'fullName', title: 'Full Name', type: 'string' },
    { name: 'designationEn', title: 'Designation (English)', type: 'string' },
    { name: 'designationHi', title: 'Designation (Hindi)', type: 'string' },
    { name: 'courtEn', title: 'Court Name (English)', type: 'string' },
    { name: 'courtHi', title: 'Court Name (Hindi)', type: 'string' },
    { name: 'taglineEn', title: 'Tagline (English)', type: 'string',
      description: 'Short punchy tagline. E.g. "Fearless Advocacy. Relentless Justice."' },
    { name: 'taglineHi', title: 'Tagline (Hindi)', type: 'string' },
    { name: 'photo', title: 'Profile Photo', type: 'image',
      options: { hotspot: true } },

    // --- Bio ---
    {
      name: 'bioEn', title: 'Bio (English)', type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text bio. Write 3–4 paragraphs covering background, philosophy, and approach.'
    },
    {
      name: 'bioHi', title: 'Bio (Hindi)', type: 'array',
      of: [{ type: 'block' }],
      description: 'Hindi translation of the bio.'
    },

    // --- Education (array) ---
    {
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'degreeEn', title: 'Degree (English)', type: 'string' },
          { name: 'degreeHi', title: 'Degree (Hindi)', type: 'string' },
          { name: 'institutionEn', title: 'Institution (English)', type: 'string' },
          { name: 'institutionHi', title: 'Institution (Hindi)', type: 'string' },
          { name: 'year', title: 'Year / Duration', type: 'string' },
        ]
      }]
    },

    // --- Bar Enrollment ---
    { name: 'barEnrollmentNumber', title: 'Bar Enrollment Number', type: 'string' },
    { name: 'enrolledSinceYear', title: 'Enrolled Since (Year)', type: 'string' },

    // --- Experience Highlights (array of strings) ---
    {
      name: 'highlightsEn',
      title: 'Experience Highlights (English)',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet-style highlights. E.g. "Defended 200+ criminal cases at High Court"'
    },
    {
      name: 'highlightsHi',
      title: 'Experience Highlights (Hindi)',
      type: 'array',
      of: [{ type: 'string' }]
    },

    // --- Social / Contact (for About page display) ---
    { name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' },
    { name: 'instagramUrl', title: 'Instagram URL', type: 'url' },
  ]
}
```

### 6.2 contact.ts — SINGLETON document

```ts
export const contact = {
  name: 'contact',
  title: 'Contact Page',
  type: 'document',
  fields: [
    // --- Intro text ---
    { name: 'headingEn', title: 'Section Heading (English)', type: 'string',
      description: 'E.g. "Get in Touch"' },
    { name: 'headingHi', title: 'Section Heading (Hindi)', type: 'string' },
    { name: 'subheadingEn', title: 'Subheading (English)', type: 'text', rows: 2 },
    { name: 'subheadingHi', title: 'Subheading (Hindi)', type: 'text', rows: 2 },

    // --- Contact Details ---
    { name: 'phone', title: 'Phone Number', type: 'string',
      description: 'Include country code. E.g. +91 9876543210' },
    { name: 'whatsapp', title: 'WhatsApp Number', type: 'string',
      description: 'If different from phone. Used for wa.me link.' },
    { name: 'email', title: 'Email Address', type: 'string' },

    // --- Office ---
    { name: 'officeAddressEn', title: 'Office Address (English)', type: 'text', rows: 3 },
    { name: 'officeAddressHi', title: 'Office Address (Hindi)', type: 'text', rows: 3 },
    { name: 'officeHoursEn', title: 'Office Hours (English)', type: 'string',
      description: 'E.g. Mon–Sat, 10:00 AM – 6:00 PM' },
    { name: 'officeHoursHi', title: 'Office Hours (Hindi)', type: 'string' },

    // --- Google Maps ---
    { name: 'googleMapsEmbedUrl', title: 'Google Maps Embed URL', type: 'url',
      description: 'Paste the embed URL from Google Maps > Share > Embed a map' },
  ]
}
```

### 6.3 caseResult.ts — COLLECTION (many documents)

```ts
export const caseResult = {
  name: 'caseResult',
  title: 'Case Results',
  type: 'document',
  fields: [
    { name: 'titleEn', title: 'Case Title (English)', type: 'string',
      description: 'Do NOT use client names. E.g. "Bail Granted in NDPS Act Case — High Court Lucknow"' },
    { name: 'titleHi', title: 'Case Title (Hindi)', type: 'string' },
    {
      name: 'outcome',
      title: 'Outcome',
      type: 'string',
      options: {
        list: [
          { title: 'Acquittal', value: 'Acquittal' },
          { title: 'Bail Granted', value: 'Bail Granted' },
          { title: 'Charges Dropped', value: 'Charges Dropped' },
          { title: 'Case Won', value: 'Case Won' },
          { title: 'Sentence Reduced', value: 'Sentence Reduced' },
          { title: 'Stay Granted', value: 'Stay Granted' },
        ],
        layout: 'radio',
      }
    },
    {
      name: 'court',
      title: 'Court',
      type: 'string',
      options: {
        list: [
          { title: 'High Court — Allahabad', value: 'High Court — Allahabad' },
          { title: 'High Court — Lucknow Bench', value: 'High Court — Lucknow Bench' },
          { title: 'Sessions Court', value: 'Sessions Court' },
          { title: 'District Court', value: 'District Court' },
          { title: 'Supreme Court', value: 'Supreme Court' },
        ],
        layout: 'dropdown',
      }
    },
    { name: 'year', title: 'Year', type: 'number' },
    {
      name: 'category',
      title: 'Case Category',
      type: 'string',
      options: {
        list: [
          { title: 'NDPS / Narcotics', value: 'NDPS' },
          { title: 'Murder / IPC 302', value: 'Murder' },
          { title: 'Bail Matter', value: 'Bail' },
          { title: 'Fraud / Cheating', value: 'Fraud' },
          { title: 'Cybercrime', value: 'Cybercrime' },
          { title: 'Sexual Offence', value: 'Sexual Offence' },
          { title: 'Assault / IPC 307', value: 'Assault' },
          { title: 'Other Criminal', value: 'Other' },
        ],
        layout: 'dropdown',
      }
    },
    {
      name: 'summaryEn',
      title: 'Case Summary (English)',
      type: 'text',
      rows: 4,
      description: 'Brief factual summary, no client names. 2–4 sentences max.'
    },
    {
      name: 'summaryHi',
      title: 'Case Summary (Hindi)',
      type: 'text',
      rows: 4,
    },
    {
      name: 'isHighlight',
      title: 'Feature on Home Page?',
      type: 'boolean',
      description: 'If true, this case appears in the preview strip on the home page (max 3).',
      initialValue: false,
    },
    { name: 'publishedAt', title: 'Date', type: 'date' },
  ],
  orderings: [
    { title: 'Year, Newest First', name: 'yearDesc',
      by: [{ field: 'year', direction: 'desc' }] }
  ],
  preview: {
    select: { title: 'titleEn', subtitle: 'outcome', media: 'year' },
    prepare({ title, subtitle }) {
      return { title, subtitle }
    }
  }
}
```

### 6.4 testimonial.ts — COLLECTION (many documents)

```ts
export const testimonial = {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    { name: 'clientName', title: 'Client Name', type: 'string',
      description: 'Can be initials or first name only if client prefers privacy' },
    { name: 'clientRoleEn', title: 'Client Description (English)', type: 'string',
      description: 'E.g. "Family of the Accused" or "Bail Matter Client"' },
    { name: 'clientRoleHi', title: 'Client Description (Hindi)', type: 'string' },
    { name: 'quoteEn', title: 'Testimonial (English)', type: 'text', rows: 4 },
    { name: 'quoteHi', title: 'Testimonial (Hindi)', type: 'text', rows: 4 },
    {
      name: 'rating',
      title: 'Rating (1–5)',
      type: 'number',
      validation: (Rule: any) => Rule.min(1).max(5).integer(),
    },
    { name: 'caseType', title: 'Case Type', type: 'string',
      description: 'E.g. "Bail Matter" or "NDPS Case"' },
    { name: 'isHighlight', title: 'Feature on Home Page?', type: 'boolean',
      initialValue: false },
    { name: 'publishedAt', title: 'Date Received', type: 'date' },
  ],
  preview: {
    select: { title: 'clientName', subtitle: 'quoteEn' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle?.slice(0, 60) + '...' }
    }
  }
}
```

### 6.5 GROQ Queries (lib/sanity/queries.ts)

```ts
export const ABOUT_QUERY = `*[_type == "about"][0]`

export const CONTACT_QUERY = `*[_type == "contact"][0]`

export const ALL_CASES_QUERY = `
  *[_type == "caseResult"] | order(year desc) {
    _id, titleEn, titleHi, outcome, court, year,
    category, summaryEn, summaryHi, isHighlight
  }
`

export const HOME_CASES_QUERY = `
  *[_type == "caseResult" && isHighlight == true] | order(year desc) [0...3] {
    _id, titleEn, titleHi, outcome, court, year, summaryEn, summaryHi
  }
`

export const ALL_TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(publishedAt desc) {
    _id, clientName, clientRoleEn, clientRoleHi,
    quoteEn, quoteHi, rating, caseType, isHighlight
  }
`

export const HOME_TESTIMONIALS_QUERY = `
  *[_type == "testimonial" && isHighlight == true] | order(publishedAt desc) [0...2] {
    _id, clientName, clientRoleEn, clientRoleHi,
    quoteEn, quoteHi, rating, caseType
  }
`
```

---

## 7. BILINGUAL SYSTEM

### 7.1 LanguageContext (context/LanguageContext.tsx)

```tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'hi'

const LanguageContext = createContext<{
  lang: Language
  setLang: (l: Language) => void
}>({ lang: 'en', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')
  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLang = () => useContext(LanguageContext)
```

Wrap the root layout's `<body>` with `<LanguageProvider>`.

### 7.2 useContent Hook (lib/content/index.ts)

```ts
import { useLang } from '@/context/LanguageContext'
import { en } from './en'
import { hi } from './hi'

export function useContent() {
  const { lang } = useLang()
  return lang === 'hi' ? hi : en
}
```

### 7.3 Content File Structure (lib/content/en.ts)

The content file must export an object with these keys (Claude Code must fill in
Hindi translations in hi.ts):

```ts
export const en = {
  nav: {
    home: 'Home',
    about: 'About',
    practiceAreas: 'Practice Areas',
    caseResults: 'Case Results',
    testimonials: 'Testimonials',
    contact: 'Contact',
    consultNow: 'Consult Now',
  },
  hero: {
    courtLabel: 'High Court of Judicature at Allahabad & Lucknow Bench',
    headline: 'Your Rights.\nMy Fight.',
    subheadline: 'Shreyansh Rai',
    designation: 'Criminal Law Advocate',
    credentials: ['BA.LLB (Hons.)', 'LLM — Criminal & Security Law'],
    cta1: 'Consult Now',
    cta2: 'View Case Results',
  },
  stats: [
    { value: '200+', label: 'Cases Handled' },
    { value: '4+', label: 'Years of Practice' },
    { value: 'High Court', label: 'Primary Court' },
  ],
  practiceAreas: {
    heading: 'Practice Areas',
    label: 'Areas of Expertise',
    items: [
      {
        title: 'Bail & Anticipatory Bail',
        description: 'Securing bail at Sessions Court, High Court, and Supreme Court in complex criminal matters including NDPS, murder, and economic offences.',
        icon: 'Scale',
      },
      {
        title: 'Criminal Trial Defence',
        description: 'Full-spectrum trial defence from charge framing through final arguments — IPC, NDPS, POCSO, Prevention of Corruption Act, and more.',
        icon: 'Gavel',
      },
      {
        title: 'Anticipatory Bail & FIR Quashing',
        description: 'Pre-arrest protection and quashing of FIRs under CrPC / BNSS before the High Court of Allahabad.',
        icon: 'Shield',
      },
      {
        title: 'Appeals & Revisions',
        description: 'Filing and arguing criminal appeals, revisions, and SLPs against conviction orders and sentence enhancement matters.',
        icon: 'FileText',
      },
      {
        title: 'Cybercrime Defence',
        description: 'Defence in cases under the IT Act, cyber fraud, and digital evidence matters — a rapidly growing area requiring specialised knowledge.',
        icon: 'Monitor',
      },
      {
        title: 'NDPS / Narcotics Cases',
        description: 'Handling NDPS Act cases at trial and appellate level — bail, discharge, and acquittal with focus on technical and procedural defences.',
        icon: 'BookOpen',
      },
    ],
  },
  about: {
    sectionLabel: 'About Shreyansh Rai',
    heading: 'A Criminal Lawyer Who Fights for Every Client\'s Right to a Fair Defence',
  },
  caseResults: {
    sectionLabel: 'Track Record',
    heading: 'Case Results',
  },
  testimonials: {
    sectionLabel: 'Client Voices',
    heading: 'What Clients Say',
  },
  contact: {
    sectionLabel: 'Get in Touch',
    heading: 'Book a Consultation',
  },
  footer: {
    tagline: 'Criminal Law Advocate — High Court, Allahabad & Lucknow Bench',
    disclaimer: 'This website is for informational purposes only and does not constitute legal advice. Engaging Advocate Shreyansh Rai does not create an attorney-client relationship until a formal engagement letter is signed.',
    links: {
      heading: 'Quick Links',
    },
    contact: {
      heading: 'Contact',
    },
    copyright: '© 2024 Shreyansh Rai. All rights reserved.',
  },
}
```

**Note for Claude Code:** Create `lib/content/hi.ts` with the exact same structure but all
strings translated to Hindi (Devanagari script). Key Hindi translations to use:
- Home → होम, About → परिचय, Practice Areas → अभ्यास क्षेत्र
- Case Results → मामलों के परिणाम, Testimonials → प्रशंसापत्र, Contact → संपर्क करें
- Hero headline → "आपके अधिकार।\nमेरी लड़ाई।"
- Consult Now → अभी परामर्श करें

### 7.4 LanguageToggle Component

```tsx
// In Navbar — renders as a small toggle button
// NOT a dropdown — just a single button that switches between EN / हिं

<button
  onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
  className="font-sans text-sm border border-slate-300 rounded px-2 py-1 hover:border-brand-gold transition-colors"
  aria-label="Toggle language"
>
  {lang === 'en' ? 'हिं' : 'EN'}
</button>
```

Place it in the Navbar between the last nav link and the "Consult Now" CTA button.

---

## 8. NAVBAR (components/layout/Navbar.tsx)

**Behaviour:**
- Sticky at top (`sticky top-0 z-50`)
- Background: `bg-white/95 backdrop-blur-sm border-b border-slate-100`
- On mobile: shows logo + hamburger icon only. Nav links are hidden.
- Hamburger opens a full-width slide-down mobile menu (no sidebar, no overlay drawer — just a
  `<div>` that slides down below the navbar, with all nav links stacked vertically, and the
  language toggle + consult button at the bottom)
- Mobile menu background: `bg-white`, full width, `py-4 px-4` with each link on its own row
- Close mobile menu when any nav link is clicked

**Desktop layout (md: and up):**
```
[Logo / Name]    [Home] [About] [Areas] [Cases] [Testimonials] [Contact]   [EN|हिं]  [Consult Now CTA]
```

**Mobile layout:**
```
[Logo / Name]                                           [☰ or ✕]
```

**Logo:** Display "SR" in `font-serif text-xl font-bold text-brand-gold` + next to it
"Shreyansh Rai" in `font-sans text-sm text-text-secondary` on two lines. Wrap in a `<Link href="/">`.

**Active link:** Apply `text-brand-gold font-medium` to the currently active route
(use `usePathname()` from next/navigation to detect).

---

## 9. FOOTER (components/layout/Footer.tsx)

**Layout (mobile: stacked, desktop: 3 columns):**

```
Column 1:
  [SR Logo + Name]
  Short tagline
  Social icons (LinkedIn, Instagram)

Column 2:
  Quick Links (nav links list)

Column 3:
  Contact
  Phone, Email, WhatsApp link
```

Below the 3 columns: full-width grey divider, then:
- Left: copyright text
- Right: disclaimer text (smaller, muted, 2 lines)

The **legal disclaimer** about informational purposes must always appear in the footer.

---

## 10. HOME PAGE (app/page.tsx) — STATIC

The home page is a Server Component that:
1. Fetches `HOME_CASES_QUERY` from Sanity (highlighted cases)
2. Fetches `HOME_TESTIMONIALS_QUERY` from Sanity (highlighted testimonials)
3. Renders the following sections in order:

```
<Hero />
<StatsStrip />
<HomePracticeSnippet />     ← static content from en/hi.ts
<HomeCasesSnippet cases={cases} />
<HomeTestimonialsSnippet testimonials={testimonials} />
<HomeCTA />
```

---

## 11. HERO SECTION — DETAILED SPEC (components/sections/Hero.tsx)

This is a CLIENT COMPONENT (needs `useLang()` for bilingual text).

### 11.1 Mobile Layout (default, full viewport height)

```
┌────────────────────────────────┐
│  bg-surface-soft               │
│  pt-8 pb-12 px-4               │
│                                 │
│  ┌─ Label row ────────────────┐│
│  │ ○ [thin gold dot]          ││
│  │ HIGH COURT OF JUDICATURE   ││  ← text-xs uppercase tracking-widest
│  │ AT ALLAHABAD &             ││     text-brand-gold font-sans
│  │ LUCKNOW BENCH              ││
│  └────────────────────────────┘│
│                                 │
│  ┌─ Headline ─────────────────┐│
│  │ ┃ Your Rights.             ││  ← border-l-4 border-brand-gold
│  │ ┃ My Fight.                ││     pl-4 font-serif text-4xl
│  │                            ││     font-bold text-text-primary
│  │                            ││     leading-tight mt-4
│  └────────────────────────────┘│
│                                 │
│  Shreyansh Rai                 │  ← font-serif text-xl text-text-secondary
│  Criminal Law Advocate         │  ← font-sans text-sm text-text-muted mt-1
│                                 │
│  ┌─ Credential Badges ────────┐│
│  │ [BA.LLB (Hons.)] [LLM]    ││  ← pill badges, mt-4
│  └────────────────────────────┘│
│                                 │
│  ┌─ CTA buttons ──────────────┐│
│  │ [Consult Now ─────────────]││  ← Primary, full width, mt-6
│  │ [View Case Results ────────]││  ← Ghost, full width, mt-3
│  └────────────────────────────┘│
│                                 │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━│  ← thin divider
│                                 │
│  ┌─ Advocate Photo ───────────┐│
│  │                            ││  ← Next.js <Image> component
│  │   [Portrait Placeholder]   ││     aspect-ratio: 4/5
│  │                            ││     rounded-lg, w-full
│  │                            ││     object-cover object-top
│  └────────────────────────────┘│
└────────────────────────────────┘
```

### 11.2 Desktop Layout (md: and above)

```
┌─────────────────────────────────────────────────────┐
│  bg-surface-soft    min-h-screen                     │
│  max-w-5xl mx-auto  py-24 px-8                       │
│                                                      │
│  ┌──────────────────────┬──────────────────────┐     │
│  │  LEFT COLUMN (60%)   │  RIGHT COLUMN (40%)  │     │
│  │                      │                      │     │
│  │  ○ COURT LABEL       │  ┌────────────────┐  │     │
│  │                      │  │                │  │     │
│  │  ┃ Your Rights.      │  │  [Portrait     │  │     │
│  │  ┃ My Fight.         │  │   Photo]       │  │     │
│  │                      │  │                │  │     │
│  │  Shreyansh Rai       │  │  ┌──────────┐  │  │     │
│  │  Criminal Law Adv.   │  │  │ Shreyansh│  │  │     │
│  │                      │  │  │ Rai      │  │  │     │
│  │  [Badges]            │  │  │ Advocate │  │  │     │
│  │                      │  │  └──────────┘  │  │     │
│  │  [Consult Now]       │  │  ← name badge  │  │     │
│  │  [View Cases]        │  │    overlaid on │  │     │
│  │                      │  │    bottom of   │  │     │
│  │                      │  │    the photo   │  │     │
│  │                      │  └────────────────┘  │     │
│  └──────────────────────┴──────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

**Desktop photo treatment:** The portrait image sits in a tall card (`aspect-[4/5]`). At the
bottom-left of the card, overlay a small name badge: `bg-white/90 backdrop-blur-sm px-3 py-2
rounded-md` showing name in serif font and "Advocate" in sans. This is NOT a hero overlay
background — the photo itself has no darkening filter; only the bottom name badge.

### 11.3 CSS Animation (CSS only, no JS library)

On page load:
- The court label fades in: `animate-fade-in` with `animation-delay: 0ms`
- The gold-bordered headline fades up: `animate-fade-up` with `animation-delay: 150ms`
- Name + designation: `animation-delay: 300ms`
- Badges: `animation-delay: 450ms`
- Buttons: `animation-delay: 600ms`
- Photo (mobile: below; desktop: right): `animation-delay: 300ms`

Add to `globals.css`:

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in { animation: fadeIn 0.6s ease forwards; opacity: 0; }
.animate-fade-up { animation: fadeUp 0.6s ease forwards; opacity: 0; }

@media (prefers-reduced-motion: reduce) {
  .animate-fade-in, .animate-fade-up { animation: none; opacity: 1; }
}
```

Use inline `style={{ animationDelay: '150ms' }}` for each element's delay.

### 11.4 Placeholder for Photo

Until a real photo is provided, render a styled placeholder:
```tsx
<div className="w-full aspect-[4/5] bg-slate-200 rounded-lg flex items-end p-4">
  <div className="w-10 h-10 rounded-full bg-slate-300 mr-3" />
  <div>
    <div className="h-3 w-24 bg-slate-300 rounded mb-1" />
    <div className="h-2 w-16 bg-slate-200 rounded" />
  </div>
</div>
```

---

## 12. STATS STRIP (components/sections/StatsStrip.tsx)

Renders immediately below the Hero. Dark background band.

```
bg-text-primary (slate-900)  py-8 px-4

Mobile: 3 items stacked vertically
Desktop: 3 items in a row (grid-cols-3)

Each stat:
  [200+]              ← text-3xl font-serif font-bold text-brand-gold-light
  Cases Handled       ← text-sm font-sans text-slate-400 uppercase tracking-wider mt-1

Stats data (from en/hi.ts):
  200+  → Cases Handled
  4+    → Years of Practice
  High Court → Primary Court
```

Dividers between stats on desktop: `border-l border-slate-700` on 2nd and 3rd items.

---

## 13. PRACTICE AREAS PAGE (static, app/practice-areas/page.tsx)

This page is fully static — content comes from `en/hi.ts`. No Sanity needed.

**Layout:**

1. `<PageHero>` banner — title "Practice Areas" + subtitle
2. Intro paragraph about criminal law focus
3. 6 practice area cards in a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid

**Each card:**
```
bg-surface-muted rounded-lg p-6 hover:shadow-md transition-shadow

[Icon (lucide)]          ← text-brand-gold, size 24
[Card Title]             ← font-serif text-lg mt-3
[Description]            ← font-sans text-sm text-text-secondary mt-2 leading-relaxed
```

Use these lucide icons mapped to practice areas:
- Bail → `Scale`
- Criminal Trial → `Gavel` (note: if Gavel isn't in lucide, use `BookOpen`)
- FIR Quashing → `Shield`
- Appeals → `FileText`
- Cybercrime → `Monitor`
- NDPS → `AlertTriangle`

---

## 14. ABOUT PAGE (app/about/page.tsx) — SANITY CMS

This is a **Server Component** that fetches `ABOUT_QUERY` from Sanity.

**Layout sections:**

### Section 1 — PageHero banner
Title: "About Shreyansh Rai" / full designation below

### Section 2 — Profile Split
```
Mobile: stacked (photo top, bio below)
Desktop: grid-cols-[1fr_2fr] (photo left, content right)

Left: Portrait photo from Sanity (Next.js <Image>)
      aspect-[3/4] rounded-lg object-cover

Right:
  [Gold-bar bordered label] "About"
  [H1] Full name in serif
  [Designation + Court]
  [Bio rich text] — render Sanity block content
```

### Section 3 — Education
```
[SectionHeader] "Education"

Timeline-style list (NOT numbered):
  For each education item:
    ●  [Degree Name]    ← font-serif font-medium
       [Institution]    ← font-sans text-text-secondary
       [Year]           ← text-xs text-text-muted

Connect items with a vertical line: border-l-2 border-slate-200 ml-2 pl-6
```

### Section 4 — Experience Highlights
```
[SectionHeader] "Experience Highlights"

Grid of highlight cards (grid-cols-1 md:grid-cols-2):
  Each card: bg-surface-muted rounded-lg p-4
    → Checkmark icon (text-brand-gold) + highlight text
```

### Section 5 — Bar Enrollment
Simple info row: "Enrolled with Bar Council | Since [year] | Enrollment No. [number]"
Render as a `bg-brand-gold-faint border border-amber-200 rounded-lg p-4` info box.

### Handling Sanity Rich Text (block content)
Use `@portabletext/react` package to render Sanity block content:
```bash
npm install @portabletext/react
```

---

## 15. CASE RESULTS PAGE (app/case-results/page.tsx) — SANITY CMS

Server Component. Fetches `ALL_CASES_QUERY`.

**Layout:**

1. `<PageHero>` banner
2. Filter bar (client-side — make this a Client Component sub-section):
   - Filter by Court (dropdown)
   - Filter by Outcome (dropdown)
   - Filter by Category (dropdown)
   - All filters default to "All"
3. Results grid:

```
grid-cols-1 md:grid-cols-2 gap-6

Each <CaseCard>:
  bg-white border border-slate-100 rounded-lg p-5 hover:border-brand-gold transition-colors

  TOP ROW:
    [Outcome badge]   ← e.g. "Acquittal" in green, "Bail Granted" in blue
    [Year]            ← text-sm text-text-muted ml-auto

  [Case Title]        ← font-serif text-lg mt-3

  [Court]             ← text-xs uppercase tracking-wide text-brand-gold mt-1

  [Summary]           ← font-sans text-sm text-text-secondary mt-2 line-clamp-3

  [Category tag]      ← small pill, mt-3, bg-surface-muted
```

**Outcome badge colors:**
- Acquittal → `bg-green-50 text-green-700 border border-green-200`
- Bail Granted → `bg-blue-50 text-blue-700 border border-blue-200`
- Charges Dropped → `bg-purple-50 text-purple-700 border border-purple-200`
- Case Won → `bg-emerald-50 text-emerald-700 border border-emerald-200`
- Sentence Reduced → `bg-orange-50 text-orange-700 border border-orange-200`
- Stay Granted → `bg-amber-50 text-amber-700 border border-amber-200`

**Bilingual:** Show title and summary in the language selected via `useLang()`.
Since this is a Server Component that fetches data, the Sanity data always includes
both `titleEn`/`titleHi`. Pass the full data to a Client Component that handles
language toggling.

---

## 16. TESTIMONIALS PAGE (app/testimonials/page.tsx) — SANITY CMS

Server Component. Fetches `ALL_TESTIMONIALS_QUERY`.

**Layout:**

1. `<PageHero>` banner
2. Masonry-style grid (use CSS columns, not a library):

```css
/* Tailwind utility approach */
columns-1 md:columns-2 gap-6 space-y-6
```

Each `<TestimonialCard>`:
```
bg-white border border-slate-100 rounded-lg p-6
break-inside-avoid mb-6   ← CRITICAL for columns layout

TOP: Star rating (★★★★★ in amber, using Unicode ★ character)

[Quote]    ← Start with large decorative " character in brand-gold
           font-serif italic text-base text-text-primary
           border-l-4 border-brand-gold pl-4 mt-4  ← signature gold bar

BOTTOM ROW:
  [Initials avatar]   ← w-10 h-10 rounded-full bg-brand-gold-faint
                        flex items-center justify-center
                        font-serif text-brand-gold text-sm
  [Client Name]       ← font-sans font-medium text-text-primary
  [Case Type / Role]  ← text-xs text-text-muted
```

---

## 17. CONTACT PAGE (app/contact/page.tsx) — SANITY CMS

Server Component for data fetching. The form itself is a `<ContactForm>` Client Component.

**Layout:**

### Section 1 — PageHero with heading from Sanity

### Section 2 — Two-column grid (mobile: stacked)

```
LEFT COLUMN (Contact Info — from Sanity):
  [Phone]         — clickable tel: link
  [Email]         — clickable mailto: link
  [WhatsApp]      — clickable wa.me link with message "Hello, I need legal consultation."
  [Office Address]
  [Office Hours]

Each item:
  Icon (lucide: Phone, Mail, MessageCircle, MapPin, Clock) in text-brand-gold
  Label text
  Value (clickable if applicable)

RIGHT COLUMN (Contact Form — UI only):

  Form fields:
    Full Name *     → text input
    Phone Number *  → tel input
    Email Address   → email input (optional)
    Matter Type *   → <select> dropdown with options:
                      Bail Matter / Criminal Trial / FIR Quashing /
                      Appeal / Cybercrime / NDPS / General Enquiry
    Brief Description * → <textarea> rows=4
    Preferred Language  → Radio: English / Hindi

  Submit Button:
    Primary CTA style, full width on mobile
    Text: "Send Message" / "संदेश भेजें"
    On click: show a success message div (no actual API call):
      "Thank you. We will contact you within 24 hours."
      "धन्यवाद। हम 24 घंटे के भीतर संपर्क करेंगे।"

  Legal note below form (small text, muted):
    "This form does not create an attorney-client relationship."
```

### Section 3 — Google Maps Embed

```tsx
<div className="mt-12 rounded-lg overflow-hidden h-64 md:h-96">
  <iframe
    src={contactData.googleMapsEmbedUrl}
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
```

If `googleMapsEmbedUrl` is empty/null in Sanity, render a placeholder
`bg-slate-100 rounded-lg h-64 flex items-center justify-center` with a MapPin icon.

---

## 18. REUSABLE COMPONENTS

### PageHero (components/ui/PageHero.tsx)

Used on every inner page (About, Practice Areas, Cases, Testimonials, Contact).

```
bg-text-primary (slate-900)
py-16 md:py-24 px-4

[Label]    ← text-xs uppercase tracking-widest text-brand-gold-light font-sans
[H1]       ← font-serif text-3xl md:text-5xl text-white mt-2
[Subtitle] ← font-sans text-base text-slate-400 mt-3 (optional)
```

### SectionHeader (components/ui/SectionHeader.tsx)

```tsx
interface SectionHeaderProps {
  label: string    // e.g. "Track Record"
  heading: string  // e.g. "Case Results"
  centered?: boolean
}
```

Render:
```
[label]    ← text-xs uppercase tracking-widest text-brand-gold font-sans
[heading]  ← font-serif text-2xl md:text-3xl text-text-primary mt-1
```

### CredentialBadge (components/ui/CredentialBadge.tsx)

```tsx
<span className="inline-block bg-surface-muted border border-slate-200 text-text-secondary
                 font-sans text-xs px-3 py-1 rounded-full mr-2 mb-2">
  {children}
</span>
```

---

## 19. SEO IMPLEMENTATION

### 19.1 Root Layout Metadata (app/layout.tsx)

```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://shreyanshrai.com'),
  title: {
    default: 'Shreyansh Rai — Criminal Lawyer | High Court Allahabad & Lucknow',
    template: '%s | Shreyansh Rai — Criminal Lawyer',
  },
  description: 'Shreyansh Rai is a Criminal Law Advocate practising at the High Court of Judicature at Allahabad and Lucknow Bench. BA.LLB (Hons.) | LLM Criminal & Security Law. Specialising in bail, criminal trial defence, NDPS, and FIR quashing.',
  keywords: [
    'criminal lawyer Lucknow',
    'criminal advocate Allahabad High Court',
    'best criminal lawyer UP',
    'bail advocate Lucknow Bench',
    'NDPS lawyer Lucknow',
    'Shreyansh Rai advocate',
    'High Court Lucknow criminal lawyer',
    'FIR quashing advocate UP',
    'LLM criminal law advocate',
  ],
  authors: [{ name: 'Shreyansh Rai' }],
  creator: 'Shreyansh Rai',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shreyanshrai.com',
    siteName: 'Shreyansh Rai — Criminal Law Advocate',
    images: [{ url: '/og-image.png', width: 1200, height: 630,
               alt: 'Shreyansh Rai — Criminal Law Advocate, High Court Allahabad & Lucknow' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}
```

### 19.2 Per-Page Metadata

Each `app/[page]/page.tsx` must export its own `metadata` or `generateMetadata`:

```ts
// app/practice-areas/page.tsx
export const metadata: Metadata = {
  title: 'Practice Areas',
  description: 'Shreyansh Rai handles bail, criminal trial defence, FIR quashing, NDPS cases, cybercrime defence, and criminal appeals at High Court Allahabad and Lucknow Bench.',
}

// app/about/page.tsx
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Shreyansh Rai — Criminal Law Advocate with BA.LLB (Hons.) and LLM in Criminal & Security Law, practising at High Court Allahabad & Lucknow Bench.',
}

// app/case-results/page.tsx
export const metadata: Metadata = {
  title: 'Case Results',
  description: 'Track record of Advocate Shreyansh Rai — acquittals, bail grants, FIR quashing, and successful criminal defences at High Court and Sessions Court.',
}

// app/testimonials/page.tsx
export const metadata: Metadata = {
  title: 'Client Testimonials',
  description: 'Hear from clients of Advocate Shreyansh Rai about their experience with criminal law representation at High Court Lucknow and Allahabad Bench.',
}

// app/contact/page.tsx
export const metadata: Metadata = {
  title: 'Contact & Consultation',
  description: 'Book a legal consultation with Advocate Shreyansh Rai, Criminal Lawyer at High Court Allahabad & Lucknow Bench. Bail, NDPS, FIR quashing, and criminal trial cases.',
}
```

### 19.3 JSON-LD Structured Data (in app/page.tsx — Home)

```tsx
// Add inside <head> via Next.js Script or a <script> tag in the component

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: 'Shreyansh Rai — Criminal Law Advocate',
  description: 'Criminal law advocacy at High Court of Judicature at Allahabad & Lucknow Bench',
  url: 'https://shreyanshrai.com',
  founder: {
    '@type': 'Person',
    name: 'Shreyansh Rai',
    jobTitle: 'Criminal Law Advocate',
    description: 'BA.LLB (Hons.) | LLM in Criminal & Security Law',
    alumniOf: 'LLM — Criminal & Security Law',
    worksFor: {
      '@type': 'Organization',
      name: 'High Court of Judicature at Allahabad',
    },
    sameAs: [
      'https://www.instagram.com/shreyansh__r/',
      'https://www.linkedin.com/in/shreyansh-rai-00433b100/',
    ],
  },
  areaServed: ['Lucknow', 'Allahabad', 'Uttar Pradesh', 'India'],
  serviceType: [
    'Criminal Law',
    'Bail Matters',
    'FIR Quashing',
    'NDPS Defence',
    'Cybercrime Defence',
    'Criminal Appeals',
  ],
}

// Render as:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### 19.4 Sitemap (app/sitemap.ts)

```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://shreyanshrai.com', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://shreyanshrai.com/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://shreyanshrai.com/practice-areas', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://shreyanshrai.com/case-results', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://shreyanshrai.com/testimonials', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: 'https://shreyanshrai.com/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ]
}
```

### 19.5 Robots (app/robots.ts)

```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: '/studio' },
    ],
    sitemap: 'https://shreyanshrai.com/sitemap.xml',
  }
}
```

---

## 20. REVALIDATION STRATEGY (ISR)

For pages that fetch Sanity data, use Next.js ISR so content updates without redeployment:

```ts
// At the top of each Sanity-fetching page.tsx
export const revalidate = 3600 // revalidate every 1 hour
```

Pages: `about`, `contact`, `case-results`, `testimonials`, `app/page.tsx` (home, for featured snippets)

---

## 21. DUMMY DATA FOR DEVELOPMENT

Until Sanity is set up and content is entered, use this dummy data in the page files directly
to develop the UI. Replace with Sanity fetch calls once the CMS is connected.

### About page dummy:
```ts
const dummyAbout = {
  fullName: 'Shreyansh Rai',
  designationEn: 'Criminal Law Advocate',
  courtEn: 'High Court of Judicature at Allahabad & Lucknow Bench',
  taglineEn: 'Fearless Advocacy. Relentless Justice.',
  bioEn: 'Shreyansh Rai is a Criminal Law Advocate based in Lucknow, practising at the High Court of Judicature at Allahabad and the Lucknow Bench. With a BA.LLB (Hons.) and a specialised LLM in Criminal & Security Law, he brings a rigorous academic foundation to every matter he handles...',
  education: [
    { degreeEn: 'LLM — Criminal & Security Law', institutionEn: 'To be updated', year: 'Completed' },
    { degreeEn: 'BA.LLB (Hons.) — 5 Years', institutionEn: 'To be updated', year: 'Completed' },
  ],
  highlightsEn: [
    'Advocate at High Court of Judicature at Allahabad & Lucknow Bench',
    'Specialised in NDPS, bail matters, and criminal trial defence',
    'LLM specialisation in Criminal & Security Law',
    'Handling complex criminal matters at Sessions and High Court level',
  ],
}
```

### Case Results dummy:
```ts
const dummyCases = [
  { _id: '1', titleEn: 'Bail Granted in NDPS Act Case — High Court Lucknow Bench',
    outcome: 'Bail Granted', court: 'High Court — Lucknow Bench', year: 2024,
    category: 'NDPS',
    summaryEn: 'Client was in custody under Section 37 NDPS Act. Successfully argued commercial quantity anomaly and procedural violations in the FSL report. Bail granted by the Hon\'ble High Court after extended hearing.',
    isHighlight: true },
  { _id: '2', titleEn: 'FIR Quashed Under Section 482 CrPC — Sessions Court Matter',
    outcome: 'Charges Dropped', court: 'High Court — Allahabad', year: 2023,
    category: 'Other',
    summaryEn: 'Obtained quashing of an FIR filed in a property dispute matter that had been wrongly framed as a criminal cheating case under IPC 420.',
    isHighlight: true },
  { _id: '3', titleEn: 'Acquittal Secured in IPC 307 Attempt to Murder Case',
    outcome: 'Acquittal', court: 'Sessions Court', year: 2023,
    category: 'Assault',
    summaryEn: 'Client charged under IPC 307. Successfully challenged the reliability of the eyewitness testimony and medical evidence, resulting in full acquittal by the Sessions Court.',
    isHighlight: true },
]
```

### Testimonials dummy:
```ts
const dummyTestimonials = [
  { _id: '1', clientName: 'Ramesh K.', clientRoleEn: 'Family of Accused — Bail Matter',
    quoteEn: 'Shreyansh sir handled our bail case with complete dedication. We had been refused bail twice before. He identified a procedural error in our case and got bail granted within weeks. Highly recommended.',
    rating: 5, caseType: 'Bail Matter', isHighlight: true },
  { _id: '2', clientName: 'Priya S.', clientRoleEn: 'Client — FIR Quashing',
    quoteEn: 'We were falsely implicated in an FIR. Shreyansh sir fought our case at the High Court and got it quashed. His knowledge of criminal procedure is exceptional.',
    rating: 5, caseType: 'FIR Quashing', isHighlight: true },
  { _id: '3', clientName: 'Mohammed A.', clientRoleEn: 'Client — NDPS Case',
    quoteEn: 'Very professional and honest advocate. He explained every step of the case clearly and kept us informed throughout. Got bail in an NDPS matter which others said was impossible.',
    rating: 5, caseType: 'NDPS Defence', isHighlight: false },
]
```

---

## 22. ACCESSIBILITY REQUIREMENTS

- All images: descriptive `alt` text (never empty alt on content images)
- All form inputs: proper `<label>` elements with `htmlFor`
- Navbar mobile menu: `aria-expanded`, `aria-controls` on hamburger button
- Skip-to-content link: `<a href="#main-content" className="sr-only focus:not-sr-only ...">` at top of layout
- Focus rings: never remove outlines — use `focus:ring-2 focus:ring-brand-gold focus:ring-offset-2`
- Colour contrast: all text must meet WCAG AA (text-text-primary on white: ✅, text-text-secondary on white: ✅)
- Language toggle must update the HTML `lang` attribute: use `useEffect` to set `document.documentElement.lang`

---

## 23. MOBILE-FIRST IMPLEMENTATION RULES

These rules apply to EVERY component and page. No exceptions.

1. **Write mobile styles first, desktop overrides with `md:` or `lg:` prefixes.**
   - Wrong: `hidden md:block` for content that should be visible on mobile
   - Right: Start with mobile-visible, use `md:hidden` only to hide on desktop

2. **Navigation:** Hamburger menu on mobile is NOT optional. No horizontal scroll on mobile nav.

3. **Typography:** All headings must be readable on 375px screens. `text-4xl` is the max for mobile h1.

4. **Grids:** Always `grid-cols-1` first, then `md:grid-cols-2`, then `lg:grid-cols-3`. Never start with multiple columns.

5. **Images:** Always use `w-full` + responsive aspect ratio. Never fixed pixel widths.

6. **Tap targets:** All buttons, links, nav items: minimum `min-h-[44px]`. Add padding if needed.

7. **Touch-friendly form:** Input text size must be at least `text-base` (16px) to prevent iOS zoom on focus.

8. **Tables:** Never use `<table>` for layout. If tabular data is needed, use cards on mobile.

9. **No horizontal overflow:** Add `overflow-x-hidden` on the root layout body.

10. **Test widths to target:** 375px (iPhone SE), 390px (iPhone 14), 412px (Pixel), 768px (iPad).

---

## 24. FILE INIT SEQUENCE (ORDER TO BUILD)

Build in this order to avoid circular dependencies:

1. `tailwind.config.ts` — add custom colors, fonts
2. `app/globals.css` — add CSS animations, font variables
3. `context/LanguageContext.tsx`
4. `lib/content/en.ts` + `lib/content/hi.ts` + `lib/content/index.ts`
5. `lib/sanity/client.ts` + `lib/sanity/queries.ts`
6. `sanity/schemaTypes/` — all 4 schemas + `index.ts`
7. `sanity/sanity.config.ts`
8. `components/ui/` — CredentialBadge, SectionHeader, PageHero, LanguageToggle
9. `components/layout/Navbar.tsx` + `components/layout/Footer.tsx`
10. `app/layout.tsx`
11. `components/sections/Hero.tsx` + `StatsStrip.tsx`
12. `app/page.tsx` (Home)
13. `app/practice-areas/page.tsx` (static, no Sanity)
14. `app/about/page.tsx`
15. `app/case-results/page.tsx` + `components/sections/CaseCard.tsx`
16. `app/testimonials/page.tsx` + `components/sections/TestimonialCard.tsx`
17. `app/contact/page.tsx` + `components/sections/ContactForm.tsx`
18. `app/studio/[[...tool]]/page.tsx`
19. `app/sitemap.ts` + `app/robots.ts`

---

## 25. IMPORTANT NOTES FOR CLAUDE CODE

- **Do not use `<form>` HTML element** — use `div` with `onClick` handlers for the contact form submit
- **Do not install Framer Motion** — all animations are CSS-only via globals.css
- **Do not use any component library** (shadcn, radix, headlessui) — build all UI from scratch with Tailwind
- **Sanity Studio route (`/studio`)** must have `export const dynamic = 'force-dynamic'` to prevent static generation
- **The `/studio` page must NOT be crawled** — already handled by robots.ts `disallow: '/studio'`
- **All Sanity fetches in page.tsx files** must be Server Components (no `'use client'` directive)
- **Language toggle affects static text only** — Sanity CMS content uses both `En` and `Hi` fields; display the correct one based on `useLang()` context in Client Components
- **For Sanity data in Server Components:** Pass the full bilingual data object to a Client Component child that reads `useLang()` and displays the correct language field
- **`@portabletext/react` is required** for rendering About bio rich text from Sanity
- **All `<Image>` components** from `next/image` must have explicit `width` and `height` OR use `fill` with a positioned parent
- The **Instagram handle** is `@shreyansh__r` — use this in the footer social link
- The **LinkedIn URL** is `https://www.linkedin.com/in/shreyansh-rai-00433b100/`

---

*End of Plan. This document is the single source of truth for the project.*