import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { UserEmailAlreadyExistsError } from '@/use-cases/errors/user-email-already-exists-error'
import { UserPhoneAlreadyExistsError } from '@/use-cases/errors/user-phone-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6).max(32),
    phone: z.string(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
  })

  const { email, name, password, phone, address, city, state } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
    })

    return reply.status(201).send()
  } catch (err) {
    if (
      err instanceof UserEmailAlreadyExistsError ||
      err instanceof UserPhoneAlreadyExistsError
    ) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw err
  }
}
