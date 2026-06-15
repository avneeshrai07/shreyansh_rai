# HARD FOCUS RULES — Mobile First · SEO · Tailwind
## Addendum to ADVOCATE_PORTFOLIO_PLAN.md
## Read this BEFORE writing a single line of code.

These are non-negotiable constraints. Every component, every page, every line of Tailwind
must satisfy all three pillars simultaneously. If any rule conflicts with a "nicer" design
choice, the rule wins.

---

# PILLAR 1 — MOBILE FIRST

## The Core Discipline

Mobile first means **writing for 375px first and expanding outward**.
It does NOT mean "make a desktop site and then add media queries to shrink it."
In Tailwind, this translates to one concrete rule:

> **Every class you write is mobile. Responsive prefixes (`md:`, `lg:`) are only
> for overrides on larger screens. Never write a class without first asking:
> "Is this correct on a 375px screen?"**

---

## M1 — Breakpoint Discipline

Use exactly these breakpoints. No others.

| Prefix | Width | Target Device |
|---|---|---|
| *(none)* | 0px+ | All phones (375px iPhone SE is the floor) |
| `sm:` | 640px+ | Large phones, small tablets — use sparingly |
| `md:` | 768px+ | iPad portrait, most tablets |
| `lg:` | 1024px+ | iPad landscape, small laptops |
| `xl:` | 1280px+ | Desktop — override only, never primary |

**Never use `2xl:`.** The design maxes out at `max-w-5xl` (1024px) anyway.

**Never use `sm:` as the primary breakpoint.** If you find yourself writing
`sm:grid-cols-2` without a mobile layout first, you're doing it wrong.

---

## M2 — Layout Rules, Mobile to Desktop

### Grids
```tsx
// ✅ CORRECT — mobile first, expand outward
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

// ❌ WRONG — starts at desktop
<div className="grid grid-cols-3 gap-6">
```

### Flex direction
```tsx
// ✅ CORRECT
<div className="flex flex-col md:flex-row gap-4">

// ❌ WRONG
<div className="flex flex-row gap-4">  {/* breaks on mobile */}
```

### Spacing (padding, margin)
```tsx
// ✅ CORRECT — tighter on mobile, more breathing room on desktop
<section className="py-12 px-4 md:py-20 md:px-8 lg:py-24">

// ❌ WRONG — too much space on small screens
<section className="py-24 px-8">
```

### Typography
```tsx
// ✅ CORRECT — readable on 375px, impressive on desktop
<h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold leading-tight">

// ❌ WRONG — 5xl on mobile is gigantic and overflows
<h1 className="text-5xl font-serif font-bold">
```

### Width
```tsx
// ✅ CORRECT
<div className="w-full md:w-auto">

// ❌ WRONG — fixed widths break on small screens
<div className="w-96">
```

---

## M3 — Navigation (Navbar.tsx)

The Navbar is the most critical mobile component. Build it mobile-first.

### Mobile state (DEFAULT — no prefix):
```tsx
// Hamburger only visible on mobile
<button className="md:hidden p-2 min-h-[44px] min-w-[44px] ..." />

// Desktop nav links hidden on mobile
<nav className="hidden md:flex items-center gap-6">
```

### Mobile menu behavior:
- State: `const [isOpen, setIsOpen] = useState(false)`
- Menu renders as a `<div>` that appears **below** the sticky bar (NOT a sidebar, NOT an overlay)
- Full-width, `bg-white`, `border-b border-slate-100`
- Each nav link: `block w-full py-4 px-4 border-b border-slate-50 text-base`
- Minimum height per link: `min-h-[52px]` — generous touch target
- Close the menu when any link is clicked (`onClick={() => setIsOpen(false)}`)
- Language toggle + "Consult Now" button at bottom of mobile menu

```tsx
{/* Mobile menu — slides open below the navbar */}
{isOpen && (
  <div className="md:hidden border-t border-slate-100 bg-white">
    {navLinks.map(link => (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsOpen(false)}
        className="flex items-center min-h-[52px] px-4 py-3
                   border-b border-slate-50 font-sans text-base
                   text-text-primary hover:text-brand-gold
                   hover:bg-surface-soft transition-colors"
      >
        {link.label}
      </Link>
    ))}
    <div className="p-4 flex items-center justify-between gap-3">
      <LanguageToggle />
      <Link href="/contact" className="flex-1 text-center bg-brand-gold
        text-white font-sans font-medium py-3 px-4 rounded-lg min-h-[44px]">
        {c.nav.consultNow}
      </Link>
    </div>
  </div>
)}
```

---

## M4 — Touch Targets

Every interactive element (links, buttons, toggles) must be large enough to tap comfortably.

```
Minimum: 44px × 44px (Apple HIG standard)
Preferred for primary CTAs: 52px height
```

```tsx
// ✅ Correct button
<button className="min-h-[44px] px-6 py-3 ...">Click</button>

// ✅ Correct nav link (inline links need padding)
<Link className="inline-flex items-center min-h-[44px] px-2 py-2 ...">Link</Link>

// ❌ Wrong — too small
<button className="px-2 py-1 text-sm ...">Click</button>
```

---

## M5 — Form Inputs (Prevent iOS Auto-Zoom)

iOS Safari zooms in on `<input>` fields with font-size below 16px. This is a terrible UX.
All form inputs MUST use at least `text-base` (16px).

```tsx
// ✅ All form inputs — apply these classes always
<input
  className="w-full text-base font-sans border border-slate-200 rounded-lg
             px-4 py-3 min-h-[48px] focus:outline-none focus:ring-2
             focus:ring-brand-gold focus:border-transparent
             placeholder:text-text-muted"
/>

<select className="w-full text-base font-sans border border-slate-200 rounded-lg
                   px-4 py-3 min-h-[48px] bg-white focus:outline-none
                   focus:ring-2 focus:ring-brand-gold">

<textarea className="w-full text-base font-sans border border-slate-200 rounded-lg
                     px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-gold
                     resize-none">
```

---

## M6 — Images on Mobile

```tsx
// ✅ Always use next/image with responsive behavior
<div className="relative w-full aspect-[4/5]">
  <Image
    src={imageUrl}
    alt="Advocate Shreyansh Rai"
    fill
    className="object-cover object-top rounded-lg"
    sizes="(max-width: 768px) 100vw, 40vw"
    priority={isAboveFold}   // true for hero image only
  />
</div>

// ❌ Never use fixed pixel dimensions on layout images
<Image src="..." width={400} height={500} />  // breaks fluid layout
```

The `sizes` prop is critical for performance — it tells the browser which image size to
download. Always specify it based on the actual layout.

---

## M7 — Hero Section Mobile Rules

The Hero is seen FIRST on mobile. It must be perfect at 375px.

```tsx
// Mobile hero container
<section className="min-h-[100svh] flex flex-col justify-center
                    bg-surface-soft px-4 pt-24 pb-12">
  {/* pt-24 accounts for sticky navbar height */}
```

Use `100svh` (small viewport height) instead of `100vh` on mobile — `100vh` includes the
browser chrome on iOS which causes the section to be taller than the actual visible area.

**Mobile text flow:**
```
Court label (xs, gold, uppercase)
↓ 16px gap
Headline with gold left bar (3xl, serif, bold)
↓ 12px gap
Name (xl, serif)
Designation (sm, sans, muted)
↓ 16px gap
Credential badges (xs pills)
↓ 24px gap
Primary CTA button (full width, 52px height)
↓ 12px gap
Ghost CTA button (full width, 52px height)
↓ 32px gap
Divider
↓ 24px gap
Portrait photo (w-full, aspect-[4/5])
```

Headline font size on mobile: `text-4xl` MAX. Test at 375px — "Your Rights.\nMy Fight." in
Playfair Display at `text-4xl` is 36px and fits well. `text-5xl` (48px) will overflow on
375px if the word is long.

---

## M8 — No Horizontal Overflow

Add this to the root `<body>` in `app/layout.tsx`:

```tsx
<body className="overflow-x-hidden font-sans bg-surface-base text-text-primary">
```

And to `app/globals.css`:
```css
html, body {
  max-width: 100%;
  overflow-x: hidden;
}
```

If any element causes horizontal scroll on 375px, it is a bug. Fix it.

---

## M9 — Mobile-First Section Stacking Order

On mobile, every multi-column section becomes a single column. The ORDER of stacking matters.
For two-column sections, the content that is MORE IMPORTANT on mobile goes FIRST in the DOM.

| Section | Mobile DOM order |
|---|---|
| Hero | Text content → Photo |
| About | Photo → Bio text |
| Practice Areas | Heading → Cards (stacked) |
| Contact | Form → Contact info → Map |
| Case Results | Filter → Cards (stacked) |

---

## M10 — Mobile Typography Rhythm

Consistent spacing between text elements on mobile:

```
Section label (xs, gold, uppercase)     → mb-2
Section heading (2xl, serif)            → mb-4
Section body/description (base, sans)   → mb-8 before next section
Card title (lg, serif)                  → mb-2
Card body (sm, sans)                    → mb-4
```

---

---

# PILLAR 2 — SEO OPTIMIZED FROM THE START

SEO is not an afterthought — it is baked into the HTML structure, component architecture,
and content from the very first file. Every decision below must be made during initial build,
not retrofitted later.

---

## S1 — One H1 Per Page. Exactly One. Always.

This is the most violated SEO rule. Enforce it strictly.

```
/ (Home)             → H1: "Shreyansh Rai — Criminal Law Advocate"
/about               → H1: "About Shreyansh Rai"
/practice-areas      → H1: "Criminal Law Practice Areas"
/case-results        → H1: "Case Results & Track Record"
/testimonials        → H1: "Client Testimonials"
/contact             → H1: "Book a Legal Consultation"
```

The visual hero headline ("Your Rights. My Fight.") on the home page is NOT the H1.
It is a `<p>` or `<span>` element styled to look like a headline. The real H1 is for
SEO — it can be visually hidden on the home page using `sr-only` if needed, but it must
exist in the DOM:

```tsx
// Home page — SEO H1 is visually hidden, hero tagline is styled separately
<h1 className="sr-only">
  Shreyansh Rai — Criminal Law Advocate | High Court Allahabad & Lucknow
</h1>

{/* This is the visual headline — it's a <p> not an <h1> */}
<p className="font-serif text-4xl md:text-6xl font-bold leading-tight
              border-l-4 border-brand-gold pl-4">
  Your Rights.<br />My Fight.
</p>
```

On inner pages, the PageHero component's main title IS the H1:
```tsx
<h1 className="font-serif text-3xl md:text-5xl text-white font-bold mt-2">
  {title}
</h1>
```

---

## S2 — Heading Hierarchy is Law

Every page must have a strict heading hierarchy. Skipping levels (H1 → H3) breaks SEO.

```
H1 (once)
  H2 (section headings)
    H3 (card/item headings within that section)
      H4 (sub-items, use sparingly)
```

The `<SectionHeader>` component always renders an `<h2>`.
The card headings (case titles, practice area names, testimonial names) are `<h3>`.
Never use headings for visual styling — use `<p>` or `<span>` with font-serif classes.

---

## S3 — Semantic HTML Structure

Every page must follow this structural skeleton:

```tsx
// app/[page]/page.tsx
<main id="main-content">        {/* ONE <main> per page */}
  <article>                     {/* or <section> for non-article content */}
    <header>                    {/* page intro / hero */}
      <h1>...</h1>
    </header>

    <section aria-labelledby="section-id">
      <h2 id="section-id">...</h2>
      {/* section content */}
    </section>

    <section aria-labelledby="another-id">
      <h2 id="another-id">...</h2>
    </section>
  </article>
</main>
```

Never use `<div>` where a semantic element exists:
- Page wrapper → `<main>`
- Logical groups of content → `<section>`
- Independent pieces (case cards, testimonials) → `<article>`
- Navigation → `<nav>`
- Page top area → `<header>`
- Page bottom → `<footer>`
- Sidebar / aside info → `<aside>`

---

## S4 — Metadata: Every Page, Every Field

### Root layout (app/layout.tsx) — base metadata
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://shreyanshrai.com'),
  title: {
    default: 'Shreyansh Rai | Criminal Lawyer — High Court Allahabad & Lucknow Bench',
    template: '%s | Shreyansh Rai — Criminal Lawyer',
  },
  description:
    'Shreyansh Rai is a Criminal Law Advocate at the High Court of Judicature at Allahabad & Lucknow Bench. BA.LLB (Hons.) | LLM in Criminal & Security Law. Expert in bail, NDPS, FIR quashing, and criminal trial defence in Lucknow, UP.',
  keywords: [
    'criminal lawyer Lucknow',
    'criminal advocate Allahabad High Court',
    'bail advocate Lucknow',
    'FIR quashing advocate UP',
    'NDPS lawyer Lucknow',
    'Shreyansh Rai advocate',
    'criminal lawyer Uttar Pradesh',
    'LLM criminal law advocate Lucknow',
    'High Court advocate Lucknow Bench',
    'best criminal lawyer UP',
  ],
  authors: [{ name: 'Shreyansh Rai', url: 'https://shreyanshrai.com' }],
  creator: 'Shreyansh Rai',
  publisher: 'Shreyansh Rai',
  category: 'Legal Services',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: 'hi_IN',
    url: 'https://shreyanshrai.com',
    siteName: 'Shreyansh Rai — Criminal Law Advocate',
    title: 'Shreyansh Rai | Criminal Lawyer — High Court Allahabad & Lucknow',
    description:
      'Criminal Law Advocate at the High Court of Judicature at Allahabad & Lucknow Bench. BA.LLB (Hons.) | LLM Criminal & Security Law.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Shreyansh Rai — Criminal Law Advocate, High Court Allahabad & Lucknow Bench',
      type: 'image/png',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shreyansh Rai | Criminal Lawyer — High Court Allahabad & Lucknow',
    description: 'Criminal Law Advocate — Bail, NDPS, FIR Quashing, Criminal Appeals.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add Google Search Console verification code here when available
    // google: 'your-verification-code',
  },
  alternates: {
    canonical: 'https://shreyanshrai.com',
  },
}
```

### Per-page metadata (must export from each page file)

```ts
// app/about/page.tsx
export const metadata: Metadata = {
  title: 'About Shreyansh Rai',
  description:
    'Advocate Shreyansh Rai holds a BA.LLB (Hons.) and LLM in Criminal & Security Law. Practising at the High Court of Judicature at Allahabad & Lucknow Bench, specialising in criminal defence, bail, and NDPS matters.',
  alternates: { canonical: 'https://shreyanshrai.com/about' },
  openGraph: { url: 'https://shreyanshrai.com/about' },
}

// app/practice-areas/page.tsx
export const metadata: Metadata = {
  title: 'Criminal Law Practice Areas',
  description:
    'Shreyansh Rai handles bail, anticipatory bail, criminal trial defence, FIR quashing under Section 482 CrPC, NDPS cases, cybercrime defence, and criminal appeals at the High Court Allahabad & Lucknow Bench.',
  alternates: { canonical: 'https://shreyanshrai.com/practice-areas' },
  openGraph: { url: 'https://shreyanshrai.com/practice-areas' },
}

// app/case-results/page.tsx
export const metadata: Metadata = {
  title: 'Case Results & Track Record',
  description:
    'Track record of Advocate Shreyansh Rai — acquittals, bail orders, FIR quashing, NDPS defence, and successful criminal trials at the High Court Allahabad, Lucknow Bench, and Sessions Court.',
  alternates: { canonical: 'https://shreyanshrai.com/case-results' },
  openGraph: { url: 'https://shreyanshrai.com/case-results' },
}

// app/testimonials/page.tsx
export const metadata: Metadata = {
  title: 'Client Testimonials',
  description:
    'Read what clients of Advocate Shreyansh Rai say about their experience with criminal law representation at the High Court Allahabad and Lucknow Bench.',
  alternates: { canonical: 'https://shreyanshrai.com/testimonials' },
  openGraph: { url: 'https://shreyanshrai.com/testimonials' },
}

// app/contact/page.tsx
export const metadata: Metadata = {
  title: 'Contact & Book a Consultation',
  description:
    'Book a legal consultation with Advocate Shreyansh Rai, Criminal Lawyer at the High Court Allahabad & Lucknow Bench. Contact for bail, NDPS, FIR quashing, and criminal trial matters in Lucknow, UP.',
  alternates: { canonical: 'https://shreyanshrai.com/contact' },
  openGraph: { url: 'https://shreyanshrai.com/contact' },
}
```

---

## S5 — JSON-LD Structured Data

Add two JSON-LD blocks to `app/page.tsx` (Home page). These go inside the JSX:

```tsx
// Block 1: Person schema
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://shreyanshrai.com/#person',
  name: 'Shreyansh Rai',
  jobTitle: 'Criminal Law Advocate',
  description:
    'Advocate at the High Court of Judicature at Allahabad & Lucknow Bench. BA.LLB (Hons.) | LLM in Criminal & Security Law.',
  url: 'https://shreyanshrai.com',
  image: 'https://shreyanshrai.com/og-image.png',
  sameAs: [
    'https://www.instagram.com/shreyansh__r/',
    'https://www.linkedin.com/in/shreyansh-rai-00433b100/',
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'LLM in Criminal & Security Law',
  },
  knowsAbout: [
    'Criminal Law',
    'Bail Law India',
    'NDPS Act',
    'Criminal Procedure Code',
    'Allahabad High Court Practice',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
}

// Block 2: LegalService schema
const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  '@id': 'https://shreyanshrai.com/#legalservice',
  name: 'Shreyansh Rai — Criminal Law Advocate',
  url: 'https://shreyanshrai.com',
  logo: 'https://shreyanshrai.com/og-image.png',
  description:
    'Criminal law advocacy services at the High Court of Judicature at Allahabad & Lucknow Bench. Specialising in bail, NDPS defence, FIR quashing, criminal appeals, and cybercrime defence.',
  founder: { '@id': 'https://shreyanshrai.com/#person' },
  areaServed: [
    { '@type': 'City', name: 'Lucknow' },
    { '@type': 'City', name: 'Allahabad' },
    { '@type': 'State', name: 'Uttar Pradesh' },
  ],
  serviceType: [
    'Bail Matters',
    'Anticipatory Bail',
    'Criminal Trial Defence',
    'FIR Quashing',
    'NDPS Cases',
    'Cybercrime Defence',
    'Criminal Appeals',
    'Section 482 CrPC',
  ],
  priceRange: '₹₹',
  telephone: '+91-XXXXXXXXXX',  // Replace with real number from Sanity
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lucknow',
    addressRegion: 'Uttar Pradesh',
    postalCode: '226001',
    addressCountry: 'IN',
  },
  openingHours: 'Mo-Sa 10:00-18:00',
}

// In the component JSX:
return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
    />
    {/* rest of page */}
  </>
)
```

---

## S6 — Image Alt Text Rules

Every `<Image>` must have a descriptive, keyword-rich alt attribute. Never empty. Never generic.

```tsx
// ✅ Descriptive and keyword-rich
<Image alt="Advocate Shreyansh Rai — Criminal Lawyer at High Court Lucknow" />
<Image alt="Scales of justice representing criminal law practice at High Court Allahabad" />
<Image alt="Shreyansh Rai in his law chamber, Lucknow Bench" />

// ❌ Wrong — empty, generic, or keyword-stuffed
<Image alt="" />
<Image alt="image" />
<Image alt="lawyer lawyer lawyer criminal lawyer Lucknow" />
```

For decorative icons from lucide-react that are purely visual:
```tsx
<Scale aria-hidden="true" />
```

---

## S7 — Internal Linking Strategy

Every page must link to at least 2 other pages. This creates a crawlable link graph.

| Page | Must link to |
|---|---|
| Home | About, Practice Areas, Case Results, Testimonials, Contact |
| About | Practice Areas, Contact |
| Practice Areas | Case Results, Contact |
| Case Results | About, Contact |
| Testimonials | Practice Areas, Contact |
| Contact | Practice Areas, About |

The Footer already covers most of this via nav links. Additionally:
- Home hero CTA → `/contact` (primary) + `/case-results` (secondary)
- HomePracticeSnippet → `/practice-areas` "View All Areas" link
- HomeCasesSnippet → `/case-results` "View All Cases" link
- HomeTestimonialsSnippet → `/testimonials` "Read All Reviews" link

All internal links use `<Link href="...">` from next/link. NEVER `<a href="...">` for internal routes.

---

## S8 — Link Anchor Text

Anchor text must be descriptive. Never "click here", "read more", "learn more" alone.

```tsx
// ✅ Descriptive anchor text
<Link href="/case-results">View All Case Results</Link>
<Link href="/contact">Book a Criminal Law Consultation</Link>
<Link href="/practice-areas">Explore Practice Areas</Link>

// ❌ Vague anchor text (bad for SEO)
<Link href="/case-results">Click here</Link>
<Link href="/contact">Learn more</Link>
```

---

## S9 — Page Speed (Core Web Vitals)

Next.js handles most of this, but you must NOT undo its optimizations.

### LCP (Largest Contentful Paint)
- Hero image must use `priority` prop: `<Image priority />`
- No other images above the fold use `priority`
- Fonts use `display: 'swap'` in `next/font` (already specified in plan)

### CLS (Cumulative Layout Shift)
- ALL images must have defined dimensions or use `fill` with a sized parent
- Never render images without width+height or aspect-ratio container
- Never use `display: none` and then show — use CSS opacity/visibility transitions instead

### INP (Interaction to Next Paint)
- No heavy JS bundles — we have none (no Framer Motion, no heavy libraries)
- Mobile menu toggle is a simple `useState` — fast

### Font Loading
```ts
// In next/font config — these are non-negotiable
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',       // ← prevents FOIT (Flash of Invisible Text)
  preload: true,         // ← preloads the font
  weight: ['400', '600', '700'],  // only load weights actually used
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  weight: ['400', '500', '600'],  // only load weights actually used
})
```

---

## S10 — Sitemap & Robots

### app/sitemap.ts (exact implementation)
```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://shreyanshrai.com'
  const now = new Date()

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/practice-areas`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-results`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.8,
    },
  ]
  // Note: /studio is intentionally excluded — it is noindex via robots.ts
}
```

### app/robots.ts (exact implementation)
```ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio', '/studio/'],
      },
    ],
    sitemap: 'https://shreyanshrai.com/sitemap.xml',
    host: 'https://shreyanshrai.com',
  }
}
```

---

## S11 — Skip to Content Link (Accessibility + SEO signal)

At the very top of `app/layout.tsx`, inside `<body>`, before `<Navbar>`:

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4
             focus:z-[9999] focus:bg-brand-gold focus:text-white
             focus:px-4 focus:py-2 focus:rounded-lg focus:font-sans
             focus:text-sm focus:font-medium"
>
  Skip to main content
</a>
```

Every page's `<main>` tag must have `id="main-content"`.

---

## S12 — Language Attribute

When the user switches to Hindi, update the HTML `lang` attribute. Add this to the root layout
body or a client component that wraps content:

```tsx
'use client'
import { useLang } from '@/context/LanguageContext'
import { useEffect } from 'react'

export function LangAttributeSync() {
  const { lang } = useLang()
  useEffect(() => {
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en'
  }, [lang])
  return null
}
```

Render `<LangAttributeSync />` inside the `<LanguageProvider>` in root layout.

Default HTML lang on the `<html>` tag: `lang="en"` (set statically in layout.tsx).

---

---

# PILLAR 3 — TAILWIND CSS (STRICT)

## T1 — Tailwind is the ONLY styling method

- ✅ Tailwind utility classes
- ✅ `app/globals.css` for: CSS custom properties, `@keyframes`, `@layer base` resets
- ❌ No inline `style={{}}` props for layout/visual styling
- ❌ No CSS modules (no `.module.css` files)
- ❌ No styled-components, emotion, or CSS-in-JS
- ❌ No external CSS files beyond `globals.css`

The ONLY acceptable use of `style={{}}` is for dynamic values that cannot be expressed
as Tailwind classes, specifically animation delays:

```tsx
// ✅ Acceptable inline style — dynamic animation delay only
<div
  className="animate-fade-up"
  style={{ animationDelay: '300ms' }}
>

// ❌ Not acceptable — use Tailwind
<div style={{ padding: '16px', color: '#92400e' }}>
```

---

## T2 — tailwind.config.ts — Complete Setup

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',   // keep for safety
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold:         '#92400e',
          'gold-light': '#d97706',
          'gold-faint': '#fef3c7',
        },
        surface: {
          base:   '#ffffff',
          soft:   '#f8fafc',
          muted:  '#f1f5f9',
        },
        text: {
          primary:   '#0f172a',
          secondary: '#475569',
          muted:     '#94a3b8',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      // Custom animation utilities — reference globals.css keyframes
      animation: {
        'fade-in':  'fadeIn 0.6s ease forwards',
        'fade-up':  'fadeUp 0.6s ease forwards',
      },
      // Extend spacing if needed for the gold bar left border pattern
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## T3 — Consistent Class Ordering (Prettier Tailwind Plugin Recommended)

Install: `npm install -D prettier-plugin-tailwindcss`

Class order groups (write classes in this order for readability):

```
1. Layout:     block flex grid hidden
2. Position:   relative absolute sticky fixed
3. Size:       w- h- min-w min-h max-w aspect-
4. Spacing:    p- px- py- m- mx- my- gap-
5. Typography: font- text- leading- tracking- truncate
6. Visual:     bg- border- rounded- shadow- opacity-
7. Flex/Grid:  items- justify- flex- grid-cols- col-span-
8. State:      hover: focus: active: disabled:
9. Responsive: md: lg: xl:
```

---

## T4 — No Arbitrary Values Unless Unavoidable

Tailwind's arbitrary values (`w-[437px]`, `text-[15px]`) are a code smell. They mean the
design system isn't being followed. Use them only for values that genuinely cannot be expressed
with the token system.

```tsx
// ❌ Avoid arbitrary values
<div className="w-[437px] text-[15px] mt-[13px]">

// ✅ Use design tokens
<div className="w-full md:max-w-sm text-sm mt-3">
```

Acceptable arbitrary values (short list):
- `min-h-[44px]` — touch target enforcement (no Tailwind token for this exact value)
- `min-h-[52px]` — generous touch target
- `aspect-[4/5]` — portrait photo ratio (Tailwind only has `aspect-square` and `aspect-video`)
- `aspect-[3/4]` — alternate portrait ratio
- `100svh` for hero: `min-h-[100svh]` — mobile viewport height fix

---

## T5 — Conditional Classes Pattern

Use a `cn()` helper to manage conditional Tailwind classes cleanly. Add this utility:

```ts
// lib/utils.ts
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
```

Usage:
```tsx
// ✅ Clean conditional classes
<Link
  className={cn(
    'font-sans text-sm py-2 px-3 transition-colors',
    isActive
      ? 'text-brand-gold font-medium'
      : 'text-text-secondary hover:text-text-primary'
  )}
>

// ❌ Messy template literal
<Link className={`font-sans text-sm py-2 px-3 transition-colors ${
  isActive ? 'text-brand-gold font-medium' : 'text-text-secondary hover:text-text-primary'
}`}>
```

---

## T6 — @layer in globals.css

Use Tailwind's `@layer` directive for any base-level resets in `globals.css`. Never write
plain CSS that conflicts with Tailwind's preflight.

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Smooth scroll */
  html {
    scroll-behavior: smooth;
  }

  /* Prevent horizontal overflow */
  html, body {
    max-width: 100%;
    overflow-x: hidden;
  }

  /* Better default focus for keyboard users */
  :focus-visible {
    outline: 2px solid #92400e;   /* brand-gold */
    outline-offset: 2px;
  }

  /* Remove default button styles */
  button {
    cursor: pointer;
  }
}

@layer utilities {
  /* Animation classes — referenced in tailwind.config.ts */
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease forwards;
    opacity: 0;
  }

  .animate-fade-up {
    animation: fadeUp 0.6s ease forwards;
    opacity: 0;
  }

  /* Respect reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .animate-fade-in,
    .animate-fade-up {
      animation: none;
      opacity: 1;
    }
  }
}
```

---

## T7 — Reusable Tailwind Patterns

These exact Tailwind class strings must be used consistently across all components.
Do not re-invent these per component.

### Gold left-bar accent (signature element)
```tsx
// Use on: hero headline, about bio intro, testimonial quote blocks
className="border-l-4 border-brand-gold pl-4"
```

### Section container
```tsx
// All sections use this wrapper
className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
```

### Card base
```tsx
// All content cards
className="bg-white border border-slate-100 rounded-lg p-5
           hover:border-brand-gold hover:shadow-sm transition-all duration-200"
```

### Primary button
```tsx
className="inline-flex items-center justify-center min-h-[44px] px-6 py-3
           bg-brand-gold text-white font-sans font-medium text-sm
           rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
```

### Ghost button
```tsx
className="inline-flex items-center justify-center min-h-[44px] px-6 py-3
           border border-brand-gold text-brand-gold font-sans font-medium text-sm
           rounded-lg hover:bg-brand-gold-faint transition-colors duration-200"
```

### Full-width mobile button (Hero CTAs only)
```tsx
className="flex items-center justify-center w-full min-h-[52px] px-6 py-3
           bg-brand-gold text-white font-sans font-medium text-base
           rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
```

### Credential pill badge
```tsx
className="inline-block bg-surface-muted border border-slate-200 text-text-secondary
           font-sans text-xs px-3 py-1.5 rounded-full"
```

### Section label (eyebrow)
```tsx
className="text-xs font-sans font-medium uppercase tracking-widest text-brand-gold"
```

### Page Hero dark band
```tsx
// The dark banner at top of inner pages
className="w-full bg-text-primary py-16 md:py-24 px-4 md:px-8"
```

---

## T8 — Outcome Badge Colors for Case Cards

These exact Tailwind classes for each outcome type:
```tsx
const outcomeBadgeClasses: Record<string, string> = {
  'Acquittal':       'bg-green-50   text-green-700   border border-green-200',
  'Bail Granted':    'bg-blue-50    text-blue-700    border border-blue-200',
  'Charges Dropped': 'bg-purple-50  text-purple-700  border border-purple-200',
  'Case Won':        'bg-emerald-50 text-emerald-700  border border-emerald-200',
  'Sentence Reduced':'bg-orange-50  text-orange-700  border border-orange-200',
  'Stay Granted':    'bg-amber-50   text-amber-700   border border-amber-200',
}

// Usage
<span className={cn(
  'inline-block text-xs font-sans font-medium px-2.5 py-1 rounded-full',
  outcomeBadgeClasses[outcome] ?? 'bg-slate-50 text-slate-600 border border-slate-200'
)}>
  {outcome}
</span>
```

---

## T9 — Tailwind for Dark Background Sections

The stats strip and PageHero use a dark (`bg-text-primary` = `slate-900`) background.
On these sections, ALL text must be explicitly set to light colors. Never inherit from
the page default:

```tsx
// ✅ Explicit light text on dark background
<section className="bg-text-primary py-8">
  <p className="text-white font-serif text-3xl">...</p>
  <p className="text-slate-400 font-sans text-sm">...</p>
  <p className="text-brand-gold-light font-sans text-xs uppercase">...</p>
</section>

// ❌ Inheriting text color — will be invisible (dark text on dark bg)
<section className="bg-text-primary py-8">
  <p className="font-serif text-3xl">...</p>  {/* text-text-primary on dark bg — invisible */}
</section>
```

---

## T10 — Tailwind for the Masonry Testimonials Layout

Use CSS columns for the testimonials masonry grid — no library needed:

```tsx
<div className="columns-1 md:columns-2 gap-6">
  {testimonials.map(t => (
    <div
      key={t._id}
      className="break-inside-avoid mb-6 bg-white border border-slate-100
                 rounded-lg p-6"
    >
      {/* card content */}
    </div>
  ))}
</div>
```

`break-inside-avoid` is the critical class — it prevents a card from being split
across columns. `mb-6` creates vertical spacing between cards in the same column.

---

## FINAL CHECKLIST — Run Before Considering Any Component Done

For every component and page you write, verify:

### Mobile First
- [ ] Written for 375px, expands with `md:` / `lg:` prefixes
- [ ] All grids start `grid-cols-1`
- [ ] No horizontal overflow (test at 375px)
- [ ] Touch targets ≥ 44px on all interactive elements
- [ ] Form inputs use `text-base` (≥ 16px)
- [ ] Hero uses `min-h-[100svh]`
- [ ] Hamburger menu works and all links close menu on click

### SEO
- [ ] Page exports `metadata` or `generateMetadata`
- [ ] Exactly ONE `<h1>` on the page
- [ ] Heading hierarchy: h1 → h2 → h3 (no skipping)
- [ ] Semantic HTML: `<main id="main-content">`, `<section>`, `<article>`, `<nav>`
- [ ] All images have descriptive `alt` text
- [ ] All internal links use `<Link>` with descriptive anchor text
- [ ] `aria-labelledby` on all `<section>` elements

### Tailwind
- [ ] No inline `style={{}}` except animation delays
- [ ] No arbitrary values except the approved list (M4 section)
- [ ] Custom colors used from tailwind.config (`brand-gold`, `text-primary`, etc.)
- [ ] Dark sections have explicit light text colours
- [ ] `cn()` helper used for all conditional classes
- [ ] Reusable patterns match the exact class strings in T7

---

*This document overrides any conflicting instruction in the main plan.
When in doubt: mobile first, semantic HTML, Tailwind utility classes only.*