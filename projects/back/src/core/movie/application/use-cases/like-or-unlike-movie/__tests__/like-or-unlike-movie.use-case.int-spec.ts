import nock from "nock"
import { makeMovie } from "../../../../../../../tests/factories/make-movie"
import { makeMovieHttpApiData } from "../../../../../../../tests/factories/make-movie-http-api-data"
import { setupSequelize } from "../../../../../shared/infra/testing/helper"
import { MovieSequelizeRepository } from "../../../../infra/db/sequelize/movie-sequelize.repository"
import { MovieModel } from "../../../../infra/db/sequelize/movie.model"
import { TmdbApiHttp } from "../../../../infra/http/tmdb-api-http"
import { LikeOrUnlikeMovieUseCase } from "../like-or-unlike-movie.use-case"

describe("Like or Unlike Use Case Unit Tests", () => {
  let sut: LikeOrUnlikeMovieUseCase
  let movie_repo: MovieSequelizeRepository
  let movie_api: TmdbApiHttp
  const base_url = process.env.TMDB_BASE_URL as string
  const token = process.env.TMDB_TOKEN as string
  const account_id = process.env.TMDB_ACCOUNT_ID
  const tmdb_image_url = process.env.TMDB_VIEW_IMAGE_URL
  const language = "pt-BR"

  const movie_id = 123456
  const api_data = makeMovieHttpApiData({
    id: movie_id
  })

  setupSequelize({ models: [MovieModel] })

  beforeEach(() => {
    movie_api = new TmdbApiHttp()
    movie_repo = new MovieSequelizeRepository(MovieModel)
    sut = new LikeOrUnlikeMovieUseCase(movie_repo, movie_api)
  })

  // it("should throw a error when movie api not found a movie", async () => {
  //   try {
  //     await sut.execute({
  //       like_or_unlike: true,
  //       movie_id: "wrong_id" as any
  //     })
  //   } catch (error) {
  //     expect(error.error_object).toStrictEqual({
  //       action: "Check the logs",
  //       children: [],
  //       code: "SUNCINE-01010",
  //       detail: "A unexpected error occurred.",
  //       meta: {
  //         reason: "A unexpected error is not mapped occurred."
  //       },
  //       resolution: undefined,
  //       source: {
  //         path: "tmdb-api-http ::: getLikedMovies"
  //       },
  //       status: "500",
  //       status_code: 500,
  //       title: "Internal Server Error"
  //     })
  //   }
  // })

  it("should create a new movie if is not exists and like", async () => {
    await sut.execute({
      like_or_unlike: true,
      movie_id
    })

    nock(base_url, {
      reqheaders: {
        Authorization: `Bearer ${token}`
      }
    })
      .get(`/movie/${movie_id}?&language=${language}`)
      .reply(200, api_data)

    nock(base_url, {
      reqheaders: {
        Authorization: `Bearer ${token}`
      }
    })
      .post(`/account/${account_id}/favorite`, {
        media_id: movie_id,
        media_type: "movie",
        favorite: true
      })
      .reply(200, api_data)

    const movie = await movie_repo.findByIdentifierCode([String(movie_id)])

    expect(movie[0].toJson()).toStrictEqual({
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

  it.skip("should create a new movie if is not exists and unlike", async () => {
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

  it.skip("should update a movie and like if all ready exists", async () => {
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

  it.skip("should update a movie and unlike if all ready exists", async () => {
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
