import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Find Pets by org id (e2e)', () => {
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
        name: 'ralph',
        age: 2,
        specie: 'dog',
        breed: 'mini puddle',
        description: 'a very cute dog',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', 'Bearer ' + token)
      .send({
        name: 'marlon',
        age: 3,
        specie: 'dog',
        breed: 'mini dog',
        description: 'a very small dog',
      })

    const user = await prisma.user.findFirstOrThrow()

    const response = await request(app.server)
      .get(`/pets/org/${user.id}`)
      .query({
        page: 1,
        adopted: false,
      })
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
