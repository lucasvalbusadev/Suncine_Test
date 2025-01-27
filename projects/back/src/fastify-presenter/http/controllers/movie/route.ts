import type { FastifyInstance } from "fastify"

import { verifyJwt } from "../middlewares/verify-jwt"
import { getLikedMovies } from "./get-liked-movies"
import { likeOrUnlikeMovie } from "./like-or-unlike-movie"
import { movieMostTrended } from "./movie-most-trended"
import { top10MovieMostTrended } from "./top-10-movies-trended"

export function movieRoutes(app: FastifyInstance) {
  // biome-ignore lint/style/useNamingConvention: need to be camelCase
  app.get("/movie/likes", { onRequest: [verifyJwt] }, getLikedMovies)

  // biome-ignore lint/style/useNamingConvention: need to be camelCase
  app.patch("/movie/like", { onRequest: [verifyJwt] }, likeOrUnlikeMovie)

  // biome-ignore lint/style/useNamingConvention: need to be camelCase
  app.get("/movie/most-trended", { onRequest: [verifyJwt] }, movieMostTrended)

  // biome-ignore lint/style/useNamingConvention: need to be camelCase
  app.get("/movie/top-10", { onRequest: [verifyJwt] }, top10MovieMostTrended)
}
