import { faker } from "@faker-js/faker"
import { User, type UserConstructorProps } from "../../src/core/user/domain/user.entity"
import { BcryptHasher } from "../../src/core/user/infra/cryptography/bcrypt-hasher"
import { UserSequelizeRepository } from "../../src/core/user/infra/db/sequelize/user-sequelize.repository"
import { UserModel } from "../../src/core/user/infra/db/sequelize/user.model"

export function makeUser(override?: Partial<UserConstructorProps>) {
  return User.create({
    login: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.person.fullName(),
    ...override
  })
}

export class UserFactory {
  private user_repo: UserSequelizeRepository
  constructor() {
    this.user_repo = new UserSequelizeRepository(UserModel)
  }

  async makeSequelizeUser(data: Partial<UserConstructorProps> = {}): Promise<User> {
    const hasher = new BcryptHasher()
    const user = makeUser({
      login: data.login,
      name: data.name,
      password: data.password ? await hasher.hash(data.password) : undefined,
      created_at: data.created_at
    })

    const all_ready_exists = await this.user_repo.findByLogin(user.login)

    if (!all_ready_exists) {
      await this.user_repo.insert(user)
      return user
    }

    return all_ready_exists
  }
}
