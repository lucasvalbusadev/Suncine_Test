import type { Notification } from "./notification"

export type FieldsErrors =
  | {
      [field: string]: string[]
    }
  | string

export interface ValidatorFieldsInterface {
  validate(notification: Notification, data: unknown, fields: string[]): boolean
}
