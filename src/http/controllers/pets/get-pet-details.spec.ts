import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Get Pet Details by id (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get pet details by pet id', async () => {
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

    const pet = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server)
      .get(`/pets/${pet.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.status).toEqual(200)
    expect(response.body.pet).toHaveProperty('specie')
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'ralph',
      }),
    )
  })
})
