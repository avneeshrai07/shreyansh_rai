import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import type { CaseResult } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { createCase, deleteCase, updateCase } from "./actions";

export const metadata = {
  title: "Case Results — Admin",
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 font-sans text-sm text-text-primary outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold";
const labelClass =
  "block font-sans text-xs font-medium uppercase tracking-wide text-text-muted";

/** The shared field set used by both the edit and the add forms. */
function CaseFields({ data }: { data?: CaseResult }) {
  const k = data?.id ?? "new";
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`titleEn-${k}`}>
          Title (English)
        </label>
        <input
          id={`titleEn-${k}`}
          name="titleEn"
          required
          defaultValue={data?.titleEn ?? ""}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`titleHi-${k}`}>
          Title (Hindi)
        </label>
        <input
          id={`titleHi-${k}`}
          name="titleHi"
          defaultValue={data?.titleHi ?? ""}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor={`outcome-${k}`}>
          Outcome
        </label>
        <input
          id={`outcome-${k}`}
          name="outcome"
          required
          defaultValue={data?.outcome ?? ""}
          placeholder="Bail Granted"
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor={`court-${k}`}>
          Court
        </label>
        <input
          id={`court-${k}`}
          name="court"
          required
          defaultValue={data?.court ?? ""}
          placeholder="High Court — Lucknow Bench"
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor={`year-${k}`}>
          Year
        </label>
        <input
          id={`year-${k}`}
          name="year"
          type="number"
          required
          defaultValue={data?.year ?? ""}
          placeholder="2024"
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor={`category-${k}`}>
          Category
        </label>
        <input
          id={`category-${k}`}
          name="category"
          defaultValue={data?.category ?? ""}
          placeholder="NDPS"
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`summaryEn-${k}`}>
          Summary (English)
        </label>
        <textarea
          id={`summaryEn-${k}`}
          name="summaryEn"
          required
          rows={3}
          defaultValue={data?.summaryEn ?? ""}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass} htmlFor={`summaryHi-${k}`}>
          Summary (Hindi)
        </label>
        <textarea
          id={`summaryHi-${k}`}
          name="summaryHi"
          rows={3}
          defaultValue={data?.summaryHi ?? ""}
          className={`mt-1 ${fieldClass}`}
        />
      </div>
      <label className="flex items-center gap-2 font-sans text-sm text-text-secondary">
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

export default async function CaseResultsAdminPage() {
  const cases = await prisma.caseResult.findMany({
    orderBy: [{ year: "desc" }, { sortOrder: "asc" }],
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
        Case Results
      </h1>
      <p className="mt-1 font-sans text-sm text-text-secondary">
        Track record entries shown on the case results page. Highlighted entries
        also appear on the home page (top 3, newest first). Hindi fields are
        optional and fall back to the English text.
      </p>

      <div className="mt-8 space-y-4">
        {cases.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center font-sans text-sm text-text-muted">
            No case results yet. Add your first one below.
          </p>
        )}

        {cases.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <form action={updateCase} className="space-y-4">
              <input type="hidden" name="id" value={item.id} />
              <CaseFields data={item} />
              <div className="flex items-center gap-4">
                <div className="sm:max-w-[8rem]">
                  <label
                    className={labelClass}
                    htmlFor={`sortOrder-${item.id}`}
                  >
                    Order
                  </label>
                  <input
                    id={`sortOrder-${item.id}`}
                    name="sortOrder"
                    type="number"
                    defaultValue={item.sortOrder}
                    className={`mt-1 ${fieldClass}`}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="rounded-lg bg-brand-gold px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-brand-gold/90"
              >
                Save changes
              </button>
            </form>

            <form
              action={deleteCase}
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
          Add a case result
        </h2>
        <form action={createCase} className="mt-4 space-y-4">
          <CaseFields />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gold px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-brand-gold/90"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add case result
          </button>
        </form>
      </div>
    </div>
  );
}
