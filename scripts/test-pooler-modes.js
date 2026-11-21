const { PrismaClient } = require("@prisma/client");

const candidates = [
  // 1. Session mode pooler (port 5432) with avnivo_user.ibrzfiwskfhlkfdjbyfv
  "postgresql://avnivo_user.ibrzfiwskfhlkfdjbyfv:AvnivoSecure2025%21Db@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require",
  // 2. Transaction mode pooler (port 6543) with avnivo_user.ibrzfiwskfhlkfdjbyfv
  "postgresql://avnivo_user.ibrzfiwskfhlkfdjbyfv:AvnivoSecure2025%21Db@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require",
  // 3. Pooler without project ref suffix
  "postgresql://avnivo_user:AvnivoSecure2025%21Db@aws-0-ap-south-1.pooler.supabase.com:5432/postgres?sslmode=require",
  "postgresql://avnivo_user:AvnivoSecure2025%21Db@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?sslmode=require",
];

async function run() {
  for (let i = 0; i < candidates.length; i++) {
    const url = candidates[i];
    console.log(`\nTesting Candidate ${i + 1}: ${url.split("@")[1]}`);
    const prisma = new PrismaClient({ datasourceUrl: url });
    try {
      const count = await prisma.category.count();
      console.log(`SUCCESS on Candidate ${i + 1}! Categories:`, count);
      await prisma.$disconnect();
      return url;
    } catch (err) {
      console.log(`Failed:`, err.message.slice(0, 150));
      await prisma.$disconnect();
    }
  }
}

run();
