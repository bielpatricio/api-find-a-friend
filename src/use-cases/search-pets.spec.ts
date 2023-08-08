import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FindManyPetUseCase } from './search-pets'

let petsRepository: inMemoryPetsRepository
let sut: FindManyPetUseCase

describe('Search Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new inMemoryPetsRepository()
    sut = new FindManyPetUseCase(petsRepository)
  })

  it('should be able to search pets', async () => {
    await petsRepository.create({
      name: 'ralph',
      age: 2,
      specie: 'dog',
      breed: 'mini puddle',
      description: 'a very cute dog',
      user_id: '123',
      adopted: true,
    })

    await petsRepository.create({
      name: 'marlon',
      age: 4,
      specie: 'dog',
      breed: 'mini dog',
      description: 'a very small dog',
      user_id: '123',
    })

    const { pets } = await sut.execute({
      query: 'mini',
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'ralph',
      }),
      expect.objectContaining({
        name: 'marlon',
      }),
    ])
  })

  it('should be able to fetch paginated pet search', async () => {
    for (let i = 1; i <= 22; i++) {
      await petsRepository.create({
        name: `Pet - ${i}`,
        age: 2,
        specie: 'dog',
        breed: 'mini puddle',
        description: 'a very cute dog',
        user_id: '123',
        adopted: true,
      })
    }

    const { pets } = await sut.execute({
      query: 'dog',
      page: 2,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Pet - 21',
      }),
      expect.objectContaining({
        name: 'Pet - 22',
      }),
    ])
  })
})
