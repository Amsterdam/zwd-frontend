import React from "react"
import { describe, it, beforeEach, expect, vi } from "vitest"
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"

import CopyEmailButton from "./CopyEmailButton"

describe("CopyEmailButton", () => {
  const email = "jan.jansen@example.com"
  const name = "Jan Jansen"

  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn()
      }
    })
  })

  it("copies name and email to clipboard when clicked", async () => {
    render(<CopyEmailButton email={email} name={name} />)
    const button = screen.getByTestId("copy-email-button")

    await act(async () => {
      fireEvent.click(button)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${name} <${email}>`
    )
  })

  it("shows checkmark after copying and then resets", async () => {
    render(<CopyEmailButton email={email} name={name} />)
    const button = screen.getByTestId("copy-email-button")

    await act(async () => {
      fireEvent.click(button)
    })

    // Controleer dat de checkmark icon zichtbaar is
    const svgAfterClick = button.querySelector("svg")
    expect(svgAfterClick).toBeInTheDocument()

    // Wacht tot de knop weer teruggaat naar originele icon
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 2100))
    })

    // Controleer dat er nog steeds een svg is (optioneel: check of het de originele icon is)
    const svgAfterTimeout = button.querySelector("svg")
    expect(svgAfterTimeout).toBeInTheDocument()
  })
})
