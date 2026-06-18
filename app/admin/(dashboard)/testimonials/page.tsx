import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import type { Testimonial } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import {
  createTestimonial,
  deleteTestimonial,
  updateTestimonial,
} from "./actions";

export const metadata = {
  title: "Testimonials — Admin",
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 font-sans text-sm text-text-primary outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold";
const labelClass =
  "block font-sans text-xs font-medium uppercase tracking-wide text-text-muted";

/** The shared field set used by both the edit and the add forms. */
function TestimonialFields({ data }: { data?: Testimonial }) {
  const k = data?.id ?? "new";
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label className={labelClass} htmlFor={`clientName-${k}`}>
          Client name
        </label>
        <input
          id={`clientName-${k}`}
          name="clientName"
          required
          defaultValue={data?.clientName ?? ""}
          placeholder="Ramesh K."
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor={`caseType-${k}`}>
          Case type
        </label>
        <input
          id={`caseType-${k}`}
          name="caseType"
          defaultValue={data?.caseType ?? ""}
          placeholder="Bail Matter"
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor={`clientRoleEn-${k}`}>
          Client role (English)
        </label>
        <input
          id={`clientRoleEn-${k}`}
          name="clientRoleEn"
          defaultValue={data?.clientRoleEn ?? ""}
          placeholder="Family of Accused — Bail Matter"
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor={`clientRoleHi-${k}`}>
          Client role (Hindi)
        </label>
        <input
          id={`clientRoleHi-${k}`}
          name="clientRoleHi"
          defaultValue={data?.clientRoleHi ?? ""}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`quoteEn-${k}`}>
          Quote (English)
        </label>
        <textarea
          id={`quoteEn-${k}`}
          name="quoteEn"
          required
          rows={3}
          defaultValue={data?.quoteEn ?? ""}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`quoteHi-${k}`}>
          Quote (Hindi)
        </label>
        <textarea
          id={`quoteHi-${k}`}
          name="quoteHi"
          rows={3}
          defaultValue={data?.quoteHi ?? ""}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div className="sm:max-w-[8rem]">
        <label className={labelClass} htmlFor={`rating-${k}`}>
          Rating (1–5)
        </label>
        <input
          id={`rating-${k}`}
          name="rating"
          type="number"
          min={1}
          max={5}
          defaultValue={data?.rating ?? 5}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <label className="flex items-center gap-2 font-sans text-sm text-text-secondary sm:self-end sm:pb-2.5">
        <input
          type="checkbox"
          name="isHighlight"
          defaultChecked={data?.isHighlight ?? false}
          className="size-4 rounded border-slate-300 text-brand-gold focus:ring-brand-gold"
        />
        Show on home page (highlight)
      </label>
    </div>
  );
}

export default async function TestimonialsAdminPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { publishedAt: "desc" },
  });

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
        Testimonials
      </h1>
      <p className="mt-1 font-sans text-sm text-text-secondary">
        Client testimonials shown across the site. Highlighted entries also
        appear on the home page (top 2, newest first). Hindi fields are optional
        and fall back to the English text.
      </p>

      <div className="mt-8 space-y-4">
        {testimonials.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center font-sans text-sm text-text-muted">
            No testimonials yet. Add your first one below.
          </p>
        )}

        {testimonials.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <form action={updateTestimonial} className="space-y-4">
              <input type="hidden" name="id" value={item.id} />
              <TestimonialFields data={item} />
              <button
                type="submit"
                className="rounded-lg bg-brand-gold px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-brand-gold/90"
              >
                Save changes
              </button>
            </form>

            <form
              action={deleteTestimonial}
              className="mt-3 border-t border-slate-100 pt-3"
            >
              <input type="hidden" name="id" value={item.id} />
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 font-sans text-sm font-medium text-red-600 transition-colors hover:text-red-700"
              >
                <Trash2 className="size-4" aria-hidden="true" />
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-serif text-lg font-semibold text-text-primary">
          Add a testimonial
        </h2>
        <form action={createTestimonial} className="mt-4 space-y-4">
          <TestimonialFields />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gold px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-brand-gold/90"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add testimonial
          </button>
        </form>
      </div>
    </div>
  );
}
