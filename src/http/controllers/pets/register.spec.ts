import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Register Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'ralph',
        age: 2,
        specie: 'dog',
        breed: 'mini puddle',
        description: 'a very cute dog',
      })

    expect(response.status).toEqual(201)
  })
})
