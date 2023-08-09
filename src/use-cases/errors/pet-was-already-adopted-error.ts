export class PetWasAlreadyAdoptedError extends Error {
  constructor() {
    super('This pet was already adopted')
  }
}
