import "dotenv/config"
import { z } from "zod"

const env_schema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  JWT_SECRET: z.string(),
  TMDB_BASE_URL: z.string().url(),
  TMDB_TOKEN: z.string(),
  PORT: z.coerce.number().default(3333)
})

// biome-ignore lint/style/useNamingConvention: use private props
const _env = env_schema.safeParse(process.env)

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format())

  throw new Error("Invalid environment variables.")
}

export const env = _env.data
