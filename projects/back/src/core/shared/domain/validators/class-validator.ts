import { validateSync } from "class-validator"
import type { Notification } from "./notification"
import type { ValidatorFieldsInterface } from "./validator-fields-interface"

export abstract class ClassValidatorFields implements ValidatorFieldsInterface {
  // biome-ignore lint/suspicious/noExplicitAny: data must be any filed for better validation
  validate(notification: Notification, data: any, fields: string[]): boolean {
    const errors = validateSync(data, {
      groups: fields
    })
    if (errors.length) {
      for (const error of errors) {
        const field = error.property
        if (error.constraints) {
          for (const message of Object.values(error.constraints)) {
            notification.addError(message, field)
          }
        }
      }
    }
    return !errors.length
  }
}
