import { Adoption, Prisma } from '@prisma/client'

export interface AdoptionsRepository {
  create(data: Prisma.AdoptionUncheckedCreateInput): Promise<Adoption>
  findByPetId(id: string): Promise<Adoption | null>
  listAll(query: string, page: number): Promise<Adoption[]>
}
