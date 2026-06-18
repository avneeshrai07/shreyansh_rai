"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { EducationItem } from "@/lib/content/types";

// Server Actions are reachable via direct POST requests, so every one of them
// re-checks the admin session before touching the database.
async function requireAdmin(): Promise<void> {
  if (!(await getSession())) {
    throw new Error("Unauthorized");
  }
}

function str(formData: FormData, key: string): string {
  return String(formData.get(key) ?? "").trim();
}

/** Optional string: empty input becomes null so the view's fallback kicks in. */
function optStr(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value === "" ? null : value;
}

/** Split a textarea into paragraphs on blank lines (one entry per paragraph). */
function paragraphs(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Split a textarea into one entry per non-empty line. */
function lines(formData: FormData, key: string): string[] {
  return str(formData, key)
    .split(/\n/)
    .map((l) => l.trim())
    .filter(Boolean);
}

/**
 * Collect the education timeline from the indexed form fields
 * (`edu-<i>-degreeEn`, …). The form posts an `eduCount`; rows that are entirely
 * blank are dropped so trailing empty rows don't create empty entries.
 */
function education(formData: FormData): EducationItem[] {
  const count = Number.parseInt(str(formData, "eduCount"), 10);
  if (!Number.isFinite(count) || count <= 0) return [];

  const items: EducationItem[] = [];
  for (let i = 0; i < count; i++) {
    const degreeEn = str(formData, `edu-${i}-degreeEn`);
    const degreeHi = str(formData, `edu-${i}-degreeHi`);
    const institutionEn = str(formData, `edu-${i}-institutionEn`);
    const institutionHi = str(formData, `edu-${i}-institutionHi`);
    const year = str(formData, `edu-${i}-year`);

    if (!degreeEn && !degreeHi && !institutionEn && !institutionHi && !year) {
      continue;
    }

    const item: EducationItem = {};
    if (degreeEn) item.degreeEn = degreeEn;
    if (degreeHi) item.degreeHi = degreeHi;
    if (institutionEn) item.institutionEn = institutionEn;
    if (institutionHi) item.institutionHi = institutionHi;
    if (year) item.year = year;
    items.push(item);
  }
  return items;
}

export async function updateAbout(formData: FormData): Promise<void> {
  await requireAdmin();

  const fullName = str(formData, "fullName");
  const designationEn = str(formData, "designationEn");
  const courtEn = str(formData, "courtEn");
  // These three are non-nullable in the schema; bail rather than wipe them.
  if (!fullName || !designationEn || !courtEn) {
    return;
  }

  const data = {
    fullName,
    designationEn,
    designationHi: optStr(formData, "designationHi"),
    courtEn,
    courtHi: optStr(formData, "courtHi"),
    taglineEn: optStr(formData, "taglineEn"),
    taglineHi: optStr(formData, "taglineHi"),
    photoUrl: optStr(formData, "photoUrl"),
    bioEn: paragraphs(formData, "bioEn"),
    bioHi: paragraphs(formData, "bioHi"),
    education: education(formData) as unknown as Prisma.InputJsonValue,
    barEnrollmentNumber: optStr(formData, "barEnrollmentNumber"),
    enrolledSinceYear: optStr(formData, "enrolledSinceYear"),
    highlightsEn: lines(formData, "highlightsEn"),
    highlightsHi: lines(formData, "highlightsHi"),
    linkedinUrl: optStr(formData, "linkedinUrl"),
    instagramUrl: optStr(formData, "instagramUrl"),
  };

  await prisma.about.upsert({
    where: { id: "about" },
    update: data,
    create: { id: "about", ...data },
  });

  // The about page renders this content; the editor re-reads it on reload.
  revalidatePath("/about");
  revalidatePath("/admin/about");
}
