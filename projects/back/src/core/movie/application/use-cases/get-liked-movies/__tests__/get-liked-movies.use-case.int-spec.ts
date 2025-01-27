import nock from "nock"
import { makeMovieHttpApiData } from "../../../../../../../tests/factories/make-movie-http-api-data"
import { TmdbApiHttp } from "../../../../infra/http/tmdb-api-http"
import type { MovieHttpOutput } from "../../../http/movie-http-interface"
import { GetLikedMoviesUseCase } from "../get-liked-movies.use-case"

describe("Get Liked Movies Use Case Integration Tests", () => {
  let sut: GetLikedMoviesUseCase
  let movie_api: TmdbApiHttp
  const base_url = process.env.TMDB_BASE_URL as string
  const token = process.env.TMDB_TOKEN as string
  const account_id = process.env.TMDB_ACCOUNT_ID
  const tmdb_image_url = process.env.TMDB_VIEW_IMAGE_URL
  const language = "pt-BR"

  beforeEach(() => {
    movie_api = new TmdbApiHttp()
    sut = new GetLikedMoviesUseCase(movie_api)
  })

  it("should get liked movies", async () => {
    const api_data = makeMovieHttpApiData()
    const arrange: MovieHttpOutput = {
      page: 1,
      results: [api_data],
      total_pages: 10,
      total_results: 10
    }

    nock(base_url, {
      reqheaders: {
        Authorization: `Bearer ${token}`
      }
    })
      .get(
        `/account/${account_id}/favorite/movies?language=${language}&page=${1}&sort_by=created_at.asc`
      )
      .reply(200, arrange)

    const result = await sut.execute({})

    expect(result.movies[0].toJson()).toStrictEqual({
      movie_id: expect.any(String),
      created_at: expect.any(Date),
      backdrop_path: `${tmdb_image_url}/${api_data.backdrop_path}`,
      identifier_code: String(api_data.id),
      original_title: api_data.original_title,
      overview: api_data.overview,
      poster_path: `${tmdb_image_url}/${api_data.poster_path}`,
      release_date: api_data.release_date,
      title: api_data.title,
      user_liked: true
    })
  })
})
