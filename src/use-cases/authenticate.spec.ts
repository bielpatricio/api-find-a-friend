import { beforeEach, describe, expect, it } from 'vitest'
import { inMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: inMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new inMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able authenticate', async () => {
    await usersRepository.create({
      name: 'John Snow',
      email: 'john@test.com',
      password_hash: await hash('123456', 6),
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    const { user } = await sut.execute({
      email: 'john@test.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'john@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able authenticate with wrong password', async () => {
    await usersRepository.create({
      name: 'John Snow',
      email: 'john@test.com',
      password_hash: await hash('123456', 6),
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    await expect(() =>
      sut.execute({
        email: 'john@test.com',
        password: '123457',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
