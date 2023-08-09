import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFindAdoptionByPetIdUseCase } from '@/use-cases/factories/make-find-adoption-by-pet-id-use-case'

export async function findByPetId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findByPetIdSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = findByPetIdSchema.parse(request.params)

  try {
    const findByPetIdUseCase = makeFindAdoptionByPetIdUseCase()

    const adoption = await findByPetIdUseCase.execute({
      petId,
    })

    return reply.status(200).send(adoption)
  } catch (err) {
    throw err
  }
}
