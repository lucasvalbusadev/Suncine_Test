import { makeMovieHttpApiData } from "../../../../../../../tests/factories/make-movie-http-api-data"
import { MovieHttpApiMock } from "../../../../../../../tests/mocks/movie-http-api.mock"
import { GetLikedMoviesUseCase } from "../get-liked-movies.use-case"

describe("Get Liked Movies Use Case Unit Tests", () => {
  let sut: GetLikedMoviesUseCase
  let movie_api: MovieHttpApiMock

  beforeEach(() => {
    movie_api = new MovieHttpApiMock()
    sut = new GetLikedMoviesUseCase(movie_api)
  })

  it("should get liked movies", async () => {
    const api_data = makeMovieHttpApiData()

    movie_api.items.push(api_data)

    const result = await sut.execute({})

    expect(result.movies[0].toJson()).toStrictEqual({
      movie_id: expect.any(String),
      created_at: expect.any(Date),
      backdrop_path: api_data.backdrop_path,
      identifier_code: String(api_data.id),
      original_title: api_data.original_title,
      overview: api_data.overview,
      poster_path: api_data.poster_path,
      release_date: api_data.release_date,
      title: api_data.title,
      user_liked: true
    })
  })
})
