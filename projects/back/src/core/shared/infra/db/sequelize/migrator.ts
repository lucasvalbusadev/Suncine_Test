import { join } from "node:path"
import type { Sequelize } from "sequelize"
import { SequelizeStorage, Umzug, type UmzugOptions } from "umzug"

export function migrator(sequelize: Sequelize, options?: Partial<UmzugOptions>) {
  return new Umzug({
    migrations: {
      glob: [
        "*/infra/db/sequelize/migrations/*.{js,ts}",
        {
          cwd: join(__dirname, "..", "..", "..", ".."),
          ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"]
        }
      ]
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
    ...(options || {})
  })
}

export function seeds(sequelize: Sequelize, options?: Partial<UmzugOptions>) {
  return new Umzug({
    migrations: {
      glob: [
        "*/infra/db/sequelize/seeds/*.{js,ts}",
        {
          cwd: join(__dirname, "..", "..", "..", ".."),
          ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"]
        }
      ]
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
    ...(options || {})
  })
}
