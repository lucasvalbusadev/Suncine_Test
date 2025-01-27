import type { FastifyReply, FastifyRequest } from "fastify"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../../core/shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../../core/shared/errors/handlers/generate-error"
import { makeGetUserByIdUseCase } from "../../../../core/user/application/use-cases/factories/make-get-user-by-id.use-case"

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authenticate_use_case = makeGetUserByIdUseCase()

    const { user } = await authenticate_use_case.execute({
      user_id: request.user.sub.user_id
    })

    return reply.status(200).send({
      status: "OK",
      payload: {
        id: user.user_id.id,
        login: user.login,
        name: user.name
      }
    })
  } catch (err) {
    if (err.error_object) {
      throw err
    }

    generateErrorMessage(
      HttpErrorsCode.INTERNAL_SERVER_ERROR,
      HTTP_DICTIONARY_ERROS,
      {
        reason: err.message
      },
      "profile-controller"
    )
  }
}
