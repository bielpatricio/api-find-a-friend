import { PrismaAdoptionsRepository } from '@/repositories/prisma/prisma-adoptions-repository'
import { FindAdoptionByPetIdUseCase } from '../find-adoption-by-pet-id'

export function makeFindAdoptionByPetIdUseCase() {
  const adoptionsRepository = new PrismaAdoptionsRepository()
  const useCase = new FindAdoptionByPetIdUseCase(adoptionsRepository)

  return useCase
}
