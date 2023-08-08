import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '@/lib/prisma'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'JohnSnow@gameofthrones.com',
      password: '123456',
      phone: '123456789',
    })

    const user = await prisma.user.findFirstOrThrow()

    expect(response.status).toEqual(201)
    expect(user).toEqual(
      expect.objectContaining({
        role: 'CLIENT',
      }),
    )
  })
})
