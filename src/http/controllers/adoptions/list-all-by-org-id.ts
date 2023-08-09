import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeListAdoptionsByOrgIdUseCase } from '@/use-cases/factories/make-list-adoptions-by-org-id-use-case'

export async function listAllByOrgId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const listAllSchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = listAllSchema.parse(request.params)

  try {
    const findByPetIdUseCase = makeListAdoptionsByOrgIdUseCase()

    const adoption = await findByPetIdUseCase.execute({
      page,
      userId: request.user.sub,
    })

    return reply.status(200).send(adoption)
  } catch (err) {
    throw err
  }
}
