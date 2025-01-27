import { InMemoryRepository } from "../../../../shared/infra/db/in-memory/in-memory.repository"
import type { Movie, MovieId } from "../../../domain/movie.entity"
import type { MovieRepositoryInterface } from "../../../domain/movie.repository"

export class MovieInMemoryRepository
  extends InMemoryRepository<Movie, MovieId>
  implements MovieRepositoryInterface
{
  async findByIdentifierCode(identifier_code: string[]): Promise<Movie[]> {
    const movie = this.items.filter((item) => identifier_code.includes(item.identifier_code))

    return movie
  }
}
