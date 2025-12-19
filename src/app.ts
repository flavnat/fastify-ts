import Fastify from 'fastify';
import { env } from './config/env.js';
import { envToLogger } from './config/logger.js';
import db from './plugins/db.js';
import { user } from './db/schema.js';
import { auth } from './lib/auth.js';
import cors from '@fastify/cors';
const fastify = Fastify({
  logger: envToLogger["development"] ?? true
});

interface userSchema {
  name: string,
  email: string
}

fastify.post("/test-users", async (request, reply) => {
  const { name, email } = request.body as userSchema

  await fastify.db.insert(user).values({
    id: crypto.randomUUID(),
    name,
    email,
    emailVerified: false,
    createdAt: new Date(),
    updatedAt: new Date()
  });

})

async function start() {
  try {
    await fastify.register(db);
    // await fastify.register(cors, {
    //   origin: "http://localhost:3000", // In production, use your actual domain
    //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    //   credentials: true, // Required for cookies/sessions
    // });
    await fastify.listen({ port: Number(env.PORT) || 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();