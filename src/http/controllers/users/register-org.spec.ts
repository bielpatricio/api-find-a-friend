import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Register Org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register org', async () => {
    const response = await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'JohnSnow@gameofthrones.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    const user = await prisma.user.findFirstOrThrow()

    expect(response.status).toEqual(201)
    expect(user).toEqual(
      expect.objectContaining({
        role: 'ADMIN',
      }),
    )
  })

  it('should not be able to register org without address', async () => {
    const response = await request(app.server).post('/org').send({
      name: 'John Doe',
      email: 'JohnSnow@gameofthrones.com',
      password: '123456',
      phone: '123456789',
    })

    expect(response.status).toEqual(400)
  })
})
