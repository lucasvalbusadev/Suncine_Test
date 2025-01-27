import { Notification } from "./validators/notification"
import type { ValueObject } from "./value-object"

export abstract class Entity {
  notification: Notification = new Notification()

  abstract get entityId(): ValueObject
  // biome-ignore lint: need to be any, for entity define json return type
  abstract toJson(): any
}
