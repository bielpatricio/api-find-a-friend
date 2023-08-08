import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindManyPetByOrgIdUseCase } from '../find-many-pet-by-org-id'

export function makeFindManyPetByOrgIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindManyPetByOrgIdUseCase(petsRepository)

  return useCase
}
