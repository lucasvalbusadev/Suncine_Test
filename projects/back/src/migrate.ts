import { migrator } from "./core/shared/infra/db/sequelize/migrator"
import { sequelize } from "./fastify-presenter/database/configuration"

migrator(sequelize).runAsCLI()
