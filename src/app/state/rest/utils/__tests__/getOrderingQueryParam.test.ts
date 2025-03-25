import { describe, it, expect } from "vitest"
import getOrderingQueryParam from "../getOrderingQueryParam"

const SORTING_ORDER = {
  ASCEND: "ASCEND",
  DESCEND: "DESCEND"
}

describe("getOrderingQueryParam", () => {
  const indexMapping = {
    name: "name",
    age: "age",
    location: "location"
  }

  it("should return an empty string if sorting.dataIndex is undefined", () => {
    const result = getOrderingQueryParam({}, indexMapping)
    expect(result).toBe("")
  })

  it("should return an empty string if sorting.dataIndex is not in indexMapping", () => {
    const result = getOrderingQueryParam({ dataIndex: "unknown" }, indexMapping)
    expect(result).toBe("")
  })

  it("should return the correct value for ASCEND order", () => {
    const result = getOrderingQueryParam(
      { dataIndex: "name", order: SORTING_ORDER.ASCEND },
      indexMapping
    )
    expect(result).toBe("name")
  })

  it("should return the correct value for DESCEND order", () => {
    const result = getOrderingQueryParam(
      { dataIndex: "name", order: SORTING_ORDER.DESCEND },
      indexMapping
    )
    expect(result).toBe("-name")
  })

  it("should return the correct value when order is undefined (default to ASCEND)", () => {
    const result = getOrderingQueryParam({ dataIndex: "age" }, indexMapping)
    expect(result).toBe("age")
  })

  it("should return an empty string if indexMapping value is empty", () => {
    const customIndexMapping = { ...indexMapping, name: "" }
    const result = getOrderingQueryParam(
      { dataIndex: "name", order: SORTING_ORDER.ASCEND },
      customIndexMapping
    )
    expect(result).toBe("")
  })
})
