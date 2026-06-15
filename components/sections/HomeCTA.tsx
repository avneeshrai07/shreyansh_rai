"use client";

import Link from "next/link";
import { useContent } from "@/lib/content";

export function HomeCTA() {
  const c = useContent();

  return (
    <section
      aria-labelledby="home-cta-heading"
      className="w-full bg-text-primary px-4 md:px-8 py-12 md:py-20"
    >
      <div className="w-full max-w-5xl mx-auto text-center">
        <h2
          id="home-cta-heading"
          className="font-serif text-2xl md:text-3xl font-semibold text-white leading-tight"
        >
          {c.homeCta.heading}
        </h2>
        <p className="mt-3 max-w-2xl mx-auto font-sans text-base text-slate-400">
          {c.homeCta.text}
        </p>
        <div className="mt-6 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center min-h-[52px] px-6 py-3 bg-brand-gold text-white font-sans font-medium text-base rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
          >
            {c.homeCta.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
