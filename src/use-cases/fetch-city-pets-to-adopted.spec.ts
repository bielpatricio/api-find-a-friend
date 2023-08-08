import { beforeEach, describe, expect, it } from 'vitest'
import { FetchCityPetsToAdoptedUseCase } from './fetch-city-pets-to-adopted'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'

let petsRepository: inMemoryPetsRepository
let sut: FetchCityPetsToAdoptedUseCase

describe('Fetch Nearby Pets Use Case', () => {
  beforeEach(async () => {
    petsRepository = new inMemoryPetsRepository()
    sut = new FetchCityPetsToAdoptedUseCase(petsRepository)
  })

  it('should be able to fetch nearby pets', async () => {
    const user = await petsRepository.createUser({
      name: 'John Doe',
      email: 'JohnSnow@gameofthrones.com',
      password_hash: '123456',
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
      role: 'ADMIN',
    })

    await petsRepository.create({
      name: 'ralph',
      age: 2,
      specie: 'dog',
      breed: 'mini puddle',
      description: 'a very cute dog',
      user_id: user.id,
    })

    await petsRepository.create({
      name: 'marlon',
      age: 4,
      specie: 'dog',
      breed: 'mini dog',
      description: 'a very small dog',
      user_id: user.id,
    })

    const { pets } = await sut.execute({
      city: 'João Pessoa',
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
})
