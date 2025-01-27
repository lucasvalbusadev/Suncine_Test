import type { FastifyReply, FastifyRequest } from "fastify"
import { makeTop10MoviesTrended } from "../../../../core/movie/application/use-cases/factories/make-top-10-movies-trended"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../../core/shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../../core/shared/errors/handlers/generate-error"
import { MoviePresenter } from "../../presenter/movie.presenter"

// biome-ignore lint/style/useNamingConvention: user underscore
export async function top10MovieMostTrended(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const get_liked_movies_use_case = makeTop10MoviesTrended()

    const { movies } = await get_liked_movies_use_case.execute()

    const result = movies.map(MoviePresenter.toHttp)

    return reply.status(200).send(result)
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
      "get-liked-movies-controller"
    )
  }
}
