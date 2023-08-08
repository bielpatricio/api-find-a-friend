import { hash } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'
import { UserPhoneAlreadyExistsError } from './errors/user-phone-already-exists-error'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
  address?: string
  city?: string
  state?: string
  role?: 'ADMIN' | 'CLIENT'
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    phone,
    address,
    city,
    state,
    role,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserEmailAlreadyExistsError()
    }

    const userWithSamePhone = await this.usersRepository.findByPhone(phone)

    if (userWithSamePhone) {
      throw new UserPhoneAlreadyExistsError()
    }

    if (role === 'ADMIN' && (!address || !city || !state)) {
      throw new InvalidCredentialsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      phone,
      address,
      city,
      state,
      role,
    })

    return { user }
  }
}
