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

function refresh(): void {
  // The strip lives on the home page; the editor lists rows on its own page.
  revalidatePath("/");
  revalidatePath("/admin/stats");
}

export async function createStat(formData: FormData): Promise<void> {
  await requireAdmin();

  const valueEn = str(formData, "valueEn");
  const labelEn = str(formData, "labelEn");
  if (!valueEn || !labelEn) {
    // Both the value and the English label are required to render a stat.
    return;
  }

  // New rows go to the end of the list by default.
  const last = await prisma.stat.findFirst({
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });

  await prisma.stat.create({
    data: {
      valueEn,
      valueHi: optStr(formData, "valueHi"),
      labelEn,
      labelHi: optStr(formData, "labelHi"),
      sortOrder: (last?.sortOrder ?? -1) + 1,
    },
  });

  refresh();
}

export async function updateStat(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  const valueEn = str(formData, "valueEn");
  const labelEn = str(formData, "labelEn");
  if (!id || !valueEn || !labelEn) {
    return;
  }

  const sortOrder = Number.parseInt(str(formData, "sortOrder"), 10);

  await prisma.stat.update({
    where: { id },
    data: {
      valueEn,
      valueHi: optStr(formData, "valueHi"),
      labelEn,
      labelHi: optStr(formData, "labelHi"),
      ...(Number.isFinite(sortOrder) ? { sortOrder } : {}),
    },
  });

  refresh();
}

export async function deleteStat(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = str(formData, "id");
  if (!id) return;

  await prisma.stat.delete({ where: { id } });

  refresh();
}
