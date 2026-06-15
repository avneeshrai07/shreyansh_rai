import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = "2024-01-01";

/**
 * Whether a real Sanity project is wired up via env vars. When false, pages
 * fall back to the bundled dummy data so the site still builds and renders
 * (see ADVOCATE_PORTFOLIO_PLAN §21).
 */
export const isSanityConfigured = projectId.length > 0;

export const client = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Safe fetch wrapper: short-circuits to `fallback` when Sanity is not
 * configured, and never throws — any error (network, bad query) also yields
 * the fallback so the page can still render.
 */
export async function sanityFetch<T>(query: string, fallback: T): Promise<T> {
  if (!isSanityConfigured) return fallback;
  try {
    return await client.fetch<T>(query);
  } catch {
    return fallback;
  }
}
