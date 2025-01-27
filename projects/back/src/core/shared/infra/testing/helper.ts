import { Sequelize, type SequelizeOptions } from "sequelize-typescript"
import { Config } from "../config"

export function setupSequelize(options: SequelizeOptions = {}) {
  // biome-ignore lint/style/useNamingConvention: private prop
  let _sequelize: Sequelize

  // biome-ignore lint/suspicious/useAwait: it has to be async
  beforeAll(async () => {
    _sequelize = new Sequelize({
      ...Config.db(),
      ...options
    })
  })

  beforeEach(async () => await _sequelize.sync({ force: true }))

  afterAll(async () => await _sequelize.close())

  return {
    get sequelize() {
      return _sequelize
    }
  }
}
