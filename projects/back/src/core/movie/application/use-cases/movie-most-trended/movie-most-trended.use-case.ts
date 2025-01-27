import type { UseCaseInterface } from "../../../../shared/application/use-case.interface"
import { Movie } from "../../../domain/movie.entity"
import type { MovieRepositoryInterface } from "../../../domain/movie.repository"
import type { MovieExternalApiInterface } from "../../http/movie-http-interface"

export type MovieMostTrendedUseCaseInput = undefined

export type MovieMostTrendedUseCaseOutput = {
  movie: Movie
}

export class MovieMostTrendedUseCase
  implements UseCaseInterface<MovieMostTrendedUseCaseInput, MovieMostTrendedUseCaseOutput>
{
  constructor(
    private readonly movie_repo: MovieRepositoryInterface,
    private readonly movie_api_http: MovieExternalApiInterface
  ) {}

  async execute(): Promise<MovieMostTrendedUseCaseOutput> {
    const movie_api_data = await this.movie_api_http.movieMostTrended()
    const find_by_identifier_code = await this.movie_repo.findByIdentifierCode([
      String(movie_api_data.id)
    ])

    const movie = Movie.create({
      title: movie_api_data.title,
      identifier_code: String(movie_api_data.id),
      backdrop_path: movie_api_data.backdrop_path,
      original_title: movie_api_data.original_title,
      overview: movie_api_data.overview,
      poster_path: movie_api_data.poster_path,
      release_date: movie_api_data.release_date,
      user_liked: !!find_by_identifier_code.length
    })

    return { movie }
  }
}
