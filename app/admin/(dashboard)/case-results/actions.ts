"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

/** Optional string: empty input becomes null so the Hindi fallback kicks in. */
function optStr(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value === "" ? null : value;
}

function bool(formData: FormData, key: string): boolean {
  return formData.get(key) != null;
}

function refresh(): void {
  // Highlighted cases appear on the home page; the full list on /case-results.
  revalidatePath("/");
  revalidatePath("/case-results");
  revalidatePath("/admin/case-results");
}

export async function createCase(formData: FormData): Promise<void> {
  await requireAdmin();

  const titleEn = str(formData, "titleEn");
  const outcome = str(formData, "outcome");
  const court = str(formData, "court");
  const year = Number.parseInt(str(formData, "year"), 10);
  const summaryEn = str(formData, "summaryEn");
  if (!titleEn || !outcome || !court || !Number.isFinite(year) || !summaryEn) {
    return;
  }

  const last = await prisma.caseResult.findFirst({
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  await prisma.caseResult.create({
    data: {
      titleEn,
      titleHi: optStr(formData, "titleHi"),
      outcome,
      court,
      year,
      category: optStr(formData, "category"),
      summaryEn,
      summaryHi: optStr(formData, "summaryHi"),
      isHighlight: bool(formData, "isHighlight"),
      sortOrder: (last?.sortOrder ?? -1) + 1,
    },
  });

  refresh();
}

export async function updateCase(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  const titleEn = str(formData, "titleEn");
  const outcome = str(formData, "outcome");
  const court = str(formData, "court");
  const year = Number.parseInt(str(formData, "year"), 10);
  const summaryEn = str(formData, "summaryEn");
  if (
    !id ||
    !titleEn ||
    !outcome ||
    !court ||
    !Number.isFinite(year) ||
    !summaryEn
  ) {
    return;
  }

  const sortOrder = Number.parseInt(str(formData, "sortOrder"), 10);

  await prisma.caseResult.update({
    where: { id },
    data: {
      titleEn,
      titleHi: optStr(formData, "titleHi"),
      outcome,
      court,
      year,
      category: optStr(formData, "category"),
      summaryEn,
      summaryHi: optStr(formData, "summaryHi"),
      isHighlight: bool(formData, "isHighlight"),
      ...(Number.isFinite(sortOrder) ? { sortOrder } : {}),
    },
  });

  refresh();
}

export async function deleteCase(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  if (!id) return;

  await prisma.caseResult.delete({ where: { id } });

  refresh();
}
