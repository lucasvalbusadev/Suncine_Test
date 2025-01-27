import type { FastifyInstance } from "fastify"
import request from "supertest"
import { UserFactory } from "../../../../../../tests/factories/make-user"
import { buildFastify } from "../../../../../app"
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

  describe("/login (POST)", () => {
    it("should a response error with 401 when invalid credentials", async () => {
      let invalid_request = {
        login: "wrong_mail@mail.com",
        password: "123456"
      }

      let response = await request(fastify.server).post("/login").send(invalid_request).expect(401)

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
            path: "authenticate-user.use-case"
          },
          status: "401",
          status_code: 401,
          title: "Invalid credentials"
        }
      })

      invalid_request = {
        login: "success_mail@mail.com",
        password: "wrong_password"
      }

      response = await request(fastify.server).post("/login").send(invalid_request).expect(401)

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
            path: "authenticate-user.use-case"
          },
          status: "401",
          status_code: 401,
          title: "Invalid credentials"
        }
      })
    })

    it("should a response error with 400 when login format is invalid", async () => {
      const with_email_format_wrong = {
        login: "wrong_mail",
        password: "123456"
      }

      let response = await request(fastify.server)
        .post("/login")
        .send(with_email_format_wrong)
        .expect(400)

      expect(response.body).toEqual({
        issues: {
          _errors: [],
          login: {
            _errors: ["Invalid email"]
          }
        },
        message: "Validation error."
      })

      const with_wrong_email_type = {
        login: 123 as any,
        password: "123456"
      }

      response = await request(fastify.server)
        .post("/login")
        .send(with_wrong_email_type)
        .expect(400)

      expect(response.body).toEqual({
        issues: {
          _errors: [],
          login: {
            _errors: ["Expected string, received number"]
          }
        },
        message: "Validation error."
      })

      const with_missing_mail = {
        password: "123456"
      }

      response = await request(fastify.server).post("/login").send(with_missing_mail).expect(400)

      expect(response.body).toEqual({
        issues: {
          _errors: [],
          login: {
            _errors: ["Required"]
          }
        },
        message: "Validation error."
      })
    })

    it("should a response error with 400 when password format is invalid", async () => {
      const with_password_wrong_type = {
        login: "success_mail@mail.com",
        password: 123
      }

      let response = await request(fastify.server)
        .post("/login")
        .send(with_password_wrong_type)
        .expect(400)

      expect(response.body).toEqual({
        issues: {
          _errors: [],
          password: {
            _errors: ["Expected string, received number"]
          }
        },
        message: "Validation error."
      })

      const with_missing_password = {
        login: "success_mail@mail.com"
      }

      response = await request(fastify.server)
        .post("/login")
        .send(with_missing_password)
        .expect(400)

      expect(response.body).toEqual({
        issues: {
          _errors: [],
          password: {
            _errors: ["Required"]
          }
        },
        message: "Validation error."
      })
    })

    it("should a response success with 200 when credentials is valid", async () => {
      const success_request = {
        login: "success_mail@mail.com",
        password: "123456"
      }

      const response = await request(fastify.server)
        .post("/login")
        .send(success_request)
        .expect(200)

      expect(response.body).toEqual({
        status: "OK",
        payload: {
          token: expect.any(String),
          user: {
            id: user_created.user_id.id,
            login: user_created.login,
            name: user_created.name
          }
        }
      })
    })
  })
})
