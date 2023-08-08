import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    age: z.number(),
    specie: z.string(),
    breed: z.string(),
    description: z.string().nullable(),
  })

  const { name, age, specie, breed, description } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      name,
      age,
      specie,
      breed,
      description,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  } catch (err) {
    throw err
  }
}
