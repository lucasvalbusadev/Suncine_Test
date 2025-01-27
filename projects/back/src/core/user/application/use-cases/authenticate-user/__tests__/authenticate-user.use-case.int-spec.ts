import { makeUser } from "../../../../../../../tests/factories/make-user"
import { setupSequelize } from "../../../../../shared/infra/testing/helper"
import { BcryptHasher } from "../../../../infra/cryptography/bcrypt-hasher"
import { JwtEncrypter } from "../../../../infra/cryptography/jwt-encrypter"
import { UserSequelizeRepository } from "../../../../infra/db/sequelize/user-sequelize.repository"
import { UserModel } from "../../../../infra/db/sequelize/user.model"
import { AuthenticateUserUseCase } from "../authenticate-user.use-case"

describe("AuthenticateUserUseCase Integration Tests", () => {
  let use_case: AuthenticateUserUseCase
  let repository: UserSequelizeRepository
  let hasher: BcryptHasher
  let encrypter: JwtEncrypter

  setupSequelize({ models: [UserModel] })

  beforeEach(() => {
    repository = new UserSequelizeRepository(UserModel)
    encrypter = new JwtEncrypter()
    hasher = new BcryptHasher()
    use_case = new AuthenticateUserUseCase(repository, hasher, encrypter)
  })

  it("should authenticate a user", async () => {
    const user = makeUser({
      login: "success@mail.com",
      password: await hasher.hash("123456")
    })

    await repository.insert(user)

    const result = await use_case.execute({
      login: "success@mail.com",
      password: "123456"
    })

    expect(result).toEqual({
      access_token: expect.any(String),
      user
    })
  })
})
