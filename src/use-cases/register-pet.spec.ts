import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { RegisterPetUseCase } from './register-pet'

let petsRepository: inMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new inMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository)
  })

  it('should be able register a pet', async () => {
    const { pet } = await sut.execute({
      name: 'ralph',
      age: 2,
      specie: 'dog',
      breed: 'mini puddle',
      description: 'a very cute dog',
      userId: '123',
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
