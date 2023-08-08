import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Find Pets Nearby by city (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all pets not adopted by org id', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/pets')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'loly',
        age: 2,
        specie: 'dog',
        breed: 'mini puddle',
        description: 'a very cute dog',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'bary',
        age: 3,
        specie: 'dog',
        breed: 'mini dog',
        description: 'a very small dog',
      })

    const response = await request(app.server)
      .get(`/pets/nearby`)
      .query({
        page: 1,
        city: 'João Pessoa',
      })
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
