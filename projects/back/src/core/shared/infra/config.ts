import { config as readEnv } from "dotenv"
import { join } from "node:path"

// biome-ignore lint/complexity/noStaticOnlyClass: use static functions to better code
export class Config {
  // biome-ignore lint/suspicious/noExplicitAny: use any because you don't know the return value
  static env: any = null

  static db() {
    Config.readEnv()

    return {
      // biome-ignore lint/suspicious/noExplicitAny: sequelize use type Dialect but cannot be import
      dialect: "sqlite" as any,
      host: Config.env.DB_HOST,
      logging: Config.env.DB_LOGGING === "true"
    }
  }

  static readEnv() {
    if (Config.env) {
      return
    }

    const { parsed } = readEnv({
      path: join(__dirname, "../../../../../.env")
    })

    Config.env = {
      ...parsed,
      ...process.env
    }
  }
}
