import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const FALLBACK_DIRECT_URL =
  "postgresql://avnivo_user:AvnivoSecure2025%21Db@db.ibrzfiwskfhlkfdjbyfv.supabase.co:5432/postgres?sslmode=require";

const getDatasourceUrl = () => {
  const direct = process.env.DIRECT_URL;
  const dbUrl = process.env.DATABASE_URL;

  // If a direct non-pooler URL is provided, use it
  if (direct && !direct.includes("pooler.supabase.com")) {
    return direct.includes("sslmode=") ? direct : `${direct}${direct.includes("?") ? "&" : "?"}sslmode=require`;
  }
  // If dbUrl is provided and not pointing to pooler, use it
  if (dbUrl && !dbUrl.includes("pooler.supabase.com")) {
    return dbUrl.includes("sslmode=") ? dbUrl : `${dbUrl}${dbUrl.includes("?") ? "&" : "?"}sslmode=require`;
  }
  // Safe reliable direct Supabase connection (verified in ap-south-1 Mumbai)
  return FALLBACK_DIRECT_URL;
};

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasourceUrl: getDatasourceUrl(),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
