import { describe, it, expect } from "vitest"
import { getValueByPath } from "../getValueByPath"

describe("getValueByPath", () => {
  it("should return the value of a simple property", () => {
    const obj = { user: { name: "Alice" } }
    const result = getValueByPath(obj, "user.name")
    expect(result).toBe("Alice")
  })

  it("should return the value of a nested property", () => {
    const obj = { user: { address: { city: "Wonderland" } } }
    const result = getValueByPath(obj, "user.address.city")
    expect(result).toBe("Wonderland")
  })

  it("should return the value of an array element", () => {
    const obj = { users: [{ name: "Alice" }, { name: "Bob" }] }
    const result = getValueByPath(obj, "users[1].name")
    expect(result).toBe("Bob")
  })

  it('should return undefined for a path that doesn"t exist', () => {
    const obj = { user: { name: "Alice" } }
    const result = getValueByPath(obj, "user.age")
    expect(result).toBeUndefined()
  })

  it("should return a default value for a non-existent path", () => {
    const obj = { user: { name: "Alice" } }
    const result = getValueByPath(obj, "user.age", 30)
    expect(result).toBe(30)
  })

  it("should return undefined for an empty object", () => {
    const obj = {}
    const result = getValueByPath(obj, "user.name")
    expect(result).toBeUndefined()
  })

  it("should return a default value for an empty object and path", () => {
    const obj = {}
    const result = getValueByPath(obj, "user.name", "Unknown")
    expect(result).toBe("Unknown")
  })

  it("should handle paths with array indices correctly", () => {
    const obj = { items: [{ id: 1 }, { id: 2 }] }
    const result = getValueByPath(obj, "items[1].id")
    expect(result).toBe(2)
  })

  it("should return undefined for an invalid path format", () => {
    const obj = { user: { name: "Alice" } }
    const result = getValueByPath(obj, "user[0].name")
    expect(result).toBeUndefined()
  })

  it("should handle paths with array indices as string", () => {
    const obj = { items: [{ id: 1 }, { id: 2 }] }
    const result = getValueByPath(obj, "items.1.id")
    expect(result).toBe(2)
  })
})
