import { describe, it, expect } from "vitest"
import {
  validationRequired,
  validationEmail,
  validationPhone
} from "../validators"

describe("validationRequired", () => {
  it("heeft required op true staan", () => {
    expect(validationRequired).toEqual({ required: true })
  })
})

describe("validationEmail", () => {
  it("bevat de required regel", () => {
    expect(validationEmail.required).toBe(true)
  })

  it("heeft de juiste foutmelding", () => {
    expect(validationEmail.pattern.message).toBe(
      "Dit is geen geldig e-mailadres"
    )
  })

  it.each([
    "test@example.com",
    "voornaam.achternaam@bedrijf.nl",
    "test+filter@example.co.uk",
    "test_123@example-domein.com"
  ])("accepteert een geldig e-mailadres: %s", (email) => {
    expect(validationEmail.pattern.value.test(email)).toBe(true)
  })

  it.each([
    "geen-emailadres",
    "test@",
    "@example.com",
    "test@example",
    "test @example.com",
    ""
  ])("wijst een ongeldig e-mailadres af: %s", (email) => {
    expect(validationEmail.pattern.value.test(email)).toBe(false)
  })
})

describe("validationPhone", () => {
  it("bevat de required regel", () => {
    expect(validationPhone.required).toBe(true)
  })

  it("heeft de juiste foutmelding", () => {
    expect(validationPhone.pattern.message).toBe(
      "Dit is geen geldig telefoonnummer"
    )
  })

  it.each(["0612345678", "0123456789", "+31612345678", "0031612345678"])(
    "accepteert een geldig telefoonnummer: %s",
    (phone) => {
      expect(validationPhone.pattern.value.test(phone)).toBe(true)
    }
  )

  it.each([
    "0012345678",
    "061234567",
    "06123456789012",
    "abcdefghij",
    "+32612345678",
    ""
  ])("wijst een ongeldig telefoonnummer af: %s", (phone) => {
    expect(validationPhone.pattern.value.test(phone)).toBe(false)
  })
})
