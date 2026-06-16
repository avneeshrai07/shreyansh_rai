import { PrismaClient } from "@prisma/client";

// We keep a SINGLE connection string in .env (DATABASE_URL = Neon's direct,
// non-pooled endpoint) so there's only one URL to manage. The Prisma CLI uses
// it as-is for migrations. But at runtime we want Neon's POOLED endpoint, which
// survives the database's scale-to-zero far better on serverless. So we derive
// the pooled URL from the direct one here.
//
// Neon's pooled host is just the direct host with "-pooler" added to the
// endpoint id, e.g.
//   direct:  ep-divine-truth-aj64x24u.c-3.us-east-2.aws.neon.tech
//   pooled:  ep-divine-truth-aj64x24u-pooler.c-3.us-east-2.aws.neon.tech
function toPooledUrl(rawUrl: string | undefined): string | undefined {
  if (!rawUrl) return undefined;
  try {
    const url = new URL(rawUrl);
    // Add "-pooler" to the first host label (the Neon endpoint id), unless the
    // URL is already a pooled one.
    if (!url.hostname.includes("-pooler")) {
      url.hostname = url.hostname.replace(/^([^.]+)/, "$1-pooler");
    }
    // PgBouncer (transaction mode) can't use prepared statements; this flag
    // tells Prisma to disable them.
    if (!url.searchParams.has("pgbouncer")) {
      url.searchParams.set("pgbouncer", "true");
    }
    return url.toString();
  } catch {
    // If it isn't parseable for any reason, fall back to the original URL.
    return rawUrl;
  }
}

// Reuse a single PrismaClient across hot-reloads in dev and across warm
// serverless invocations in prod, so we don't exhaust the connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const datasourceUrl = toPooledUrl(process.env.DATABASE_URL);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Override the schema's url with the pooled endpoint at runtime.
    ...(datasourceUrl ? { datasourceUrl } : {}),
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
