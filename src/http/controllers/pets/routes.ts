import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import { register } from './register'
import { findPetByOrgId } from './find-pets-by-org-id'
import { findManyNearby } from './search-many-nearby'
import { findMany } from './find-many'
import { getPetDetails } from './get-pet-details'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/pets/org/:orgId', findPetByOrgId)
  app.get('/pets/nearby', findManyNearby)
  app.get('/pets', findMany)
  app.get('/pets/:petId', getPetDetails)
  app.post('/pets', { onRequest: [verifyUserRole('ADMIN')] }, register)
}
