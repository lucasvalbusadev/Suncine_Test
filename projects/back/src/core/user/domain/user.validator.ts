import { MaxLength, MinLength } from "class-validator"
import { ClassValidatorFields } from "../../shared/domain/validators/class-validator"
import type { Notification } from "../../shared/domain/validators/notification"
import type { User } from "./user.entity"

class UserRules {
  @MaxLength(255, { groups: ["login"] })
  login: string

  @MaxLength(255, { groups: ["name"] })
  name: string

  @MinLength(6, { groups: ["password"] })
  password: string

  constructor(entity: User) {
    Object.assign(this, entity)
  }
}

class UserValidator extends ClassValidatorFields {
  validate(notification: Notification, data: User, fields?: string[]): boolean {
    const new_fields = fields?.length ? fields : ["name", "login", "password"]
    return super.validate(notification, new UserRules(data), new_fields)
  }
}

// biome-ignore lint/complexity/noStaticOnlyClass: use static function to better declaration
export class UserValidatorFactory {
  static create() {
    return new UserValidator()
  }
}
