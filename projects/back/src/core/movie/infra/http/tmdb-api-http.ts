import { AxiosError, type AxiosInstance } from "axios"
import {
  HTTP_DICTIONARY_ERROS,
  HttpErrorsCode
} from "../../../shared/errors/dictionaries/dictionary-http-errors"
import { generateErrorMessage } from "../../../shared/errors/handlers/generate-error"
import { AxiosApiClient } from "../../../shared/infra/http/axios-api-cliente"
import type {
  GetLikedMoviesInput,
  LikeAndUnlikeMovie,
  MovieExternalApiInterface,
  MovieHttpOutput,
  MovieHttpProps,
  MovieHttpResultSuccess
} from "../../application/http/movie-http-interface"
import { TMDB_DICTIONARY_ERROS, TmdbApiError } from "./error/tmdb-api-error"
import type { TmdbMovieOutput, TmdbMovieProps } from "./types/tmdb.types"

export class TmdbApiHttp extends AxiosApiClient implements MovieExternalApiInterface {
  private readonly axios: AxiosInstance
  private readonly language = "pt-BR"
  private readonly account_id = process.env.TMDB_ACCOUNT_ID
  private readonly tmdb_image_url = process.env.TMDB_VIEW_IMAGE_URL

  constructor() {
    const base_url = process.env.TMDB_BASE_URL as string
    const token = process.env.TMDB_TOKEN as string
    super(base_url, token)

    this.axios = this.getClient()
  }

  async findMovieById(movie_id: number): Promise<MovieHttpProps> {
    try {
      const result = await this.axios.get<MovieHttpProps>(
        `/movie/${movie_id}?&language=${this.language}`
      )

      const data = result.data

      const format_response = {
        ...data,
        backdrop_path: `${this.tmdb_image_url}/${data.backdrop_path}`,
        poster_path: `${this.tmdb_image_url}/${data.poster_path}`
      }

      return format_response
    } catch (error) {
      if (error instanceof AxiosError) {
        return generateErrorMessage(
          TmdbApiError.INTERNAL_SERVER_ERROR,
          TMDB_DICTIONARY_ERROS,
          error.response?.data,
          "tmdb-api-http ::: getLikedMovies"
        )
      }

      return generateErrorMessage(
        HttpErrorsCode.INTERNAL_SERVER_ERROR,
        HTTP_DICTIONARY_ERROS,
        { reason: error.message },
        "tmdb-api-http ::: getLikedMovies"
      )
    }
  }

  async likeOrUnlikeMovie({
    media_id,
    like_or_unlike
  }: LikeAndUnlikeMovie): Promise<MovieHttpResultSuccess> {
    try {
      const result = await this.axios.post<MovieHttpResultSuccess>(
        `/account/${this.account_id}/favorite`,
        {
          media_id,
          media_type: "movie",
          favorite: like_or_unlike
        }
      )

      result.data

      return result.data
    } catch (error) {
      if (error instanceof AxiosError) {
        return generateErrorMessage(
          TmdbApiError.INTERNAL_SERVER_ERROR,
          TMDB_DICTIONARY_ERROS,
          { reason: error.response?.data },
          "tmdb-api-http ::: getLikedMovies"
        )
      }

      return generateErrorMessage(
        HttpErrorsCode.INTERNAL_SERVER_ERROR,
        HTTP_DICTIONARY_ERROS,
        { reason: error.message },
        "tmdb-api-http ::: getLikedMovies"
      )
    }
  }

  async getLikedMovies({ page }: GetLikedMoviesInput): Promise<MovieHttpOutput> {
    try {
      const DEFAULT_PAGE = "1"
      const page_query = page || DEFAULT_PAGE
      const result = await this.axios.get<TmdbMovieOutput>(
        `/account/${this.account_id}/favorite/movies?language=${this.language}&page=${page_query}&sort_by=created_at.asc`
      )
      const data = result.data

      return {
        ...data,
        results: this.formatUrlImage(data.results)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return generateErrorMessage(
          TmdbApiError.INTERNAL_SERVER_ERROR,
          TMDB_DICTIONARY_ERROS,
          { reason: error.response?.data },
          "tmdb-api-http ::: getLikedMovies"
        )
      }

      return generateErrorMessage(
        HttpErrorsCode.INTERNAL_SERVER_ERROR,
        HTTP_DICTIONARY_ERROS,
        { reason: error.message },
        "tmdb-api-http ::: getLikedMovies"
      )
    }
  }

  async movieMostTrended(): Promise<MovieHttpProps> {
    try {
      const result = await this.axios.get<TmdbMovieOutput>(
        `/trending/movie/day?language=${this.language}`
      )
      const data = result.data.results[0] //most trended

      const format_response = {
        ...data,
        backdrop_path: `${this.tmdb_image_url}/${data.backdrop_path}`,
        poster_path: `${this.tmdb_image_url}/${data.poster_path}`
      }

      return format_response
    } catch (error) {
      if (error instanceof AxiosError) {
        return generateErrorMessage(
          TmdbApiError.INTERNAL_SERVER_ERROR,
          TMDB_DICTIONARY_ERROS,
          { reason: error.response?.data },
          "tmdb-api-http ::: getLikedMovies"
        )
      }

      return generateErrorMessage(
        HttpErrorsCode.INTERNAL_SERVER_ERROR,
        HTTP_DICTIONARY_ERROS,
        { reason: error.message },
        "tmdb-api-http ::: getLikedMovies"
      )
    }
  }

  async getTop10Movies(): Promise<MovieHttpOutput> {
    try {
      const result = await this.axios.get<TmdbMovieOutput>(
        `/trending/movie/day?language=${this.language}`
      )

      const data = result.data

      return {
        ...data,
        results: this.formatUrlImage(data.results)
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        return generateErrorMessage(
          TmdbApiError.INTERNAL_SERVER_ERROR,
          TMDB_DICTIONARY_ERROS,
          { reason: error.response?.data },
          "tmdb-api-http ::: getLikedMovies"
        )
      }

      return generateErrorMessage(
        HttpErrorsCode.INTERNAL_SERVER_ERROR,
        HTTP_DICTIONARY_ERROS,
        { reason: error.message },
        "tmdb-api-http ::: getLikedMovies"
      )
    }
  }

  private formatUrlImage(data: TmdbMovieProps[]) {
    const format_response = data.map((movie) => {
      return {
        ...movie,
        backdrop_path: `${this.tmdb_image_url}/${movie.backdrop_path}`,
        poster_path: `${this.tmdb_image_url}/${movie.poster_path}`
      }
    })

    return format_response
  }
}
