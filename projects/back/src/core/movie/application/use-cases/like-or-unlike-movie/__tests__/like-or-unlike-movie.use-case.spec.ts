import { makeMovie } from "../../../../../../../tests/factories/make-movie"
import { makeMovieHttpApiData } from "../../../../../../../tests/factories/make-movie-http-api-data"
import { MovieHttpApiMock } from "../../../../../../../tests/mocks/movie-http-api.mock"
import { MovieInMemoryRepository } from "../../../../infra/db/in-memory/movie-in-memory.repository"
import { LikeOrUnlikeMovieUseCase } from "../like-or-unlike-movie.use-case"

describe("Like or Unlike Use Case Unit Tests", () => {
  let sut: LikeOrUnlikeMovieUseCase
  let movie_repo: MovieInMemoryRepository
  let movie_api: MovieHttpApiMock

  beforeEach(() => {
    movie_api = new MovieHttpApiMock()
    movie_repo = new MovieInMemoryRepository()
    sut = new LikeOrUnlikeMovieUseCase(movie_repo, movie_api)
  })

  it("should throw a error when movie api not found a movie", async () => {
    try {
      await sut.execute({
        like_or_unlike: true,
        movie_id: 123456
      })
    } catch (error) {
      expect(error.error_object).toStrictEqual({
        action: "Check the data provided",
        children: [],
        code: "SUNCINE_00103",
        detail: "The data provider cannot match with any data.",
        meta: {
          reason: "The data provider cannot match with any data."
        },
        resolution: undefined,
        source: {
          path: "like-or-unlike-movie.use-case"
        },
        status: "404",
        status_code: 404,
        title: "Not found nada"
      })
    }
  })

  it("should create a new movie if is not exists and like", async () => {
    const movie_id = 123456
    const api_data = makeMovieHttpApiData({
      id: movie_id
    })

    movie_api.items.push(api_data)

    await sut.execute({
      like_or_unlike: true,
      movie_id
    })

    expect(movie_repo.items[0].toJson()).toStrictEqual({
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

  it("should create a new movie if is not exists and unlike", async () => {
    const movie_id = 123456
    const api_data = makeMovieHttpApiData({
      id: movie_id
    })

    movie_api.items.push(api_data)

    await sut.execute({
      like_or_unlike: false,
      movie_id
    })

    expect(movie_repo.items[0].toJson()).toStrictEqual({
      movie_id: expect.any(String),
      created_at: expect.any(Date),
      backdrop_path: api_data.backdrop_path,
      identifier_code: String(api_data.id),
      original_title: api_data.original_title,
      overview: api_data.overview,
      poster_path: api_data.poster_path,
      release_date: api_data.release_date,
      title: api_data.title,
      user_liked: false
    })
  })

  it("should update a movie and like if all ready exists", async () => {
    const movie_id = 123456
    const api_data = makeMovieHttpApiData({
      id: movie_id
    })

    const movie = makeMovie({
      identifier_code: String(movie_id),
      user_liked: false
    })

    movie_api.items.push(api_data)

    movie_repo.items.push(movie)

    await sut.execute({
      like_or_unlike: true,
      movie_id
    })

    expect(movie_repo.items[0].toJson()).toStrictEqual({
      movie_id: expect.any(String),
      created_at: expect.any(Date),
      backdrop_path: movie.backdrop_path,
      identifier_code: movie.identifier_code,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      user_liked: true
    })
  })

  it("should update a movie and unlike if all ready exists", async () => {
    const movie_id = 123456
    const api_data = makeMovieHttpApiData({
      id: movie_id
    })

    const movie = makeMovie({
      identifier_code: String(movie_id),
      user_liked: true
    })

    movie_api.items.push(api_data)

    movie_repo.items.push(movie)

    await sut.execute({
      like_or_unlike: false,
      movie_id
    })

    expect(movie_repo.items[0].toJson()).toStrictEqual({
      movie_id: expect.any(String),
      created_at: expect.any(Date),
      backdrop_path: movie.backdrop_path,
      identifier_code: movie.identifier_code,
      original_title: movie.original_title,
      overview: movie.overview,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      user_liked: false
    })
  })
})
