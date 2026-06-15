"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PracticeIcon } from "@/components/ui/PracticeIcon";

export function HomePracticeSnippet() {
  const c = useContent();
  const items = c.practiceAreas.items.slice(0, 3);

  return (
    <section
      aria-labelledby="home-practice-heading"
      className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
    >
      <SectionHeader
        label={c.homePractice.label}
        heading={c.homePractice.heading}
        headingId="home-practice-heading"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {items.map((item) => (
          <div
            key={item.title}
            className="bg-surface-muted rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            <PracticeIcon
              name={item.icon}
              className="size-6 text-brand-gold"
            />
            <h3 className="mt-3 font-serif text-lg text-text-primary">
              {item.title}
            </h3>
            <p className="mt-2 font-sans text-sm text-text-secondary leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/practice-areas"
          className="inline-flex items-center gap-1 min-h-[44px] font-sans text-sm font-medium text-brand-gold underline-offset-4 hover:underline"
        >
          {c.homePractice.viewAll}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
