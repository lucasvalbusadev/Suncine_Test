import { makeUser } from "../../../../../../../tests/factories/make-user"
import { setupSequelize } from "../../../../../shared/infra/testing/helper"
import { UserId } from "../../../../domain/user.entity"
import { UserSequelizeRepository } from "../user-sequelize.repository"
import { UserModel } from "../user.model"

describe("UserSequelizeRepository Integration Test", () => {
  let repository: UserSequelizeRepository
  setupSequelize({ models: [UserModel] })

  beforeEach(() => {
    repository = new UserSequelizeRepository(UserModel)
  })

  it("should inserts a new entity", async () => {
    const user = makeUser()
    await repository.insert(user)
    const user_created = await repository.findById(user.user_id)
    expect(user_created?.toJson()).toStrictEqual(user?.toJson())
  })

  it("should finds a entity by id", async () => {
    const entityFound = await repository.findById(new UserId())
    expect(entityFound).toBeNull()

    const entity = makeUser()
    await repository.insert(entity)
    const user_created = await repository.findById(entity.user_id)
    expect(user_created?.toJson()).toStrictEqual(entity?.toJson())
  })

  it("should return all users", async () => {
    const entity = makeUser()
    await repository.insert(entity)
    const entities = await repository.findAll()
    expect(entities).toHaveLength(1)
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]))
  })

  it("should throw error on update when a entity not found", async () => {
    const entity = makeUser()
    try {
      await repository.update(entity)
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
          path: "user-sequelize ::: update"
        },
        status: "404",
        status_code: 404,
        title: "Schema not found"
      })
    }
  })

  it("should update a entity", async () => {
    const entity = makeUser()
    await repository.insert(entity)

    entity.changeName("User Update")
    await repository.update(entity)

    const entityFound = await repository.findById(entity.user_id)
    expect(entity.toJson()).toStrictEqual(entityFound?.toJson())
  })

  it("should throw error on delete when a entity not found", async () => {
    const entity = makeUser()
    try {
      await repository.delete(entity.entityId)
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
          path: "user-sequelize ::: delete"
        },
        status: "404",
        status_code: 404,
        title: "Schema not found"
      })
    }
  })

  it("should delete a entity", async () => {
    const entity = makeUser()
    await repository.insert(entity)

    await repository.delete(entity.user_id)
    await expect(repository.findById(entity.user_id)).resolves.toBeNull()
  })
})
