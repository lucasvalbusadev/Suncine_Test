import type { FastifyReply, FastifyRequest } from "fastify"
import { makeGetLikedMovies } from "../../../../core/movie/application/use-cases/factories/make-get-liked-movies"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../../core/shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../../core/shared/errors/handlers/generate-error"
import { MoviePresenter } from "../../presenter/movie.presenter"

export async function getLikedMovies(
  // biome-ignore lint/style/useNamingConvention: use camelCase
  request: FastifyRequest<{ Querystring: { page: string } }>,
  reply: FastifyReply
) {
  try {
    const { page } = request.query
    const get_liked_movies_use_case = makeGetLikedMovies()

    const { movies } = await get_liked_movies_use_case.execute({ page })

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
