import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'
import { PetWasAlreadyAdoptedError } from '@/use-cases/errors/pet-was-already-adopted-error'

describe('Adopt a pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to find Adoption by pet id', async () => {
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

    const pet = await prisma.pet.findFirstOrThrow()

    const { token } = await createAndAuthenticateUser(
      app,
      false,
      'Gabriel',
      'biel@gmail.com',
      '987654321',
    )

    const users = await prisma.user.findMany()

    await prisma.adoption.create({
      data: {
        pet_id: pet.id,
        user_id: users[1].id,
      },
    })

    const response = await request(app.server)
      .get(`/adoptions/${pet?.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.adoption).toEqual(
      expect.objectContaining({
        pet_id: pet.id,
        user_id: users[1].id,
      }),
    )
  })
})
