import type { ErrorObject } from "./dictionary-types"

export enum HttpErrorsCode {
  INVALID_CREDENTIALS_ERROR = "SUNCINE-00101",
  INTERNAL_SERVER_ERROR = "SUNCINE_00102",
  NOT_FOUND = "SUNCINE_00103"
}

export const HTTP_DICTIONARY_ERROS: Record<HttpErrorsCode, ErrorObject> = {
  [HttpErrorsCode.INVALID_CREDENTIALS_ERROR]: {
    status: "400",
    status_code: 400,
    code: HttpErrorsCode.INVALID_CREDENTIALS_ERROR,
    title: "Invalid credentials",
    detail: "The credentials provided is invalid.",
    source: {},
    meta: {
      reason: "The credentials provided is invalid."
    },
    action: "Check the credentials provided",
    children: []
  },
  [HttpErrorsCode.INTERNAL_SERVER_ERROR]: {
    status: "500",
    status_code: 500,
    code: HttpErrorsCode.INVALID_CREDENTIALS_ERROR,
    title: "Internal Server Error",
    detail: "A unexpected error occurred.",
    source: {},
    meta: {
      reason: "A unexpected error is not mapped occurred."
    },
    action: "Check the logs",
    children: []
  },
  [HttpErrorsCode.NOT_FOUND]: {
    status: "404",
    status_code: 404,
    code: HttpErrorsCode.NOT_FOUND,
    title: "Not found nada",
    detail: "The data provider cannot match with any data.",
    source: {},
    meta: {
      reason: "The data provider cannot match with any data."
    },
    action: "Check the data provided",
    children: []
  }
}
