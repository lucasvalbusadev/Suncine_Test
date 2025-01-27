import { BcryptHasher } from "../../../infra/cryptography/bcrypt-hasher"
import { JwtEncrypter } from "../../../infra/cryptography/jwt-encrypter"
import { UserSequelizeRepository } from "../../../infra/db/sequelize/user-sequelize.repository"
import { UserModel } from "../../../infra/db/sequelize/user.model"
import { AuthenticateUserUseCase } from "../authenticate-user/authenticate-user.use-case"

export function makeAuthenticateUseCase() {
  const repository = new UserSequelizeRepository(UserModel)
  const encrypter = new JwtEncrypter()
  const hasher = new BcryptHasher()
  const use_case = new AuthenticateUserUseCase(repository, hasher, encrypter)

  return use_case
}
