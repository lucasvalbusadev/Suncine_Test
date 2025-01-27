import { DataTypes, type Sequelize } from "sequelize"
import type { MigrationFn } from "umzug"

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("users", {
    user_id: {
      type: DataTypes.UUID,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false,
      // biome-ignore lint: sequelize must be defined on camelCase
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    login: {
      type: DataTypes.STRING(255),
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE(3),
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    }
  })
}
export const down: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable("users")
}
