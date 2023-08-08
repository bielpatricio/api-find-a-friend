import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'
import { registerOrg } from './register-org'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/org', registerOrg)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  // Need be authenticated
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
