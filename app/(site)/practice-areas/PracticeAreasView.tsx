"use client";

import Link from "next/link";
import { useContent } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { PracticeIcon } from "@/components/ui/PracticeIcon";

export function PracticeAreasView() {
  const c = useContent();

  return (
    <main id="main-content">
      <article>
        <PageHero
          label={c.pages.practiceAreas.label}
          title={c.pages.practiceAreas.title}
          subtitle={c.pages.practiceAreas.subtitle}
        />

        <section
          aria-labelledby="practice-list-heading"
          className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
        >
          <h2 id="practice-list-heading" className="sr-only">
            {c.practiceAreas.heading}
          </h2>

          <p className="max-w-3xl font-sans text-base text-text-secondary leading-relaxed">
            {c.practiceAreas.intro}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {c.practiceAreas.items.map((item) => (
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

          {/* Internal links (HARD_FOCUS_RULES S7: Practice → Cases, Contact) */}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/case-results"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-brand-gold text-white font-sans font-medium text-sm rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
            >
              {c.homeCases.viewAll}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 border border-brand-gold text-brand-gold font-sans font-medium text-sm rounded-lg hover:bg-brand-gold-faint transition-colors duration-200"
            >
              {c.homeCta.button}
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}
