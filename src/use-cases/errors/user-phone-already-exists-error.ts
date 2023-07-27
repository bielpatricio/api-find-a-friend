export class UserPhoneAlreadyExistsError extends Error {
  constructor() {
    super('Phone already exists')
  }
}
