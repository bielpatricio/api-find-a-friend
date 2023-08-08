import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetDetailsSchema = z.object({
    petId: z.string(),
  })

  const { petId } = getPetDetailsSchema.parse(request.params)

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase()

    const pet = await getPetDetailsUseCase.execute({
      petId,
    })

    return reply.status(200).send(pet)
  } catch (err) {
    throw err
  }
}
