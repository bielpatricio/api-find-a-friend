import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryAdoptionsRepository } from '@/repositories/in-memory/in-memory-adoptions-repository'
import { ListAdoptionsByOrgIdUseCase } from './list-adoptions-by-org-id'

let adoptionsRepository: inMemoryAdoptionsRepository
let sut: ListAdoptionsByOrgIdUseCase

describe('List Adoption by Org Id Use Case', () => {
  beforeEach(async () => {
    adoptionsRepository = new inMemoryAdoptionsRepository()
    sut = new ListAdoptionsByOrgIdUseCase(adoptionsRepository)
  })

  it('should be able to List adoption by Org id', async () => {
    for (let i = 1; i <= 22; i++) {
      await adoptionsRepository.create({
        pet_id: `pet-${i}`,
        user_id: 'user-01',
      })
    }

    const { adoptions } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(adoptions).toHaveLength(2)
    expect(adoptions).toEqual([
      expect.objectContaining({
        pet_id: 'pet-21',
      }),
      expect.objectContaining({
        pet_id: 'pet-22',
      }),
    ])
  })
})
