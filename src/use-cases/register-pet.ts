import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetUseCaseRequest {
  userId: string
  name: string
  age: number
  specie: string
  breed: string
  description: string | null
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    userId,
    name,
    age,
    specie,
    breed,
    description,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const pet = await this.petsRepository.create({
      user_id: userId,
      name,
      age,
      specie,
      breed,
      description,
    })

    return { pet }
  }
}
