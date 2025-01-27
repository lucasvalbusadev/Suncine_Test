import type { Movie } from "../../../core/movie/domain/movie.entity"

export type MoviePresenterProps = {
  movie_id: string
  tmdb_id: string
  user_liked: boolean
  backdrop_path: string
  title: string
  original_title: string
  poster_path: string
  release_date: string
  overview: string
}

// biome-ignore lint/complexity/noStaticOnlyClass: use only static methods
export class MoviePresenter {
  static toHttp(movie: Movie): MoviePresenterProps {
    return {
      movie_id: movie.movie_id.id,
      tmdb_id: movie.identifier_code,
      title: movie.title,
      original_title: movie.original_title,
      user_liked: movie.user_liked,
      backdrop_path: movie.backdrop_path,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      overview: movie.overview
    }
  }
}
