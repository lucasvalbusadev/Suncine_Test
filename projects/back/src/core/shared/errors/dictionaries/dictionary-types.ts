export type ErrorObject = {
  status_code: number
  status: string
  code: string
  title: string
  detail: string
  source?: Record<string, unknown>
  meta?: Record<string, unknown>
  action?: string
  children?: Record<string, unknown>[]
  resolution?: string
}

export type MongoExecutionError = {
  exception: Error
  message_error: string
  path?: string
}
