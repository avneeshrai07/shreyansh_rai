"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/content";
import { CredentialBadge } from "@/components/ui/CredentialBadge";

export function Hero() {
  const c = useContent();

  return (
    <section className="w-full bg-surface-soft px-4 md:px-8 pt-24 pb-12 md:py-24 min-h-[100svh] md:min-h-0 flex flex-col justify-center">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 md:items-center gap-10 md:gap-12">
        {/* Text column (first in DOM — most important on mobile, M9) */}
        <div>
          {/* Court label */}
          <p
            className="animate-fade-in flex items-center gap-2 font-sans text-xs font-medium uppercase tracking-widest text-brand-gold"
            style={{ animationDelay: "0ms" }}
          >
            <span
              className="inline-block size-1.5 rounded-full bg-brand-gold"
              aria-hidden="true"
            />
            {c.hero.courtLabel}
          </p>

          {/* Visual headline — NOT the page <h1> (the SEO h1 lives on the page). */}
          <p
            className="animate-fade-up mt-4 border-l-4 border-brand-gold pl-4 font-serif text-4xl md:text-6xl font-bold text-text-primary leading-tight whitespace-pre-line"
            style={{ animationDelay: "150ms" }}
          >
            {c.hero.headline}
          </p>

          {/* Name + designation */}
          <div
            className="animate-fade-up mt-6"
            style={{ animationDelay: "300ms" }}
          >
            <p className="font-serif text-xl text-text-secondary">
              {c.hero.name}
            </p>
            <p className="mt-1 font-sans text-sm text-text-muted">
              {c.hero.designation}
            </p>
          </div>

          {/* Credential badges */}
          <div
            className="animate-fade-up mt-4"
            style={{ animationDelay: "450ms" }}
          >
            {c.hero.credentials.map((cr) => (
              <CredentialBadge key={cr}>{cr}</CredentialBadge>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="animate-fade-up mt-6 flex flex-col gap-3 md:flex-row"
            style={{ animationDelay: "600ms" }}
          >
            <Link
              href="/contact"
              className="flex items-center justify-center w-full md:w-auto min-h-[52px] px-6 py-3 bg-brand-gold text-white font-sans font-medium text-base rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
            >
              {c.hero.cta1}
            </Link>
            <Link
              href="/case-results"
              className="flex items-center justify-center w-full md:w-auto min-h-[52px] px-6 py-3 border border-brand-gold text-brand-gold font-sans font-medium text-base rounded-lg hover:bg-brand-gold-faint transition-colors duration-200"
            >
              {c.hero.cta2}
            </Link>
          </div>
        </div>

        {/* Photo column */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: "300ms" }}
        >
          {/* Divider only on mobile, above the photo */}
          <hr className="md:hidden mb-6 border-slate-200" />

          <div className="relative w-full aspect-[4/5] rounded-lg bg-slate-200 overflow-hidden">
            <Image
              src="/shreyansh_rai_image.png"
              alt={`${c.hero.name} — ${c.hero.designation}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-4">
              <div
                className="size-10 rounded-full bg-white/90 backdrop-blur-sm"
                aria-hidden="true"
              />
              <div className="rounded-md bg-white/90 backdrop-blur-sm px-3 py-2">
                <p className="font-serif text-sm text-text-primary leading-none">
                  {c.hero.name}
                </p>
                <p className="mt-1 font-sans text-xs text-text-muted leading-none">
                  {c.hero.designation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
