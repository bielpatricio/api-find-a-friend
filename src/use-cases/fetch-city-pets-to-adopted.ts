import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchNearbyPetsUseCaseRequest {
  city: string
  page: number
}

interface FetchNearbyPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchCityPetsToAdoptedUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    page,
  }: FetchNearbyPetsUseCaseRequest): Promise<FetchNearbyPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyNearby({
      city,
      page,
    })

    return { pets }
  }
}
