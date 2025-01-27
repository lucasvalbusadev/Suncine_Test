import { DataType } from "sequelize-typescript"
import { setupSequelize } from "../../../../../shared/infra/testing/helper"
import { UserModel } from "../user.model"

describe("UserModel Integration Tests", () => {
  setupSequelize({ models: [UserModel] })

  test("mapping props", () => {
    const attributes_map = UserModel.getAttributes()
    const attributes = Object.keys(UserModel.getAttributes())

    expect(attributes).toStrictEqual(["user_id", "name", "login", "password", "created_at"])

    const user_id_attr = attributes_map.user_id
    expect(user_id_attr).toMatchObject({
      field: "user_id",
      fieldName: "user_id",
      primaryKey: true,
      type: DataType.UUID()
    })

    const name_attr = attributes_map.name
    expect(name_attr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255)
    })

    const login_attr = attributes_map.login
    expect(login_attr).toMatchObject({
      field: "login",
      fieldName: "login",
      allowNull: false,
      type: DataType.STRING(255)
    })

    const password_attr = attributes_map.password
    expect(password_attr).toMatchObject({
      field: "password",
      fieldName: "password",
      allowNull: false,
      type: DataType.TEXT()
    })

    const created_at_attr = attributes_map.created_at
    expect(created_at_attr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(3)
    })
  })

  test("create", async () => {
    const arrange = {
      user_id: "9366b7dc-2d71-4799-b91c-c64adb205104",
      name: "john doe",
      login: "johndoe@mail.com",
      password: "123456",
      created_at: new Date()
    }

    const user = await UserModel.create(arrange)

    expect(user.toJSON()).toStrictEqual(arrange)
  })
})
