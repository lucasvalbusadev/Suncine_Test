import type { FastifyInstance } from "fastify"

import { verifyJwt } from "../middlewares/verify-jwt"
import { authenticate } from "./authenticate"
import { profile } from "./profile"

export function userRoutes(app: FastifyInstance) {
  app.post("/login", authenticate)

  /** Authenticated */
  // biome-ignore lint/style/useNamingConvention: need to be camelCase
  app.get("/user/me", { onRequest: [verifyJwt] }, profile)
}
