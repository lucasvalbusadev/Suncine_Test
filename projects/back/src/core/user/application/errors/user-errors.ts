import type { ErrorObject } from "../../../shared/errors/dictionaries/dictionary-types"

export enum UserErrorCode {
  INVALID_CREDENTIALS_ERROR = "SUNCINE-01001"
}

export const USER_DICTIONARY_ERROS: Record<UserErrorCode, ErrorObject> = {
  [UserErrorCode.INVALID_CREDENTIALS_ERROR]: {
    status: "401",
    status_code: 401,
    code: UserErrorCode.INVALID_CREDENTIALS_ERROR,
    title: "Invalid credentials",
    detail: "The credentials provided is invalid.",
    source: {
      path: ""
    },
    meta: {
      reason: "The credentials provided is invalid."
    },
    action: "Check the credentials provided",
    children: []
  }
}
