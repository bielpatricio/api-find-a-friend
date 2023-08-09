import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeFindManyPetByOrgIdUseCase } from '@/use-cases/factories/make-find-many-pet-already-adopted-by-org-id-use-case'

export async function findPetByOrgId(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findPetQuerySchema = z.object({
    adopted: z.string().transform((val) => val === 'true'),
    page: z.coerce.number().min(1).default(1),
  })

  const findPetParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const { adopted, page } = findPetQuerySchema.parse(request.query)

  const { orgId } = findPetParamsSchema.parse(request.params)

  try {
    const findPetPetUseCase = makeFindManyPetByOrgIdUseCase()

    const { pets } = await findPetPetUseCase.execute({
      adopted,
      page,
      userId: orgId,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (err) {
    throw err
  }
}
