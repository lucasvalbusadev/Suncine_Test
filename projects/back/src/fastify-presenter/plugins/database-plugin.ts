import fp from "fastify-plugin"
import { sequelize } from "../database/configuration"

// biome-ignore lint/style/noDefaultExport: need be export default
export default fp(async (fastify) => {
  try {
    await sequelize.authenticate()
    fastify.decorate("sequelize", sequelize)
    fastify.addHook("onClose", async () => await sequelize.close())
  } catch (error) {
    console.error("Database connection failed:", error)
  }
})
