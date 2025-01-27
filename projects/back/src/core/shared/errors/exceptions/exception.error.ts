import type { ErrorObject } from "../dictionaries/dictionary-types"

class ExceptionError {
  public readonly error_object: ErrorObject

  constructor(
    code: string,
    title: string,
    detail: string,
    status: string,
    status_code: number,
    meta?: Record<string, unknown>,
    action?: string,
    source?: Record<string, unknown>,
    children?: Record<string, unknown>[],
    resolution?: string
  ) {
    this.error_object = {
      status,
      status_code: status_code,
      code,
      title,
      detail,
      source,
      meta,
      action,
      children,
      resolution
    }
  }
}

export { ExceptionError }
