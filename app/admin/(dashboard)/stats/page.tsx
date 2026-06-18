import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { createStat, deleteStat, updateStat } from "./actions";

export const metadata = {
  title: "Stats — Admin",
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 font-sans text-sm text-text-primary outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold";
const labelClass =
  "block font-sans text-xs font-medium uppercase tracking-wide text-text-muted";

export default async function StatsAdminPage() {
  const stats = await prisma.stat.findMany({ orderBy: { sortOrder: "asc" } });

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
        Stats
      </h1>
      <p className="mt-1 font-sans text-sm text-text-secondary">
        The figures shown in the strip below the hero (e.g. “200+ Cases
        Handled”). Hindi fields are optional and fall back to the English text.
      </p>

      {/* Existing stats — each row is its own form so it saves independently. */}
      <div className="mt-8 space-y-4">
        {stats.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-center font-sans text-sm text-text-muted">
            No stats yet. Add your first one below.
          </p>
        )}

        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <form action={updateStat} className="space-y-4">
              <input type="hidden" name="id" value={stat.id} />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor={`valueEn-${stat.id}`}>
                    Value (English)
                  </label>
                  <input
                    id={`valueEn-${stat.id}`}
                    name="valueEn"
                    defaultValue={stat.valueEn}
                    required
                    className={`mt-1 ${fieldClass}`}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor={`valueHi-${stat.id}`}>
                    Value (Hindi)
                  </label>
                  <input
                    id={`valueHi-${stat.id}`}
                    name="valueHi"
                    defaultValue={stat.valueHi ?? ""}
                    className={`mt-1 ${fieldClass}`}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor={`labelEn-${stat.id}`}>
                    Label (English)
                  </label>
                  <input
                    id={`labelEn-${stat.id}`}
                    name="labelEn"
                    defaultValue={stat.labelEn}
                    required
                    className={`mt-1 ${fieldClass}`}
                  />
                </div>
                <div>
                  <label className={labelClass} htmlFor={`labelHi-${stat.id}`}>
                    Label (Hindi)
                  </label>
                  <input
                    id={`labelHi-${stat.id}`}
                    name="labelHi"
                    defaultValue={stat.labelHi ?? ""}
                    className={`mt-1 ${fieldClass}`}
                  />
                </div>
                <div className="sm:max-w-[8rem]">
                  <label className={labelClass} htmlFor={`sortOrder-${stat.id}`}>
                    Order
                  </label>
                  <input
                    id={`sortOrder-${stat.id}`}
                    name="sortOrder"
                    type="number"
                    defaultValue={stat.sortOrder}
                    className={`mt-1 ${fieldClass}`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-brand-gold px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-brand-gold/90"
                >
                  Save changes
                </button>
              </div>
            </form>

            <form action={deleteStat} className="mt-3 border-t border-slate-100 pt-3">
              <input type="hidden" name="id" value={stat.id} />
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

      {/* Add a new stat */}
      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="font-serif text-lg font-semibold text-text-primary">
          Add a stat
        </h2>
        <form action={createStat} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="new-valueEn">
                Value (English)
              </label>
              <input
                id="new-valueEn"
                name="valueEn"
                required
                placeholder="200+"
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="new-valueHi">
                Value (Hindi)
              </label>
              <input
                id="new-valueHi"
                name="valueHi"
                placeholder="200+"
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="new-labelEn">
                Label (English)
              </label>
              <input
                id="new-labelEn"
                name="labelEn"
                required
                placeholder="Cases Handled"
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="new-labelHi">
                Label (Hindi)
              </label>
              <input
                id="new-labelHi"
                name="labelHi"
                placeholder="मामले संभाले"
                className={`mt-1 ${fieldClass}`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-lg bg-brand-gold px-4 py-2 font-sans text-sm font-medium text-white transition-colors hover:bg-brand-gold/90"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add stat
          </button>
        </form>
      </div>
    </div>
  );
}
