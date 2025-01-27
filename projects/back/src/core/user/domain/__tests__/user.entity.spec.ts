import { expect } from "vitest"
import { User, UserId } from "../user.entity"

describe("User Entity Unit Tests", () => {
  beforeEach(() => {
    User.prototype.validate = vi.fn().mockImplementation(User.prototype.validate)
  })
  test("constructor of user", () => {
    let user = new User({ login: "jonhdoe@mail.com", name: "fake_name", password: "fake_password" })
    expect(user.user_id).toBeInstanceOf(UserId)
    expect(user.login).toBe("jonhdoe@mail.com")
    expect(user.name).toBe("fake_name")
    expect(user.password).toBe("fake_password")
    expect(user.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    user = new User({
      login: "jonhdoe@mail.com",
      name: "fake_name",
      created_at,
      password: "fake_password"
    })
    expect(user.user_id).toBeInstanceOf(UserId)
    expect(user.login).toBe("jonhdoe@mail.com")
    expect(user.name).toBe("fake_name")
    expect(user.password).toBe("fake_password")
    expect(user.created_at).toBe(created_at)
  })

  describe("create command", () => {
    test("should create a user", () => {
      let user = User.create({
        login: "jonhdoe@mail.com",
        name: "fake_name",
        password: "fake_password"
      })
      expect(user.user_id).toBeInstanceOf(UserId)
      expect(user.login).toBe("jonhdoe@mail.com")
      expect(user.name).toBe("fake_name")
      expect(user.password).toBe("fake_password")
      expect(user.created_at).toBeInstanceOf(Date)

      const created_at = new Date()
      user = User.create({
        login: "jonhdoe@mail.com",
        name: "fake_name",
        password: "fake_password",
        created_at
      })
      expect(user.user_id).toBeInstanceOf(UserId)
      expect(user.login).toBe("jonhdoe@mail.com")
      expect(user.name).toBe("fake_name")
      expect(user.password).toBe("fake_password")
      expect(user.created_at).toBe(created_at)
    })
  })

  describe("user id field", () => {
    const arrange = [{ id: null }, { id: undefined }, { id: new UserId() }]

    test.each(arrange)("should be is %j", (props) => {
      const user = new User(props as any)
      expect(user.user_id).toBeInstanceOf(UserId)
    })
  })

  test("toJSON method", () => {
    let user = User.create({
      login: "jonhdoe@mail.com",
      name: "fake_name",
      password: "fake_password"
    }).toJson()
    expect(user.user_id).toBeDefined()
    expect(user.login).toBe("jonhdoe@mail.com")
    expect(user.name).toBe("fake_name")
    expect(user.password).toBe("fake_password")
    expect(user.created_at).toBeInstanceOf(Date)

    const created_at = new Date()
    user = User.create({
      login: "jonhdoe@mail.com",
      name: "fake_name",
      password: "fake_password",
      created_at
    }).toJson()
    expect(user.user_id).toBeDefined()
    expect(user.login).toBe("jonhdoe@mail.com")
    expect(user.name).toBe("fake_name")
    expect(user.password).toBe("fake_password")
    expect(user.created_at).toBe(created_at)
  })
})

describe("user Validator", () => {
  describe("create command", () => {
    test("should an invalid user with login property", () => {
      const user = User.create({
        login: "t".repeat(256),
        name: "fake_name",
        password: "fake_password"
      })

      expect(user.notification.hasErrors()).toBe(true)
      expect(user.notification.toJson()).toStrictEqual([
        {
          login: ["login must be shorter than or equal to 255 characters"]
        }
      ])
    })

    test("should an invalid user with name property", () => {
      const user = User.create({
        login: "johndoe@mail.com",
        name: "t".repeat(256),
        password: "fake_password"
      })

      expect(user.notification.hasErrors()).toBe(true)
      expect(user.notification.toJson()).toStrictEqual([
        {
          name: ["name must be shorter than or equal to 255 characters"]
        }
      ])
    })

    test("should an invalid user with password property", () => {
      const user = User.create({
        login: "johndoe@mail.com",
        name: "John Doe",
        password: "123"
      })

      expect(user.notification.hasErrors()).toBe(true)
      expect(user.notification.toJson()).toStrictEqual([
        {
          password: ["password must be longer than or equal to 6 characters"]
        }
      ])
    })
  })
})
