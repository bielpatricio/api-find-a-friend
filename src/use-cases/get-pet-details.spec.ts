import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'

let petsRepository: inMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Profile Use Case', () => {
  beforeEach(() => {
    petsRepository = new inMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get user profile', async () => {
    const createdPet = await petsRepository.create({
      name: 'ralph',
      age: 2,
      specie: 'dog',
      breed: 'mini puddle',
      description: 'a very cute dog',
      user_id: '123',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('ralph')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
