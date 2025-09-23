import { describe, it, expect } from "vitest"
import { isValidDate, formatDate, formatTime } from "../dates"

describe("isValidDate", () => {
  it("should return true for a valid date string", () => {
    const validDate = "2025-03-14"
    const result = isValidDate(validDate)
    expect(result).toBe(true)
  })

  it("should return false for an invalid date string", () => {
    const invalidDate = "invalid-date"
    const result = isValidDate(invalidDate)
    expect(result).toBe(false)
  })

  it("should return false for an empty date string", () => {
    const emptyDate = ""
    const result = isValidDate(emptyDate)
    expect(result).toBe(false)
  })
})

describe("formatDate", () => {
  it("should correctly format date without time", () => {
    const date = "2025-03-14"
    const result = formatDate(date)
    expect(result).toBe("14-03-2025")
  })

  it("should correctly format date with time", () => {
    const date = "2025-03-14T10:30:00"
    const result = formatDate(date, true)
    expect(result).toBe("14-03-2025 10:30")
  })
})

describe("formatTime", () => {
  it("should correctly format time from a full datetime string", () => {
    const date = "2025-03-14T10:30:45"
    const result = formatTime(date)
    expect(result).toBe("10:30")
  })

  it("should correctly format time from a date string with time", () => {
    const date = "2025-03-14 23:59"
    const result = formatTime(date)
    expect(result).toBe("23:59")
  })

  it("should return 00:00 for a date string without time", () => {
    const date = "2025-03-14"
    const result = formatTime(date)
    expect(result).toBe("00:00")
  })

  it("should return Invalid Date for an invalid date string", () => {
    const date = "invalid-date"
    const result = formatTime(date)
    // dayjs("invalid-date").format("HH:mm") returns "Invalid Date"
    expect(result).toBe("Invalid Date")
  })
})
