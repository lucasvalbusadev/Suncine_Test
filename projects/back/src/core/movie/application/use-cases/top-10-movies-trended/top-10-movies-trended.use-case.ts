import type { UseCaseInterface } from "../../../../shared/application/use-case.interface"
import { Movie } from "../../../domain/movie.entity"
import type { MovieRepositoryInterface } from "../../../domain/movie.repository"
import type { MovieExternalApiInterface } from "../../http/movie-http-interface"

export type Top10MoviesTrendedInput = undefined

export type Top10MoviesTrendedOutput = {
  movies: Movie[]
}

export class Top10MoviesTrended
  implements UseCaseInterface<Top10MoviesTrendedInput, Top10MoviesTrendedOutput>
{
  constructor(
    private readonly movie_repo: MovieRepositoryInterface,
    private readonly movie_api_http: MovieExternalApiInterface
  ) {}

  async execute(): Promise<Top10MoviesTrendedOutput> {
    const TOP_10_MOVIES = 10
    const movie_api_data = await this.movie_api_http.getTop10Movies()
    const id_of_movies_api = movie_api_data.results.map((movie) => String(movie.id))
    const movies_on_database = await this.movie_repo.findByIdentifierCode(id_of_movies_api)

    const movies: Movie[] = []

    for (let index = 0; index < TOP_10_MOVIES; index++) {
      const api_data = movie_api_data.results[index]
      const entity_has_match_with_api_data = movies_on_database.find(
        (movie) => movie.identifier_code === String(api_data.id)
      )

      const entity = Movie.create({
        identifier_code: String(api_data.id),
        backdrop_path: api_data.backdrop_path,
        original_title: api_data.original_title,
        overview: api_data.overview,
        poster_path: api_data.poster_path,
        release_date: api_data.release_date,
        title: api_data.title,
        user_liked: !!entity_has_match_with_api_data
      })

      movies.push(entity)
    }

    return {
      movies
    }
  }
}
