const fs = require('fs');
const { execSync } = require('child_process');

// Read schema and change provider to postgresql
const schema = fs.readFileSync('prisma/schema.prisma', 'utf8');
const pgSchema = schema.replace('provider = "sqlite"', 'provider = "postgresql"');
fs.writeFileSync('prisma/schema.postgres.prisma', pgSchema);

try {
  console.log('Generating PostgreSQL DDL...');
  const sql = execSync('npx.cmd prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.postgres.prisma --script', {
    encoding: 'utf8'
  });
  fs.writeFileSync('prisma/supabase_init.sql', sql);
  console.log('Successfully generated prisma/supabase_init.sql! Length:', sql.length);
} catch (err) {
  console.error('Error generating migration:', err.message);
} finally {
  if (fs.existsSync('prisma/schema.postgres.prisma')) {
    fs.unlinkSync('prisma/schema.postgres.prisma');
  }
}
