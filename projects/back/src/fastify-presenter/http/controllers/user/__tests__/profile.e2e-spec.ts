import type { FastifyInstance } from "fastify"
import request from "supertest"
import { makeJwtToken } from "../../../../../../tests/factories/make-jwt-token"
import { UserFactory } from "../../../../../../tests/factories/make-user"
import { buildFastify } from "../../../../../app"
import { Uuid } from "../../../../../core/shared/domain/value-objects/uuid.vo"
import type { User } from "../../../../../core/user/domain/user.entity"

describe("UserController (e2e)", () => {
  let fastify: FastifyInstance
  let user_created: User

  beforeAll(async () => {
    fastify = buildFastify()
    const user_factory = new UserFactory()

    await fastify.ready()

    user_created = await user_factory.makeSequelizeUser({
      login: "success_mail@mail.com",
      name: "John Doe",
      password: "123456"
    })
  })

  afterAll(async () => {
    await fastify.close()
  })

  describe("/me (GET)", () => {
    it("should a response error with 401 when invalid token has pass", async () => {
      const response = await request(fastify.server).get("/user/me").expect(401)

      expect(response.body).toEqual({
        error: {
          action: "Check the credentials provided",
          children: [],
          code: "SUNCINE-01001",
          detail: "The credentials provided is invalid.",
          meta: {
            reason: "The credentials provided is invalid."
          },
          source: {
            path: "token-validation"
          },
          status: "401",
          status_code: 401,
          title: "Invalid credentials"
        }
      })
    })

    it("should a response 400 when id is not a uuid", async () => {
      const token = await makeJwtToken({ user_id: "wrong_id" })
      const response = await request(fastify.server)
        .get("/user/me")
        .set("Authorization", `Bearer ${token}`)
        .expect(400)

      expect(response.body).toEqual({
        error: {
          action: "Check the data provided",
          children: [],
          code: "SUNCINE-00003",
          detail: "A internal server error it happened.",
          meta: {
            reason: "ID must be a valida UUID"
          },
          source: {
            path: "profile-controller"
          },
          status: "400",
          status_code: 400,
          title: "Internal Server Error"
        }
      })
    })

    it("should a response 404 when user not found", async () => {
      const token = await makeJwtToken({ user_id: new Uuid().id })
      const response = await request(fastify.server)
        .get("/user/me")
        .set("Authorization", `Bearer ${token}`)
        .expect(404)

      expect(response.body).toEqual({
        error: {
          action: "Check the data or id provided",
          children: [],
          code: "SUNCINE-00010",
          detail: "The schema requested was not found.",
          meta: {
            reason: "The schema requested was not found."
          },
          source: {
            path: "get-user-by-id.use-case"
          },
          status: "404",
          status_code: 404,
          title: "Schema not found"
        }
      })
    })

    it("should a response with 200 when user profile has found", async () => {
      const token = await makeJwtToken({ user_id: user_created.user_id.id })
      const response = await request(fastify.server)
        .get("/user/me")
        .set("Authorization", `Bearer ${token}`)
        .expect(200)

      expect(response.body).toStrictEqual({
        status: "OK",
        payload: {
          id: user_created.user_id.id,
          login: user_created.login,
          name: user_created.name
        }
      })
    })
  })
})
