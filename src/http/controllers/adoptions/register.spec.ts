import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Adopt a pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to Adopt a pet', async () => {
    await createAndAuthenticateUser(app, true)

    const user = await prisma.user.findFirstOrThrow()

    await prisma.pet.create({
      data: {
        name: 'ralph',
        age: 2,
        specie: 'dog',
        breed: 'mini puddle',
        description: 'a very cute dog',
        user_id: user.id,
      },
    })

    const { token } = await createAndAuthenticateUser(
      app,
      false,
      'Gabriel',
      'biel@gameofthrones.com',
      '987654321',
    )

    const pet = await prisma.pet.findFirstOrThrow()

    const response = await request(app.server)
      .post(`/adoptions/${pet?.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send()

    const petCheck = await prisma.pet.findFirstOrThrow()
    const users = await prisma.user.findMany()

    expect(response.statusCode).toEqual(201)
    expect(petCheck).toEqual(
      expect.objectContaining({
        adopted: true,
        user_id: users[1].id,
      }),
    )
  })
})
