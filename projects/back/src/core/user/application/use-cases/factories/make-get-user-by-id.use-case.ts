import { UserSequelizeRepository } from "../../../infra/db/sequelize/user-sequelize.repository"
import { UserModel } from "../../../infra/db/sequelize/user.model"
import { GetUserByIdUseCase } from "../get-user-by-id/get-user-by-id.user-case"

export function makeGetUserByIdUseCase() {
  const repository = new UserSequelizeRepository(UserModel)
  const use_case = new GetUserByIdUseCase(repository)

  return use_case
}
