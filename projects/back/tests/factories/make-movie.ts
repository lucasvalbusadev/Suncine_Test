import { faker } from "@faker-js/faker"
import { Movie, type MovieConstructorProps } from "../../src/core/movie/domain/movie.entity"

export function makeMovie(override?: Partial<MovieConstructorProps>) {
  return Movie.create({
    title: faker.lorem.word(),
    original_title: faker.lorem.word(),
    backdrop_path: faker.image.url(),
    likes: faker.number.int(),
    overview: faker.lorem.text(),
    poster_path: faker.image.url(),
    release_date: faker.date.future().toISOString(),
    user_liked: faker.datatype.boolean(),
    created_at: faker.date.recent(),
    ...override
  })
}
