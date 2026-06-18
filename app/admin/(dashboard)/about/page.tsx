import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { EducationItem } from "@/lib/content/types";
import { updateAbout } from "./actions";

export const metadata = {
  title: "About — Admin",
};

const fieldClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 font-sans text-sm text-text-primary outline-none focus:border-brand-gold focus:ring-1 focus:ring-brand-gold";
const labelClass =
  "block font-sans text-xs font-medium uppercase tracking-wide text-text-muted";

// Render the existing education entries plus a few blank rows so new ones can
// be added without client-side JavaScript.
const BLANK_EDU_ROWS = 3;

export default async function AboutAdminPage() {
  const about = await prisma.about.findUnique({ where: { id: "about" } });
  const education = (about?.education as unknown as EducationItem[]) ?? [];
  const eduRows = education.length + BLANK_EDU_ROWS;

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
        About
      </h1>
      <p className="mt-1 font-sans text-sm text-text-secondary">
        Profile, bio, education, highlights, and social links shown on the about
        page. Hindi fields are optional and fall back to the English text.
      </p>

      <form action={updateAbout} className="mt-8 space-y-8">
        {/* Identity */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Identity
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                required
                defaultValue={about?.fullName ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="designationEn">
                Designation (English)
              </label>
              <input
                id="designationEn"
                name="designationEn"
                required
                defaultValue={about?.designationEn ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="designationHi">
                Designation (Hindi)
              </label>
              <input
                id="designationHi"
                name="designationHi"
                defaultValue={about?.designationHi ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="courtEn">
                Court (English)
              </label>
              <input
                id="courtEn"
                name="courtEn"
                required
                defaultValue={about?.courtEn ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="courtHi">
                Court (Hindi)
              </label>
              <input
                id="courtHi"
                name="courtHi"
                defaultValue={about?.courtHi ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="taglineEn">
                Tagline (English)
              </label>
              <input
                id="taglineEn"
                name="taglineEn"
                defaultValue={about?.taglineEn ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="taglineHi">
                Tagline (Hindi)
              </label>
              <input
                id="taglineHi"
                name="taglineHi"
                defaultValue={about?.taglineHi ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass} htmlFor="photoUrl">
                Photo URL
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                defaultValue={about?.photoUrl ?? ""}
                placeholder="/shreyansh_rai_image.png"
                className={`mt-1 ${fieldClass}`}
              />
              <p className="mt-1 font-sans text-xs text-text-muted">
                Leave blank to use the default bundled photo. External URLs must
                be on a domain configured in next.config.
              </p>
            </div>
          </div>
        </section>

        {/* Bio */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Bio
          </h2>
          <p className="mt-1 font-sans text-xs text-text-muted">
            Separate paragraphs with a blank line.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass} htmlFor="bioEn">
                Bio (English)
              </label>
              <textarea
                id="bioEn"
                name="bioEn"
                rows={6}
                defaultValue={(about?.bioEn ?? []).join("\n\n")}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="bioHi">
                Bio (Hindi)
              </label>
              <textarea
                id="bioHi"
                name="bioHi"
                rows={6}
                defaultValue={(about?.bioHi ?? []).join("\n\n")}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Education
          </h2>
          <p className="mt-1 font-sans text-xs text-text-muted">
            Fill the rows you need; leave the rest blank. Clear a row’s fields to
            remove it.
          </p>
          <input type="hidden" name="eduCount" value={eduRows} />
          <div className="mt-4 space-y-4">
            {Array.from({ length: eduRows }).map((_, i) => {
              const item = education[i];
              return (
                <fieldset
                  key={i}
                  className="rounded-lg border border-slate-200 p-4"
                >
                  <legend className="px-1 font-sans text-xs font-medium text-text-muted">
                    Entry {i + 1}
                  </legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <input
                      name={`edu-${i}-degreeEn`}
                      defaultValue={item?.degreeEn ?? ""}
                      placeholder="Degree (English)"
                      className={fieldClass}
                    />
                    <input
                      name={`edu-${i}-degreeHi`}
                      defaultValue={item?.degreeHi ?? ""}
                      placeholder="Degree (Hindi)"
                      className={fieldClass}
                    />
                    <input
                      name={`edu-${i}-institutionEn`}
                      defaultValue={item?.institutionEn ?? ""}
                      placeholder="Institution (English)"
                      className={fieldClass}
                    />
                    <input
                      name={`edu-${i}-institutionHi`}
                      defaultValue={item?.institutionHi ?? ""}
                      placeholder="Institution (Hindi)"
                      className={fieldClass}
                    />
                    <input
                      name={`edu-${i}-year`}
                      defaultValue={item?.year ?? ""}
                      placeholder="Year (e.g. Completed, 2016)"
                      className={`sm:col-span-2 ${fieldClass}`}
                    />
                  </div>
                </fieldset>
              );
            })}
          </div>
        </section>

        {/* Highlights */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Experience highlights
          </h2>
          <p className="mt-1 font-sans text-xs text-text-muted">
            One highlight per line.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass} htmlFor="highlightsEn">
                Highlights (English)
              </label>
              <textarea
                id="highlightsEn"
                name="highlightsEn"
                rows={5}
                defaultValue={(about?.highlightsEn ?? []).join("\n")}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="highlightsHi">
                Highlights (Hindi)
              </label>
              <textarea
                id="highlightsHi"
                name="highlightsHi"
                rows={5}
                defaultValue={(about?.highlightsHi ?? []).join("\n")}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
          </div>
        </section>

        {/* Bar + links */}
        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-serif text-lg font-semibold text-text-primary">
            Bar enrollment & links
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="barEnrollmentNumber">
                Bar enrollment number
              </label>
              <input
                id="barEnrollmentNumber"
                name="barEnrollmentNumber"
                defaultValue={about?.barEnrollmentNumber ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="enrolledSinceYear">
                Enrolled since (year)
              </label>
              <input
                id="enrolledSinceYear"
                name="enrolledSinceYear"
                defaultValue={about?.enrolledSinceYear ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="linkedinUrl">
                LinkedIn URL
              </label>
              <input
                id="linkedinUrl"
                name="linkedinUrl"
                defaultValue={about?.linkedinUrl ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="instagramUrl">
                Instagram URL
              </label>
              <input
                id="instagramUrl"
                name="instagramUrl"
                defaultValue={about?.instagramUrl ?? ""}
                className={`mt-1 ${fieldClass}`}
              />
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
