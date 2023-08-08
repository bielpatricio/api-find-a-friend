import { Prisma, Pet } from '@prisma/client'

export interface FindManyNearbyParams {
  city: string
  page: number
}

export interface FindManyByOrgIdParams {
  userId: string
  page: number
  adopted?: boolean
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findManyNearby(params: FindManyNearbyParams): Promise<Pet[]>
  searchMany(query: string, page: number): Promise<Pet[]>
  findManyByOrgId(params: FindManyByOrgIdParams): Promise<Pet[]>
}
