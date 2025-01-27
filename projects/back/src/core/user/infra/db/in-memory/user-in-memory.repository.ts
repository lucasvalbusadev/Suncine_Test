import { InMemoryRepository } from "../../../../shared/infra/db/in-memory/in-memory.repository"
import type { User, UserId } from "../../../domain/user.entity"
import type { UserRepositoryInterface } from "../../../domain/user.repository"

export class UserInMemoryRepository
  extends InMemoryRepository<User, UserId>
  implements UserRepositoryInterface
{
  async findByLogin(login: string): Promise<User | null> {
    const user = this.items.find((i) => i.login === login)

    return typeof user === "undefined" ? null : user
  }
}
