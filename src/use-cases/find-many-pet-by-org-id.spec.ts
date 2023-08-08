import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FindManyPetByOrgIdUseCase } from './find-many-pet-by-org-id'

let petsRepository: inMemoryPetsRepository
let sut: FindManyPetByOrgIdUseCase

describe('Find Pets by Org Id Use Case', () => {
  beforeEach(async () => {
    petsRepository = new inMemoryPetsRepository()
    sut = new FindManyPetByOrgIdUseCase(petsRepository)
  })

  it('should be able to find all pets by org id', async () => {
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
      adopted: true,
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
      userId: user.id,
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

  it('should be able to find pets already adopted by org id', async () => {
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
      adopted: true,
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
      userId: user.id,
      page: 1,
      adopted: true,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'ralph',
      }),
    ])
  })

  it('should be able to find pets not adopted by org id', async () => {
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
      adopted: true,
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
      userId: user.id,
      page: 1,
      adopted: false,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'marlon',
      }),
    ])
  })
})
