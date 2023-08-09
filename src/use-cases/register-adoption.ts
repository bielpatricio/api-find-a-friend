import { Adoption } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { AdoptionsRepository } from '@/repositories/adoptions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetWasAlreadyAdoptedError } from './errors/pet-was-already-adopted-error'

interface RegisterAdoptionUseCaseRequest {
  userId: string
  petId: string
}

interface RegisterAdoptionUseCaseResponse {
  adoption: Adoption
}

export class RegisterAdoptionUseCase {
  constructor(
    private adoptionsRepository: AdoptionsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    userId,
    petId,
  }: RegisterAdoptionUseCaseRequest): Promise<RegisterAdoptionUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    const checkIfPetWasAlreadyAdopted =
      await this.adoptionsRepository.findByPetId(petId)

    if (pet.adopted === true || Boolean(checkIfPetWasAlreadyAdopted)) {
      throw new PetWasAlreadyAdoptedError()
    }

    const adoption = await this.adoptionsRepository.create({
      user_id: userId,
      pet_id: petId,
    })

    return { adoption }
  }
}
