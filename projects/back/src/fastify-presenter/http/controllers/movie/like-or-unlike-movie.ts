import type { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeLikeOrUnlikeMovie } from "../../../../core/movie/application/use-cases/factories/make-like-or-unlike-movie"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../../core/shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../../core/shared/errors/handlers/generate-error"

export async function likeOrUnlikeMovie(
  // biome-ignore lint/style/useNamingConvention: use camelCase
  request: FastifyRequest<{ Body: { movie_id: string; like_or_unlike: boolean } }>,
  reply: FastifyReply
) {
  try {
    const authenticate_body_schema = z.object({
      movie_id: z.number(),
      like_or_unlike: z.boolean()
    })

    const { movie_id, like_or_unlike } = authenticate_body_schema.parse(request.body)

    const like_or_unlike_movie = makeLikeOrUnlikeMovie()

    const result = await like_or_unlike_movie.execute({ movie_id, like_or_unlike })

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
