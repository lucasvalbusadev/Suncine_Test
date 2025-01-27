import { TmdbApiHttp } from "../../../infra/http/tmdb-api-http"
import { GetLikedMoviesUseCase } from "../get-liked-movies/get-liked-movies.use-case"

export function makeGetLikedMovies() {
  const movie_http_api = new TmdbApiHttp()
  const use_case = new GetLikedMoviesUseCase(movie_http_api)
  return use_case
}
