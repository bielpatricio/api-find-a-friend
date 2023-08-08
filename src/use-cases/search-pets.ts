import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindManyPetUseCaseRequest {
  query: string
  page: number
}

interface FindManyPetUseCaseResponse {
  pets: Pet[]
}

export class FindManyPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    query,
    page,
  }: FindManyPetUseCaseRequest): Promise<FindManyPetUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(query, page)

    return { pets }
  }
}
