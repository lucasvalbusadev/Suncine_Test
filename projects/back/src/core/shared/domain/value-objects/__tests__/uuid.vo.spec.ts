import { validate as uuidValidate } from "uuid"
import { InvalidUuidError, Uuid } from "../uuid.vo"
describe("Uuid Unit Tests", () => {
  const validate_spy = vi.spyOn(Uuid.prototype as any, "validate")

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid("invalid-uuid")
    }).toThrowError(new InvalidUuidError())
    expect(validate_spy).toHaveBeenCalledTimes(1)
  })

  test("should create a valid uuid", () => {
    const uuid = new Uuid()
    expect(uuid.id).toBeDefined()
    expect(uuidValidate(uuid.id)).toBe(true)
    expect(validate_spy).toHaveBeenCalledTimes(1)
  })

  test("should accept a valid uuid", () => {
    const uuid = new Uuid("c3e9b0d0-7b6f-4a8e-8e1f-3f9e6a2f7e3c")
    expect(uuid.id).toBe("c3e9b0d0-7b6f-4a8e-8e1f-3f9e6a2f7e3c")
    expect(validate_spy).toHaveBeenCalledTimes(1)
  })
})
