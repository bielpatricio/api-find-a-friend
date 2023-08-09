import { Adoption } from '@prisma/client'
import { AdoptionsRepository } from '@/repositories/adoptions-repository'

interface ListAdoptionsByOrgIdUseCaseRequest {
  userId: string
  page: number
}

interface ListAdoptionsByOrgIdUseCaseResponse {
  adoptions: Adoption[]
}

export class ListAdoptionsByOrgIdUseCase {
  constructor(private adoptionsRepository: AdoptionsRepository) {}

  async execute({
    userId,
    page,
  }: ListAdoptionsByOrgIdUseCaseRequest): Promise<ListAdoptionsByOrgIdUseCaseResponse> {
    const adoptions = await this.adoptionsRepository.listAll(userId, page)

    return { adoptions }
  }
}
