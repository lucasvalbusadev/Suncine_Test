import type { FastifyReply, FastifyRequest } from "fastify"
import { makeMovieMostTrended } from "../../../../core/movie/application/use-cases/factories/make-movie-most-trended"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../../core/shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../../core/shared/errors/handlers/generate-error"
import { MoviePresenter } from "../../presenter/movie.presenter"

// biome-ignore lint/style/useNamingConvention: user underscore
export async function movieMostTrended(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const get_liked_movies_use_case = makeMovieMostTrended()

    const { movie } = await get_liked_movies_use_case.execute()

    const result = MoviePresenter.toHttp(movie)

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
