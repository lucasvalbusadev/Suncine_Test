import type { UseCaseInterface } from "../../../../shared/application/use-case.interface"
import { Movie } from "../../../domain/movie.entity"
import type { MovieExternalApiInterface } from "../../http/movie-http-interface"

export type GetLikedMoviesUseCaseInput = {
  page?: string
}

export type GetLikedMoviesUseCaseOutput = {
  movies: Movie[]
}

export class GetLikedMoviesUseCase
  implements UseCaseInterface<GetLikedMoviesUseCaseInput, GetLikedMoviesUseCaseOutput>
{
  constructor(private readonly movie_api_http: MovieExternalApiInterface) {}

  async execute({ page }: GetLikedMoviesUseCaseInput): Promise<GetLikedMoviesUseCaseOutput> {
    const movie_api_data = await this.movie_api_http.getLikedMovies({ page })

    const movies_output_data: Movie[] = []

    for (const api_data of movie_api_data.results) {
      const entity = Movie.create({
        backdrop_path: api_data.backdrop_path,
        identifier_code: String(api_data.id),
        original_title: api_data.original_title,
        overview: api_data.overview,
        poster_path: api_data.poster_path,
        release_date: api_data.release_date,
        title: api_data.title,
        user_liked: true
      })

      movies_output_data.push(entity)
    }

    return {
      movies: movies_output_data
    }
  }
}
