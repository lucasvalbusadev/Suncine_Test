import { Entity } from "../../shared/domain/entity"
import { Uuid } from "../../shared/domain/value-objects/uuid.vo"
import { UserValidatorFactory } from "./user.validator"

export type UserConstructorProps = {
  name: string
  login: string
  password: string
  created_at?: Date
}

export type UserToJsonProps = {
  user_id: string
  name: string
  login: string
  password: string
  created_at: Date
}

export class UserId extends Uuid {}

export class User extends Entity {
  user_id: UserId
  name: string
  login: string
  password: string
  created_at: Date

  constructor(props: UserConstructorProps, user_id?: UserId) {
    super()
    this.name = props.name
    this.login = props.login
    this.password = props.password
    this.user_id = user_id ?? new UserId()
    this.created_at = props.created_at ?? new Date()
  }

  static create(props: UserConstructorProps, user_id?: UserId) {
    const user = new User(props, user_id)
    user.validate(["name", "login", "password"])
    return user
  }

  get entityId() {
    return this.user_id
  }

  changeName(name: string): void {
    this.name = name
    this.validate(["name"])
  }

  changeLogin(login: string): void {
    this.login = login
    this.validate(["login"])
  }

  validate(fields?: string[]) {
    const validator = UserValidatorFactory.create()
    return validator.validate(this.notification, this, fields)
  }

  toJson(): UserToJsonProps {
    return {
      user_id: this.user_id.id,
      name: this.name,
      login: this.login,
      password: this.password,
      created_at: this.created_at
    }
  }
}
