import { makeUser } from "../../../../../../../tests/factories/make-user"
import { setupSequelize } from "../../../../../shared/infra/testing/helper"
import { UserSequelizeRepository } from "../../../../infra/db/sequelize/user-sequelize.repository"
import { UserModel } from "../../../../infra/db/sequelize/user.model"
import { GetUserByIdUseCase } from "../get-user-by-id.user-case"

describe("Get User By Id Unit Tests", () => {
  let sut: GetUserByIdUseCase
  let repository: UserSequelizeRepository

  setupSequelize({ models: [UserModel] })

  beforeEach(() => {
    repository = new UserSequelizeRepository(UserModel)
    sut = new GetUserByIdUseCase(repository)
  })

  it("should return a user when user_id match", async () => {
    const user = makeUser()

    repository.insert(user)

    const findByIdSpy = vi.spyOn(repository, "findById")

    const result = await sut.execute({ user_id: user.user_id.id })

    expect(findByIdSpy).toHaveBeenCalledTimes(1)
    expect(findByIdSpy).toHaveBeenCalledWith(user.user_id)
    expect(result.user).toStrictEqual(user)
  })
})
