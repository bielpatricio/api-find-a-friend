import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterAdoptionUseCase } from '@/use-cases/factories/make-register-adoption-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = registerParamsSchema.parse(request.params)

  try {
    const registerAdoptionUseCase = makeRegisterAdoptionUseCase()

    await registerAdoptionUseCase.execute({
      petId,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    throw err
  }
}
