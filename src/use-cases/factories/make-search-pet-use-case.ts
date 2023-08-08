import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindManyPetUseCase } from '../search-pets'

export function makeSearchPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindManyPetUseCase(petsRepository)

  return useCase
}
