import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchCityPetsToAdoptedUseCase } from '../fetch-city-pets-to-adopted'

export function makeFetchCityPetToAdoptedUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchCityPetsToAdoptedUseCase(petsRepository)

  return useCase
}
