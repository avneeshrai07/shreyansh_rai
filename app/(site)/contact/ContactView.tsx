"use client";

import { Phone, Mail, MessageCircle, MapPin, Clock } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { useContent } from "@/lib/content";
import { telHref, whatsappHref } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/sections/ContactForm";
import type { ContactData } from "@/lib/sanity/queries";

export function ContactView({ contact }: { contact: ContactData }) {
  const { lang } = useLang();
  const c = useContent();
  const isHi = lang === "hi";

  const address = isHi
    ? contact.officeAddressHi ?? contact.officeAddressEn
    : contact.officeAddressEn;
  const hours = isHi
    ? contact.officeHoursHi ?? contact.officeHoursEn
    : contact.officeHoursEn;
  const subheading = isHi
    ? contact.subheadingHi ?? contact.subheadingEn
    : contact.subheadingEn;

  return (
    <main id="main-content">
      <article>
        <PageHero
          label={c.pages.contact.label}
          title={c.pages.contact.title}
          subtitle={subheading ?? c.pages.contact.subtitle}
        />

        <section
          aria-labelledby="contact-heading"
          className="w-full px-4 md:px-8 py-12 md:py-20 max-w-5xl mx-auto"
        >
          <h2 id="contact-heading" className="sr-only">
            {c.pages.contact.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {/* Form — first on mobile (M9), right on desktop */}
            <div className="md:order-2">
              <ContactForm />
            </div>

            {/* Contact info — second on mobile, left on desktop */}
            <div className="md:order-1">
              <h3 className="font-serif text-xl font-medium text-text-primary">
                {c.contact.infoHeading}
              </h3>
              <ul className="mt-5 space-y-5">
                {contact.phone ? (
                  <li className="flex items-start gap-3">
                    <Phone
                      className="size-5 shrink-0 text-brand-gold mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                        {c.contact.phone}
                      </p>
                      <a
                        href={telHref(contact.phone)}
                        className="font-sans text-base text-text-primary hover:text-brand-gold transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </li>
                ) : null}

                {contact.email ? (
                  <li className="flex items-start gap-3">
                    <Mail
                      className="size-5 shrink-0 text-brand-gold mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                        {c.contact.email}
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="font-sans text-base text-text-primary hover:text-brand-gold transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </li>
                ) : null}

                {contact.whatsapp ? (
                  <li className="flex items-start gap-3">
                    <MessageCircle
                      className="size-5 shrink-0 text-brand-gold mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                        {c.contact.whatsapp}
                      </p>
                      <a
                        href={whatsappHref(
                          contact.whatsapp,
                          c.contact.whatsappMessage,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-base text-text-primary hover:text-brand-gold transition-colors"
                      >
                        {contact.whatsapp}
                      </a>
                    </div>
                  </li>
                ) : null}

                {address ? (
                  <li className="flex items-start gap-3">
                    <MapPin
                      className="size-5 shrink-0 text-brand-gold mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                        {c.contact.address}
                      </p>
                      <p className="font-sans text-base text-text-primary whitespace-pre-line">
                        {address}
                      </p>
                    </div>
                  </li>
                ) : null}

                {hours ? (
                  <li className="flex items-start gap-3">
                    <Clock
                      className="size-5 shrink-0 text-brand-gold mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-sans text-xs uppercase tracking-wide text-text-muted">
                        {c.contact.hours}
                      </p>
                      <p className="font-sans text-base text-text-primary">
                        {hours}
                      </p>
                    </div>
                  </li>
                ) : null}
              </ul>
            </div>
          </div>

          {/* Map */}
          <div className="mt-12">
            <h3 className="font-serif text-xl font-medium text-text-primary">
              {c.contact.mapHeading}
            </h3>
            {contact.googleMapsEmbedUrl ? (
              <div className="mt-4 rounded-lg overflow-hidden h-64 md:h-96">
                <iframe
                  src={contact.googleMapsEmbedUrl}
                  title="Office location map"
                  width="100%"
                  height="100%"
                  className="border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : (
              <div className="mt-4 flex items-center justify-center h-64 bg-slate-100 rounded-lg">
                <MapPin className="size-8 text-text-muted" aria-hidden="true" />
              </div>
            )}
          </div>
        </section>
      </article>
    </main>
  );
}
