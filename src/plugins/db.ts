import fp from 'fastify-plugin';
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from '../db/schema.js';

declare module 'fastify' {
  interface FastifyInstance {
    db: BetterSQLite3Database<typeof schema>;
  }
}

const sqlite = new Database('./data/app.db');
export const db = drizzle(sqlite, { schema });

export default fp(async (fastify) => {
  fastify.decorate('db', db);
  fastify.addHook('onClose', async () => {
    sqlite.close();
  });
}, { name: 'db' });