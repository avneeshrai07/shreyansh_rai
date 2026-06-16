"use client";

import Link from "next/link";
import { useContent } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import type { Testimonial } from "@/lib/sanity/queries";

export function TestimonialsView({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const c = useContent();

  return (
    <main id="main-content">
      <article>
        <PageHero
          label={c.pages.testimonials.label}
          title={c.pages.testimonials.title}
          subtitle={c.pages.testimonials.subtitle}
        />

        <section
          aria-labelledby="testimonials-heading"
          className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
        >
          <h2 id="testimonials-heading" className="sr-only">
            {c.pages.testimonials.title}
          </h2>

          {testimonials.length > 0 ? (
            <div className="columns-1 md:columns-2 gap-6">
              {testimonials.map((item) => (
                <TestimonialCard key={item._id} data={item} />
              ))}
            </div>
          ) : (
            <p className="font-sans text-sm text-text-secondary">
              {c.testimonials.empty}
            </p>
          )}

          {/* Internal links (S7: Testimonials → Practice Areas, Contact) */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/practice-areas"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 border border-brand-gold text-brand-gold font-sans font-medium text-sm rounded-lg hover:bg-brand-gold-faint transition-colors duration-200"
            >
              {c.homePractice.viewAll}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-brand-gold text-white font-sans font-medium text-sm rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
            >
              {c.homeCta.button}
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
