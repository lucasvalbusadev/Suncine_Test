export type TmdbMovieProps = {
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

export type TmdbMovieOutput = {
  page: number
  results: TmdbMovieProps[]
  total_pages: number
  total_results: number
}
