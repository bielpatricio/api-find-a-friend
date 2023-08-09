import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import {
  FindManyByOrgIdParams,
  FindManyNearbyParams,
  PetsRepository,
} from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    })

    return pet
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async searchMany(query: string, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        OR: [
          {
            specie: {
              contains: query,
            },
          },
          {
            breed: {
              contains: query,
            },
          },
        ],
        Adoption: undefined,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findManyNearby({ page, city }: FindManyNearbyParams) {
    const users = await prisma.user.findMany({
      where: {
        city: {
          contains: city,
        },
        role: 'ADMIN',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    const pets = await prisma.pet.findMany({
      where: {
        user_id: {
          in: users.map((user) => user.id),
        },
        Adoption: undefined,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findManyByOrgId({ page, userId, adopted }: FindManyByOrgIdParams) {
    const pets = await prisma.pet.findMany({
      where: {
        user_id: userId,
        adopted,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }
}
