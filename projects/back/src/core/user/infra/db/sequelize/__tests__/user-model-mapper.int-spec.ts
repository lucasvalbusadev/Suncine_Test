import { setupSequelize } from "../../../../../shared/infra/testing/helper"
import { User, UserId } from "../../../../domain/user.entity"
import { UserModelMapper } from "../user-model-mapper"
import { UserModel } from "../user.model"

describe("UserModelMapper Integration Tests", () => {
  setupSequelize({ models: [UserModel] })

  it("should throws error when user is invalid", () => {
    expect.assertions(1)
    const model = UserModel.build({
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "ad".repeat(256),
      login: "johndoe@mail.com",
      created_at: new Date(),
      password: "123456"
    })
    try {
      UserModelMapper.toEntity(model)
    } catch (e) {
      expect(e.error_object).toStrictEqual({
        action: "Check the data provided",
        children: [],
        code: "SUNCINE-00002",
        detail: "The data provider is not compatibly with validations.",
        meta: {
          reason: [
            {
              name: ["name must be shorter than or equal to 255 characters"]
            }
          ]
        },
        resolution: undefined,
        source: {
          path: "user-model-mapper ::: toEntity"
        },
        status: "400",
        status_code: 400,
        title: "Entity validation error"
      })
    }
  })

  it("should convert a user model to a user entity", () => {
    const created_at = new Date()
    const model = UserModel.build({
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "John Doe",
      password: "123456",
      login: "johndoe@mail.com",
      created_at
    })
    const aggregate = UserModelMapper.toEntity(model)
    expect(aggregate.toJson()).toStrictEqual(
      new User(
        {
          name: "John Doe",
          login: "johndoe@mail.com",
          password: "123456",
          created_at
        },
        new UserId("9366b7dc-2d71-4799-b91c-c64adb205104")
      ).toJson()
    )
  })

  it("should convert a user entity to a user model", () => {
    const created_at = new Date()
    const entity = User.create(
      {
        name: "John Doe",
        login: "johndoe@mail.com",
        password: "123456",
        created_at
      },
      new UserId("9366b7dc-2d71-4799-b91c-c64adb205104")
    )
    const aggregate = UserModelMapper.toModel(entity)
    expect(aggregate.toJSON()).toStrictEqual({
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "John Doe",
      login: "johndoe@mail.com",
      password: "123456",
      created_at
    })
  })
})
