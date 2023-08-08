import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeSearchPetUseCase } from '@/use-cases/factories/make-search-pet-use-case'

export async function findMany(request: FastifyRequest, reply: FastifyReply) {
  const findPetQuerySchema = z.object({
    q: z.string(),
    page: z.coerce.number().min(1).default(1),
  })

  const { q, page } = findPetQuerySchema.parse(request.query)

  try {
    const findManyUseCase = makeSearchPetUseCase()

    const { pets } = await findManyUseCase.execute({
      query: q,
      page,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (err) {
    throw err
  }
}
