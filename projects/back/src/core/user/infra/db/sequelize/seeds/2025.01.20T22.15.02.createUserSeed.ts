import type { Sequelize } from "sequelize"
import type { MigrationFn } from "umzug"
import { Uuid } from "../../../../../shared/domain/value-objects/uuid.vo"

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkInsert("users", [
    {
      user_id: new Uuid().id,
      name: "suncine",
      login: "suncine@mail.com",
      password: "$2a$08$J2heJIlDEwGBQ2pwf0PUg.dqMfKs1Vgyeo7lUx1D/z8CHd1Dxhv42",
      created_at: new Date()
    }
  ])
}

export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().bulkDelete("users", { email: "suncine@mail.com" })
}
