import { seeds } from "./core/shared/infra/db/sequelize/migrator"
import { sequelize } from "./fastify-presenter/database/configuration"

seeds(sequelize).runAsCLI()
