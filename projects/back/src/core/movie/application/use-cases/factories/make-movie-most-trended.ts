import { MovieSequelizeRepository } from "../../../infra/db/sequelize/movie-sequelize.repository"
import { MovieModel } from "../../../infra/db/sequelize/movie.model"
import { TmdbApiHttp } from "../../../infra/http/tmdb-api-http"
import { MovieMostTrendedUseCase } from "../movie-most-trended/movie-most-trended.use-case"

export function makeMovieMostTrended() {
  const movie_repo = new MovieSequelizeRepository(MovieModel)
  const movie_api_http = new TmdbApiHttp()
  const use_case = new MovieMostTrendedUseCase(movie_repo, movie_api_http)
  return use_case
}
