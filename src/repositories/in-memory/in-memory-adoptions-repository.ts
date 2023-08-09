import { Adoption, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class inMemoryAdoptionsRepository {
  public items: Adoption[] = []

  async create(data: Prisma.AdoptionUncheckedCreateInput) {
    const adoption = {
      id: randomUUID(),
      user_id: data.user_id,
      pet_id: data.pet_id,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(adoption)
    return adoption
  }

  async findByPetId(id: string) {
    const adoption = this.items.find((adoption) => adoption.pet_id === id)

    if (!adoption) {
      return null
    }

    return adoption
  }

  async listAll(userId: string, page: number) {
    return this.items
      .filter((adoption) => adoption.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }
}
