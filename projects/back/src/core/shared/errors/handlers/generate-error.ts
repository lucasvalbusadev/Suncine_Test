import type { ErrorObject } from "../dictionaries/dictionary-types"
import { handle_error_message } from "./handle.error"

export function generateErrorMessage<T = unknown>(
  code: string,
  errors_schema: Record<string, ErrorObject>,
  meta?: T,
  path?: string
) {
  const error = errors_schema[code]

  if (error?.source) {
    error.source.path = path ?? error.source.path
  }

  if (error?.meta) {
    for (const key in meta) {
      error.meta[key] = meta[key]
    }
  }

  return handle_error_message(error)
}
