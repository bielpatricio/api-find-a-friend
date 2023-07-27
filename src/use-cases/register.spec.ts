import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'
import { UserPhoneAlreadyExistsError } from './errors/user-phone-already-exists-error'

let usersRepository: inMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      email: 'john@test.com',
      name: 'John',
      password: '123456',
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'john@prisma.com'

    await sut.execute({
      email,
      name: 'John',
      password: '123456',
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'John',
        password: '123456',
        phone: '123456789',
        address: 'Rua Teste',
        city: 'João Pessoa',
        state: 'Paraíba',
      }),
    ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
  })

  it('should not be able to register with same phone twice', async () => {
    const phone = '123456789'

    await sut.execute({
      email: 'john@prisma.com',
      name: 'John',
      password: '123456',
      phone,
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    await expect(() =>
      sut.execute({
        email: 'john2@prisma.com',
        name: 'John',
        password: '123456',
        phone,
        address: 'Rua Teste',
        city: 'João Pessoa',
        state: 'Paraíba',
      }),
    ).rejects.toBeInstanceOf(UserPhoneAlreadyExistsError)
  })

  it('should be able register a user', async () => {
    const { user } = await sut.execute({
      email: 'john@test.com',
      name: 'John',
      password: '123456',
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
