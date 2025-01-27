import { ValueObject } from "../value-object"

class StringValueObject1 extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

class StringValueObject2 extends ValueObject {
  constructor(readonly value: string) {
    super()
  }
}

class ComplexValueObject1 extends ValueObject {
  constructor(
    readonly prop1: string,
    readonly prop2: number
  ) {
    super()
  }
}

class ComplexValueObject2 extends ValueObject {
  constructor(
    readonly prop1: string,
    readonly prop2: number
  ) {
    super()
  }
}

describe("ValueObject Unit Tests", () => {
  test("should be equals", () => {
    const value_object1 = new StringValueObject1("test")
    const value_object2 = new StringValueObject1("test")
    expect(value_object1.equals(value_object2)).toBe(true)

    const complex_value_object1 = new ComplexValueObject1("test", 1)
    const complex_value_object2 = new ComplexValueObject1("test", 1)
    expect(complex_value_object1.equals(complex_value_object2)).toBe(true)
  })

  test("should not be equals", () => {
    const value_object1 = new StringValueObject1("test")
    const value_object2 = new StringValueObject2("test2")
    expect(value_object1.equals(value_object2)).toBe(false)
    expect(value_object1.equals(null as any)).toBe(false)
    expect(value_object1.equals(undefined as any)).toBe(false)

    const complex_value_object1 = new ComplexValueObject1("test", 1)
    const complex_value_object2 = new ComplexValueObject2("test", 2)
    expect(complex_value_object1.equals(complex_value_object2)).toBe(false)
    expect(complex_value_object1.equals(null as any)).toBe(false)
    expect(complex_value_object2.equals(undefined as any)).toBe(false)
  })
})
