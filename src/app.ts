import Fastify from 'fastify';
import { env } from './config/env.js';
import { envToLogger } from './config/logger.js';
import dbPlugin from './plugins/db.js'; 
import { users } from './db/schema.js';

const fastify = Fastify({
  logger: envToLogger["development"] ?? true
});


async function start() {
  try {
    await fastify.register(dbPlugin);
    fastify.get('/', async (request, reply) => {
      const allUsers = await fastify.db.select().from(users);
      return allUsers;
    });
    
    fastify.post('/', async (request , reply) => {
        const data  = await request.body
        reply.send(data)
    })

    await fastify.listen({ port: Number(env.PORT) || 3000 });
    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();