import Fastify from 'fastify'
import { envToLogger } from './config/logger.js'
import { env } from './config/env.js'

const fastify = Fastify({
  logger: envToLogger["development"]
})


fastify.get('/',(request, reply) => {
  reply.send({hello: 'world'})
})

fastify.listen({port: env.PORT} , (err, address) => {
  if(err){
    fastify.log.error(err)
    process.exit(1)
  }
})