import type { ErrorObject } from "../dictionaries/dictionary-types"
import { ExceptionError } from "../exceptions/exception.error"

export const handle_error_message = (error_data: ErrorObject) => {
  const { code, detail, status, status_code, title, action, children, meta, source, resolution } =
    error_data
  throw new ExceptionError(
    code,
    title,
    detail,
    status,
    status_code,
    meta,
    action,
    source,
    children,
    resolution
  )
}
