import { MovieSequelizeRepository } from "../../../infra/db/sequelize/movie-sequelize.repository"
import { MovieModel } from "../../../infra/db/sequelize/movie.model"
import { TmdbApiHttp } from "../../../infra/http/tmdb-api-http"
import { LikeOrUnlikeMovieUseCase } from "../like-or-unlike-movie/like-or-unlike-movie.use-case"

export function makeLikeOrUnlikeMovie() {
  const movie_repo = new MovieSequelizeRepository(MovieModel)
  const movie_http_api = new TmdbApiHttp()
  const use_case = new LikeOrUnlikeMovieUseCase(movie_repo, movie_http_api)
  return use_case
}
