import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
  name = 'John Doe',
  email = 'JohnSnow@gameofthrones.com',
  phone = '123456789',
) {
  await prisma.user.create({
    data: {
      name: name ?? 'John Doe',
      email: email ?? 'JohnSnow@gameofthrones.com',
      phone: phone ?? '123456789',
      password_hash: await hash('123456', 6),
      role: isAdmin ? 'ADMIN' : 'CLIENT',
      address: 'Rua Teste',
      city: 'João Pessoa',
      state: 'Paraíba',
    },
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: email ?? 'JohnSnow@gameofthrones.com',
      password: '123456',
    })

  const { token } = authResponse.body

  return { token }
}
