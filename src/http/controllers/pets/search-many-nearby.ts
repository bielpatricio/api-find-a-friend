import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFetchCityPetToAdoptedUseCase } from '@/use-cases/factories/make-fetch-city-pets-to-adopted-use-case'

export async function findManyNearby(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetNearbyQuerySchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { city, page } = findPetNearbyQuerySchema.parse(request.query)

  try {
    const findManyNearbyUseCase = makeFetchCityPetToAdoptedUseCase()

    const { pets } = await findManyNearbyUseCase.execute({
      city,
      page,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (err) {
    throw err
  }
}
