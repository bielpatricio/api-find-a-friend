import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoptions-repository'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterAdoptionUseCase } from './register-adoption'
import { PetWasAlreadyAdoptedError } from './errors/pet-was-already-adopted-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let adoptionsRepository: inMemoryAdoptionsRepository
let petsRepository: inMemoryPetsRepository
let sut: RegisterAdoptionUseCase

describe('Adopt a Pet Use Case', () => {
  beforeEach(async () => {
    adoptionsRepository = new inMemoryAdoptionsRepository()
    petsRepository = new inMemoryPetsRepository()
    sut = new RegisterAdoptionUseCase(adoptionsRepository, petsRepository)

    await petsRepository.create({
      id: 'pet-01',
      name: 'ralph',
      age: 2,
      specie: 'dog',
      breed: 'mini puddle',
      description: 'a very cute dog',
      user_id: 'user-01',
    })
  })

  it('should be able adopt a pet', async () => {
    const { adoption } = await sut.execute({
      petId: 'pet-01',
      userId: 'user-01',
    })

    expect(adoption.id).toEqual(expect.any(String))
  })

  it('should not be able adopt a pet with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'error id',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able adopt a pet twice', async () => {
    await sut.execute({
      petId: 'pet-01',
      userId: 'user-01',
    })

    await expect(() =>
      sut.execute({
        petId: 'pet-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(PetWasAlreadyAdoptedError)
  })
})
