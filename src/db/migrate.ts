import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import path from 'path';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

async function runMigrations() {
  console.log('↺ Running migrations...');
  
  try {
    await migrate(db, { migrationsFolder: path.join(__dirname, '../../drizzle') });
    console.log('✓ Migrations completed!');
  } catch (error) {
    console.error('✗ Migration failed:', error);
    process.exit(1);
  } finally {
    sqlite.close();
  }
}

runMigrations();
