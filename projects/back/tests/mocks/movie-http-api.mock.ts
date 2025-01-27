import type {
  MovieExternalApiInterface,
  MovieHttpOutput,
  MovieHttpProps,
  MovieHttpResultSuccess
} from "../../src/core/movie/application/http/movie-http-interface"

export class MovieHttpApiMock implements MovieExternalApiInterface {
  public items: MovieHttpProps[] = []

  // biome-ignore lint/suspicious/useAwait: mock function
  async likeOrUnlikeMovie(): Promise<MovieHttpResultSuccess> {
    return {
      status_code: 15,
      status_message: "success",
      success: true
    }
  }

  // biome-ignore lint/suspicious/useAwait: mock function
  async getLikedMovies(): Promise<MovieHttpOutput> {
    return {
      page: 1,
      results: this.items,
      total_pages: 10,
      total_results: 10
    }
  }

  // biome-ignore lint/suspicious/useAwait: mock function
  async movieMostTrended(): Promise<MovieHttpProps> {
    return this.items[0]
  }

  // biome-ignore lint/suspicious/useAwait: mock function
  async getTop10Movies(): Promise<MovieHttpOutput> {
    return {
      page: 1,
      results: this.items,
      total_pages: 10,
      total_results: 10
    }
  }

  async findMovieById(movie_id: number): Promise<MovieHttpProps | null> {
    const found = this.items.find((movie) => movie.id === movie_id)

    return found ? found : null
  }
}
