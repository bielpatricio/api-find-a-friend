import { PrismaAdoptionsRepository } from '@/repositories/prisma/prisma-adoptions-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterAdoptionUseCase } from '../register-adoption'

export function makeRegisterAdoptionUseCase() {
  const adoptionsRepository = new PrismaAdoptionsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new RegisterAdoptionUseCase(
    adoptionsRepository,
    petsRepository,
  )

  return useCase
}
