import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../../core/shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../../core/shared/errors/handlers/generate-error"
import { makeAuthenticateUseCase } from "../../../../core/user/application/use-cases/factories/make-autenticate-user.use-case"
import type { AuthenticateInputDto } from "./dto/authenticate.dto"

export async function authenticate(
  // biome-ignore lint/style/useNamingConvention: Body need to be camelCase
  request: FastifyRequest<{ Body: AuthenticateInputDto }>,
  reply: FastifyReply
) {
  const authenticate_body_schema = z.object({
    login: z.string().email(),
    password: z.string()
  })

  const { login, password } = authenticate_body_schema.parse(request.body)

  try {
    const authenticate_use_case = makeAuthenticateUseCase()

    const { access_token, user } = await authenticate_use_case.execute({
      login,
      password
    })

    return reply.status(200).send({
      status: "OK",
      payload: {
        token: access_token,
        user: {
          id: user.user_id.id,
          login: user.login,
          name: user.name
        }
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
      "authenticate-controller"
    )
  }
}
