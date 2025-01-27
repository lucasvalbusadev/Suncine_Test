import type { RepositoryInterface } from "../../shared/domain/repository/repository-interface"
import type { User, UserId } from "./user.entity"

export interface UserRepositoryInterface extends RepositoryInterface<User, UserId> {
  findByLogin(login: string): Promise<User | null>
}
