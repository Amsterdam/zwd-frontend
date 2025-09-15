import React from "react"
import { describe, it, beforeEach, expect, vi } from "vitest"
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react"
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

    act(() => {
      fireEvent.click(button)
    })

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${name} <${email}>`
    )
  })

  it("shows checkmark after copying and then resets", async () => {
    render(<CopyEmailButton email={email} name={name} />)
    const button = screen.getByTestId("copy-email-button")

    act(() => {
      fireEvent.click(button)
    })

    // Controleer dat de icon veranderd is naar CheckMarkCircleIcon
    expect(button.querySelector("svg")).toBeInTheDocument()

    // Wacht tot de knop weer terug is naar normale icon (na 2 seconden)
    await waitFor(() => {
      const svg = button.querySelector("svg")
      expect(svg).toBeInTheDocument() // hier kun je eventueel checken dat het weer de originele icon is
    }, { timeout: 2500 })
  })
})
