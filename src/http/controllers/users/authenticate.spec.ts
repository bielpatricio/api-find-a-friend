import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'JohnSnow@gameofthrones.com',
      password: '123456',
      phone: '123456789',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'JohnSnow@gameofthrones.com',
      password: '123456',
    })

    expect(response.status).toEqual(200)
    expect(response.body).toHaveProperty('token')
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
