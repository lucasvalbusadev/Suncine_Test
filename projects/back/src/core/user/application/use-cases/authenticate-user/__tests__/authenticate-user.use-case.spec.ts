import { FakeEncrypter } from "../../../../../../../tests/cryptography/fake-encrypter"
import { FakeHasher } from "../../../../../../../tests/cryptography/fake-hasher"
import { makeUser } from "../../../../../../../tests/factories/make-user"
import { UserInMemoryRepository } from "../../../../infra/db/in-memory/user-in-memory.repository"
import { AuthenticateUserUseCase } from "../authenticate-user.use-case"

describe("Authenticate User UseCase Unit Tests", () => {
  let use_case: AuthenticateUserUseCase
  let encrypter: FakeEncrypter
  let fake_hasher: FakeHasher
  let repository: UserInMemoryRepository

  beforeEach(() => {
    repository = new UserInMemoryRepository()
    encrypter = new FakeEncrypter()
    fake_hasher = new FakeHasher()
    use_case = new AuthenticateUserUseCase(repository, fake_hasher, encrypter)
  })

  it("should throw an error when user cannot be found by login", async () => {
    const input = { login: "wrong_login@mail.com", name: "success_name", password: "123456" }

    try {
      await use_case.execute(input)
    } catch (error) {
      expect(error.error_object).toStrictEqual({
        action: "Check the credentials provided",
        children: [],
        code: "SUNCINE-01001",
        detail: "The credentials provided is invalid.",
        meta: {
          reason: "The credentials provided is invalid."
        },
        resolution: undefined,
        source: {
          path: "authenticate-user.use-case"
        },
        status: "401",
        status_code: 401,
        title: "Invalid credentials"
      })
    }
  })

  it("should throw an error when user password not match", async () => {
    const user = makeUser({
      login: "success@mail.com",
      password: await fake_hasher.hash("123456")
    })

    repository.items.push(user)

    const input = { login: "success@mail.com", name: "success_name", password: "wrong_password" }

    try {
      await use_case.execute(input)
    } catch (error) {
      expect(error.error_object).toStrictEqual({
        action: "Check the credentials provided",
        children: [],
        code: "SUNCINE-01001",
        detail: "The credentials provided is invalid.",
        meta: {
          reason: "The credentials provided is invalid."
        },
        resolution: undefined,
        source: {
          path: "authenticate-user.use-case"
        },
        status: "401",
        status_code: 401,
        title: "Invalid credentials"
      })
    }
  })

  it("should return a user if credentials match", async () => {
    const user = makeUser({
      login: "success@mail.com",
      password: await fake_hasher.hash("123456")
    })

    repository.items.push(user)

    const result = await use_case.execute({
      login: "success@mail.com",
      password: "123456"
    })

    expect(result).toEqual({
      access_token: expect.any(String),
      user
    })
  })
})
