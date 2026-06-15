"use client";

import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { useContent } from "@/lib/content";
import { site, telHref, whatsappHref } from "@/lib/site";

// lucide v1 removed brand icons, so these are small inline brand marks.
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.25 8h4.5v16H.25V8zm7.5 0h4.31v2.19h.06c.6-1.14 2.07-2.34 4.26-2.34 4.56 0 5.4 3 5.4 6.9V24h-4.5v-7.6c0-1.81-.03-4.14-2.52-4.14-2.52 0-2.91 1.97-2.91 4v7.74h-4.5V8z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const c = useContent();

  const navLinks = [
    { href: "/about", label: c.nav.about },
    { href: "/practice-areas", label: c.nav.practiceAreas },
    { href: "/case-results", label: c.nav.caseResults },
    { href: "/testimonials", label: c.nav.testimonials },
    { href: "/contact", label: c.nav.contact },
  ];

  return (
    <footer className="w-full bg-surface-soft border-t border-slate-100">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 — identity */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-brand-gold">
                SR
              </span>
              <span className="font-sans text-sm text-text-secondary">
                Shreyansh Rai
              </span>
            </Link>
            <p className="mt-3 font-sans text-sm text-text-secondary leading-relaxed">
              {c.footer.tagline}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-text-secondary hover:text-brand-gold transition-colors"
                aria-label="Shreyansh Rai on LinkedIn"
              >
                <LinkedinIcon className="size-5" />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-text-secondary hover:text-brand-gold transition-colors"
                aria-label="Shreyansh Rai on Instagram"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </div>

          {/* Column 2 — quick links */}
          <nav aria-label="Footer">
            <h2 className="font-serif text-lg font-medium text-text-primary">
              {c.footer.linksHeading}
            </h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] font-sans text-sm text-text-secondary hover:text-brand-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3 — contact */}
          <div>
            <h2 className="font-serif text-lg font-medium text-text-primary">
              {c.footer.contactHeading}
            </h2>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href={telHref(site.phone)}
                  className="inline-flex items-center gap-2 min-h-[44px] font-sans text-sm text-text-secondary hover:text-brand-gold transition-colors"
                >
                  <Phone className="size-4 text-brand-gold" aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 min-h-[44px] font-sans text-sm text-text-secondary hover:text-brand-gold transition-colors"
                >
                  <Mail className="size-4 text-brand-gold" aria-hidden="true" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref(site.whatsapp, c.contact.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 min-h-[44px] font-sans text-sm text-text-secondary hover:text-brand-gold transition-colors"
                >
                  <MessageCircle
                    className="size-4 text-brand-gold"
                    aria-hidden="true"
                  />
                  {c.contact.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider + legal */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <p className="font-sans text-xs text-text-muted">
            {c.footer.copyright}
          </p>
          <p className="max-w-2xl font-sans text-xs text-text-muted leading-relaxed">
            {c.footer.disclaimer}
          </p>
        </div>
      </div>
    </footer>
  );
}
