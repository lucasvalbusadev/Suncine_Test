import type { ErrorObject } from "../../../../shared/errors/dictionaries/dictionary-types"

export enum TmdbApiError {
  INTERNAL_SERVER_ERROR = "SUNCINE-01010"
}

export const TMDB_DICTIONARY_ERROS: Record<TmdbApiError, ErrorObject> = {
  [TmdbApiError.INTERNAL_SERVER_ERROR]: {
    status: "500",
    status_code: 500,
    code: TmdbApiError.INTERNAL_SERVER_ERROR,
    title: "Internal Server Error",
    detail: "A unexpected error occurred.",
    source: {},
    meta: {
      reason: "A unexpected error is not mapped occurred."
    },
    action: "Check the logs",
    children: []
  }
}
