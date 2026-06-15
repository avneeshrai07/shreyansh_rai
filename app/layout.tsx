import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import {
  LanguageProvider,
  LangAttributeSync,
} from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shreyanshrai.com"),
  title: {
    default:
      "Shreyansh Rai | Criminal Lawyer — High Court Allahabad & Lucknow Bench",
    template: "%s | Shreyansh Rai — Criminal Lawyer",
  },
  description:
    "Shreyansh Rai is a Criminal Law Advocate at the High Court of Judicature at Allahabad & Lucknow Bench. BA.LLB (Hons.) | LLM in Criminal & Security Law. Expert in bail, NDPS, FIR quashing, and criminal trial defence in Lucknow, UP.",
  keywords: [
    "criminal lawyer Lucknow",
    "criminal advocate Allahabad High Court",
    "bail advocate Lucknow",
    "FIR quashing advocate UP",
    "NDPS lawyer Lucknow",
    "Shreyansh Rai advocate",
    "criminal lawyer Uttar Pradesh",
    "LLM criminal law advocate Lucknow",
    "High Court advocate Lucknow Bench",
    "best criminal lawyer UP",
  ],
  authors: [{ name: "Shreyansh Rai", url: "https://shreyanshrai.com" }],
  creator: "Shreyansh Rai",
  publisher: "Shreyansh Rai",
  category: "Legal Services",
  openGraph: {
    type: "website",
    locale: "en_IN",
    alternateLocale: "hi_IN",
    url: "https://shreyanshrai.com",
    siteName: "Shreyansh Rai — Criminal Law Advocate",
    title: "Shreyansh Rai | Criminal Lawyer — High Court Allahabad & Lucknow",
    description:
      "Criminal Law Advocate at the High Court of Judicature at Allahabad & Lucknow Bench. BA.LLB (Hons.) | LLM Criminal & Security Law.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shreyansh Rai — Criminal Law Advocate, High Court Allahabad & Lucknow Bench",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shreyansh Rai | Criminal Lawyer — High Court Allahabad & Lucknow",
    description:
      "Criminal Law Advocate — Bail, NDPS, FIR Quashing, Criminal Appeals.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://shreyanshrai.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col overflow-x-hidden font-sans bg-surface-base text-text-primary">
        <LanguageProvider>
          <LangAttributeSync />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-brand-gold focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-sans focus:text-sm focus:font-medium"
          >
            Skip to main content
          </a>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
