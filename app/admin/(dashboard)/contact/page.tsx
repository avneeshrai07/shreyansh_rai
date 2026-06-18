import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { updateContact } from "./actions";

export const metadata = {
  title: "Contact — Admin",
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 font-sans text-sm text-text-primary outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold";
const labelClass =
  "block font-sans text-xs font-medium uppercase tracking-wide text-text-muted";

export default async function ContactAdminPage() {
  const contact = await prisma.contact.findUnique({ where: { id: "contact" } });

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        Back to dashboard
      </Link>

      <h1 className="mt-4 font-serif text-2xl font-semibold text-text-primary md:text-3xl">
        Contact
      </h1>
      <p className="mt-1 font-sans text-sm text-text-secondary">
        Phone, email, office address, hours, and the map shown on the contact
        page. Hindi fields are optional and fall back to the English text.
      </p>

      <form action={updateContact} className="mt-8 space-y-8">
        {/* Headings */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Headings
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="headingEn">
                Heading (English)
              </label>
              <input
                id="headingEn"
                name="headingEn"
                defaultValue={contact?.headingEn ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="headingHi">
                Heading (Hindi)
              </label>
              <input
                id="headingHi"
                name="headingHi"
                defaultValue={contact?.headingHi ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="subheadingEn">
                Subheading (English)
              </label>
              <textarea
                id="subheadingEn"
                name="subheadingEn"
                rows={2}
                defaultValue={contact?.subheadingEn ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="subheadingHi">
                Subheading (Hindi)
              </label>
              <textarea
                id="subheadingHi"
                name="subheadingHi"
                rows={2}
                defaultValue={contact?.subheadingHi ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
          </div>
        </section>

        {/* Contact details */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Contact details
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="phone">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                defaultValue={contact?.phone ?? ""}
                placeholder="+91 ..."
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="whatsapp">
                WhatsApp
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                defaultValue={contact?.whatsapp ?? ""}
                placeholder="+91 ..."
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={contact?.email ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
          </div>
        </section>

        {/* Office */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Office
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="officeAddressEn">
                Address (English)
              </label>
              <textarea
                id="officeAddressEn"
                name="officeAddressEn"
                rows={2}
                defaultValue={contact?.officeAddressEn ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="officeAddressHi">
                Address (Hindi)
              </label>
              <textarea
                id="officeAddressHi"
                name="officeAddressHi"
                rows={2}
                defaultValue={contact?.officeAddressHi ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="officeHoursEn">
                Hours (English)
              </label>
              <input
                id="officeHoursEn"
                name="officeHoursEn"
                defaultValue={contact?.officeHoursEn ?? ""}
                placeholder="Mon–Sat, 10:00 AM – 6:00 PM"
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="officeHoursHi">
                Hours (Hindi)
              </label>
              <input
                id="officeHoursHi"
                name="officeHoursHi"
                defaultValue={contact?.officeHoursHi ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="googleMapsEmbedUrl">
                Google Maps embed URL
              </label>
              <input
                id="googleMapsEmbedUrl"
                name="googleMapsEmbedUrl"
                defaultValue={contact?.googleMapsEmbedUrl ?? ""}
                placeholder="https://www.google.com/maps/embed?..."
                className={`mt-1 ${fieldClass}`}
              />
              <p className="mt-1 font-sans text-xs text-text-muted">
                In Google Maps: Share → Embed a map → copy the URL inside the
                iframe’s <code>src</code>.
              </p>
            </div>
          </div>
        </section>

        <button
          type="submit"
          className="rounded-lg bg-brand-gold px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-brand-gold/90"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}
