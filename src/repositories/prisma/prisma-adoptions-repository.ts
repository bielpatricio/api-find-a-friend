import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaAdoptionsRepository {
  async create(data: Prisma.AdoptionUncheckedCreateInput) {
    const pet = await prisma.pet.findFirstOrThrow({
      where: { id: data.pet_id },
    })

    const orgId = pet.user_id

    await prisma.pet.update({
      where: { id: data.pet_id },
      data: {
        adopted: true,
        user_id: data.user_id,
        updated_at: new Date(),
      },
    })

    const adoption = await prisma.adoption.create({
      data: {
        ...data,
        user_id: orgId,
      },
    })

    return adoption
  }

  async findByPetId(id: string) {
    const adoption = await prisma.adoption.findUnique({
      where: { pet_id: id },
    })

    return adoption
  }

  async listAll(userId: string, page: number) {
    const adoptions = await prisma.adoption.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return adoptions
  }
}
