import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindManyPetByOrgIdUseCaseRequest {
  userId: string
  adopted?: boolean
  page: number
}

interface FindManyPetByOrgIdUseCaseResponse {
  pets: Pet[]
}

export class FindManyPetByOrgIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    userId,
    adopted,
    page,
  }: FindManyPetByOrgIdUseCaseRequest): Promise<FindManyPetByOrgIdUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgId({
      userId,
      page,
      adopted,
    })

    return { pets }
  }
}
