import type { FastifyRequest } from "fastify"
import { generateErrorMessage } from "../../../../core/shared/errors/handlers/generate-error"
import {
  USER_DICTIONARY_ERROS,
  UserErrorCode
} from "../../../../core/user/application/errors/user-errors"

export async function verifyJwt(request: FastifyRequest) {
  try {
    await request.jwtVerify()
  } catch (_err) {
    return generateErrorMessage(
      UserErrorCode.INVALID_CREDENTIALS_ERROR,
      USER_DICTIONARY_ERROS,
      {},
      "token-validation"
    )
  }
}
