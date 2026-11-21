import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const getDatasourceUrl = () => {
  const direct = process.env.DIRECT_URL;
  const dbUrl = process.env.DATABASE_URL;

  // Use DIRECT_URL if available (direct Supabase host:5432 with sslmode=require)
  if (direct) {
    return direct.includes("sslmode=") ? direct : `${direct}${direct.includes("?") ? "&" : "?"}sslmode=require`;
  }
  if (dbUrl) {
    return dbUrl.includes("sslmode=") ? dbUrl : `${dbUrl}${dbUrl.includes("?") ? "&" : "?"}sslmode=require`;
  }
  return undefined;
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
