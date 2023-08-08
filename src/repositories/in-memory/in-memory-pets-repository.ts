import { Prisma, Pet, User } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  FindManyByOrgIdParams,
  FindManyNearbyParams,
  PetsRepository,
} from '../pets-repository'

export class inMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []
  public users: User[] = []

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((pet) => pet.specie.includes(query) || pet.breed.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  async findManyByOrgId({ page, adopted, userId }: FindManyByOrgIdParams) {
    if (adopted === undefined) {
      return this.items
        .filter((pet) => pet.user_id === userId)
        .slice((page - 1) * 20, page * 20)
    }
    return this.items
      .filter((pet) => pet.user_id === userId && pet.adopted === adopted)
      .slice((page - 1) * 20, page * 20)
  }

  async findManyNearby({ page, city }: FindManyNearbyParams) {
    const usersFilter = this.users.filter(
      (user) => user.city && user.city.includes(city) && user.role === 'ADMIN',
    )

    const { petReducer } = usersFilter.reduce(
      (acc, user) => {
        const petsTemporary = this.items.filter(
          (pet) => pet.user_id === user.id && pet.adopted === false,
        )
        return { petReducer: acc.petReducer.concat(petsTemporary) }
      },
      {
        petReducer: [] as Pet[],
      },
    )

    return petReducer.slice((page - 1) * 20, page * 20)
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name ?? null,
      age: data.age,
      specie: data.specie,
      breed: data.breed,
      description: data.description ?? null,
      created_at: new Date(),
      updated_at: new Date(),
      user_id: data.user_id,
      adopted: data.adopted ?? false,
    }

    this.items.push(pet)
    return pet
  }

  async createUser(data: Prisma.UserCreateInput) {
    const user = {
      id: data.id ?? randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      password_hash: data.password_hash,
      address: data.address ?? null,
      city: data.city ?? null,
      state: data.state ?? null,
      role: data.role ?? 'CLIENT',
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.users.push(user)
    return user
  }
}
