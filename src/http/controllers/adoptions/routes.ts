import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { register } from './register'
import { findByPetId } from './find-by-pet-id'
import { listAllByOrgId } from './list-all-by-org-id'

export async function adoptionsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get(
    '/adoptions/:petId',
    { onRequest: [verifyUserRole('ADMIN')] },
    findByPetId,
  )

  app.get(
    '/adoptions',
    { onRequest: [verifyUserRole('ADMIN')] },
    listAllByOrgId,
  )

  app.post(
    '/adoptions/:petId',
    { onRequest: [verifyUserRole('CLIENT')] },
    register,
  )
}
