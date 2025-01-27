import type { ErrorObject } from "./dictionary-types"

export enum DefaultErrorsCode {
  INVALID_UUID = "SUNCINE-00001",
  ENTITY_VALIDATION = "SUNCINE-00002"
}

export const DEFAULT_DICTIONARY_ERROS: Record<DefaultErrorsCode, ErrorObject> = {
  [DefaultErrorsCode.INVALID_UUID]: {
    status: "400",
    status_code: 400,
    code: DefaultErrorsCode.INVALID_UUID,
    title: "Invalid UUID",
    detail: "The UUID provided is invalid.",
    source: {
      path: "uuid-vo"
    },
    meta: {
      reason: "The UUID provided is invalid."
    },
    action: "Check the UUID provided",
    children: []
  },
  [DefaultErrorsCode.ENTITY_VALIDATION]: {
    status: "400",
    status_code: 400,
    code: DefaultErrorsCode.ENTITY_VALIDATION,
    title: "Entity validation error",
    detail: "The data provider is not compatibly with validations.",
    source: {},
    meta: {
      reason: "The data provider is not compatibly with validations."
    },
    action: "Check the data provided",
    children: []
  }
}
