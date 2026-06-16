"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useContent } from "@/lib/content";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { cn } from "@/lib/utils";

export function Navbar() {
  const c = useContent();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: c.nav.home },
    { href: "/about", label: c.nav.about },
    { href: "/practice-areas", label: c.nav.practiceAreas },
    { href: "/case-results", label: c.nav.caseResults },
    { href: "/testimonials", label: c.nav.testimonials },
    { href: "/contact", label: c.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-100">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20 overflow-visible">
          {/* Logo */}
          <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative w-28 h-28 flex-shrink-0 -my-4 mt-7">
            <Image
              src="/favicon.ico"
              alt="Shreyansh Rai logo"
              fill
              className="object-contain mix-blend-multiply"
              priority
            />
          </div>
          <span className="font-serif text-base font-semibold text-text-primary tracking-wide">
            Shreyansh Rai
          </span>
        </Link>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-5"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "inline-flex items-center min-h-[44px] font-sans text-sm transition-colors",
                  isActive(link.href)
                    ? "text-brand-gold font-medium"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[44px] px-6 py-3 bg-brand-gold text-white font-sans font-medium text-sm rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
            >
              {c.nav.consultNow}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center p-2 min-h-[44px] min-w-[44px] text-text-primary"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? (
              <X className="size-6" aria-hidden="true" />
            ) : (
              <Menu className="size-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu — slides open below the navbar */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-slate-100 bg-white"
        >
          <nav aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center min-h-[52px] px-4 py-3 border-b border-slate-50 font-sans text-base transition-colors hover:bg-surface-soft",
                  isActive(link.href)
                    ? "text-brand-gold font-medium"
                    : "text-text-primary hover:text-brand-gold",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 flex items-center justify-between gap-3">
            <LanguageToggle />
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 inline-flex items-center justify-center min-h-[44px] px-4 py-3 bg-brand-gold text-white font-sans font-medium text-base rounded-lg hover:bg-brand-gold-light transition-colors duration-200"
            >
              {c.nav.consultNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
