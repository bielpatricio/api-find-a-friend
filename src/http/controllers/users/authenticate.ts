import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { UserEmailAlreadyExistsError } from '@/use-cases/errors/user-email-already-exists-error'
import { UserPhoneAlreadyExistsError } from '@/use-cases/errors/user-phone-already-exists-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(32),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (err) {
    if (
      err instanceof UserEmailAlreadyExistsError ||
      err instanceof UserPhoneAlreadyExistsError
    ) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw err
  }
}
