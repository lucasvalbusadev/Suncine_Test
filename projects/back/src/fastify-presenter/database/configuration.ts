import { Sequelize } from "sequelize-typescript"
import { MovieModel } from "../../core/movie/infra/db/sequelize/movie.model"
import { UserModel } from "../../core/user/infra/db/sequelize/user.model"

export const sequelize = new Sequelize({
  dialect: "postgres", // ou 'postgres', 'sqlite', etc.
  host: "localhost",
  username: "suncine_database",
  password: "930a0029225aa4c28b8ef095b679285eaae27078",
  database: "suncine_database",
  port: 5433,
  models: [UserModel, MovieModel],
  logging: false
})
