import { makeUser } from "../../../../../../../tests/factories/make-user"
import { UserId } from "../../../../domain/user.entity"
import { UserInMemoryRepository } from "../../../../infra/db/in-memory/user-in-memory.repository"
import { GetUserByIdUseCase } from "../get-user-by-id.user-case"

describe("Get User By Id Unit Tests", () => {
  let sut: GetUserByIdUseCase
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    sut = new GetUserByIdUseCase(repository)
  })

  it("should generate a error when user not found", async () => {
    const user_id = new UserId().id
    try {
      await sut.execute({ user_id })
    } catch (error) {
      expect(error.error_object).toStrictEqual({
        action: "Check the data or id provided",
        children: [],
        code: "SUNCINE-00010",
        detail: "The schema requested was not found.",
        meta: {
          reason: "The schema requested was not found."
        },
        resolution: undefined,
        source: {
          path: "get-user-by-id.use-case"
        },
        status: "404",
        status_code: 404,
        title: "Schema not found"
      })
    }
  })

  it("should return a user when user_id match", async () => {
    const user = makeUser()

    repository.items.push(user)

    const findByIdSpy = vi.spyOn(repository, "findById")

    const result = await sut.execute({ user_id: user.user_id.id })

    expect(findByIdSpy).toHaveBeenCalledTimes(1)
    expect(findByIdSpy).toHaveBeenCalledWith(user.user_id)
    expect(result.user).toStrictEqual(user)
  })
})
