export type LikeAndUnlikeMovie = {
  media_id: number
  like_or_unlike: boolean
}

export type MovieHttpResultSuccess = {
  success: boolean
  status_code: number
  status_message: string
}

export type GetLikedMoviesInput = {
  page?: string
}

export type MovieHttpProps = {
  id: number
  backdrop_path: string
  title: string
  original_title: string
  overview: string
  poster_path: string
  media_type: string
  adult: boolean
  original_language: string
  genre_ids: number[]
  popularity: number
  release_date: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type MovieHttpOutput = {
  page: number
  results: MovieHttpProps[]
  total_pages: number
  total_results: number
}

export interface MovieExternalApiInterface {
  likeOrUnlikeMovie(input: LikeAndUnlikeMovie): Promise<MovieHttpResultSuccess>
  getLikedMovies(input: GetLikedMoviesInput): Promise<MovieHttpOutput>
  movieMostTrended(): Promise<MovieHttpProps>
  getTop10Movies(): Promise<MovieHttpOutput>
  findMovieById(movie_id: number): Promise<MovieHttpProps | null>
}
