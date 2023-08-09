import { PrismaAdoptionsRepository } from '@/repositories/prisma/prisma-adoptions-repository'
import { ListAdoptionsByOrgIdUseCase } from '../list-adoptions-by-org-id'

export function makeListAdoptionsByOrgIdUseCase() {
  const adoptionsRepository = new PrismaAdoptionsRepository()
  const useCase = new ListAdoptionsByOrgIdUseCase(adoptionsRepository)

  return useCase
}
