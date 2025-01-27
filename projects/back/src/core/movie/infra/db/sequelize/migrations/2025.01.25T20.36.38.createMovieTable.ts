import { DataTypes, type Sequelize } from "sequelize"
import type { MigrationFn } from "umzug"

export const up: MigrationFn<Sequelize> = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("movies", {
    movie_id: {
      type: DataTypes.UUID,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false,
      // biome-ignore lint: sequelize must be defined on camelCase
      primaryKey: true
    },
    identifier_code: {
      type: DataTypes.TEXT,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    user_liked: {
      type: DataTypes.BOOLEAN,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    backdrop_path: {
      type: DataTypes.TEXT,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    original_title: {
      type: DataTypes.TEXT,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    poster_path: {
      type: DataTypes.TEXT,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    release_date: {
      type: DataTypes.TEXT,
      // biome-ignore lint: sequelize must be defined on camelCase
      allowNull: false
    },
    overview: {
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
  await sequelize.getQueryInterface().dropTable("movies")
}
