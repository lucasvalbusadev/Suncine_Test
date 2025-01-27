import fastifyJwt from "@fastify/jwt"
import Fastify from "fastify"
import { ZodError } from "zod"
import type { ErrorObject } from "./core/shared/errors/dictionaries/dictionary-types"
import { env } from "./env"
import { movieRoutes } from "./fastify-presenter/http/controllers/movie/route"
import { userRoutes } from "./fastify-presenter/http/controllers/user/route"
import dbPlugin from "./fastify-presenter/plugins/database-plugin"

export function buildFastify() {
  const app = Fastify({
    logger: true
  })

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
      // biome-ignore lint/style/useNamingConvention: <explanation>
      expiresIn: "10m"
    }
  })

  app.register(dbPlugin)
  app.register(userRoutes)
  app.register(movieRoutes)

  // biome-ignore lint/style/useNamingConvention: <explanation>
  app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
      return reply.status(400).send({ message: "Validation error.", issues: error.format() })
    }

    // biome-ignore lint/suspicious/noExplicitAny: using any because there is no way to change the fastify error type
    const error_object = (error as any).error_object as ErrorObject

    if (error_object) {
      return reply.status(error_object.status_code).send({ error: error_object })
    }

    return reply.status(500).send({ message: "Internal server error.", error })
  })

  return app
}

export const app = buildFastify()
