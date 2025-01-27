import { validate as uuidValidate, v4 as uuidv4 } from "uuid"
import { ValueObject } from "../value-object"

export class Uuid extends ValueObject {
  readonly id: string

  constructor(id?: string) {
    super()
    this.id = id || uuidv4()
    this.validate()
  }

  private validate() {
    const is_valid = uuidValidate(this.id)
    if (!is_valid) {
      throw new InvalidUuidError()
    }
  }

  toString() {
    return this.id
  }
}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || "ID must be a valida UUID")
    this.name = "InvalidUuidError"
  }
}
