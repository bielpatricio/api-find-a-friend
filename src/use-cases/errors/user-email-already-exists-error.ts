export class UserEmailAlreadyExistsError extends Error {
  constructor() {
    super('Email already exists')
  }
}
