import type { UseCaseInterface } from "../../../../shared/application/use-case.interface"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../../shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../../shared/errors/handlers/generate-error"
import { Movie } from "../../../domain/movie.entity"
import type { MovieRepositoryInterface } from "../../../domain/movie.repository"
import type { MovieExternalApiInterface } from "../../http/movie-http-interface"

export type LikeOrUnlikeMovieUseCaseInput = {
  movie_id: number
  like_or_unlike: boolean
}

export type LikeOrUnlikeMovieUseCaseOutput = {
  status: string
}

export type LikeOrUnlikeMovieUseCaseCache = {
  movie_id: string
  like_or_unlike: boolean
}

export class LikeOrUnlikeMovieUseCase
  implements UseCaseInterface<LikeOrUnlikeMovieUseCaseInput, LikeOrUnlikeMovieUseCaseOutput>
{
  constructor(
    private readonly movie_repo: MovieRepositoryInterface,
    private readonly movie_api_http: MovieExternalApiInterface
  ) {}

  async execute({
    movie_id,
    like_or_unlike
  }: LikeOrUnlikeMovieUseCaseInput): Promise<LikeOrUnlikeMovieUseCaseOutput> {
    const movie_api_data = await this.movie_api_http.findMovieById(movie_id)

    console.log("MOVIE", movie_api_data)

    if (!movie_api_data) {
      return generateErrorMessage(
        HttpErrorsCode.NOT_FOUND,
        HTTP_DICTIONARY_ERROS,
        {},
        "like-or-unlike-movie.use-case"
      )
    }

    await this.movie_api_http.likeOrUnlikeMovie({
      media_id: movie_id,
      like_or_unlike
    })

    const movie_entity = Movie.create({
      backdrop_path: movie_api_data.backdrop_path,
      identifier_code: String(movie_api_data.id),
      original_title: movie_api_data.original_title,
      overview: movie_api_data.overview,
      poster_path: movie_api_data.poster_path,
      release_date: movie_api_data.release_date,
      title: movie_api_data.title,
      user_liked: like_or_unlike
    })

    const found_movie = await this.movie_repo.findByIdentifierCode([String(movie_api_data.id)])

    if (found_movie.length === 1) {
      const first_movie = found_movie[0]
      like_or_unlike === true ? first_movie.like() : first_movie.unlike()
      await this.movie_repo.update(first_movie)

      return like_or_unlike === true ? { status: "LIKE" } : { status: "UNLIKE" }
    }

    await this.movie_repo.insert(movie_entity)

    return like_or_unlike === true ? { status: "LIKE" } : { status: "UNLIKE" }
  }
}
