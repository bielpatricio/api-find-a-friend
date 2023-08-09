import { Adoption } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { AdoptionsRepository } from '@/repositories/adoptions-repository'

interface FindAdoptionByPetIdUseCaseRequest {
  petId: string
}

interface FindAdoptionByPetIdUseCaseResponse {
  adoption: Adoption
}

export class FindAdoptionByPetIdUseCase {
  constructor(private adoptionsRepository: AdoptionsRepository) {}

  async execute({
    petId,
  }: FindAdoptionByPetIdUseCaseRequest): Promise<FindAdoptionByPetIdUseCaseResponse> {
    const adoption = await this.adoptionsRepository.findByPetId(petId)

    if (!adoption) {
      throw new ResourceNotFoundError()
    }

    return { adoption }
  }
}
