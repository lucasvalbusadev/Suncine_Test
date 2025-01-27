import { faker } from "@faker-js/faker"
import type { MovieHttpProps } from "../../src/core/movie/application/http/movie-http-interface"

export function makeMovieHttpApiData(override?: Partial<MovieHttpProps>): MovieHttpProps {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    backdrop_path: faker.image.url(),
    title: faker.lorem.words(3),
    original_title: faker.lorem.words(4),
    overview: faker.lorem.paragraph(),
    poster_path: faker.image.url(),
    media_type: faker.helpers.arrayElement(["movie", "tv"]),
    adult: faker.datatype.boolean(),
    original_language: faker.helpers.arrayElement(["en", "es", "fr", "ja", "de"]),
    genre_ids: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      faker.number.int({ min: 1, max: 20 })
    ),
    popularity: faker.number.int(),
    release_date: faker.date.future().toISOString(),
    video: faker.datatype.boolean(),
    vote_average: faker.number.int(),
    vote_count: faker.number.int({ min: 0, max: 10000 }),
    ...override
  }
}
