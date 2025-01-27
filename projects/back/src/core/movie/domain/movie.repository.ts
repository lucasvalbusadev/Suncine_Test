import type { RepositoryInterface } from "../../shared/domain/repository/repository-interface"
import type { Movie, MovieId } from "./movie.entity"

export interface MovieRepositoryInterface extends RepositoryInterface<Movie, MovieId> {
  findByIdentifierCode(identifier_code: string[]): Promise<Movie[]>
}
