"use client";

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { Check } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useContent } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { AboutData } from "@/lib/sanity/queries";

export function AboutView({ about }: { about: AboutData }) {
  const { lang } = useLang();
  const c = useContent();
  const isHi = lang === "hi";

  const designation = isHi
    ? about.designationHi ?? about.designationEn
    : about.designationEn;
  const court = isHi ? about.courtHi ?? about.courtEn : about.courtEn;
  const bio = isHi ? about.bioHi ?? about.bioEn : about.bioEn;
  const highlights = isHi
    ? about.highlightsHi ?? about.highlightsEn
    : about.highlightsEn;

  return (
    <main id="main-content">
      <article>
        <PageHero
          label={c.pages.about.label}
          title={c.pages.about.title}
          subtitle={court}
        />

        {/* Profile split — photo first on mobile (M9) */}
        <section
          aria-labelledby="about-profile-heading"
          className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
        >
          <h2 id="about-profile-heading" className="sr-only">
            Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
            {/* Photo */}
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden bg-slate-200">
              <Image
                src="/shreyansh_rai_image.png"
                alt={`Advocate ${about.fullName ?? "Shreyansh Rai"} — Criminal Lawyer at High Court Lucknow`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
                <div className="rounded-md bg-white/90 px-3 py-2">
                  <p className="font-serif text-sm text-text-primary leading-none">
                    {about.fullName ?? "Shreyansh Rai"}
                  </p>
                  <p className="mt-1 font-sans text-xs text-text-muted leading-none">
                    {designation}
                  </p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="border-l-4 border-brand-gold pl-4 md:pl-6">
              <p className="text-xs font-sans font-medium uppercase tracking-widest text-brand-gold">
                {c.about.introLabel}
              </p>
              <p className="mt-1 font-serif text-2xl md:text-3xl font-semibold text-text-primary">
                {about.fullName ?? "Shreyansh Rai"}
              </p>
              <p className="mt-1 font-sans text-sm text-text-secondary">
                {designation} — {court}
              </p>

              <div className="mt-5 space-y-4 font-sans text-base text-text-secondary leading-relaxed [&_p]:mb-4">
                {bio && bio.length > 0 ? (
                  <PortableText value={bio} />
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Education */}
        {about.education && about.education.length > 0 ? (
          <section
            aria-labelledby="about-education-heading"
            className="w-full bg-surface-soft"
          >
            <div className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto">
              <SectionHeader
                label={c.about.educationLabel}
                heading={c.about.educationHeading}
                headingId="about-education-heading"
              />
              <ul className="border-l-2 border-slate-200 ml-2 pl-6 space-y-6">
                {about.education.map((edu, i) => {
                  const degree = isHi
                    ? edu.degreeHi ?? edu.degreeEn
                    : edu.degreeEn;
                  const institution = isHi
                    ? edu.institutionHi ?? edu.institutionEn
                    : edu.institutionEn;
                  return (
                    <li key={i} className="relative">
                      <span
                        className="absolute -left-[31px] top-1.5 size-3 rounded-full bg-brand-gold ring-4 ring-surface-soft"
                        aria-hidden="true"
                      />
                      <p className="font-serif font-medium text-text-primary">
                        {degree}
                      </p>
                      {institution ? (
                        <p className="font-sans text-sm text-text-secondary">
                          {institution}
                        </p>
                      ) : null}
                      {edu.year ? (
                        <p className="mt-0.5 font-sans text-xs text-text-muted">
                          {edu.year}
                        </p>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ) : null}

        {/* Experience highlights */}
        {highlights && highlights.length > 0 ? (
          <section
            aria-labelledby="about-highlights-heading"
            className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
          >
            <SectionHeader
              label={c.about.highlightsLabel}
              heading={c.about.highlightsHeading}
              headingId="about-highlights-heading"
            />
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-surface-muted rounded-lg p-4"
                >
                  <Check
                    className="size-5 shrink-0 text-brand-gold mt-0.5"
                    aria-hidden="true"
                  />
                  <span className="font-sans text-sm text-text-secondary leading-relaxed">
                    {h}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Bar enrollment + internal links */}
        <section
          aria-labelledby="about-bar-heading"
          className="w-full px-4 md:px-8 pb-12 md:pb-20 max-w-5xl mx-auto"
        >
          <h2
            id="about-bar-heading"
            className="font-serif text-2xl md:text-3xl font-semibold text-text-primary"
          >
            {c.about.barHeading}
          </h2>
          <div className="mt-4 bg-brand-gold-faint border border-amber-200 rounded-lg p-4 font-sans text-sm text-text-secondary">
            <span>
              {c.about.enrolledSince}: {about.enrolledSinceYear ?? "—"}
            </span>
            <span className="mx-2 text-text-muted">|</span>
            <span>
              {c.about.enrollmentNo}: {about.barEnrollmentNumber ?? "—"}
            </span>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
