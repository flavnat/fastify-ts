import Fastify from 'fastify'
import { envToLogger } from './config/logger.js'
import { env } from './config/env.js'
import sqlite from './plugins/sqlite.js'

const fastify = Fastify({
  logger: envToLogger["development"]
})

fastify.register(sqlite, {
  filename: "app.db"
})

fastify.get('/',(request, reply) => {
  return fastify.sqlite.prepare("SELECT * FROM users").all()
})


fastify.listen({port: env.PORT} , (err, address) => {
  if(err){
    fastify.log.error(err)
    process.exit(1)
  }
})