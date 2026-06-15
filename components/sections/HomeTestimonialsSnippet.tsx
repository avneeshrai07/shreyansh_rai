"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TestimonialCard } from "@/components/sections/TestimonialCard";
import type { Testimonial } from "@/lib/sanity/queries";

export function HomeTestimonialsSnippet({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const c = useContent();

  return (
    <section
      aria-labelledby="home-testimonials-heading"
      className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
    >
      <SectionHeader
        label={c.homeTestimonials.label}
        heading={c.homeTestimonials.heading}
        headingId="home-testimonials-heading"
      />

      {testimonials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {testimonials.map((item) => (
            <TestimonialCard key={item._id} data={item} />
          ))}
        </div>
      ) : (
        <p className="font-sans text-sm text-text-secondary">
          {c.homeTestimonials.empty}
        </p>
      )}

      <div className="mt-8">
        <Link
          href="/testimonials"
          className="inline-flex items-center gap-1 min-h-[44px] font-sans text-sm font-medium text-brand-gold underline-offset-4 hover:underline"
        >
          {c.homeTestimonials.viewAll}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
