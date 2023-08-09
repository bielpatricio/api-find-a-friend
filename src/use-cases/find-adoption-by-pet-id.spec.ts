import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoptions-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { FindAdoptionByPetIdUseCase } from './find-adoption-by-pet-id'

let adoptionsRepository: inMemoryAdoptionsRepository
let sut: FindAdoptionByPetIdUseCase

describe('Find Adopt by Pet Id Use Case', () => {
  beforeEach(async () => {
    adoptionsRepository = new inMemoryAdoptionsRepository()
    sut = new FindAdoptionByPetIdUseCase(adoptionsRepository)

    await adoptionsRepository.create({
      pet_id: 'pet-01',
      user_id: 'user-01',
    })
  })

  it('should be able to find adoption by pet id', async () => {
    const { adoption } = await sut.execute({
      petId: 'pet-01',
    })

    expect(adoption.id).toEqual(expect.any(String))
  })

  it('should not be able to find adoption by pet id with wrong id', async () => {
    await expect(() =>
      sut.execute({
        petId: 'error id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
